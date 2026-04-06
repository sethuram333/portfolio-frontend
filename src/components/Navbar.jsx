import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleDark } = useDarkMode();
  const location = useLocation();

  const { user } = useAuth();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  if (user) {
    links.push({ to: '/admin', label: 'Dashboard' });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight group">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 group-hover:scale-110 transition-transform">
            <Code2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
            Portfolio.
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                isActive(to)
                  ? 'text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-slate-800/80'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {label}
            </Link>
          ))}
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDark}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-2 shadow-xl absolute w-full left-0 z-40 rounded-b-2xl">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                isActive(to)
                  ? 'bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-cyan-400 translate-x-2'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-cyan-400'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
