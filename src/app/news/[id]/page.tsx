import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LogView } from "@/components/news/LogView";
import { NewsArticleClient, NewsArticle } from "@/components/news/NewsArticleClient";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    try {
        const docRef = doc(db, "news_articles", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return {
                title: 'Article Not Found - CyberSentry',
            };
        }

        const article = docSnap.data();

        return {
            title: `${article.title} - CyberSentry News`,
            description: article.summary,
            openGraph: article.image_url ? {
                images: [article.image_url],
            } : undefined,
        };
    } catch {
        return {
            title: 'Article Not Found - CyberSentry',
        };
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    console.log("Article ID:", id);

    // Guard: if id is missing or empty, show not found
    if (!id) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
                <p className="text-slate-600 mb-8 max-w-md">
                    The news article you are looking for does not exist or has been removed.
                </p>
                <Link href="/">
                    <Button>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>
            </div>
        );
    }

    try {
        const docRef = doc(db, "news_articles", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.log("ARTICLE NOT FOUND (Document does not exist)");
            return (
                <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
                    <p className="text-slate-600 mb-8 max-w-md">
                        The news article you are looking for does not exist or has been removed.
                    </p>
                    <Link href="/">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                </div>
            );
        }

        const docData = docSnap.data();
        const newsArticle: NewsArticle = {
            id: docSnap.id,
            title: docData.title || "",
            category: docData.category || "",
            summary: docData.summary || "",
            content: docData.content || "",
            author_name: docData.author_name || "",
            source_name: docData.source_name || "",
            source_url: docData.source_url || null,
            created_at: docData.created_at instanceof Timestamp
                ? docData.created_at.toDate().toISOString()
                : docData.created_at || "",
            image_url: docData.image_url || null,
            platform: docData.platform || null,
            status: docData.status || "",
        };

        return (
            <>
                <LogView articleId={newsArticle.id} />
                <NewsArticleClient article={newsArticle} />
            </>
        );
    } catch (error) {
        console.error("Error fetching article:", error);
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
                <p className="text-slate-600 mb-8 max-w-md">
                    The news article you are looking for does not exist or has been removed.
                </p>
                <Link href="/">
                    <Button>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Button>
                </Link>
            </div>
        );
    }
}
