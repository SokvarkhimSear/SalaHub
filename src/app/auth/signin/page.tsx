"use client";

import { GraduationCap, Mail, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!auth) {
         setError("Firebase Authentication is not configured. Please add your credentials to the .env.local file.");
         setLoading(false);
         return;
      }
      const provider = new GoogleAuthProvider();
      // Optional: Add scopes or custom parameters here if needed
      await signInWithPopup(auth, provider);
      // On success, redirect to home
      router.push('/');
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      // Extract a readable error message based on common Firebase errors
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/user-cancelled' || err.code === 'auth/cancelled-popup-request') {
        // Silently ignore if user cancels the login, just reset the error state 
        setError(null);
      } else {
        setError(err.message || 'An error occurred during sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 selection:bg-brand-blue selection:text-white">
      {/* Dark Modern Abstract Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[150%] rounded-[100%] blur-[120px] opacity-20 animate-[spin_30s_linear_infinite]" style={{ backgroundColor: '#0033A0' }}></div>
         <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[120%] rounded-[100%] blur-[120px] opacity-20 animate-[spin_40s_linear_infinite_reverse]" style={{ backgroundColor: '#D4AF37' }}></div>
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [background-size:2rem_2rem]"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
         {/* Simple Logo */}
         <div className="flex flex-col items-center mb-10 text-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-3 bg-zinc-900 border border-zinc-800 text-brand-gold rounded-xl shadow-2xl transition-transform group-hover:scale-110">
                <GraduationCap size={32} />
              </div>
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              Welcome to SalaHub
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-sm leading-relaxed">
              Sign in to track your university applications and save your favorite majors.
            </p>
         </div>

         {/* Modern Dark Auth Card */}
         <div className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
               
               <div>
                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2" htmlFor="email">
                   Email Address
                 </label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                     <Mail className="h-5 w-5 text-zinc-500" />
                   </div>
                   <input
                     id="email"
                     type="email"
                     className="block w-full pl-11 pr-4 py-3.5 border border-zinc-800 rounded-xl bg-zinc-900/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                     placeholder="student@example.com"
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2" htmlFor="password">
                   Password
                 </label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                     <Lock className="h-5 w-5 text-zinc-500" />
                   </div>
                   <input
                     id="password"
                     type="password"
                     className="block w-full pl-11 pr-4 py-3.5 border border-zinc-800 rounded-xl bg-zinc-900/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                     placeholder="••••••••"
                   />
                 </div>
               </div>

               <button
                 type="button"
                 className="flex w-full items-center justify-center gap-2 px-4 py-3.5 border border-transparent rounded-xl shadow-lg bg-brand-blue text-white font-bold hover:bg-brand-blue-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-brand-blue transition-all mt-6"
               >
                 Sign In
               </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800/80" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent backdrop-blur-sm text-zinc-500 text-xs uppercase tracking-widest font-semibold">or</span>
                </div>
              </div>

              <div className="mt-8">
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white hover:bg-zinc-100 text-zinc-900 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-white shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </button>
              </div>
            </div>
         </div>
         
         <div className="mt-8 text-center flex justify-center">
           <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors">
             <ArrowLeft size={16} />
             Back to Home
           </Link>
         </div>
      </div>
    </div>
  );
}
