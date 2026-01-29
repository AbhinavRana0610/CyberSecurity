import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Newspaper } from "lucide-react";

const newsArticles = [
    {
        id: 1,
        headline: "RBI Issues New Guidelines for Digital Lending Apps to Curb Harassment",
        summary: "The Reserve Bank of India has mandated stricter compliance norms for digital lending platforms to protect borrowers from predatory practices.",
        source: "RBI Official Notification",
        date: "Jan 22, 2026",
        category: "Banking Fraud",
        link: "#",
        image: "/news-banking.png",
        newsId: "CS-NEWS-001"
    },
    {
        id: 2,
        headline: "Government Launches 'Chakshu' Portal to Report Suspected Fraud Communications",
        summary: "DoT's new initiative allows citizens to proactively report suspected fraud calls and SMS before a crime occurs.",
        source: "PIB India",
        date: "Jan 20, 2026",
        category: "Policy Update",
        link: "#",
        image: "/news-portal.png",
        newsId: "CS-NEWS-002"
    },
    {
        id: 3,
        headline: "Surge in AI-Voice Clone Fraud: Advisory for Senior Citizens",
        summary: "Cyber cell warns of fraudsters using AI to mimic family members' voices in distress calls. Verify before transferring money.",
        source: "Cyber Crime Cell",
        date: "Jan 18, 2026",
        category: "AI Fraud",
        link: "#",
        image: "/news-ai.png",
        newsId: "CS-NEWS-003"
    },
    {
        id: 4,
        headline: "UPI Transactions: Safety Tips Updated for 2026",
        summary: "NPCI releases new safety guidelines emphasizing that you never need to enter your PIN to receive money.",
        source: "NPCI Circular",
        date: "Jan 15, 2026",
        category: "UPI Safety",
        link: "#",
        image: "/news-upi.png",
        newsId: "CS-NEWS-004"
    }
];

export function NewsSection() {
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

                <div className="columns-1 md:columns-2 lg:columns-4 gap-6">
                    {newsArticles.map((article) => (
                        <Link key={article.id} href={article.link} className="block group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 rounded-lg mb-6 break-inside-avoid">
                            <Card className="h-full hover:shadow-md transition-shadow duration-200 border-slate-200 bg-white overflow-hidden">
                                <div className="h-32 w-full bg-slate-100 relative border-b border-slate-100">
                                    <div className="absolute inset-0 p-4 flex items-center justify-center">
                                        <img
                                            src={article.image}
                                            alt="" // Decorative image
                                            className="h-full w-auto object-contain opacity-90"
                                        />
                                    </div>
                                </div>
                                <CardHeader className="pb-3 space-y-2 pt-4">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-normal">
                                            {article.category}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-base font-semibold text-slate-900 leading-snug group-hover:text-blue-800 transition-colors line-clamp-2">
                                        {article.headline}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pb-3 text-sm text-slate-600">
                                    <p className="line-clamp-3">{article.summary}</p>
                                </CardContent>
                                <CardFooter className="pt-0 text-xs text-slate-500 flex justify-between items-center border-t border-slate-100 mt-auto p-4 bg-slate-50/50 rounded-b-lg">
                                    <span className="font-medium text-slate-700">{article.source}</span>
                                    <span className="flex items-center gap-3">
                                        <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-200">
                                            {article.newsId}
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {article.date}
                                        </span>
                                    </span>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
