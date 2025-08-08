"use client";
import Link from 'next/link';
import { ShieldCheck, Menu } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import LanguageSelector from './i18n/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { t } = useTranslation('navbar');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/investment-quiz', key: 'investorAssessment' },
    { href: '/fraud-protection', key: 'fraudProtection' },
    { href: '/stock-market-course', key: 'stockMarketCourse' },
    { href: '/virtual-trading', key: 'virtualTrading' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-[#163300] sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-22 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-white" />
            <span className="font-['Inter_Tight',_sans-serif] text-2xl sm:text-3xl font-semibold text-white tracking-tight whitespace-nowrap">
              {t('title')}
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-12">
            <nav className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`px-2.5 py-1 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white border border-neutral-200 hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  {t('signIn')}
                </Link>
              </SignedOut>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#163300] border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-base font-medium transition-colors whitespace-nowrap ${
                    pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>
            <div className="border-t border-white/10 mt-4 pt-4 flex flex-col items-start gap-4">
              <LanguageSelector />
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  {t('signIn')}
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
