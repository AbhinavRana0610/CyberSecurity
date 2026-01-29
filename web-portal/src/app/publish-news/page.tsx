"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function PublishNewsPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (submitted) {
        return (
            <div className="container mx-auto py-12 px-4 max-w-3xl">
                <Card className="border-green-200 bg-green-50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-green-800 text-2xl">Submission Successful</CardTitle>
                        <CardDescription className="text-green-700 text-lg">
                            Your article has been submitted for review.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-700 mb-6">
                            Our team will review the content for accuracy and relevance. Once approved, it will be published to the CyberSentry India news section.
                        </p>
                        <Button
                            onClick={() => setSubmitted(false)}
                            className="bg-green-700 hover:bg-green-800 text-white"
                        >
                            Submit Another Article
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Publish Cyber Fraud News Article</h1>
                <p className="text-slate-600">
                    Submit verified cyber fraud–related news or advisories for review before being published on CyberSentry India.
                </p>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Article Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Article Title <span className="text-red-500">*</span></Label>
                            <Input id="title" required placeholder="Enter the headline of the news article" />
                        </div>

                        {/* News Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category">News Category <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <select
                                    id="category"
                                    required
                                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                >
                                    <option value="">Select a category</option>
                                    <option value="banking-fraud">Banking Fraud</option>
                                    <option value="upi-fraud">UPI Fraud</option>
                                    <option value="cyber-advisory">Cyber Advisory</option>
                                    <option value="policy-update">Policy Update</option>
                                    <option value="emerging-scam">Emerging Scam</option>
                                </select>
                            </div>
                        </div>

                        {/* Platform Involved */}
                        <div className="space-y-2">
                            <Label htmlFor="platform">Platform Involved (Optional)</Label>
                            <div className="relative">
                                <select
                                    id="platform"
                                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                >
                                    <option value="">Select platform</option>
                                    <option value="whatsapp">WhatsApp</option>
                                    <option value="telegram">Telegram</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="email">Email</option>
                                    <option value="website">Website</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Article Summary */}
                        <div className="space-y-2">
                            <Label htmlFor="summary">Article Summary <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="summary"
                                required
                                placeholder="Brief summary of the article (1-2 sentences)"
                                className="min-h-[80px]"
                            />
                        </div>

                        {/* Full Article Content */}
                        <div className="space-y-2">
                            <Label htmlFor="content">Full Article Content <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="content"
                                required
                                placeholder="Write the full news content here..."
                                className="min-h-[200px]"
                            />
                        </div>

                        {/* Source Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sourceName">Source / Organization Name <span className="text-red-500">*</span></Label>
                                <Input id="sourceName" required placeholder="e.g. RBI, Cyber Cell, News Agency" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sourceUrl">Source URL (Optional)</Label>
                                <Input id="sourceUrl" type="url" placeholder="https://..." />
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Upload Featured Image (Optional)</Label>
                            <Input id="image" type="file" accept="image/*" className="cursor-pointer" />
                            <p className="text-xs text-slate-500">Supported formats: JPG, PNG, WebP. Max size: 5MB.</p>
                        </div>

                        {/* Author Name */}
                        <div className="space-y-2">
                            <Label htmlFor="author">Author Name <span className="text-red-500">*</span></Label>
                            <Input id="author" required placeholder="Your Full Name" />
                        </div>

                        {/* Declaration */}
                        <div className="flex items-start space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="declaration"
                                required
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                            />
                            <Label htmlFor="declaration" className="text-sm font-normal leading-tight cursor-pointer">
                                I confirm that this information is accurate to the best of my knowledge.
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button type="submit" className="w-full md:w-auto bg-blue-900 hover:bg-blue-800 text-white px-8">
                                Submit Article for Review
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
