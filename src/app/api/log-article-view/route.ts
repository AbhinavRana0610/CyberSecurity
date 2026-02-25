import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Keep this logic server-side only
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { article_id } = body;

        if (!article_id) {
            return NextResponse.json({ success: false, error: 'Missing article_id' }, { status: 400 });
        }

        // 1. Capture raw IP
        const forwarded = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');

        let ip_address = 'Unknown';
        if (forwarded) {
            ip_address = forwarded.split(',')[0].trim();
        } else if (realIp) {
            ip_address = realIp;
        }

        // 2. Fetch geo data using a free IP API
        let country = 'Unknown';
        let region = 'Unknown';
        let city = 'Unknown';

        if (ip_address === '::1' || ip_address === '127.0.0.1' || ip_address === 'Unknown') {
            country = 'Localhost';
            region = 'Localhost';
            city = 'Localhost';
        } else {
            try {
                const geoRes = await fetch(`https://ipapi.co/${ip_address}/json/`);
                if (geoRes.ok) {
                    const geoData = await geoRes.json();
                    if (!geoData.error) {
                        country = geoData.country_code || 'Unknown';
                        region = geoData.region_code || 'Unknown';
                        city = geoData.city || 'Unknown';
                    }
                }
            } catch (err) {
                console.error('Geo API fetch error:', err);
                // Keep defaults if geo API fails
            }
        }

        // 3. Keep device type detection from user-agent
        const userAgent = request.headers.get('user-agent') || '';
        let device_type = 'desktop';

        if (userAgent.includes('Mobile')) {
            device_type = 'mobile';
        } else if (userAgent.includes('Tablet')) {
            device_type = 'tablet';
        } else {
            device_type = 'desktop';
        }

        // 4. Prevent duplicate views
        const { data: existingViews, error: checkError } = await supabase
            .from('article_views')
            .select('article_id')
            .eq('article_id', article_id)
            .eq('ip_address', ip_address)
            .limit(1);

        if (checkError) {
            console.error('Supabase check error:', checkError);
            return NextResponse.json({ success: false, error: checkError.message });
        }

        if (existingViews && existingViews.length > 0) {
            return NextResponse.json({ success: true, skipped: true });
        }

        // 5. Insert into Supabase table article_views
        const { error: insertError } = await supabase
            .from('article_views')
            .insert({
                article_id,
                ip_address,
                country,
                region,
                city,
                device_type
            });

        if (insertError) {
            console.error('Error logging article view:', insertError);
            return NextResponse.json({ success: false, error: insertError.message });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in log-article-view route:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}
