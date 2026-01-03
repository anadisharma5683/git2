'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext'; // Ensure this path is correct based on your folder structure
import { useRouter } from 'next/navigation';
import { Chrome, Mail, Lock, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { signInWithGoogle, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      setLoading(false);
    }
  };

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    // Removed bg-zinc-950 to let RootLayout gradient show
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[420px]"
      >
        {/* Card: White with subtle border and premium shadow */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
              <span className="text-xl font-bold">CC</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Access the CampusConnect placement portal
            </p>
          </div>

          <div className="space-y-6">
            {/* Google Sign In - High Emphasis */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="group relative w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 font-medium transition-all duration-200 hover:shadow-sm"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin" />
              ) : (
                <>
                  <Chrome size={20} className="text-slate-900" />
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            {/* Elegant Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="px-3 bg-white text-slate-400 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Email Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    placeholder="student@college.edu"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 group"
              >
                <span>Sign in</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-500">
            No account yet?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline decoration-2 underline-offset-2">
              Contact TPO
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;