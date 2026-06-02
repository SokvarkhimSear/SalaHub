"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin, Wallet, Send, XCircle, ArrowLeft } from 'lucide-react';
import { t, Language } from '../../data';
import { fetchUniversitiesFromDB, UniversityData } from '../../services/uniService';

const UniversityLogo = ({ uni }: { uni: UniversityData }) => {
  const [error, setError] = useState(false);
  const logoPath = `/assets/logos/${uni.id}.png`;

  if (error) {
    return (
      <div 
        className="h-16 w-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border-2 border-white/50 relative overflow-hidden group-hover:scale-105 transition-transform duration-300"
        style={{ backgroundColor: uni.primaryColor || '#0033A0' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <span className="text-white font-bold text-lg tracking-wider drop-shadow-sm relative z-10">
          {uni.id.toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="h-16 w-16 rounded-full flex-shrink-0 shadow-md border-2 border-slate-200 relative overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-white">
      <img 
        src={logoPath} 
        alt={`${uni.name_en} logo`} 
        className="w-full h-full object-cover scale-110"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function UniversitiesPortal() {
  const [lang, setLang] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUniversitiesFromDB();
        setUniversities(data);
      } catch (error) {
        console.error("Failed to load universities", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const dict = t[lang];

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = (uni.name_en?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                          (uni.location_en?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    // Check if the university has ALL of the tags selected in activeFilters
    const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter => uni.tags && uni.tags.includes(filter));

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-[#F6F8FD] font-sans selection:bg-brand-blue selection:text-white pb-24 text-slate-900">
      {/* Background Decorative Pattern */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Hero Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            University Portal
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Search, filter, and discover the best higher education institutions across Cambodia. Find the perfect fit for your academic journey.
          </p>
        </header>

        {/* Search & Filter Row */}
        <section className="mb-12">
          <div className="relative group shadow-lg shadow-slate-200/50 rounded-2xl bg-white border border-slate-200 p-2 flex flex-col md:flex-row items-center gap-2">
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border-none bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 text-lg"
                placeholder={dict.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="w-full md:w-auto bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-3 rounded-xl font-semibold transition-colors shrink-0">
              {dict.btn_search}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            {['filter_public', 'filter_private', 'filter_stem', 'filter_business'].map((filterKey) => {
              const label = dict[filterKey as keyof typeof t.en];
              // Map the filter key to the exact value expected by the data tag matching above
              const filterValue = {
                'filter_public': 'Public',
                'filter_private': 'Private',
                'filter_stem': 'STEM',
                'filter_business': 'Business'
              }[filterKey] as string;
              
              const isActive = activeFilters.includes(filterValue);
              
              const toggleFilter = () => {
                setActiveFilters(prev => 
                  prev.includes(filterValue)
                    ? prev.filter(f => f !== filterValue)
                    : [...prev, filterValue]
                );
              };

              return (
                <button
                  key={filterKey}
                  onClick={toggleFilter}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    isActive 
                      ? 'bg-brand-blue border-brand-blue text-white shadow-md ring-2 ring-brand-blue/20 ring-offset-2' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-brand-blue/50 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </button>
              );
            })}

            {activeFilters.length > 0 && (
              <button
                onClick={() => setActiveFilters([])}
                className="flex items-center gap-1.5 px-4 py-2 sm:ml-2 rounded-full text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-all duration-200 bg-slate-100 border border-slate-200 shadow-sm"
                title="Clear all filters"
              >
                <XCircle size={16} className="text-slate-500" />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
          </div>
        </section>

        {/* University Card Grid */}
        <main>
          {isLoading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <p className="text-lg text-slate-500">Loading universities...</p>
            </div>
          ) : filteredUniversities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredUniversities.map((uni) => (
                <Link href={`/university/${uni.id}`} key={uni.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-blue/20 transition-all duration-300 flex flex-col h-full group focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2">
                  <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <UniversityLogo uni={uni} />
                      {uni.tags?.filter(t => t !== "Phnom Penh").slice(0,1).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-slate-100 rounded-md text-xs font-semibold text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-blue transition-colors leading-tight">
                        {lang === 'en' ? uni.name_en : (uni.name_kh || uni.name_en)}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <MapPin className="w-4 h-4 text-brand-gold" />
                        <span className="truncate">{lang === 'en' ? uni.location_en : (uni.location_kh || uni.location_en)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Wallet className="w-4 h-4 text-brand-gold" />
                        <span className="truncate">{uni.tuitionRange}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        if (uni.telegramUrl) window.open(uni.telegramUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#229ED9]/80 hover:bg-[#229ED9] text-white rounded-xl font-semibold transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>{dict.btn_join_telegram || 'Telegram'}</span>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <p className="text-lg text-slate-500">{dict.no_results}</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilters([]);
                }}
                className="mt-4 text-brand-blue hover:underline font-semibold"
              >
                {dict.clear_filters}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
