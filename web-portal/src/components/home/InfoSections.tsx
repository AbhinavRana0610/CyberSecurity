import { Newspaper, Users, Shield, CheckCircle } from "lucide-react";

export function InfoSections() {
    return (
        <div className="grid md:grid-cols-2 gap-8 py-8">
            {/* UGC & Contributions */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">Contribution Channels</h3>

                <div className="flex gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg h-fit">
                        <Users className="w-6 h-6 text-blue-700" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">Citizen Reports</h4>
                        <p className="text-sm text-slate-600 mt-1">
                            Public submissions feed directly into our national database. Your vigilant reporting helps identify new scam patterns in real-time, protecting your community.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-purple-50 p-3 rounded-lg h-fit">
                        <Shield className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">Researcher Contributions</h4>
                        <p className="text-sm text-slate-600 mt-1">
                            A dedicated portal for security researchers to submit technical analyses, scam breakdowns, and vulnerability insights. Collaborate with national defense.
                        </p>
                    </div>
                </div>
            </section>

            {/* Moderation & Trust */}
            <section className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2">Verification & Trust</h3>

                <div className="bg-slate-50 border border-slate-100 rounded-lg p-6">
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div>
                                <span className="font-semibold text-slate-800 block">Multi-Level Verification</span>
                                <span className="text-sm text-slate-600">All reports undergo a rigorous verification process before becoming official advisories.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div>
                                <span className="font-semibold text-slate-800 block">Expert Moderation</span>
                                <span className="text-sm text-slate-600">Reviewed by verified cybersecurity experts and law enforcement liaisons.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                            <div>
                                <span className="font-semibold text-slate-800 block">AI-Assisted Processing</span>
                                <span className="text-sm text-slate-600">Advanced AI models assist in deduplication, pattern recognition, and initial labeling.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
