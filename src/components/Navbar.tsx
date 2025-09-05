"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Globe, ChevronDown } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { useTranslation } from '@/hooks/useTranslation';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import ClientOnly from './ClientOnly';

const Navbar = () => {
  const { t } = useTranslation('navbar');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageContext = useContext(LanguageContext);
  const currentLanguage = languageContext?.language || 'en';
  
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
  ];
  
  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.nativeName : 'English';
  };
  
  const handleLanguageChange = (langCode: string) => {
    if (languageContext?.setLanguage) {
      languageContext.setLanguage(langCode);
    }
    setIsLanguageMenuOpen(false);
  };

  const navLinks = [
    { href: '/investment-security-course', key: 'learningCourses', icon: 'book' },
    { href: '/bonds-course', key: 'bondsCourse', icon: 'dollar-sign' },
    { href: '/virtual-trading', key: 'virtualTrading', icon: 'trending' },
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
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isLanguageMenuOpen && !target.closest('.language-dropdown')) {
        setIsLanguageMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageMenuOpen]);

  return (
    <header className="bg-[#163300] sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-22 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/favicon.svg" 
              alt="Get Clarity Finance Logo" 
              width={32} 
              height={32} 
              className="w-8 h-8"
            />
            <span className="font-['Inter_Tight',_sans-serif] text-2xl sm:text-3xl font-semibold text-white tracking-tight whitespace-nowrap">
              {t('title') as string}
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
                  {t(link.key) as string}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative language-dropdown">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors border border-white/30 hover:border-white/50 min-w-[120px] lg:min-w-[140px]"
                  title="Change Language / भाषा बदलें"
                >
                  <Globe size={16} className="flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-white/60 leading-3">Language</span>
                    <span className="text-sm font-medium leading-4">{getCurrentLanguageName()}</span>
                  </div>
                  <ChevronDown size={14} className="opacity-60 flex-shrink-0 ml-auto" />
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          currentLanguage === lang.code
                            ? 'bg-green-50 text-green-700 font-medium'
                            : 'text-gray-700'
                        }`}
                      >
                        <span className="block">{lang.nativeName}</span>
                        <span className="block text-xs text-gray-500">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <ClientOnly>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 rounded-full text-sm font-semibold text-white border border-neutral-200 hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    {t('signIn') as string}
                  </Link>
                </SignedOut>
              </ClientOnly>
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
                  {t(link.key) as string}
                </Link>
              ))}
            </nav>
            <div className="border-t border-white/10 mt-4 pt-4 flex flex-col items-start gap-4">
              {/* Language Selector for Mobile */}
              <div className="w-full">
                <div className="flex items-center gap-2 px-3 py-2 text-white/80">
                  <Globe size={18} />
                  <span className="text-sm font-medium">Language</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-white/20 text-white font-medium'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="block">{lang.nativeName}</span>
                      <span className="block text-xs text-white/60">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <ClientOnly>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <Link
                    href="/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                  >
                    {t('signIn') as string}
                  </Link>
                </SignedOut>
              </ClientOnly>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
