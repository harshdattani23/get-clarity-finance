"use client";
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import LanguageSelector from './i18n/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

const Navbar = () => {
  const { t } = useTranslation('navbar');
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <ShieldCheck className="w-7 h-7 text-blue-600" />
            <span>{t('title')}</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#analyzer" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('analyzer')}
            </Link>
            <Link href="/investment-quiz" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('investmentQuiz')}
            </Link>
            <Link href="/fraud-protection" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('fraudProtection')}
            </Link>
            <Link href="/stock-market-course" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('stockMarketCourse')}
            </Link>
          </nav>
           <div className="flex items-center gap-4">
              <LanguageSelector />
              <SignedIn>
                <UserButton afterSignOutUrl="/"/>
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in" className="text-gray-600 hover:text-blue-600 transition-colors">
                  {t('signIn')}
                </Link>
                <Link href="/sign-up" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  {t('signUp')}
                </Link>
              </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
