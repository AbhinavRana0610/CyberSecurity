"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search,
    Filter,
    ShieldAlert,
    Globe,
    Smartphone,
    MessageCircle,
    CreditCard,
    Users,
    Clock,
    AlertTriangle,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { collection, query, where, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Define the shape of our data
interface FraudReport {
    id: string; // Firestore document ID
    title: string;
    category: string;
    platform: string;
    status: string;
    created_at: string;
    // visual fields
    views?: number;
}

export default function CasesPage() {
    const [cases, setCases] = useState<FraudReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const q = query(
                collection(db, "fraud_reports"),
                where("is_public", "==", true),
                orderBy("created_at", "desc")
            );

            // Real-time listener using Firestore onSnapshot
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map(doc => {
                    const docData = doc.data();
                    return {
                        id: doc.id,
                        ...docData,
                        created_at: docData.created_at instanceof Timestamp
                            ? docData.created_at.toDate().toISOString()
                            : docData.created_at || "",
                    } as FraudReport;
                });

                setCases(data);
                setIsLoading(false);
            }, (err) => {
                console.error("Error fetching cases:", err);
                setError("Failed to load cases. Please try again later.");
                setIsLoading(false);
            });

            return () => {
                unsubscribe();
            };
        } catch (err: any) {
            console.error("Error setting up cases listener:", err);
            setError("Failed to load cases. Please try again later.");
            setIsLoading(false);
        }
    }, []);

    // Helper functions for UI mapping
    const getTimeAgo = (dateString: string) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'under_review': return 'bg-amber-600';
            case 'action_taken': return 'bg-emerald-600';
            case 'blocked': return 'bg-red-600';
            case 'verified': return 'bg-blue-600';
            default: return 'bg-slate-500';
        }
    };

    const getFormatStatus = (status: string) => {
        return status ? status.replace('_', ' ') : 'Unknown';
    };

    const getPlatformIcon = (platform: string) => {
        const p = platform?.toLowerCase() || '';
        if (p.includes('sms')) return MessageCircle;
        if (p.includes('whatsapp') || p.includes('telegram')) return Smartphone;
        if (p.includes('web') || p.includes('url')) return Globe;
        if (p.includes('upi') || p.includes('bank')) return CreditCard;
        if (p.includes('call')) return Smartphone;
        return AlertTriangle;
    };

    const getCategoryIcon = (category: string) => {
        const c = category?.toLowerCase() || '';
        if (c.includes('investment')) return AlertTriangle;
        if (c.includes('job')) return Users;
        return ShieldAlert;
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Page Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Public Fraud Cases</h1>
                    <p className="text-slate-600 max-w-2xl">
                        Browse recently reported cases to stay informed. Verified information keeps the community safe.
                        Detailed timelines are available for each case.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="Search by keywords, sender ID, or suspicious URLs..."
                            className="pl-10 h-12 bg-white border-slate-300 shadow-sm focus:border-blue-500 text-lg"
                        />
                    </div>
                    <Button variant="outline" className="h-12 px-6 border-slate-300 text-slate-700 bg-white hover:bg-slate-50">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter Cases
                    </Button>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                        <p className="text-slate-500">Loading latest reports...</p>
                    </div>
                )}

                {/* Error State */}
                {!isLoading && error && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-red-100 p-4 rounded-full mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Unable to load cases</h3>
                        <p className="text-slate-600 max-w-md">{error}</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </Button>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && cases.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No Public Cases Yet</h3>
                        <p className="text-slate-500 mt-2">New verfied reports will appear here.</p>
                    </div>
                )}

                {/* Case Listings Grid */}
                {!isLoading && !error && cases.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cases.map((item) => {
                            const PlatformIcon = getPlatformIcon(item.platform);
                            const CategoryIcon = getCategoryIcon(item.category);
                            const statusColor = getStatusColor(item.status);
                            const timeAgo = getTimeAgo(item.created_at);

                            return (
                                <Link href={`/case/${item.id}`} key={item.id} className="group block h-full">
                                    <Card className="h-full border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group-hover:border-blue-300">
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge className={`${statusColor} hover:${statusColor} rounded px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold`}>
                                                    {getFormatStatus(item.status)}
                                                </Badge>
                                                <span className="flex items-center text-xs text-slate-500 font-medium">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    {timeAgo}
                                                </span>
                                            </div>
                                            <CardTitle className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                                                {item.title || "Untitled Report"}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="flex items-center text-sm text-slate-600 mb-4 bg-slate-50 p-2 rounded border border-slate-100">
                                                <PlatformIcon className="w-4 h-4 mr-2 text-slate-500" />
                                                <span className="capitalize">{item.platform}</span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                                                <div className="flex items-center">
                                                    <CategoryIcon className="w-3 h-3 mr-1.5 text-slate-400" />
                                                    <span className="font-medium text-slate-600 capitalize">{item.category?.replace('_', ' ')}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Users className="w-3 h-3 mr-1.5 text-slate-400" />
                                                    {item.views ? item.views.toLocaleString() : 0} views
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Pagination Placeholder - Logic to be implemented later */}
                {!isLoading && !error && cases.length > 9 && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex space-x-2">
                            <Button variant="outline" disabled className="text-slate-400">Previous</Button>
                            <Button variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">1</Button>
                            <Button variant="outline">Next</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
