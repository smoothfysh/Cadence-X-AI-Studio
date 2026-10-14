import React from 'react';

export const AppsAndAbout: React.FC = () => {
  return (
    <section id="apps-and-about" className="py-16 sm:py-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start relative">
        
        {/* LEFT COLUMN: APPS */}
        <div className="md:col-span-5 relative pl-0 sm:pl-10">
          {/* Subtle Botanical Branch Doodle matching reference */}
          <div className="hidden sm:block absolute -left-2 top-2 select-none pointer-events-none opacity-80">
            <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 44C14 28 12 12 18 4" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 34C9 33 4 28 5 22C11 22 14 28 14 34Z" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.2" />
              <path d="M13 24C17 22 22 16 21 10C15 11 13 18 13 24Z" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.2" />
              <path d="M14 16C10 14 6 9 8 4C13 5 14 11 14 16Z" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.2" />
            </svg>
          </div>

          <div>
            {/* Eyebrow */}
            <span className="text-[11px] font-mono-tag font-semibold tracking-[0.14em] uppercase text-[#1D4ED8] block mb-2">
              APPS
            </span>

            {/* Editorial Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0F172A] mb-3 tracking-tight">
              Apps
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-5 max-w-md">
              The full collection of tools and toys — from serious product planning to simple kids' fun.
            </p>

            {/* Editorial Bullet list */}
            <ul className="space-y-2 text-sm text-slate-600 mb-6 font-normal">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Roadmap PM tool</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Otis Play for kids</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Timer app</span>
              </li>
            </ul>

            {/* Action Link */}
            <a
              href="/apps"
              className="inline-flex items-center text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
            >
              <span>Open Apps</span>
            </a>
          </div>
        </div>

        {/* CENTER DIVIDER: Hairline Vertical Rule on Desktop */}
        <div className="hidden md:flex md:col-span-2 justify-center self-stretch">
          <div className="w-px h-full min-h-[220px] bg-[#E8E4DA]" />
        </div>

        {/* RIGHT COLUMN: ABOUT ME */}
        <div className="md:col-span-5 relative pr-0 sm:pr-10">
          <div>
            {/* Eyebrow */}
            <span className="text-[11px] font-mono-tag font-semibold tracking-[0.14em] uppercase text-[#1D4ED8] block mb-2">
              MEET
            </span>

            {/* Editorial Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#0F172A] mb-3 tracking-tight">
              About Me
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-5 max-w-md">
              The person behind Cadence-X — background, work, and how these projects came together.
            </p>

            {/* Editorial Bullet list */}
            <ul className="space-y-2 text-sm text-slate-600 mb-6 font-normal">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>20+ years shipping product</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Engineer turned product lead</span>
              </li>
            </ul>

            {/* Action Link */}
            <a
              href="/about"
              className="inline-flex items-center text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
            >
              <span>Go to About Me</span>
            </a>
          </div>

          {/* Subtle Terracotta Triple-Slash Doodle matching reference */}
          <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-80 font-handwriting text-2xl font-bold text-[#C2410C] tracking-widest rotate-[-12deg]">
            ///
          </div>
        </div>

      </div>
    </section>
  );
};
