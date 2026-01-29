import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t-4 border-blue-900">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Column 1: Identity */}
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-xl font-bold text-white mb-4">CyberSentry India</h2>
                    <p className="text-sm leading-relaxed mb-6 max-w-md">
                        This is the official portal for cyber fraud awareness and prevention in India.
                        Dedicated to empowering citizens with knowledge and tools to stay safe in the digital world.
                    </p>
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} CyberSentry India. All rights reserved.
                        Content owned by the portal administration.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-white underline decoration-slate-600 hover:decoration-white underline-offset-4">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-white underline decoration-slate-600 hover:decoration-white underline-offset-4">Terms of Use</Link></li>
                        <li><Link href="#" className="hover:text-white underline decoration-slate-600 hover:decoration-white underline-offset-4">Accessibility Statement</Link></li>
                        <li><Link href="#" className="hover:text-white underline decoration-slate-600 hover:decoration-white underline-offset-4">Sitemap</Link></li>
                    </ul>
                </div>

                {/* Column 3: Contact & Helplines */}
                <div>
                    <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Emergency Helplines</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs text-slate-400">National Cyber Crime Helpline</p>
                            <p className="text-2xl font-bold text-yellow-400">1930</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400">Official Reporting Portal</p>
                            <Link href="https://cybercrime.gov.in" target="_blank" className="text-lg font-semibold text-white hover:underline">
                                cybercrime.gov.in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center">
                <p className="text-xs text-slate-500">
                    An accessibility-first initiative for public safety.
                </p>
            </div>
        </footer>
    );
}
