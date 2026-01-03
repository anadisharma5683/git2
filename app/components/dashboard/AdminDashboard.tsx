'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  AlertCircle, 
  MoreVertical, 
  Search 
} from 'lucide-react';

// Reusable Stat Card Component for consistency
const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.04)]"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
        {trend}
      </span>
      <span className="text-slate-400 ml-2">vs last month</span>
    </div>
  </motion.div>
);

const AdminDashboard = ({ userId }: { userId: string }) => {
  return (
    <div className="space-y-8 p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                Download Report
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
                + New Drive
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value="2,543" 
          trend="+12%" 
          icon={Users} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Active Drives" 
          value="18" 
          trend="+4%" 
          icon={Briefcase} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Placed Students" 
          value="892" 
          trend="+24%" 
          icon={TrendingUp} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title="Pending Actions" 
          value="14" 
          trend="-2%" 
          icon={AlertCircle} 
          color="bg-amber-500" 
        />
      </div>

      {/* Content Section: Recent Activity & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-semibold text-slate-900">Recent Applications</h2>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">Alex Morgan</td>
                    <td className="px-6 py-4 text-slate-600">TechCorp Inc.</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Selected
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">Oct 24, 2024</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel: Upcoming Drives */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Upcoming Drives</h2>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer">
                        <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                            <Briefcase size={18} />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900">Google Cloud</h4>
                            <p className="text-xs text-slate-500">24 Oct • 10:00 AM</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                View Calendar
            </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;