import React from 'react';
import { LayoutDashboard, Users, Briefcase, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50/50">
      
      {/* Sidebar - Fixed Left */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 text-indigo-600">
            <div className="h-8 w-8 bg-indigo-100 rounded-lg flex items-center justify-center font-bold">CC</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">CampusConnect</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={LayoutDashboard} label="Overview" active />
          <NavItem icon={Briefcase} label="Placements" />
          <NavItem icon={Users} label="Students" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Simple Top Header for Mobile/Context */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between">
           <div className="md:hidden font-bold text-slate-900">CampusConnect</div> 
           <div className="ml-auto flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center text-sm font-medium">
                AD
              </div>
           </div>
        </header>

        {children}
      </main>
    </div>
  );
}

// Helper for Sidebar Items
function NavItem({ icon: Icon, label, active }: any) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all ${
        active
          ? 'bg-indigo-50 text-indigo-600 shadow-sm'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}