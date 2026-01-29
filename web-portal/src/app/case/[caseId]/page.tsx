import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Shield,
    Globe,
    Smartphone,
    MessageCircle,
    AlertTriangle,
    Eye,
    CheckCircle2,
    Circle,
    Clock,
    FileText,
    Share2,
    Building2,
    Lock
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SharePanel } from "@/components/case/SharePanel";

// Type definitions for our mock data
type CaseStatus = 'received' | 'verifying' | 'notified' | 'action_taken' | 'closed';

interface TimelineEvent {
    id: string;
    date: string;
    time: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'pending';
    icon?: 'check' | 'clock' | 'alert';
}

interface CaseDetails {
    id: string;
    category: string;
    platform: string;
    identifier: string; // Masked URL/Phone
    summary: string;
    status: CaseStatus;
    reportedDate: string;
    views: number;
    timeline: TimelineEvent[];
}

// Mock data function
async function getCaseDetails(id: string): Promise<CaseDetails | null> {
    // Simulator delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Handle freshly submitted cases (Demo Logic)
    if (id.startsWith("CS-IND-")) {
        const today = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return {
            id: id,
            category: "Pending Classification",
            platform: "Reported Platform",
            identifier: "Pending Verification",
            summary: "This report has just been submitted by a citizen and is currently queued for initial verification by the CyberSentry automated system.",
            status: "received",
            reportedDate: today,
            views: 1,
            timeline: [
                {
                    id: "1",
                    date: today,
                    time: time,
                    title: "Citizen Report Received",
                    description: "Report submitted via CyberSentry portal. Case ID generated and queued for verification.",
                    status: "completed",
                    icon: "check"
                },
                {
                    id: "2",
                    date: today,
                    time: "Pending",
                    title: "Automated Verification",
                    description: "System will scan provided identifiers against known threat databases.",
                    status: "current",
                    icon: "clock"
                },
                {
                    id: "3",
                    date: "---",
                    time: "---",
                    title: "Authority Notified",
                    description: "Case details will be forwarded to CERT-In upon verification.",
                    status: "pending",
                    icon: "clock"
                }
            ]
        };
    }

    // Default happy path case
    return {
        id: id,
        category: "Financial Fraud",
        platform: "UPI / WhatsApp",
        identifier: "+91 98*** *****",
        summary: "Victim received a WhatsApp message claiming to be from an electricity board threatening disconnection. Asked to download an APK and pay ₹10 via UPI. Amount deducted was ₹25,000.",
        status: "action_taken",
        reportedDate: "2024-03-15",
        views: 1245,
        timeline: [
            {
                id: "1",
                date: "2024-03-15",
                time: "10:30 AM",
                title: "Citizen Report Received",
                description: "Anonymous report submitted via CyberSentry portal. Case ID generated.",
                status: "completed",
                icon: "check"
            },
            {
                id: "2",
                date: "2024-03-15",
                time: "10:45 AM",
                title: "Automated Verification",
                description: "System scanned the provided phone number and APK link. Flagged as 'High Risk' based on previous reports.",
                status: "completed",
                icon: "check"
            },
            {
                id: "3",
                date: "2024-03-15",
                time: "11:15 AM",
                title: "Authority Notified",
                description: "Case details forwarded to CERT-In and local cyber cell for immediate review.",
                status: "completed",
                icon: "check"
            },
            {
                id: "4",
                date: "2024-03-16",
                time: "09:00 AM",
                title: "Action Taken: Number Blocked",
                description: "The reported mobile number has been flagged for suspension by the telecom operator.",
                status: "completed",
                icon: "check"
            },
            {
                id: "5",
                date: "2024-03-16",
                time: "09:30 AM",
                title: "Public Advisory Issued",
                description: "This case has been added to the public threat awareness feed to warn other citizens.",
                status: "current",
                icon: "clock"
            }
        ]
    };
}

export default async function CaseDetailsPage({ params }: { params: Promise<{ caseId: string }> }) {
    const { caseId } = await params;
    const caseData = await getCaseDetails(caseId);

    if (!caseData) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Header Breadcrumb area */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-slate-600 hover:text-blue-700 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT PANEL: Case Information */}
                    <div className="w-full lg:w-1/3 space-y-6">
                        <Card className="border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-slate-100 p-6 border-b border-slate-200">
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="p-2 bg-white rounded-md border border-slate-200 shadow-sm">
                                        {caseData.category.includes("Web") ? (
                                            <Globe className="w-6 h-6 text-blue-600" />
                                        ) : (
                                            <Smartphone className="w-6 h-6 text-blue-600" />
                                        )}
                                    </span>
                                    <div>
                                        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Case ID</h2>
                                        <p className="text-xl font-bold font-mono text-slate-900">{caseData.id}</p>
                                    </div>
                                </div>
                            </div>

                            <CardContent className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 mb-1">Suspected Category</h3>
                                    <div className="flex items-center text-slate-900 font-medium">
                                        <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
                                        {caseData.category}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 mb-1">Platform Involved</h3>
                                    <div className="flex items-center text-slate-900 font-medium">
                                        <MessageCircle className="w-4 h-4 mr-2 text-green-600" />
                                        {caseData.platform}
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 mb-1">Suspected Identifier</h3>
                                    <code className="block bg-slate-100 p-3 rounded text-sm font-mono text-slate-800 break-all border border-slate-200">
                                        {caseData.identifier}
                                    </code>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 mb-2">Citizen Summary</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                        "{caseData.summary}"
                                    </p>
                                </div>

                                <Separator />

                                <SharePanel caseId={caseData.id} />
                            </CardContent>
                        </Card>

                        <Card className="bg-blue-900 text-white border-blue-800">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-3">
                                    <Shield className="w-5 h-5 mt-1 text-blue-300 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-blue-50 mb-1">Official Disclaimer</h3>
                                        <p className="text-xs text-blue-200 leading-relaxed">
                                            This record is public for awareness purposes. The status reflects automated processing and initial authority review. It does not constitute a final judicial verdict.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT PANEL: Status & Timeline */}
                    <div className="w-full lg:w-2/3 space-y-6">

                        {/* Top Status Row */}
                        <Card className="border-slate-200 shadow-sm p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-slate-500 uppercase mb-1">Source</span>
                                    <div className="flex items-center font-medium text-slate-900">
                                        <FileText className="w-4 h-4 mr-2 text-slate-400" />
                                        Citizen Report
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-slate-500 uppercase mb-1">Current Status</span>
                                    <Badge className="w-fit bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200 px-3 py-1">
                                        <CheckCircle2 className="w-3 h-3 mr-1.5" />
                                        Action Taken
                                    </Badge>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-slate-500 uppercase mb-1">Public Interest</span>
                                    <div className="flex items-center text-sm font-medium text-slate-600">
                                        <Eye className="w-4 h-4 mr-2 text-blue-500" />
                                        {caseData.views.toLocaleString()} users flagged/viewed
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Timeline Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-slate-900 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-slate-500" />
                                Processing Timeline
                            </h2>

                            <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-4">
                                {caseData.timeline.map((event, index) => (
                                    <div key={event.id} className="relative pl-8">
                                        {/* Timeline Dot */}
                                        <div
                                            className={`
                        absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
                        ${event.status === 'completed' ? 'bg-blue-600 border-blue-600' :
                                                    event.status === 'current' ? 'bg-slate-50 border-blue-600 animate-pulse' :
                                                        'bg-slate-200 border-slate-300'}
                      `}
                                        />

                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                            <h3 className={`font-bold text-lg ${event.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>
                                                {event.title}
                                            </h3>
                                            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded self-start">
                                                {event.date} • {event.time}
                                            </span>
                                        </div>

                                        <p className={`text-sm leading-relaxed max-w-2xl ${event.status === 'pending' ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {event.description}
                                        </p>

                                        {event.title.includes("Authority") && (
                                            <Badge variant="outline" className="mt-3 text-xs border-blue-200 bg-blue-50 text-blue-800">
                                                <Building2 className="w-3 h-3 mr-1" /> Verified by CyberSentry
                                            </Badge>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* End of timeline indicator */}
                            <div className="relative pl-8 pt-4">
                                <div className="absolute -left-[5px] top-6 w-2 h-2 rounded-full bg-slate-300" />
                                <p className="text-sm text-slate-400 italic">
                                    Case remains open for further community monitoring.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    );
}
