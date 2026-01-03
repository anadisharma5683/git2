'use client';

import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  Bell, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useFirestoreQuery } from '../../hooks/useFirestoreQuery';
import { db } from '../../lib/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

interface BentoGridProps {
  userId: string;
  role: string;
}

const BentoGrid = ({ userId, role }: BentoGridProps) => {
  // Fetch internships data
  const { data: internships, loading: internshipsLoading } = useFirestoreQuery(
    query(collection(db, 'internships'), orderBy('deadline', 'asc'))
  );

  // Fetch applications data
  const { data: applications, loading: applicationsLoading } = useFirestoreQuery(
    query(collection(db, 'applications'), orderBy('createdAt', 'desc'))
  );

  // Calculate stats
  const totalApplications = applications?.filter((app: any) => app.userId === userId)?.length || 0;
  const upcomingInterviews = applications?.filter((app: any) => 
    app.userId === userId && app.status === 'interviewing'
  )?.length || 0;
  const newAlerts = internships?.filter((intern: any) => 
    new Date(intern.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  )?.length || 0;

  // Card animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Applications Card */}
      <motion.div
        className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-800 shadow-xl backdrop-blur-md"
        variants={itemVariants}
        whileHover="hover"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          background: 'rgba(25, 25, 25, 0.5)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Briefcase className="text-blue-400" size={24} />
          </div>
          <span className="text-xs font-medium bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
            {internshipsLoading ? 'Loading...' : 'Live'}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Applications Sent</h3>
        <p className="text-3xl font-bold text-white mb-1">{totalApplications}</p>
        <p className="text-zinc-400 text-sm">Total applications submitted</p>
      </motion.div>

      {/* Upcoming Interviews Card */}
      <motion.div
        className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-800 shadow-xl backdrop-blur-md"
        variants={itemVariants}
        whileHover="hover"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          background: 'rgba(25, 25, 25, 0.5)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Calendar className="text-purple-400" size={24} />
          </div>
          <span className="text-xs font-medium bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
            {applicationsLoading ? 'Loading...' : 'Live'}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Upcoming Interviews</h3>
        <p className="text-3xl font-bold text-white mb-1">{upcomingInterviews}</p>
        <p className="text-zinc-400 text-sm">Interviews scheduled this week</p>
      </motion.div>

      {/* New Alerts Card */}
      <motion.div
        className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-800 shadow-xl backdrop-blur-md md:col-span-2 lg:col-span-1"
        variants={itemVariants}
        whileHover="hover"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          background: 'rgba(25, 25, 25, 0.5)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Bell className="text-green-400" size={24} />
          </div>
          <span className="text-xs font-medium bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
            Hot
          </span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-200 mb-2">New Alerts</h3>
        <p className="text-3xl font-bold text-white mb-1">{newAlerts}</p>
        <p className="text-zinc-400 text-sm">New opportunities added recently</p>
      </motion.div>

      {/* Stats Card - Total Internships */}
      <motion.div
        className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-800 shadow-xl backdrop-blur-md"
        variants={itemVariants}
        whileHover="hover"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          background: 'rgba(25, 25, 25, 0.5)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-yellow-500/20 rounded-lg">
            <TrendingUp className="text-yellow-400" size={24} />
          </div>
          <span className="text-xs font-medium bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Active Internships</h3>
        <p className="text-3xl font-bold text-white mb-1">{internships?.length || 0}</p>
        <p className="text-zinc-400 text-sm">Available opportunities</p>
      </motion.div>

      {/* Recent Activity Card */}
      <motion.div
        className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-800 shadow-xl backdrop-blur-md"
        variants={itemVariants}
        whileHover="hover"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          background: 'rgba(25, 25, 25, 0.5)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-pink-500/20 rounded-lg">
            <Users className="text-pink-400" size={24} />
          </div>
          <span className="text-xs font-medium bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">
            Live
          </span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Recent Activity</h3>
        <div className="space-y-3 mt-4">
          <div className="flex items-center">
            <div className="mr-3 p-1.5 bg-blue-500/20 rounded-full">
              <CheckCircle className="text-blue-400" size={16} />
            </div>
            <div>
              <p className="text-sm text-zinc-200">Application submitted</p>
              <p className="text-xs text-zinc-400">Google SWE Intern</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-3 p-1.5 bg-green-500/20 rounded-full">
              <Calendar className="text-green-400" size={16} />
            </div>
            <div>
              <p className="text-sm text-zinc-200">Interview scheduled</p>
              <p className="text-xs text-zinc-400">Microsoft Interview</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-3 p-1.5 bg-yellow-500/20 rounded-full">
              <Clock className="text-yellow-400" size={16} />
            </div>
            <div>
              <p className="text-sm text-zinc-200">Application pending</p>
              <p className="text-xs text-zinc-400">Apple Design Intern</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BentoGrid;