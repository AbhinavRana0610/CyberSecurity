import { Share2, Smartphone, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareSection() {
    return (
        <section className="bg-indigo-900 rounded-xl p-8 text-white my-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <div className="flex items-center mb-4">
                        <Share2 className="w-8 h-8 text-indigo-300 mr-3" />
                        <h2 className="text-2xl font-bold">Share to Protect</h2>
                    </div>
                    <p className="text-indigo-100 mb-6 text-lg">
                        Instantly generate a verifiable warning card to share with family and friends on WhatsApp or Telegram.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="secondary" className="bg-white text-indigo-900 hover:bg-indigo-50 font-semibold">
                            <Smartphone className="w-4 h-4 mr-2" />
                            Share on WhatsApp
                        </Button>
                        <Button variant="outline" className="border-indigo-300 text-indigo-100 hover:bg-indigo-800 hover:text-white">
                            Share on Telegram
                        </Button>
                    </div>
                    <p className="mt-4 text-xs text-indigo-300">
                        Available in English, Hindi, Tamil, Telugu, and 8 regional languages.
                    </p>
                </div>

                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full text-slate-900 transform rotate-1">
                        <div className="border-2 border-red-500 rounded p-3 mb-3 bg-red-50">
                            <div className="flex items-center text-red-700 font-bold mb-2">
                                <div className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 text-xs">!</div>
                                FRAUD ALERT
                            </div>
                            <p className="text-xs font-semibold">New Electric Bill Scam</p>
                            <p className="text-[10px] text-slate-600 mt-1">Do not click links asking for bill payment via SMS.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-[10px] text-slate-500">
                                Scanned by CyberSentry<br />
                                ID: #9823-A
                            </div>
                            <QrCode className="w-12 h-12 text-slate-900" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
