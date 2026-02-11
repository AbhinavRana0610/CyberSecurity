"use client";

import React, { useState, ChangeEvent } from "react";
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
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

export default function PublishNewsPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        platform: "",
        summary: "",
        content: "",
        sourceName: "",
        sourceUrl: "",
        authorName: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            console.log("Starting image upload for:", file.name);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `news-articles/${fileName}`;

            const { data, error: uploadError } = await supabase.storage
                .from('news-images')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading image to Supabase Storage:', uploadError);
                // We return null so the article can still be published without the image
                return null;
            }

            console.log("Image uploaded successfully. Path:", data?.path);

            const { data: publicUrlData } = supabase.storage
                .from('news-images')
                .getPublicUrl(filePath);

            console.log("Generated Public URL:", publicUrlData.publicUrl);
            return publicUrlData.publicUrl;
        } catch (error) {
            console.error('Unexpected error in uploadImage:', error);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 1. Log the initial form data
        console.log("Form Submission Started");
        console.log("Current Form Data:", formData);

        try {
            let imageUrl = null;

            // 2. Handle Image Upload
            if (imageFile) {
                console.log("Image file detected, attempting upload...");
                imageUrl = await uploadImage(imageFile);
                console.log("Final Image URL to be used:", imageUrl);
            } else {
                console.log("No image file selected, skipping upload.");
            }

            // 3. Construct Payload - ENSURING SNAKE_CASE KEYS CHECK
            const insertPayload = {
                title: formData.title,
                category: formData.category,
                platform: formData.platform || null,
                summary: formData.summary,
                content: formData.content,
                source_name: formData.sourceName, // snake_case
                source_url: formData.sourceUrl || null, // snake_case
                author_name: formData.authorName, // snake_case
                image_url: imageUrl,             // snake_case
                status: 'published',
            };

            console.log("Submitting payload to Supabase:", insertPayload);

            // 4. Perform Supabase Insert
            const { data, error: insertError, status, statusText } = await supabase
                .from('news_articles')
                .insert([insertPayload])
                .select();

            console.log("Supabase Insert Response:", { status, statusText, data, error: insertError });

            if (insertError) {
                console.error("Supabase Insert Error detected:", insertError);
                throw new Error(`Database Error: ${insertError.message} (Code: ${insertError.code})`);
            }

            console.log("Article successfully saved to database with ID:", data?.[0]?.id);

            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Reset form
            setFormData({
                title: "",
                category: "",
                platform: "",
                summary: "",
                content: "",
                sourceName: "",
                sourceUrl: "",
                authorName: "",
            });
            setImageFile(null);

        } catch (err: any) {
            console.error('CRITICAL Error submitting article:', err);
            setError(err.message || "An error occurred while submitting the article.");
        } finally {
            setLoading(false);
            console.log("Form submission process finished.");
        }
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
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Article Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Article Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                required
                                placeholder="Enter the headline of the news article"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* News Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category">News Category <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <select
                                    id="category"
                                    required
                                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a category</option>
                                    <option value="Banking Fraud">Banking Fraud</option> {/* Updated values to be human readable/consistent */}
                                    <option value="UPI Fraud">UPI Fraud</option>
                                    <option value="Cyber Advisory">Cyber Advisory</option>
                                    <option value="Policy Update">Policy Update</option>
                                    <option value="Emerging Scam">Emerging Scam</option>
                                    <option value="AI Fraud">AI Fraud</option>
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
                                    value={formData.platform}
                                    onChange={handleInputChange}
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
                                value={formData.summary}
                                onChange={handleInputChange}
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
                                value={formData.content}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Source Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="sourceName">Source / Organization Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="sourceName"
                                    required
                                    placeholder="e.g. RBI, Cyber Cell, News Agency"
                                    value={formData.sourceName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sourceUrl">Source URL (Optional)</Label>
                                <Input
                                    id="sourceUrl"
                                    type="url"
                                    placeholder="https://..."
                                    value={formData.sourceUrl}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Upload Featured Image (Optional)</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                                onChange={handleFileChange}
                            />
                            <p className="text-xs text-slate-500">Supported formats: JPG, PNG, WebP. Max size: 5MB.</p>
                        </div>

                        {/* Author Name */}
                        <div className="space-y-2">
                            <Label htmlFor="authorName">Author Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="authorName"
                                required
                                placeholder="Your Full Name"
                                value={formData.authorName}
                                onChange={handleInputChange}
                            />
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
                            <Button
                                type="submit"
                                className="w-full md:w-auto bg-blue-900 hover:bg-blue-800 text-white px-8"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Article for Review"
                                )}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
