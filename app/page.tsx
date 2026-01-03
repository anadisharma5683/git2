'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    // Background removed to let RootLayout's gradient shine through
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {/* Elegant Double Ring Spinner */}
      <motion.div
        className="h-12 w-12 rounded-full border-2 border-slate-200 border-t-indigo-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Subtle Loading Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-medium text-slate-500 tracking-wide"
      >
        Initializing CampusConnect...
      </motion.p>
    </div>
  );
}