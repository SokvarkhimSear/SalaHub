"use client";

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { t, Language } from '../data';

export default function Home() {
  const [lang] = useState<Language>('en');
  const dict = t[lang];

  return (
    <div className="min-h-screen bg-[#F6F8FD] font-sans selection:bg-brand-blue selection:text-white pb-24">
      {/* Background Decorative Pattern */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
      
      {/* Minimal Home Layout for Future Features */}
      <header className="pt-32 pb-16 px-4 text-center max-w-4xl mx-auto">
        <div className="w-20 h-20 bg-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-blue/20">
             <GraduationCap className="text-brand-gold h-12 w-12" />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600">SalaHub</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12">
          Your journey to finding the perfect university and major starts here. Explore our directories to plan your academic future in Cambodia.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Link href="/universities" className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold hover:bg-brand-blue-hover transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Explore Universities
           </Link>
        </div>
      </header>
    </div>
  );
}
