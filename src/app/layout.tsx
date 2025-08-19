import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ClerkProvider } from '@clerk/nextjs';
import { ToastProvider } from '@/contexts/ToastContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get Clarity Finance | Your AI Shield for Safe Investing",
  description: "Analyze suspicious messages, links, and documents to protect yourself from financial fraud. Get Clarity Finance is your AI-powered guide to smarter, safer investing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body className={`${inter.className} bg-gray-50 text-gray-800`}>
              <ToastProvider />
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
          </body>
        </html>
    </ClerkProvider>
  );
}
