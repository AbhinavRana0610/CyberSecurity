import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BarChart4,
    TrendingUp,
    Map,
    ShieldCheck,
    AlertOctagon,
    Users,
    PieChart
} from "lucide-react";

export default function StatisticsPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Page Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Cyber Fraud Statistics & Trends</h1>
                    <p className="text-slate-600 max-w-3xl">
                        An overview of reported cyber fraud incidents based on public data.
                        This information is intended for awareness and educational purposes to help citizens identify emerging threats.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 space-y-8">

                {/* B. Overview Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-t-4 border-t-blue-600 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <AlertOctagon className="w-6 h-6 text-blue-700" />
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reports</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900">42,891</p>
                            <p className="text-xs text-slate-500 mt-1">Since Jan 2024</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-amber-500 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-amber-100 p-2 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-amber-700" />
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Under Verification</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900">1,245</p>
                            <p className="text-xs text-slate-500 mt-1">Currently active</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-emerald-600 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-emerald-100 p-2 rounded-lg">
                                    <ShieldCheck className="w-6 h-6 text-emerald-700" />
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Action Taken</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900">38,502</p>
                            <p className="text-xs text-slate-500 mt-1">Resolved or Blocked</p>
                        </CardContent>
                    </Card>

                    <Card className="border-t-4 border-t-purple-600 shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-purple-100 p-2 rounded-lg">
                                    <Users className="w-6 h-6 text-purple-700" />
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Threat</span>
                            </div>
                            <p className="text-xl font-bold text-slate-900 truncate">UPI Payment Fraud</p>
                            <p className="text-xs text-slate-500 mt-1">34% of all reports</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* C. Fraud Type Distribution */}
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl text-slate-800">
                                <PieChart className="w-5 h-5 mr-2 text-slate-500" />
                                Reported Fraud Types
                            </CardTitle>
                            <CardDescription>Breakdown of incidents by category</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                {/* Custom Progress Bars for Visualization */}

                                {/* Item 1 */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-slate-700">UPI / Payment Fraud</span>
                                        <span className="text-slate-900">34%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '34%' }}></div>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-slate-700">Phishing Links (SMS/Email)</span>
                                        <span className="text-slate-900">22%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '22%' }}></div>
                                    </div>
                                </div>

                                {/* Item 3 */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-slate-700">Identity Theft</span>
                                        <span className="text-slate-900">18%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-400 rounded-full" style={{ width: '18%' }}></div>
                                    </div>
                                </div>

                                {/* Item 4 */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-slate-700">Job / Investment Fraud</span>
                                        <span className="text-slate-900">15%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-300 rounded-full" style={{ width: '15%' }}></div>
                                    </div>
                                </div>

                                {/* Item 5 */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="text-slate-700">Other</span>
                                        <span className="text-slate-900">11%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-300 rounded-full" style={{ width: '11%' }}></div>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>

                    {/* D. Regional Distribution */}
                    <Card className="border-slate-200 shadow-sm h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center text-xl text-slate-800">
                                <Map className="w-5 h-5 mr-2 text-slate-500" />
                                Regional Distribution
                            </CardTitle>
                            <CardDescription>Top reporting zones across India</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">Region</th>
                                            <th className="px-4 py-3 font-medium text-right">Reports</th>
                                            <th className="px-4 py-3 font-medium text-right">Activity Level</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="bg-white hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">National Capital Region (NCR)</td>
                                            <td className="px-4 py-3 text-right text-slate-600">12,450</td>
                                            <td className="px-4 py-3 text-right"><Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">High</Badge></td>
                                        </tr>
                                        <tr className="bg-white hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">Maharashtra (Mumbai/Pune)</td>
                                            <td className="px-4 py-3 text-right text-slate-600">8,920</td>
                                            <td className="px-4 py-3 text-right"><Badge variant="destructive" className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">Moderate</Badge></td>
                                        </tr>
                                        <tr className="bg-white hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">Karnataka (Bangalore)</td>
                                            <td className="px-4 py-3 text-right text-slate-600">6,105</td>
                                            <td className="px-4 py-3 text-right"><Badge variant="destructive" className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">Moderate</Badge></td>
                                        </tr>
                                        <tr className="bg-white hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">Telangana (Hyderabad)</td>
                                            <td className="px-4 py-3 text-right text-slate-600">4,300</td>
                                            <td className="px-4 py-3 text-right"><Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">Normal</Badge></td>
                                        </tr>
                                        <tr className="bg-white hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium text-slate-900">West Bengal (Kolkata)</td>
                                            <td className="px-4 py-3 text-right text-slate-600">3,110</td>
                                            <td className="px-4 py-3 text-right"><Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">Normal</Badge></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* E. Time-Based Trends */}
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center text-xl text-slate-800">
                            <BarChart4 className="w-5 h-5 mr-2 text-slate-500" />
                            Recent Reporting Trends
                        </CardTitle>
                        <CardDescription>Volume of citizen reports over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-8 items-end justify-around h-60 pb-4 border-b border-slate-100">
                            {/* Mock Bars */}
                            {/* Week 1 */}
                            <div className="flex flex-col items-center w-full group">
                                <div className="text-xs font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">1,120</div>
                                <div className="w-12 bg-blue-200 rounded-t-md hover:bg-blue-300 transition-colors h-24 relative"></div>
                                <span className="mt-3 text-xs font-medium text-slate-600">Week 1</span>
                            </div>
                            {/* Week 2 */}
                            <div className="flex flex-col items-center w-full group">
                                <div className="text-xs font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">1,340</div>
                                <div className="w-12 bg-blue-300 rounded-t-md hover:bg-blue-400 transition-colors h-32 relative"></div>
                                <span className="mt-3 text-xs font-medium text-slate-600">Week 2</span>
                            </div>
                            {/* Week 3 */}
                            <div className="flex flex-col items-center w-full group">
                                <div className="text-xs font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">1,560</div>
                                <div className="w-12 bg-blue-400 rounded-t-md hover:bg-blue-500 transition-colors h-40 relative"></div>
                                <span className="mt-3 text-xs font-medium text-slate-600">Week 3</span>
                            </div>
                            {/* Week 4 - Current */}
                            <div className="flex flex-col items-center w-full group">
                                <div className="text-xs font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">1,890</div>
                                <div className="w-12 bg-blue-600 rounded-t-md hover:bg-blue-700 transition-colors h-56 relative animate-pulse-slow"></div>
                                <span className="mt-3 text-xs font-bold text-blue-800">This Week</span>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-slate-500">
                                <span className="font-bold text-slate-900">+12% increase</span> in reports compared to previous month
                            </p>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
