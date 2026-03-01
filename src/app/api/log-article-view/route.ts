import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, limit, serverTimestamp } from 'firebase/firestore';

// Server-side Firebase client
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

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

        // 2. Fetch geo data using a free IP API (with 3s timeout)
        let country = 'Unknown';
        let region = 'Unknown';
        let city = 'Unknown';

        if (ip_address === '::1' || ip_address === '127.0.0.1' || ip_address === 'Unknown') {
            country = 'Localhost';
            region = 'Localhost';
            city = 'Localhost';
        } else {
            try {
                const geoRes = await fetch(`https://ipapi.co/${ip_address}/json/`, {
                    signal: AbortSignal.timeout(3000),
                });
                if (geoRes.ok) {
                    const geoData = await geoRes.json();
                    if (!geoData.error) {
                        city = geoData.city || 'Unknown';
                        region = geoData.region || 'Unknown';
                        country = geoData.country_name || 'Unknown';
                    }
                }
            } catch (err) {
                console.error('Geo API fetch error (will store view with Unknown location):', err);
                // Keep defaults — do NOT crash, still store the view
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

        // 4. Prevent duplicate views — query Firestore for existing view
        try {
            const q = query(
                collection(db, 'article_views'),
                where('article_id', '==', article_id),
                where('ip_address', '==', ip_address),
                limit(1)
            );

            const existingSnapshot = await getDocs(q);

            if (!existingSnapshot.empty) {
                return NextResponse.json({ success: true, skipped: true });
            }
        } catch (checkError) {
            console.error('Firestore check error:', checkError);
            // Continue to insert even if check fails
        }

        // 5. Insert into Firestore collection article_views
        await addDoc(collection(db, 'article_views'), {
            article_id,
            ip_address,
            country,
            region,
            city,
            device_type,
            created_at: serverTimestamp(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in log-article-view route:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500 }
        );
    }
}
