'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  XCircle, 
  TrendingUp,
  Search,
  Calendar,
  Building2,
  ArrowRight
} from 'lucide-react';
import { mockOpportunities, mockApplications, mockUsers } from '../../mockData';

// --- Sub-components for clean file structure ---

const StatCard = ({ title, value, icon: Icon, color, bg }: any) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.04)] flex items-center justify-between"
  >
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl ${bg}`}>
      <Icon size={20} className={color} />
    </div>
  </motion.div>
);

const JobCard = ({ job, onApply }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between"
  >
    <div>
        <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                {job.companyName.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                {job.type || 'Full Time'}
            </span>
        </div>
        <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{job.role}</h3>
        <p className="text-sm text-slate-500 mt-1">{job.companyName}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                📍 {job.location || 'Remote'}
            </span>
            <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                💰 {job.stipend || 'Competitive'}
            </span>
        </div>
    </div>

    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-400 font-medium">
            Deadline: {new Date(job.deadline).toLocaleDateString()}
        </div>
        <button 
            onClick={() => onApply(job.id)}
            className="text-sm font-medium text-white bg-slate-900 hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors"
        >
            Apply Now
        </button>
    </div>
  </motion.div>
);

const ApplicationCard = ({ app, job, statusColor, statusIcon: Icon }: any) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow mb-3 cursor-pointer group">
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-semibold text-slate-900 text-sm group-hover:text-indigo-600">{job?.role}</h4>
      <Icon size={16} className={statusColor} />
    </div>
    <p className="text-xs text-slate-500 mb-3">{job?.companyName}</p>
    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
       <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
         {new Date(app.lastUpdated).toLocaleDateString()}
       </span>
       <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded">View</span>
    </div>
  </div>
);

// --- Main Component ---

const StudentDashboard = ({ userId }: { userId: string }) => {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'applications'>('opportunities');
  const currentUser = mockUsers.find(u => u.id === userId) || mockUsers[0];
  const studentApplications = mockApplications.filter(app => app.studentId === userId);
  
  // Stats Logic
  const stats = {
    total: studentApplications.length,
    interviewing: studentApplications.filter(app => app.status === 'interviewing').length,
    offered: studentApplications.filter(app => app.status === 'offered').length,
    rejected: studentApplications.filter(app => app.status === 'rejected').length
  };

  const handleApply = (id: string) => alert(`Applied to ${id}`);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hello, {currentUser.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 mt-1">Ready to launch your career today?</p>
        </div>
        
        {/* Tab Toggle */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center font-medium text-sm">
            <button 
                onClick={() => setActiveTab('opportunities')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'opportunities' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Briefcase size={16} />
                Opportunities
            </button>
            <button 
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${activeTab === 'applications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <TrendingUp size={16} />
                My Applications
            </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Applications" value={stats.total} icon={Briefcase} color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="Interviews" value={stats.interviewing} icon={Calendar} color="text-amber-600" bg="bg-amber-50" />
        <StatCard title="Offers" value={stats.offered} icon={CheckCircle} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="text-red-500" bg="bg-red-50" />
      </div>

      {/* Main Content Area */}
      {activeTab === 'opportunities' ? (
        <div className="space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Recommended Jobs</h2>
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                 <input 
                    type="text" 
                    placeholder="Search roles..." 
                    className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                 />
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockOpportunities
                .filter(opp => new Date(opp.deadline) > new Date())
                .map(opp => <JobCard key={opp.id} job={opp} onApply={handleApply} />)
              }
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kanban Column: Applied */}
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <div className="h-2 w-2 rounded-full bg-slate-400" />
                    <h3 className="font-semibold text-slate-700">Applied</h3>
                    <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{studentApplications.filter(a => a.status === 'applied').length}</span>
                </div>
                {studentApplications.filter(a => a.status === 'applied').map(app => (
                    <ApplicationCard 
                        key={app.id} 
                        app={app} 
                        job={mockOpportunities.find(o => o.id === app.opportunityId)}
                        statusColor="text-slate-400"
                        statusIcon={Clock}
                    />
                ))}
            </div>

            {/* Kanban Column: Interviewing */}
            <div className="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    <h3 className="font-semibold text-slate-700">Interviewing</h3>
                    <span className="ml-auto text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">{stats.interviewing}</span>
                </div>
                {studentApplications.filter(a => a.status === 'interviewing').map(app => (
                    <ApplicationCard 
                        key={app.id} 
                        app={app} 
                        job={mockOpportunities.find(o => o.id === app.opportunityId)}
                        statusColor="text-amber-500"
                        statusIcon={Calendar}
                    />
                ))}
            </div>

            {/* Kanban Column: Decisions */}
            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <h3 className="font-semibold text-slate-700">Decisions</h3>
                    <span className="ml-auto text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{stats.offered + stats.rejected}</span>
                </div>
                {studentApplications.filter(a => ['offered', 'rejected'].includes(a.status)).map(app => (
                    <ApplicationCard 
                        key={app.id} 
                        app={app} 
                        job={mockOpportunities.find(o => o.id === app.opportunityId)}
                        statusColor={app.status === 'offered' ? "text-emerald-500" : "text-red-500"}
                        statusIcon={app.status === 'offered' ? CheckCircle : XCircle}
                    />
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;