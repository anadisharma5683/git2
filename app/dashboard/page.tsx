'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import BentoGrid from '../../components/Dashboard/BentoGrid';
import { useRouter } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const DashboardPage = () => {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [internships, setInternships] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);

  // Check authentication
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch user-specific data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user && role) {
        try {
          // Fetch user profile data
          // In a real app, this would come from Firestore
          setUserData({
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email?.split('@')[0] || 'User',
          });

          // Fetch internships based on user role
          if (role === 'admin' || role === 'tpo') {
            // Admins see all internships
            const internshipsSnapshot = await getDocs(collection(db, 'internships'));
            const internshipsData = internshipsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setInternships(internshipsData);
            
            // Fetch all applications
            const applicationsSnapshot = await getDocs(collection(db, 'applications'));
            const applicationsData = applicationsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setApplications(applicationsData);
          } else {
            // Students see only their applications
            const applicationsQuery = query(
              collection(db, 'applications'),
              where('userId', '==', user.uid)
            );
            const applicationsSnapshot = await getDocs(applicationsQuery);
            const applicationsData = applicationsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setApplications(applicationsData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    if (user && role) {
      fetchUserData();
    }
  }, [user, role]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <motion.div
          className="text-white text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading Dashboard...
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Welcome back, {userData?.name || 'User'}!
          </h1>
          <p className="text-zinc-400 mt-2">
            {role === 'student' 
              ? 'Track your applications and find new opportunities' 
              : role === 'admin' || role === 'tpo'
              ? 'Manage internships and student applications'
              : 'Dashboard'}
          </p>
        </div>

        {/* Bento Grid Dashboard */}
        <div className="mb-8">
          <BentoGrid userId={user.uid} role={role || 'student'} />
        </div>

        {/* Additional Content Based on Role */}
        {role === 'admin' || role === 'tpo' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Applications for Admins */}
            <motion.div
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-800 shadow-xl backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Recent Applications</h2>
              <div className="space-y-4">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="text-white">{app.studentName || 'Student'}</p>
                      <p className="text-zinc-400 text-sm">{app.position || 'Position'}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      app.status === 'accepted' 
                        ? 'bg-green-500/20 text-green-400' 
                        : app.status === 'rejected'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Companies for Admins */}
            <motion.div
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-800 shadow-xl backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Top Companies</h2>
              <div className="space-y-4">
                {internships.slice(0, 5).map((intern) => (
                  <div key={intern.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="text-white">{intern.company || 'Company'}</p>
                      <p className="text-zinc-400 text-sm">{intern.title || 'Title'}</p>
                    </div>
                    <span className="text-zinc-400 text-sm">{intern.applicants_count || 0} applicants</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Applications for Students */}
            <motion.div
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-800 shadow-xl backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">My Applications</h2>
              <div className="space-y-4">
                {applications.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="text-white">{app.position || 'Position'}</p>
                      <p className="text-zinc-400 text-sm">{app.company || 'Company'}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      app.status === 'accepted' 
                        ? 'bg-green-500/20 text-green-400' 
                        : app.status === 'rejected'
                        ? 'bg-red-500/20 text-red-400'
                        : app.status === 'interviewing'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Opportunities for Students */}
            <motion.div
              className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-800 shadow-xl backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Recommended For You</h2>
              <div className="space-y-4">
                {internships.slice(0, 5).map((intern) => (
                  <div key={intern.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="text-white">{intern.title || 'Title'}</p>
                      <p className="text-zinc-400 text-sm">{intern.company || 'Company'}</p>
                    </div>
                    <span className="text-zinc-400 text-sm">{new Date(intern.deadline).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPage;