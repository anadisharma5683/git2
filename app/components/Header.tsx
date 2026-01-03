'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  onMenuToggle?: () => void;
}

const Header = ({ title, onMenuToggle }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-900/80 dark:border-zinc-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {isSearchOpen ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 md:w-64"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={18} />
            </div>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Search size={20} />
            </button>
          )}
          
          <button className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;