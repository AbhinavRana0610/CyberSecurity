import { Button } from "@/components/ui/button";
import { UploadCloud, FileWarning, PhoneForwarded } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WhistleblowerSection() {
    return (
        <section className="py-8 my-8">
            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 md:p-12 text-white">
                        <h2 className="text-3xl font-bold mb-4">See Something? Report It.</h2>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Your report helps protect millions of Indians. If you encounter a suspicious website,
                            receive a fraudulent call, or spot a phishing message, report it anonymously.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start">
                                <div className="bg-slate-800 p-2 rounded mr-4">
                                    <UploadCloud className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">Upload Evidence</h4>
                                    <p className="text-xs text-slate-400">Securely upload screenshots or files.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-slate-800 p-2 rounded mr-4">
                                    <PhoneForwarded className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">Submit Identifiers</h4>
                                    <p className="text-xs text-slate-400">Report phone numbers, UPI IDs, and URLs.</p>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8">
                            Report Cyber Fraud Now
                        </Button>
                    </div>

                    <div className="bg-slate-800 p-8 flex items-center justify-center relative">
                        {/* Decorative pattern or illustration placeholder */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

                        <Card className="max-w-xs w-full bg-white text-slate-900 relative z-10 shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0">
                            <CardContent className="p-6">
                                <div className="flex items-center mb-4 text-red-600">
                                    <FileWarning className="w-8 h-8 mr-3" />
                                    <span className="font-bold text-lg">Report Preview</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                                    <div className="h-2 bg-slate-200 rounded w-full"></div>
                                    <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                                    <span>Anonymous Submission</span>
                                    <span className="text-green-600 font-bold">Encrypted</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
