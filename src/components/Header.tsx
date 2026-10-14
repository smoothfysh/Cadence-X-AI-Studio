import React, { useState } from 'react';
import { SpinningLogo } from './SpinningLogo.tsx';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E4DA]/80 transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Lockup with authentic spinning logo */}
        <a
          href="/"
          onClick={(e) => {
            if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (window.location.pathname.endsWith('index.html')) {
                window.history.replaceState(null, '', '/');
              }
            }
          }}
          className="flex items-center gap-3.5 group select-none"
        >
          <SpinningLogo size="sm" interactive={false} className="shrink-0" />
          <span className="font-archivo tracking-wider text-xl text-slate-900 group-hover:text-sky-600 transition-colors">
            CADENCE-X
          </span>
        </a>

        {/* Center/Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600">
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-slate-900 transition-colors cursor-pointer py-1"
          >
            Services
          </button>
          <a
            href="/apps"
            className="hover:text-slate-900 transition-colors py-1"
          >
            Apps
          </a>
          <a
            href="/about"
            className="hover:text-slate-900 transition-colors py-1"
          >
            About Me
          </a>
        </nav>

        {/* Mobile menu toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-4 text-base font-medium text-slate-700">
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 hover:text-sky-600 transition-colors"
            >
              Services
            </button>
            <a
              href="/apps"
              className="text-left py-2 hover:text-sky-600 transition-colors"
            >
              Apps
            </a>
            <a
              href="/about"
              className="text-left py-2 hover:text-sky-600 transition-colors"
            >
              About Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
