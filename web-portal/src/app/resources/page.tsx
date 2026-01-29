import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ShieldAlert,
    Smartphone,
    Mail,
    UserX,
    ShoppingBag,
    AlertTriangle,
    PhoneCall,
    HelpCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Page Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Cyber Safety Resources</h1>
                    <p className="text-slate-600 max-w-2xl">
                        Reliable information to help you identify online threats, prevent fraud, and respond quickly if you are targeted.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-12">

                {/* B. Common Types of Cyber Fraud */}
                <section>
                    <div className="flex items-center space-x-3 mb-6">
                        <ShieldAlert className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-slate-800">Common Types of Cyber Fraud</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Type 1 */}
                        <Card className="border-slate-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Smartphone className="w-5 h-5 text-blue-700" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-slate-900">UPI Payment Fraud</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Fraudsters request money via UPI links or QR codes, often claiming to be sending a payment. Remember: You never need to enter your PIN to receive money.
                                </p>
                                <div className="mt-4 bg-slate-50 p-3 rounded text-xs text-slate-500 italic border border-slate-100">
                                    "Scan this code to receive your ₹2,000 refund."
                                </div>
                            </CardContent>
                        </Card>

                        {/* Type 2 */}
                        <Card className="border-slate-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Mail className="w-5 h-5 text-indigo-700" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-slate-900">Phishing</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Fake emails or messages pretending to be from banks, tax departments, or popular services, asking you to click a link and verify your account details.
                                </p>
                                <div className="mt-4 bg-slate-50 p-3 rounded text-xs text-slate-500 italic border border-slate-100">
                                    "Your account will be blocked today. Click here to update PAN."
                                </div>
                            </CardContent>
                        </Card>

                        {/* Type 3 */}
                        <Card className="border-slate-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <UserX className="w-5 h-5 text-amber-700" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-slate-900">Fake KYC Updates</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Scammers call or text claiming your KYC is pending and service will be disconnected. They may ask you to download a screen-sharing app like AnyDesk.
                                </p>
                                <div className="mt-4 bg-slate-50 p-3 rounded text-xs text-slate-500 italic border border-slate-100">
                                    "Download QuickSupport to complete your KYC verification now."
                                </div>
                            </CardContent>
                        </Card>

                        {/* Type 4 */}
                        <Card className="border-slate-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <ShoppingBag className="w-5 h-5 text-emerald-700" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-slate-900">Marketplace Fraud</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Sellers asking for advance payments for goods that don't exist, or buyers claiming to have paid extra and asking for a refund via QR code.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Type 5 */}
                        <Card className="border-slate-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <AlertTriangle className="w-5 h-5 text-red-700" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-slate-900">Sextortion / Video Call</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Victims receive a video call from an unknown number where a nude video plays. The call is recorded and used to blackmail the victim for money.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Type 6 */}
                        <div className="flex flex-col justify-center items-center p-6 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl text-center">
                            <p className="text-slate-500 font-medium mb-4">Have you encountered a new type of scam?</p>
                            <Button variant="outline" className="bg-white" asChild>
                                <Link href="/report">Report It Now</Link>
                            </Button>
                        </div>
                    </div>
                </section>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* C. How to Identify a Scam */}
                    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <HelpCircle className="w-6 h-6 text-purple-600" />
                            <h2 className="text-2xl font-bold text-slate-800">How to Spot a Scam</h2>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-purple-600 bg-purple-50 rounded-full mr-4">1</span>
                                <div>
                                    <h4 className="font-bold text-slate-900">Urgency and Panic</h4>
                                    <p className="text-sm text-slate-600 mt-1">Scammers create a false sense of urgency (e.g., "Your electricity will be cut tonight") to make you act without thinking.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-purple-600 bg-purple-50 rounded-full mr-4">2</span>
                                <div>
                                    <h4 className="font-bold text-slate-900">Unsolicited Contact</h4>
                                    <p className="text-sm text-slate-600 mt-1">Be suspicious of unexpected calls, messages, or emails asking for personal information or money, even if they look official.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-purple-600 bg-purple-50 rounded-full mr-4">3</span>
                                <div>
                                    <h4 className="font-bold text-slate-900">Requests for PIN or OTP</h4>
                                    <p className="text-sm text-slate-600 mt-1">No bank or government official will EVER ask for your PIN, Password, or OTP over the phone.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-purple-600 bg-purple-50 rounded-full mr-4">4</span>
                                <div>
                                    <h4 className="font-bold text-slate-900">Suspicious Links</h4>
                                    <p className="text-sm text-slate-600 mt-1">Check URLs carefully. Official websites usually end in .gov.in or .nic.in. Avoid bit.ly or strange domains.</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* D. What to Do If Scammed */}
                    <section className="bg-red-50 rounded-xl shadow-sm border border-red-100 p-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                            <h2 className="text-2xl font-bold text-red-800">What to Do If Targeted</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm flex items-start">
                                <div className="mr-4 mt-1 bg-red-100 p-2 rounded-full text-red-600">
                                    <UserX className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">1. Disconnect Immediately</h4>
                                    <p className="text-sm text-slate-600 mt-1">Hang up the call. Do not reply to messages. Do not click verify.</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm flex items-start">
                                <div className="mr-4 mt-1 bg-red-100 p-2 rounded-full text-red-600">
                                    <PhoneCall className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">2. Call 1930</h4>
                                    <p className="text-sm text-slate-600 mt-1">Dial the National Cyber Fraud Helpline (1930) immediately to report financial fraud.</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg border border-red-100 shadow-sm flex items-start">
                                <div className="mr-4 mt-1 bg-red-100 p-2 rounded-full text-red-600">
                                    <ShieldAlert className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">3. Report on CyberSentry</h4>
                                    <p className="text-sm text-slate-600 mt-1">Submit a report here to alert the community and authorities.</p>
                                    <Link href="/report" className="text-sm font-bold text-red-600 hover:underline mt-1 inline-block">Report now &rarr;</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* E. Official Help */}
                <section className="bg-blue-900 rounded-xl text-white p-8 md:p-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Official Help & Support</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
                        For immediate assistance with financial cyber fraud, contact the national helpline managed by the Indian Cyber Crime Coordination Centre (I4C).
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 w-full max-w-sm hover:bg-white/20 transition-colors">
                            <p className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-2">National Helpline</p>
                            <p className="text-4xl font-bold">1930</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 w-full max-w-sm hover:bg-white/20 transition-colors">
                            <p className="text-sm uppercase tracking-wider font-semibold text-blue-300 mb-2">Government Portal</p>
                            <p className="text-2xl font-bold">cybercrime.gov.in</p>
                        </div>
                    </div>

                    <p className="mt-8 text-xs text-blue-300 opacity-80">
                        Disclaimer: CyberSentry is an awareness and community reporting initiative. It operates in support of, but distinct from, official law enforcement channels.
                    </p>
                </section>

            </div>
        </div>
    );
}
