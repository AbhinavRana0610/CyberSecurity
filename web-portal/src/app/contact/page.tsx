"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error("All fields are required.");
            }

            const { error: supabaseError } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                    }
                ]);

            if (supabaseError) throw supabaseError;

            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
        } catch (err: unknown) {
            console.error(err);
            let errorMessage = "Something went wrong. Please try again.";
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === "object" && err !== null && "message" in err) {
                // Handle Supabase error object structure if it's not an Error instance sometimes
                errorMessage = (err as { message: string }).message;
            }
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto py-12 px-4 max-w-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact CyberSentry</h1>
                <p className="text-slate-600">Reach out to report issues, share feedback, or request assistance.</p>
            </div>

            <Card className="shadow-lg border-slate-200">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-xl text-blue-900">Send us a Message</CardTitle>
                    <CardDescription>Fill out the form below and we will get back to you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {success && (
                            <Alert className="bg-green-50 text-green-800 border-green-200">
                                <CheckCircle className="h-4 w-4" />
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>
                                    Thank you for contacting CyberSentry. We will get back to you shortly.
                                </AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="bg-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="bg-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="How can we help you?"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                className="bg-white resize-none"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium py-2.5" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                "Send Message"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Optional: Additional contact info below the form */}
            <div className="mt-8 text-center text-sm text-slate-500">
                <p>Alternatively, you can call our helpline at <span className="font-bold text-slate-700">1930</span></p>
                <p className="mt-1">For immediate cyber fraud reporting, please use the <a href="/report" className="text-blue-700 hover:underline">Report Fraud</a> page.</p>
            </div>
        </div>
    );
}
