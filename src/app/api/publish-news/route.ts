import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

        const {
            title,
            category,
            platform,
            summary,
            content,
            source_name,
            source_url,
            author_name,
            image_url,
        } = body;

        // Validate required fields (trim to catch whitespace-only strings)
        const requiredFields = { title, category, summary, content, source_name, author_name };
        const missingFields = Object.entries(requiredFields)
            .filter(([, value]) => !value || (typeof value === 'string' && value.trim() === ''))
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { success: false, error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Build insert payload
        const insertPayload: Record<string, unknown> = {
            title,
            category,
            summary,
            content,
            source_name,
            author_name,
            status: 'published',
            created_at: serverTimestamp(),
        };

        // Optional fields — only include if provided
        if (platform) {
            insertPayload.platform = platform;
        }
        if (source_url) {
            insertPayload.source_url = source_url;
        }
        if (image_url) {
            insertPayload.image_url = image_url;
        } else {
            insertPayload.image_url = "";
        }

        console.log('[publish-news] Inserting article with payload:', insertPayload);

        const docRef = await addDoc(collection(db, 'news_articles'), insertPayload);

        console.log('[publish-news] Article inserted successfully:', docRef.id);

        return NextResponse.json(
            { success: true, data: { id: docRef.id, ...insertPayload } },
            { status: 201 }
        );
    } catch (error) {
        console.error('[publish-news] Unexpected error:', error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Internal Server Error', code: '' },
            { status: 500 }
        );
    }
}
