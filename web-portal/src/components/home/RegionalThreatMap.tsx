"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ThreatLocation = {
    id: string;
    city: string;
    issue: string;
    top: string;  // Percentage string (e.g. "30%")
    left: string; // Percentage string (e.g. "40%")
    severity: "critical" | "high" | "elevated" | "emerging";
    colorHex: string; // Tailwind color reference for consistency
    align: "left" | "right"; // Label alignment to avoid overflow
};

// VISUAL COORDINATES (Percentage based relative to India_Map.png)
const LOCATIONS: ThreatLocation[] = [
    {
        id: "ncr",
        city: "New Delhi (NCR)",
        issue: "Phishing & Sextortion",
        top: "34%",
        left: "34.2%",
        severity: "critical",
        colorHex: "#DC2626", // red-600
        align: "right",
    },
    {
        id: "jaipur",
        city: "Jaipur",
        issue: "OLX Fraud",
        top: "39%",
        left: "30%",
        severity: "high",
        colorHex: "#EA580C", // orange-600
        align: "right",
    
    },
    {
        id: "mumbai",
        city: "Mumbai",
        issue: "Bank Inv. Fraud",
        top: "61.5%",
        left: "19%",
        severity: "elevated",
        colorHex: "#CA8A04", // yellow-600
        align: "right",
    },
    {
        id: "bengaluru",
        city: "Bengaluru",
        issue: "Tech Support Fraud",
        top: "80.5%",
        left: "35%",
        severity: "emerging",
        colorHex: "#9333EA", // purple-600
        align: "right",
    },
    {
        id: "chennai",
        city: "Chennai",
        issue: "FedEx/Courier Fraud",
        top: "81%",
        left: "44%",
        severity: "emerging",
        colorHex: "#2563EB", // blue-600
        align: "left",
    },
    {
        id: "kolkata",
        city: "Kolkata",
        issue: "Loan App Harassment",
        top: "52.5%",
        left: "70.5%",
        severity: "high",
        colorHex: "#EA580C", // orange-600
        align: "left",
    },
    {
        id: "jamtara",
        city: "Jamtara",
        issue: "KYC & OTP Fraud",
        top: "48%",
        left: "65.5%",
        severity: "critical",
        colorHex: "#DC2626", // red-600
        align: "left",
    },
];

export function RegionalThreatMap() {
    return (
        <Card className="h-full border-t-4 border-t-blue-800 shadow-sm w-full flex flex-col bg-white">
            <CardHeader className="pb-2 flex-none">
                <CardTitle className="text-lg font-bold text-slate-800 flex justify-between items-center">
                    <span>Regional Live Updates</span>
                    <Badge variant="outline" className="text-xs font-normal">Live Feed • Static Visualization</Badge>
                </CardTitle>
                <CardDescription>Real-time guided map of cyber fraud hotspots across India</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 relative overflow-hidden p-4 flex items-center justify-center bg-slate-50/50">

                {/* Map Container */}
                <div className="relative w-full max-w-[500px]">

                    {/* BASE MAP SOURCE: Static Image */}
                    <img
                        src="/India_Map.png"
                        alt="Map of India"
                        className="w-full h-auto object-contain opacity-90"
                    />

                    {/* OVERLAYS: City Markers */}
                    {LOCATIONS.map((loc) => (
                        <div
                            key={loc.id}
                            className="absolute flex items-center group cursor-default"
                            style={{
                                top: loc.top,
                                left: loc.left,
                                // Center the marker point itself on the coordinates
                                transform: 'translate(-50%, -50%)',
                                zIndex: 10
                            }}
                        >
                            {/* MARKER DOTS */}
                            <div className="relative flex items-center justify-center w-4 h-4">
                                {/* Pulse Animation */}
                                <span
                                    className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                                    style={{ backgroundColor: loc.colorHex }}
                                ></span>
                                {/* Solid Core */}
                                <span
                                    className="relative inline-flex rounded-full h-2.5 w-2.5 border border-white shadow-sm"
                                    style={{ backgroundColor: loc.colorHex }}
                                ></span>
                            </div>

                            {/* LABELS */}
                            <div
                                className={`absolute whitespace-nowrap z-20 pointer-events-none transition-all duration-300
                                    ${loc.align === 'left' ? 'right-full mr-2 text-right' : 'left-full ml-2 text-left'}
                                `}
                            >
                                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-slate-100 flex flex-col">
                                    <span className="text-[10px] font-extrabold text-slate-900 leading-none">
                                        {loc.city}
                                    </span>
                                    <span
                                        className="text-[9px] font-semibold uppercase tracking-tight leading-none mt-0.5"
                                        style={{ color: loc.colorHex }}
                                    >
                                        {loc.issue}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Legend Overlay */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur p-2.5 rounded-lg shadow-sm border border-slate-200 text-[10px] space-y-1.5 z-20">
                    <div className="font-semibold text-slate-700 pb-1 border-b border-slate-100 mb-1">Threat Intensity</div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        <span className="text-slate-600">Critical</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                        <span className="text-slate-600">High</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-600"></span>
                        <span className="text-slate-600">Elevated</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <span className="text-slate-600">Emerging</span>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
