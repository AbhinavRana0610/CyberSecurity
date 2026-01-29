import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white">
      {/* Top Bar for Accessibility and Language */}
      <div className="bg-slate-900 text-white py-1 px-4 text-xs font-medium">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="#main-content" className="hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-yellow-400">
              Skip to Main Content
            </a>
            <span role="separator" aria-hidden="true">|</span>
            <a href="#" className="hover:underline">Screen Reader Access</a>
          </div>
          <div className="flex space-x-3">
            <button className="hover:underline font-bold">English</button>
            <span aria-hidden="true">|</span>
            <button className="hover:underline">हिन्दी</button>
          </div>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="container mx-auto py-4 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          {/* Emblem Placeholder - Government Emblem usually */}
          <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-xs font-bold border-2 border-slate-300">
            EMBLEM
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              CyberSentry India
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              National Cyber Fraud Awareness Portal
            </p>
          </div>
        </div>

        {/* Right side - Emergency or Helplines (optional in header, but user put it in footer) */}
        <div className="hidden md:block text-right">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cyber Fraud Helpline</p>
          <p className="text-xl font-bold text-blue-900">1930</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap text-sm font-medium text-slate-800">
            <li>
              <Link href="/" className="block py-3 px-4 hover:bg-slate-200 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-900 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/cases" className="block py-3 px-4 hover:bg-slate-200 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-900 transition-colors">
                Public Cases
              </Link>
            </li>
            <li>
              <Link href="/report" className="block py-3 px-4 hover:bg-slate-200 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-900 transition-colors">
                Report Fraud
              </Link>
            </li>
            <li>
              <Link href="/check" className="block py-3 px-4 hover:bg-slate-200 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-900 transition-colors">
                Fraud Check
              </Link>
            </li>
            <li>
              <Link href="/statistics" className="block py-3 px-4 hover:bg-slate-200 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-900 transition-colors">
                Statistics
              </Link>
            </li>
            <li>
              <Link href="/resources" className="block py-3 px-4 hover:bg-slate-200 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-900 transition-colors">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/publish-news" className="block py-3 px-4 hover:bg-slate-200 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-900 transition-colors">
                Publish News Article
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-3 px-4 hover:bg-slate-200 hover:text-blue-900 border-b-2 border-transparent hover:border-blue-900 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
