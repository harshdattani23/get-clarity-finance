import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ClerkProvider } from '@clerk/nextjs';
import { ToastProvider } from '@/contexts/ToastContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ChatProvider from '@/components/ChatProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get Clarity Finance | Your AI Shield for Safe Investing",
  description: "Analyze suspicious messages, links, and documents to protect yourself from financial fraud. Get Clarity Finance is your AI-powered guide to smarter, safer investing.",
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-32x32.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-16x16.svg',
        sizes: '16x16',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#10b981',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <LanguageProvider>
        <html lang="en">
          <body className={`${inter.className} bg-gray-50 text-gray-800`}>
              <ToastProvider />
              <ChatProvider>
                <Navbar />
                <main className="min-h-screen">
                  {children}
                </main>
                <Footer />
              </ChatProvider>
          </body>
        </html>
      </LanguageProvider>
    </ClerkProvider>
  );
}
