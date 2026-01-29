import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AlertBanner } from "@/components/AlertBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberSentry India – National Cyber Fraud Awareness Portal",
  description: "The official national portal for cyber fraud awareness and prevention in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <Header />
        <AlertBanner />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
