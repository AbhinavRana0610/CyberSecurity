"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Globe, ArrowLeft } from "lucide-react";

export interface NewsArticle {
    id: string;
    title: string;
    category: string;
    summary: string;
    content: string;
    author_name: string;
    source_name: string;
    source_url: string | null;
    created_at: string;
    image_url: string | null;
    platform: string | null;
    status: string;
}

interface NewsArticleClientProps {
    article: NewsArticle;
}

export function NewsArticleClient({ article }: NewsArticleClientProps) {
    // Helper to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <article className="min-h-screen bg-white">
            {/* Header / Featured Image Section */}
            <div className="w-full bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="mb-6">
                        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-700 transition-colors mb-6">
                            <ArrowLeft className="mr-1 h-4 w-4" /> Back to News
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-4">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm py-1">
                                {article.category}
                            </Badge>
                            {article.platform && (
                                <Badge variant="outline" className="text-slate-500 border-slate-300">
                                    {article.platform}
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-y border-slate-200 py-4">
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                                {formatDate(article.created_at)}
                            </div>
                            <div className="flex items-center">
                                <User className="mr-2 h-4 w-4 text-slate-400" />
                                {article.author_name || 'CyberSentry Team'}
                            </div>
                            <div className="flex items-center">
                                <Globe className="mr-2 h-4 w-4 text-slate-400" />
                                <span className="mr-1">Source:</span>
                                {article.source_url ? (
                                    <a
                                        href={article.source_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 hover:underline font-medium"
                                    >
                                        {article.source_name}
                                    </a>
                                ) : (
                                    <span className="font-medium">{article.source_name}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {article.image_url && (
                        <div className="rounded-xl overflow-hidden shadow-lg mb-8 bg-slate-100 border border-slate-200 relative aspect-video">
                            <img
                                src={article.image_url}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <div className="prose prose-slate prose-lg max-w-none">
                    {/* Summary Block */}
                    {article.summary && (
                        <div className="bg-blue-50/50 border-l-4 border-blue-600 p-6 mb-10 rounded-r-lg">
                            <p className="text-xl text-slate-800 font-medium italic leading-relaxed m-0">
                                {article.summary}
                            </p>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="whitespace-pre-wrap leading-relaxed text-slate-800">
                        {article.content}
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center">
                    <Link href="/">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
                        </Button>
                    </Link>

                    {article.source_url && (
                        <Button asChild variant="default" className="bg-blue-700 hover:bg-blue-800">
                            <a href={article.source_url} target="_blank" rel="noopener noreferrer">
                                Read Original Article <Globe className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </article>
    );
}
