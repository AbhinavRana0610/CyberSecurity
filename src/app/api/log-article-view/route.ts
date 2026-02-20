import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { createHash } from 'crypto';

// Helper function to hash IP
function hashIp(ip: string): string {
    return createHash('sha256').update(ip).digest('hex');
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { article_id } = body;

        if (!article_id) {
            return NextResponse.json({ error: 'Missing article_id' }, { status: 400 });
        }

        // 1. Read IP from headers or request
        // x-forwarded-for can be a comma-separated list, take the first one
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const rawIp = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || (request as any).ip || 'unknown');

        // 2. Immediately hash the IP
        const ip_hash = hashIp(rawIp);

        // 3. Extract country and region (Vercel headers)
        const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
        const region = request.headers.get('x-vercel-ip-country-region') || 'Unknown';

        // 4. Derive device_type from user agent
        const userAgent = request.headers.get('user-agent') || '';
        let device_type = 'desktop';

        if (/tablet|ipad/i.test(userAgent)) {
            device_type = 'tablet';
        } else if (/mobile/i.test(userAgent)) {
            device_type = 'mobile';
        }

        // 5. Insert into Supabase
        const { error } = await supabase
            .from('article_views')
            .upsert(
                {
                    article_id,
                    ip_hash,
                    country,
                    region,
                    device_type,
                    // created_at is usually handled by default value in DB, but good to have if manual
                },
                {
                    onConflict: 'article_id,ip_hash',
                    ignoreDuplicates: true,
                }
            );

        if (error) {
            console.error('Error logging article view:', error);
            // Non-blocking error - we don't return 500 to client to avoid disrupting UX
            // But we log it on server
            return NextResponse.json({ success: false, error: 'Tracking failed' }, { status: 200 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in log-article-view route:', error);
        // Return 200 even on error to not break the page?
        // User said: "Add basic error handling but do not block page rendering if tracking fails."
        // Since this is an async fetch, returning 500 won't block render, but 200 is safer for clients that might check ok.
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
