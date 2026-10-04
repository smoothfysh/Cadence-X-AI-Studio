import React from 'react';
import { ArrowRight } from 'lucide-react';

export const AppsAndAbout: React.FC = () => {
  return (
    <section id="apps-and-about" className="py-12 pb-20 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* LEFT CARD: APPS -> links to apps.html */}
        <a
          href="apps.html"
          className="bg-white rounded-2xl p-6 sm:p-9 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1 block text-left"
        >
          {/* Top Blue Accent Border matching cadence-x.com and Image 1 */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-sky-500" />

          <div>
            {/* Eyebrow */}
            <div className="mb-2">
              <span className="text-xs font-mono-tag font-bold tracking-widest uppercase text-sky-600">
                APPS
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              APPS
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              The full collection of tools and toys — from serious product planning to simple kids' fun.
            </p>

            {/* Bullet list */}
            <ul className="space-y-2 text-sm text-slate-700 mb-8 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <span>Roadmap PM tool</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <span>Otis Play for kids</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <span>Timer app</span>
              </li>
            </ul>
          </div>

          {/* Action Link */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 group-hover:text-sky-700 group-hover:translate-x-1 transition-all">
              <span>Open Apps</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </a>

        {/* RIGHT CARD: ABOUT ME -> links to about.html */}
        <a
          href="about.html"
          className="bg-white rounded-2xl p-6 sm:p-9 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1 block text-left"
        >
          {/* Top Slate/Dark Accent Border matching cadence-x.com and Image 1 */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-700" />

          <div>
            {/* Eyebrow */}
            <div className="mb-2">
              <span className="text-xs font-mono-tag font-bold tracking-widest uppercase text-slate-500">
                MEET
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              About Me
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              The person behind Cadence-X — background, work, and how these projects came together.
            </p>

            {/* Bullet list */}
            <ul className="space-y-2 text-sm text-slate-700 mb-8 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <span>20+ years shipping product</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                <span>Engineer turned product lead</span>
              </li>
            </ul>
          </div>

          {/* Action Link */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-800 group-hover:text-slate-950 group-hover:translate-x-1 transition-all">
              <span>Go to About Me</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};
