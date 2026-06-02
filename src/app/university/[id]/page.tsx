"use client";

import { ArrowLeft, ArrowRight, MapPin, Send, Facebook, Globe, Award } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { t, Language } from '../../../data';
import { fetchUniversitiesFromDB, UniversityData } from '../../../services/uniService';
import { useState, useEffect } from 'react';

const COLOR_MAP: Record<string, { primary: string, accent: string }> = {
  rupp: { primary: '#E62327', accent: '#009BE0' },
  puc: { primary: '#001C94', accent: '#FBB017' },
  uhs: { primary: '#1C59A4', accent: '#C2DDF6' },
  rule: { primary: '#DA9014', accent: '#0287D0' },
  num: { primary: '#007EFF', accent: '#E21B22' },
  itc: { primary: '#175394', accent: '#D9E7F5' }
};

const ImageGallery = ({ university }: { university: UniversityData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  const images = Array.from({ length: 5 }).map((_, i) => `/assets/gallery/${university.id}/${university.id}${i + 1}.jpg`);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const primary = COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a';
  const accent = COLOR_MAP[university.id]?.accent || university.accentColor || '#ffffff';

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 5);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 5) % 5);

  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden group shadow-lg mb-8 bg-slate-900 border border-slate-200">
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative">
            {!failedImages[idx] ? (
              <img 
                src={src} 
                alt={`${university.name_en} campus view ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={() => setFailedImages(prev => ({ ...prev, [idx]: true }))}
              />
            ) : (
              <div 
                className="w-full h-full relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`
                }}
              >
                {/* Abstract mesh for fallback */}
                <div 
                  className="absolute top-[-20%] left-[-10%] w-[70%] h-[150%] rounded-[100%] blur-[80px] opacity-20"
                  style={{ backgroundColor: accent }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-black/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold tracking-widest text-sm shadow-md border border-white/20">
                    CAMPUS VIEW {idx + 1}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Controls */}
      <button 
        onClick={prevSlide}
        onMouseEnter={() => setHoverLeft(true)}
        onMouseLeave={() => setHoverLeft(false)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all hover:scale-105 shadow-md border border-slate-200"
        style={{ color: hoverLeft ? primary : undefined }}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={nextSlide}
        onMouseEnter={() => setHoverRight(true)}
        onMouseLeave={() => setHoverRight(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-all hover:scale-105 shadow-md border border-slate-200"
        style={{ color: hoverRight ? primary : undefined }}
      >
        <ArrowRight className="w-6 h-6" />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentSlide ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProfileHeader = ({ university }: { university: UniversityData }) => {
  const [logoError, setLogoError] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const logoPath = `/assets/logos/${university.id}.png`;
  const bannerPath = `/assets/banners/${university.id}.jpg`;

  const themePrimary = COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a';
  const themeAccent = COLOR_MAP[university.id]?.accent || university.accentColor || '#ffffff';

  return (
    <header className="rounded-3xl overflow-hidden shadow-2xl mb-12 relative border border-slate-800 min-h-[240px]">
      <div 
        className={`absolute inset-0 z-0 overflow-hidden ${!bannerError ? 'bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300' : ''}`}
        style={bannerError ? { backgroundColor: themePrimary } : undefined}
      >
        {!bannerError ? (
          <>
            <img 
              src={bannerPath}
              alt={`${university.name_en} campus banner`}
              className="w-full h-full object-cover object-center"
              onError={() => setBannerError(true)}
            />
            {/* Sleek gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
          </>
        ) : (
          <>
            {/* Animated Mesh Shapes */}
            <div 
              className="absolute top-[-20%] left-[-10%] w-[70%] h-[150%] rounded-[100%] blur-[120px] opacity-35 animate-[spin_25s_linear_infinite]"
              style={{ backgroundColor: themeAccent }}
            ></div>
            <div 
              className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[120%] rounded-[100%] blur-[120px] opacity-35 animate-[spin_35s_linear_infinite_reverse]"
              style={{ backgroundColor: themePrimary }}
            ></div>
            <div 
              className="absolute top-[20%] right-[30%] w-[50%] h-[80%] rounded-[100%] blur-[120px] opacity-35 animate-[pulse_15s_ease-in-out_infinite]"
              style={{ backgroundColor: themeAccent }}
            ></div>
            
            {/* Abstract Layout Grid Background for depth */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:2rem_2rem]"></div>
            
            {/* Linear dark scrim mask overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-zinc-950/40 to-zinc-950"></div>
          </>
        )}
      </div>

      <div className="relative z-10 p-8 md:p-12 h-full min-h-[240px] flex flex-col md:flex-row items-start md:items-center gap-8">
        {!logoError ? (
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex-shrink-0 shadow-2xl border-4 border-white/90 relative overflow-hidden bg-white">
             <img 
               src={logoPath}
               alt={`${university.name_en} logo`}
               className="w-full h-full object-cover scale-110"
               onError={() => setLogoError(true)}
             />
          </div>
        ) : (
          <div 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xl border-4 border-white/10 relative overflow-hidden backdrop-blur-md"
            style={{ backgroundColor: themePrimary }}
          >
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
             <span className="text-4xl md:text-5xl font-extrabold text-white tracking-widest relative z-10 drop-shadow-md">
               {university.id.toUpperCase()}
             </span>
          </div>
        )}

        <div className="flex-1 relative z-10 mt-auto md:mt-0">
          <div className="flex flex-wrap gap-2 mb-4">
            {university.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-xs font-bold tracking-wide shadow-sm">
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
            {university.name_en}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-khmer mb-6 drop-shadow-md">
            {university.name_kh}
          </p>
          <div className="flex items-center gap-2 text-slate-200 font-medium bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl inline-flex border border-white/10 shadow-sm">
            <MapPin className="w-5 h-5 text-white/80" />
            <span>{university.location_en}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default function UniversityProfile() {
  const params = useParams();
  const id = params?.id as string;
  const [lang, setLang] = useState<Language>('en'); // Defaulting to english for now
  const [university, setUniversity] = useState<UniversityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUniversitiesFromDB();
        const found = data.find(u => u.id === id);
        if (found) setUniversity(found);
      } catch (error) {
        console.error("Failed to load university", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      loadData();
    }
  }, [id]);

  const dict = t[lang];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F8FD] flex flex-col items-center justify-center p-4">
         <p className="text-lg text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-[#F6F8FD] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{dict.university_not_found}</h2>
          <Link href="/" className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue-hover font-semibold">
            <ArrowLeft className="w-4 h-4" />
            {dict.back_to_search}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FD] selection:bg-brand-blue selection:text-white pb-24">
      {/* Background Decorative Pattern */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-blue font-semibold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          {dict.back_to_search}
        </Link>
        
        {/* Hero Header Section */}
        <ProfileHeader university={university} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery university={university} />

            <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div 
                  className="w-1.5 h-6 rounded-full"
                  style={{ backgroundColor: COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a' }}
                ></div>
                About {university.name_en}
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-0">
                {university.name_en} is one of the leading higher education institutions in Cambodia. 
                Dedicated to academic excellence, it provides students with modern facilities, experienced faculty, 
                and comprehensive programs designed to prepare graduates for successful careers and global opportunities.
              </p>
            </section>

            <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div 
                  className="w-1.5 h-6 rounded-full"
                  style={{ backgroundColor: COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a' }}
                ></div>
                {dict.majors_and_fees}
              </h2>
              
              <style>{`
                .major-card:hover {
                  border-color: var(--hover-border-color);
                  box-shadow: 0 4px 14px 0 calc(var(--hover-border-color) + '33');
                }
              `}</style>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {university.majors && university.majors.map((major, idx) => {
                   const uPrimary = COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a';
                   return (
                    <div 
                      key={idx} 
                      className="major-card group flex flex-col p-6 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:bg-white transition-all duration-300"
                      style={{ '--hover-border-color': uPrimary } as React.CSSProperties}
                    >
                      <span className="text-slate-900 font-bold text-lg mb-2 group-hover:text-slate-800">{major.name}</span>
                      <span 
                        className="font-semibold text-sm mt-auto"
                        style={{ color: uPrimary }}
                      >
                        {major.fee} / year
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ 
                      backgroundColor: `${COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a'}1A`,
                      color: COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a'
                    }}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Scholarships Available</h3>
                </div>
                <p className="text-sm text-slate-600 mb-0">
                  Contact the university admissions office to learn about current financial aid and scholarship programs.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 leading-snug">
                  Official Channels
                </h3>
                
                <div className="space-y-4">
                  <style>{`
                    .channel-link:hover {
                      background-color: var(--hover-bg);
                      color: white;
                      border-color: var(--hover-bg);
                    }
                    .channel-link:hover .icon-box {
                      background-color: rgba(255, 255, 255, 0.2) !important;
                      color: white !important;
                    }
                    .channel-link:hover .text-label {
                      color: white;
                    }
                  `}</style>
                  <a 
                    href={university.telegramUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link flex items-center gap-4 w-full p-4 rounded-2xl border border-slate-100 transition-all hover:shadow-md"
                    style={{ '--hover-bg': COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a' } as React.CSSProperties}
                  >
                    <div 
                      className="icon-box w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                      style={{ 
                        backgroundColor: `${COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a'}1A`,
                        color: COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a'
                      }}
                    >
                      <Send className="w-5 h-5" />
                    </div>
                    <span className="text-label font-bold text-slate-700 transition-colors">Telegram Group</span>
                  </a>

                  <a 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link flex items-center gap-4 w-full p-4 rounded-2xl border border-slate-100 transition-all hover:shadow-md"
                    style={{ '--hover-bg': COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a' } as React.CSSProperties}
                  >
                    <div 
                      className="icon-box w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                      style={{ 
                        backgroundColor: `${COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a'}1A`,
                        color: COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a'
                      }}
                    >
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-label font-bold text-slate-700 transition-colors">Official Website</span>
                  </a>

                  <a 
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link flex items-center gap-4 w-full p-4 rounded-2xl border border-slate-100 transition-all hover:shadow-md"
                    style={{ '--hover-bg': COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a' } as React.CSSProperties}
                  >
                    <div 
                      className="icon-box w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                      style={{ 
                        backgroundColor: `${COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a'}1A`,
                        color: COLOR_MAP[university.id]?.primary || university.primaryColor || '#0f172a'
                      }}
                    >
                      <Facebook className="w-5 h-5" />
                    </div>
                    <span className="text-label font-bold text-slate-700 transition-colors">Facebook Page</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
