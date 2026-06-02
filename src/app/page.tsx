"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { t, Language } from '../data';

const features = [
  {
    title: "Explore Academic Majors",
    description: "Filter through STEM, Business, Arts, and Health Sciences to discover career paths and see which Cambodian universities offer your dream major.",
    buttonLabel: "Browse Majors",
    href: "/majors"
  },
  {
    title: "Compare University Rankings",
    description: "Analyze top-tier Cambodian campuses by tuition fees, location, facilities, and academic rankings to make an informed choice.",
    buttonLabel: "View Rankings",
    href: "/universities"
  },
  {
    title: "Connect with Mentors & Alumni",
    description: "Get real, unedited advice from senior students and alumni who have already walked the path. Ask questions about campus culture, exams, and university life.",
    buttonLabel: "Find a Mentor",
    href: "#"
  },
  {
    title: "Dive Into Real Uni Life Stories",
    description: "Read authentic blogs written by students sharing their daily experiences, dormitory tips, assignment hacks, and honest campus reviews.",
    buttonLabel: "Read Student Blogs",
    href: "#"
  }
];

export default function Home() {
  const [lang] = useState<Language>('en');
  const dict = t[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

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

      {/* Vertical Features Timeline */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Timeline Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            How SalaHub can support you
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            We're here to support you through all stages of the university journey; whether it's researching institutions, navigating admissions, or finding the right major.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Central Vertical Line (Dashed) */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-slate-300 md:-ml-px"></div>
          
          {/* Animated Fill Line */}
          <motion.div 
            className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-[4px] bg-brand-blue md:-ml-[2px] origin-top rounded-full z-0"
            style={{ scaleY: scrollYProgress }}
          ></motion.div>

          <div className="space-y-16 md:space-y-24">
            {features.map((feature, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-[39px] md:left-1/2 w-4 h-4 rounded-full border-2 border-brand-blue bg-white ring-[6px] ring-[#F6F8FD] z-10 md:-translate-x-1/2 shadow-sm"></div>

                {/* Content Card (Half Width) */}
                <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${index % 2 === 0 ? 'md:pl-20 text-left' : 'md:pr-20 text-left'}`}>
                  <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 inline-block w-full group">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-blue transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-8">
                      {feature.description}
                    </p>
                    <Link 
                      href={feature.href}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      {feature.buttonLabel}
                      <span className="text-lg leading-none font-bold">&rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Image Placeholder */}
                <div className={`hidden md:flex md:w-1/2 ${index % 2 === 0 ? 'justify-end md:pr-20' : 'justify-start md:pl-20'}`}>
                  <div className="w-full max-w-sm aspect-[4/3] bg-white border border-slate-200 rounded-3xl flex items-center justify-center overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300">
                    <span className="text-slate-400 font-bold text-xl uppercase tracking-wider">Photo {index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
