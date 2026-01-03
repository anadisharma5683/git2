'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Users, Calendar, Bell, Settings, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  role: 'student' | 'admin' | 'tpo';
  user?: {
    name: string;
    email: string;
  };
}

const Sidebar = ({ role, user }: SidebarProps) => {
  const pathname = usePathname();

  // Define navigation items based on role
  const navItems = role === 'student' 
    ? [
        { name: 'Dashboard', icon: Home, href: '/dashboard' },
        { name: 'Opportunities', icon: Briefcase, href: '/dashboard/opportunities' },
        { name: 'My Applications', icon: User, href: '/dashboard/applications' },
        { name: 'Calendar', icon: Calendar, href: '/dashboard/calendar' },
        { name: 'Notifications', icon: Bell, href: '/dashboard/notifications' },
      ]
    : [
        { name: 'Dashboard', icon: Home, href: '/dashboard' },
        { name: 'Students', icon: Users, href: '/dashboard/students' },
        { name: 'Opportunities', icon: Briefcase, href: '/dashboard/opportunities' },
        { name: 'Applications', icon: User, href: '/dashboard/applications' },
        { name: 'Calendar', icon: Calendar, href: '/dashboard/calendar' },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
      ];

  return (
    <motion.div 
      className="fixed inset-y-0 left-0 z-30 w-64 bg-zinc-900 text-white shadow-xl hidden md:flex flex-col"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-zinc-700">
        <h1 className="text-xl font-bold">UniPlacer</h1>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-zinc-700">
          <div className="flex items-center space-x-3">
            <div className="bg-zinc-700 rounded-full p-2">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-zinc-400">{user.email}</p>
              <span className="text-xs bg-zinc-700 px-2 py-1 rounded-full mt-1 inline-block">
                {role === 'student' ? 'Student' : role === 'tpo' ? 'TPO' : 'Admin'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={item.name}>
              <Link href={item.href}>
                <motion.div
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-zinc-700 text-white'
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-zinc-700">
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;