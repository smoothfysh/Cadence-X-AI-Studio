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
    <header className="sticky top-0 z-40 w-full bg-[#F8F9FA]/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Lockup with authentic spinning logo */}
        <a
          href="/"
          className="flex items-center gap-3.5 group"
        >
          <SpinningLogo size="sm" interactive={false} />
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
            href="apps.html"
            className="hover:text-slate-900 transition-colors py-1"
          >
            Apps
          </a>
          <a
            href="about.html"
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
              href="apps.html"
              className="text-left py-2 hover:text-sky-600 transition-colors"
            >
              Apps
            </a>
            <a
              href="about.html"
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
