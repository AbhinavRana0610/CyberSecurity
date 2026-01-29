import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
    CheckCircle2,
    Clock,
    AlertTriangle
} from "lucide-react";
import Link from "next/link";

export default function CasesPage() {
    const cases = [
        {
            id: "CASE-2024-8892",
            title: "Fake 'Electricity Bill' Disconnection SMS",
            category: "Smishing",
            platform: "SMS / WhatsApp",
            platformIcon: MessageCircle,
            status: "Action Taken",
            statusColor: "bg-emerald-600",
            reportedTime: "2 hours ago",
            views: 1240,
            icon: Smartphone
        },
        {
            id: "CASE-2024-8891",
            title: "Suspicious UPI Payment Request for 'Customs Duty'",
            category: "Financial Fraud",
            platform: "UPI / PhonePe",
            platformIcon: CreditCard,
            status: "Verifying",
            statusColor: "bg-blue-600",
            reportedTime: "3 hours ago",
            views: 856,
            icon: ShieldAlert
        },
        {
            id: "CASE-2024-8890",
            title: "Impersonation of Police Officer - Video Call",
            category: "Identity Theft",
            platform: "WhatsApp Video",
            platformIcon: Smartphone,
            status: "Authority Notified",
            statusColor: "bg-purple-600",
            reportedTime: "5 hours ago",
            views: 3421,
            icon: Users
        },
        {
            id: "CASE-2024-8889",
            title: "Fake Investment App 'GrowRapid-X'",
            category: "Investment Fraud",
            platform: "Mobile App / APK",
            platformIcon: Smartphone,
            status: "Under Review",
            statusColor: "bg-amber-600",
            reportedTime: "12 hours ago",
            views: 567,
            icon: AlertTriangle
        },
        {
            id: "CASE-2024-8888",
            title: "Job Offer - 'Like YouTube Videos to Earn'",
            category: "Job Fraud",
            platform: "Telegram",
            platformIcon: MessageCircle,
            status: "Blocked",
            statusColor: "bg-red-600",
            reportedTime: "1 day ago",
            views: 8900,
            icon: Globe
        },
        {
            id: "CASE-2024-8887",
            title: "Phishing Link simulating Income Tax Portal",
            category: "Phishing",
            platform: "Email / Website",
            platformIcon: Globe,
            status: "Action Taken",
            statusColor: "bg-emerald-600",
            reportedTime: "1 day ago",
            views: 450,
            icon: ShieldAlert
        }
    ];

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

                {/* Case Listings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cases.map((item) => (
                        <Link href={`/case/${item.id}`} key={item.id} className="group block h-full">
                            <Card className="h-full border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group-hover:border-blue-300">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge className={`${item.statusColor} hover:${item.statusColor} rounded px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold`}>
                                            {item.status}
                                        </Badge>
                                        <span className="flex items-center text-xs text-slate-500 font-medium">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {item.reportedTime}
                                        </span>
                                    </div>
                                    <CardTitle className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex items-center text-sm text-slate-600 mb-4 bg-slate-50 p-2 rounded border border-slate-100">
                                        <item.platformIcon className="w-4 h-4 mr-2 text-slate-500" />
                                        {item.platform}
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                                        <div className="flex items-center">
                                            <item.icon className="w-3 h-3 mr-1.5 text-slate-400" />
                                            <span className="font-medium text-slate-600">{item.category}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-3 h-3 mr-1.5 text-slate-400" />
                                            {item.views.toLocaleString()} views
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                        <Button variant="outline" disabled className="text-slate-400">Previous</Button>
                        <Button variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">1</Button>
                        <Button variant="outline">2</Button>
                        <Button variant="outline">3</Button>
                        <span className="self-center px-2 text-slate-400">...</span>
                        <Button variant="outline">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
