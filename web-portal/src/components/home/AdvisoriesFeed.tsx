import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldCheck, ShieldAlert, Users, ExternalLink } from "lucide-react";
import Link from "next/link";

export function AdvisoriesFeed() {
    const advisories = [
        {
            id: 1,
            type: "verified",
            title: "Create fake 'Electricity Bill' SMS Circulation",
            category: "Smishing",
            status: "VERIFIED",
            statusColor: "bg-teal-600 hover:bg-teal-700",
            icon: ShieldCheck,
            timestamp: "2 hours ago",
            source: "CERT-In",
            desc: "Attackers sending fake overdue electricity bill links to harvest banking credentials."
        },
        {
            id: 2,
            type: "community",
            title: "Suspicious WhatsApp Job Offers - +92 prefix",
            category: "Job Fraud",
            status: "PENDING VALIDATION",
            statusColor: "bg-blue-500 hover:bg-blue-600",
            icon: Users,
            timestamp: "45 mins ago",
            source: "Citizen Report",
            desc: "Reports of messages offering 'Work from home' jobs requiring initial deposit."
        },
        {
            id: 3,
            type: "verified",
            title: "Fake Income Tax Refund Emails",
            category: "Phishing",
            status: "VERIFIED",
            statusColor: "bg-teal-600 hover:bg-teal-700",
            icon: ShieldCheck,
            timestamp: "5 hours ago",
            source: "CyberCell",
            desc: "Malicious emails claiming refund approval asking for sensitive data."
        },
        {
            id: 4,
            type: "community",
            title: "New deepfake video call fraud pattern",
            category: "AI Fraud",
            status: "UNVERIFIED",
            statusColor: "bg-yellow-500 hover:bg-yellow-600 text-slate-900",
            icon: ShieldAlert,
            timestamp: "12 mins ago",
            source: "Citizen Report",
            desc: "User reports video call with face-swapped relative asking for emergency funds."
        }
    ];

    return (
        <section className="py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Live Advisories & Community Reports</h2>
                <Link href="#" className="text-blue-700 font-semibold text-sm hover:underline flex items-center">
                    View All Archives <ExternalLink className="w-4 h-4 ml-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {advisories.map((advisory) => (
                    <Link href={`/case/${advisory.id}`} key={advisory.id} className="block h-full">
                        <Card className="flex flex-col border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
                            <CardHeader className="pb-3 px-4 pt-4">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge className={`${advisory.statusColor} rounded-sm px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold`}>
                                        {advisory.status}
                                    </Badge>
                                    <span className="text-[10px] text-slate-400 font-mono">{advisory.timestamp}</span>
                                </div>
                                <CardTitle className="text-sm font-bold text-slate-800 leading-snug">
                                    {advisory.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 flex-grow">
                                <p className="text-xs text-slate-600 line-clamp-3 mb-3">
                                    {advisory.desc}
                                </p>
                                <div className="flex items-center text-xs text-slate-500 font-medium">
                                    <advisory.icon className="w-3 h-3 mr-1.5" />
                                    {advisory.source} • {advisory.category}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    );
}
