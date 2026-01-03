'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  GoogleAuthProvider, 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  getAuth
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  role: 'student' | 'admin' | 'tpo' | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'student' | 'admin' | 'tpo' | null>(null);
  const [loading, setLoading] = useState(true);

  // Determine user role based on email
  const determineRole = (email: string | null): 'student' | 'admin' | 'tpo' | null => {
    if (!email) return null;
    
    // Define admin email patterns
    const adminEmails = ['admin@college.edu', 'tpo@college.edu']; // Add actual admin emails here
    const studentDomain = 'student.college.edu';
    
    if (adminEmails.includes(email)) {
      return email === 'tpo@college.edu' ? 'tpo' : 'admin';
    } else if (email.endsWith(`@${studentDomain}`)) {
      return 'student';
    }
    
    // Default to student for any college domain
    const collegeDomains = ['college.edu'];
    for (const domain of collegeDomains) {
      if (email.endsWith(`@${domain}`)) {
        return 'student';
      }
    }
    
    return null;
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userRole = determineRole(user.email);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    user,
    role,
    loading,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}