"use client";

import { GraduationCap, Mail, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!auth) {
      setError("Firebase Authentication is not configured.");
      setLoading(false);
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/');
      } catch (err: any) {
        console.error("Sign Up Error:", err);
        if (err.code === 'auth/email-already-in-use') {
          setError("This email address is already registered. Please sign in instead.");
        } else if (err.code === 'auth/weak-password') {
          setError("Password should be at least 6 characters.");
        } else if (err.code === 'auth/operation-not-allowed') {
          setError("Email/Password sign-in is disabled. Please enable it in the Firebase Console!");
        } else {
          setError(err.message || 'An error occurred during sign up.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/');
      } catch (err: any) {
        console.error("Sign In Error:", err);
        if (
          err.code === 'auth/user-not-found' || 
          err.code === 'auth/wrong-password' || 
          err.code === 'auth/invalid-credential'
        ) {
          setError("Incorrect email or password. Please double-check your credentials.");
        } else if (err.code === 'auth/operation-not-allowed') {
           setError("Email/Password sign-in is disabled. Please enable it in the Firebase Console!");
        } else {
          setError(err.message || 'An error occurred during sign in.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!auth) {
         setError("Firebase Authentication is not configured.");
         setLoading(false);
         return;
      }
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/user-cancelled' && err.code !== 'auth/cancelled-popup-request') {
        setError(err.message || 'An error occurred during sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FD] flex flex-col items-center justify-center p-4 selection:bg-brand-blue selection:text-white font-sans">
      {/* Light Clean Abstract Background */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-40 bg-brand-blue/20"></div>
         <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full blur-[100px] opacity-40 bg-brand-gold/20"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
         {/* Simple Logo */}
         <div className="flex flex-col items-center mb-8 text-center mt-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-3 bg-white border border-slate-200 text-brand-blue rounded-2xl shadow-sm transition-transform group-hover:scale-105">
                <GraduationCap size={32} strokeWidth={2.5} />
              </div>
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome to SalaHub
            </h2>
            <p className="mt-3 text-slate-500 max-w-sm leading-relaxed">
              Sign in to track your university applications and save your favorite campuses.
            </p>
         </div>

         {/* Modern Light Auth Card */}
         <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
            
            {/* Tabs */}
            <div className="flex mb-8 bg-slate-100 border border-slate-200 rounded-xl p-1 relative">
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setError(null); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all z-10 ${!isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setError(null); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all z-10 ${isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
              >
                Sign Up
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleEmailAuth}>
               
               {error && (
                 <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                   {error}
                 </div>
               )}

               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="email">
                   Email Address
                 </label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                     <Mail className="h-5 w-5 text-slate-400" />
                   </div>
                   <input
                     id="email"
                     type="email"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all sm:text-sm"
                     placeholder="student@example.com"
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="password">
                   Password
                 </label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                     <Lock className="h-5 w-5 text-slate-400" />
                   </div>
                   <input
                     id="password"
                     type="password"
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all sm:text-sm"
                     placeholder="••••••••"
                   />
                 </div>
               </div>

               {isSignUp && (
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" htmlFor="confirmPassword">
                     Confirm Password
                   </label>
                   <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                       <Lock className="h-5 w-5 text-slate-400" />
                     </div>
                     <input
                       id="confirmPassword"
                       type="password"
                       required
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all sm:text-sm"
                       placeholder="••••••••"
                     />
                   </div>
                 </div>
               )}

               <button
                 type="submit"
                 disabled={loading}
                 className="flex w-full items-center justify-center gap-2 px-4 py-3.5 border border-transparent rounded-xl shadow-md bg-brand-blue text-white font-bold hover:bg-brand-blue-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all mt-6 disabled:opacity-75 disabled:cursor-not-allowed hover:-translate-y-0.5"
               >
                 {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In with Email')}
               </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-400 text-xs uppercase tracking-widest font-bold">or</span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold transition-all focus:outline-none shadow-sm hover:shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  {loading ? 'Please wait...' : 'Continue with Google'}
                </button>
              </div>
            </div>
         </div>
         
         <div className="mt-8 mb-12 text-center flex justify-center">
           <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-blue transition-colors">
             <ArrowLeft size={16} />
             Back to Home
           </Link>
         </div>
      </div>
    </div>
  );
}

