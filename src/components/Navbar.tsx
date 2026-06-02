"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Globe } from 'lucide-react';
import { t, Language } from '../data';

export default function Navbar() {
  const [lang, setLang] = useState<Language>('en'); 
  const pathname = usePathname();
  const dict = t[lang];

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'kh' : 'en'));
  };

  const navLinks = [
    { name: dict.nav_home, href: '/' },
    { name: dict.nav_universities, href: '/universities' },
    { name: dict.nav_about, href: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="p-2 bg-brand-blue text-brand-gold rounded-lg shadow-sm">
            <GraduationCap size={24} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">{dict.logo}</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isReallyActive = pathname === link.href;

            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm transition-colors ${
                  isReallyActive 
                    ? 'font-bold text-brand-blue' 
                    : 'font-medium text-slate-600 hover:text-brand-blue'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-slate-100 text-sm font-semibold text-brand-blue transition-colors"
          >
            <Globe size={16} />
            {dict.lang_toggle}
          </button>
          <Link 
            href="/auth/signin" 
            className="hidden sm:block px-5 py-2 bg-brand-blue text-white rounded-md text-sm font-semibold hover:bg-brand-blue-hover transition-colors border border-transparent"
          >
            {dict.nav_signin}
          </Link>
        </div>
      </div>
    </nav>
  );
}
