import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-200/90 bg-white/60 py-8 px-4 sm:px-6 lg:px-8 mt-12 transition-colors">
      <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        {/* Left: ● © 2026 CADENCE-X · All rights reserved. */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          <span>
            &copy; {currentYear} CADENCE-X &nbsp;·&nbsp; All rights reserved.
          </span>
        </div>

        {/* Right: Services, Apps, About */}
        <div className="flex items-center gap-6 font-medium text-slate-600">
          <button
            onClick={scrollToServices}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Services
          </button>
          <a
            href="apps.html"
            className="hover:text-slate-900 transition-colors"
          >
            Apps
          </a>
          <a
            href="about.html"
            className="hover:text-slate-900 transition-colors"
          >
            About
          </a>
        </div>
      </div>
    </footer>
  );
};
