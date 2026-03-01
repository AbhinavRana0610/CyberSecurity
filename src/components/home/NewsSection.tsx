"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Newspaper, Loader2 } from "lucide-react";
import { collection, getDocs, query, where, orderBy, limit, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface NewsArticle {
    id: string;
    title: string;
    category: string;
    summary: string;
    source_name: string;
    source_url: string | null;
    created_at: string;
    image_url: string | null;
    platform: string | null;
    status: string;
}

export function NewsSection() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const q = query(
                    collection(db, "news_articles"),
                    where("status", "==", "published"),
                    orderBy("created_at", "desc"),
                    limit(6)
                );

                const snapshot = await getDocs(q);

                const data = snapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        id: doc.id,
                        ...docData,
                        created_at: docData.created_at instanceof Timestamp
                            ? docData.created_at.toDate().toISOString()
                            : docData.created_at || "",
                    } as NewsArticle;
                });

                setArticles(data);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatNewsId = (id: string) => {
        return `CS-NEWS-${id.slice(0, 4).toUpperCase()}`;
    };

    return (
        <section className="w-full bg-slate-50 py-12 border-y border-slate-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Newspaper className="h-6 w-6 text-blue-700" />
                            Cyber Fraud News & Updates
                        </h2>
                        <p className="text-slate-600 mt-2 max-w-2xl">
                            Latest news and updates related to cyber fraud, online fraud, and digital safety to keep you informed.
                        </p>
                    </div>
                    <Link href="/news" className="text-blue-700 hover:text-blue-900 font-medium text-sm flex items-center hover:underline">
                        View Archive <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-700" />
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
                        {articles.length > 0 ? (
                            articles.map((article) => {
                                console.log("CARD ID:", article.id);
                                return (
                                    <Link
                                        key={article.id}
                                        href={`/news/${article.id}`}
                                        className="block group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-lg break-inside-avoid mb-6"
                                    >
                                        <Card className="h-full hover:shadow-md transition-shadow duration-200 border-slate-200 bg-white overflow-hidden flex flex-col">
                                            <div className="h-32 w-full bg-slate-100 relative border-b border-slate-100">
                                                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                                    {article.image_url ? (
                                                        <img
                                                            src={article.image_url}
                                                            alt={article.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="text-slate-300">
                                                            <Newspaper className="h-12 w-12 opacity-20" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <CardHeader className="pb-3 space-y-2 pt-4">
                                                <div className="flex justify-between items-start">
                                                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-normal">
                                                        {article.category}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-base font-semibold text-slate-900 leading-snug group-hover:text-blue-800 transition-colors line-clamp-2">
                                                    {article.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pb-3 text-sm text-slate-600">
                                                <p className="line-clamp-3">{article.summary}</p>
                                            </CardContent>
                                            <CardFooter className="pt-0 text-xs text-slate-500 flex justify-between items-center border-t border-slate-100 mt-auto p-4 bg-slate-50/50 rounded-b-lg">
                                                <span className="font-medium text-slate-700 truncate max-w-[100px]" title={article.source_name}>
                                                    {article.source_name}
                                                </span>
                                                <span className="flex items-center gap-3">
                                                    <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-200">
                                                        {formatNewsId(article.id)}
                                                    </span>
                                                    <span className="flex items-center whitespace-nowrap">
                                                        <Calendar className="mr-1 h-3 w-3" />
                                                        {formatDate(article.created_at)}
                                                    </span>
                                                </span>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                );
                            })
                        ) : (
                            <div className="col-span-full text-center py-12 text-slate-500">
                                No news articles available at the moment.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
