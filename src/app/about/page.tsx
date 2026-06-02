"use client";

import { Info } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FD] flex flex-col items-center justify-center p-4">
      {/* Background Decorative Pattern */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
      
      <div className="bg-white p-12 rounded-3xl shadow-lg text-center max-w-3xl w-full border border-slate-200">
        <div className="w-20 h-20 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
          <Info className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 drop-shadow-sm">
          About SalaHub
        </h1>
        <div className="space-y-6 text-lg text-slate-600 mb-10 leading-relaxed text-left">
          <p>
            SalaHub is dedicated to empowering Cambodian high school students by bridging the information gap between secondary education and university life.
          </p>
          <p>
            Our ultimate goal is to provide a comprehensive, transparent directory of local university fees, majors, and community resources to help students make informed decisions about their academic future.
          </p>
        </div>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          Explore Universities
        </Link>
      </div>
    </div>
  );
}
