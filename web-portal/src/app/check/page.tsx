"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, CheckCircle2, XCircle, ArrowRight, ShieldAlert, Loader2 } from "lucide-react";
import Link from "next/link";

type CheckStatus = 'idle' | 'searching' | 'match' | 'review' | 'clean';

export default function ScamCheckPage() {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<CheckStatus>('idle');

    const [platform, setPlatform] = useState("");

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setStatus('searching');

        // Simulate API Search
        // Mock logic: 
        // "fraud" -> Match found
        // "verify" -> Under review
        // anything else -> No records found
        await new Promise(resolve => setTimeout(resolve, 1500));

        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes("fraud") || lowerQuery.includes("scam") || lowerQuery.includes("fake")) {
            setStatus('match');
        } else if (lowerQuery.includes("verify") || lowerQuery.includes("review")) {
            setStatus('review');
        } else {
            setStatus('clean');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-3xl">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Check a Suspicious Message or Link</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Use this tool to check whether a URL, phone number, UPI ID, or message
                        has already been reported as a potential fraud by other citizens.
                    </p>
                </div>

                {/* Input Card */}
                <Card className="border-slate-200 shadow-md mb-8">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
                        <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                            <Search className="w-5 h-5 text-blue-600" />
                            <span>Quick Verification Tool</span>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-8 pb-8">
                        <form onSubmit={handleCheck} className="flex flex-col gap-6">

                            {/* Platform Selection */}
                            <div className="w-full">
                                <label htmlFor="platform-select" className="block text-sm font-medium text-slate-700 mb-2">
                                    Platform Involved (Optional)
                                </label>
                                <div className="relative">
                                    <select
                                        id="platform-select"
                                        value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}
                                        className="flex h-12 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none shadow-sm"
                                    >
                                        <option value="">Select the platform where this occurred...</option>
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="telegram">Telegram</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="twitter">Twitter / X</option>
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                        <option value="website">Website / Online Portal</option>
                                        <option value="call">Phone Call</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-grow">
                                <label htmlFor="search-input" className="sr-only">Paste suspicious content</label>
                                <Input
                                    id="search-input"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Paste a suspicious URL, phone number, UPI ID, or message here..."
                                    className="h-12 text-lg border-slate-300 focus:border-blue-500"
                                />
                                <p className="text-xs text-slate-500 mt-2 ml-1">
                                    Supported: URLs (http...), Phone (+91...), UPI IDs, SMS text.
                                </p>
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                className="h-12 px-8 bg-blue-700 hover:bg-blue-800 font-bold shrink-0"
                                disabled={status === 'searching' || !query.trim()}
                            >
                                {status === 'searching' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check Now'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Result States */}
                <div className="aria-live:polite">

                    {/* 1. MATCH FOUND */}
                    {status === 'match' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                                <div className="flex items-start mb-4">
                                    <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-1 shrink-0" />
                                    <div>
                                        <h2 className="text-xl font-bold text-red-700">Related Fraud Cases Found</h2>
                                        <p className="text-red-600 text-sm mt-1">
                                            The item you searched for matches records in our database. Exercise extreme caution.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">Matching Records</h3>
                            <div className="space-y-4">
                                {/* Mock Result 1 */}
                                <Link href="/case/CS-IND-2024-8892" className="block group">
                                    <Card className="hover:border-blue-300 transition-colors border-l-4 border-l-red-500">
                                        <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 text-[10px]">
                                                        MATCH CONFIRMED
                                                    </Badge>
                                                    <span className="text-xs text-slate-400">ID: CS-IND-2024-8892</span>
                                                </div>
                                                <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                    Fake 'Electricity Bill' Disconnection SMS
                                                </h4>
                                                <div className="text-xs text-slate-500 mt-1 flex items-center">
                                                    <span>Smishing / SMS Fraud</span>
                                                    <span className="mx-2">•</span>
                                                    <span>Action Taken</span>
                                                </div>
                                            </div>
                                            <div className="shrink-0">
                                                <Button variant="ghost" size="sm" className="text-blue-700 group-hover:bg-blue-50">
                                                    View Case <ArrowRight className="ml-1 w-4 h-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>

                                {/* Mock Result 2 */}
                                <Link href="/case/CS-IND-2024-1102" className="block group">
                                    <Card className="hover:border-blue-300 transition-colors border-l-4 border-l-orange-400">
                                        <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700 text-[10px]">
                                                        SUSPICIOUS
                                                    </Badge>
                                                    <span className="text-xs text-slate-400">ID: CS-IND-2024-1102</span>
                                                </div>
                                                <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                    Unknown Number asking for OTP
                                                </h4>
                                                <div className="text-xs text-slate-500 mt-1 flex items-center">
                                                    <span>Vishing</span>
                                                    <span className="mx-2">•</span>
                                                    <span>Reporting Verified</span>
                                                </div>
                                            </div>
                                            <div className="shrink-0">
                                                <Button variant="ghost" size="sm" className="text-blue-700 group-hover:bg-blue-50">
                                                    View Case <ArrowRight className="ml-1 w-4 h-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* 2. UNDER REVIEW */}
                    {status === 'review' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <Card className="bg-amber-50 border-amber-200">
                                <CardContent className="p-8 text-center">
                                    <div className="mx-auto bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                        <ShieldAlert className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-2">Verification In Progress</h2>
                                    <p className="text-slate-600 max-w-lg mx-auto mb-6">
                                        We have received recent reports related to this item, but they are currently under automated verification.
                                        It is recommended to <strong>do not proceed</strong> with any transaction.
                                    </p>
                                    <Button variant="outline" className="text-amber-700 border-amber-200 bg-white hover:bg-amber-100" asChild>
                                        <Link href="/cases">Browse Public Cases</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* 3. NO RECORDS FOUND - CLEAN */}
                    {status === 'clean' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <Card className="bg-white border-slate-200">
                                <CardContent className="p-8 text-center">
                                    <div className="mx-auto bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-2">No Records Found</h2>
                                    <p className="text-slate-600 max-w-lg mx-auto mb-6">
                                        We could not find any existing fraud reports for this item in our public database.
                                        However, this does not guarantee safety.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <Button className="bg-slate-800 hover:bg-slate-900" asChild>
                                            <Link href="/report">
                                                Report This Incident <ArrowRight className="ml-2 w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
