import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function NationalThreatGauge() {
    const threatLevel = "Elevated";
    const percentage = 65;
    const color = "text-orange-600";
    const strokeColor = "stroke-orange-600";
    const circleSize = 120;
    const strokeWidth = 10;
    const radius = (circleSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <Card className="h-full border-t-4 border-t-orange-600 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">National Cyber Threat Level</CardTitle>
                <CardDescription>Real-time analysis of reported incidents</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="relative flex items-center justify-center">
                    {/* SVG Radial Gauge */}
                    <svg width={circleSize} height={circleSize} className="-rotate-90">
                        <circle
                            cx={circleSize / 2}
                            cy={circleSize / 2}
                            r={radius}
                            fill="transparent"
                            stroke="#e2e8f0"
                            strokeWidth={strokeWidth}
                        />
                        <circle
                            cx={circleSize / 2}
                            cy={circleSize / 2}
                            r={radius}
                            fill="transparent"
                            className={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className={`text-xl font-bold ${color}`}>{threatLevel}</span>
                    </div>
                </div>

                <div className="mt-6 flex items-center text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
                    <Clock className="w-3 h-3 mr-2" />
                    Last updated: Today, 10:42 AM
                </div>
            </CardContent>
        </Card>
    );
}
