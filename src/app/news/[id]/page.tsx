import { supabase } from "@/lib/supabaseClient";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LogView } from "@/components/news/LogView";
import { NewsArticleClient, NewsArticle } from "@/components/news/NewsArticleClient";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = params.id;

    // Quick fetch for metadata
    const { data: article } = await supabase
        .from('news_articles')
        .select('title, summary, image_url')
        .eq('id', id)
        .single();

    if (!article) {
        return {
            title: 'Article Not Found - CyberSentry',
        };
    }

    return {
        title: `${article.title} - CyberSentry News`,
        description: article.summary,
        openGraph: article.image_url ? {
            images: [article.image_url],
        } : undefined,
    };
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
    // STEP 1: LOG PARAM ID
    console.log("NEWS PARAM ID:", params.id);

    // STEP 7: HARD TEST (Uncomment to test specific ID if dynamic fails)
    const testId = "65723605-983b-4114-8b3a-5c46a51f2240";

    // STEP 2: FETCH
    const { data: article, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('id', testId) // HARDCODED TEST
        .single();

    if (error) {
        console.log("SUPABASE ERROR:", error);
    }

    if (!article) {
        console.log("ARTICLE NOT FOUND (Result is null)");
    }

    if (error || !article) {
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

    // Cast the data to our interface
    const newsArticle = article as NewsArticle;

    return (
        <>
            <LogView articleId={newsArticle.id} />
            <NewsArticleClient article={newsArticle} />
        </>
    );
}
