import React from 'react';
import { SpinningLogo } from './SpinningLogo.tsx';
import { Mail, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-12 sm:pt-16 pb-8 flex flex-col items-center text-center px-4">
      {/* Centered Large Spinning Logo from www.cadence-x.com */}
      <div className="mb-6 flex flex-col items-center">
        <SpinningLogo size="hero" className="shadow-lg shadow-sky-900/5 ring-1 ring-slate-900/5" />
      </div>

      {/* Main Title with Cyan Em-Dash */}
      <h1 className="font-archivo text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <span>CADENCE</span>
        <span className="text-sky-500 font-normal inline-block select-none scale-x-125">—</span>
        <span>X</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-lg sm:text-xl text-slate-500 font-normal tracking-normal max-w-xl">
        The Rhythm of Product Development
      </p>

      {/* Positioning Box with Prominent Consultation CTA */}
      <div className="mt-10 max-w-2xl w-full bg-white rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_-4px_rgba(15,23,42,0.06)] border border-slate-200/80 relative overflow-hidden text-left">
        {/* Top Accent Gradient Border */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-600" />

        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
          Expert Product Leadership, When You Need It.
        </h2>

        <p className="text-slate-600 text-base sm:text-[16px] leading-relaxed">
          I help scaling companies find their operational rhythm. Through Cadence-X, I offer Interim CPO, Product Advisory, and Consulting services drawn from 20+ years of engineering and product leadership. Whether you need strategic direction, team alignment, or fractional executive leadership, I bring battle-tested frameworks to help your organization build and deliver value flawlessly.
        </p>

        {/* Prominent 'Book a Consultation' Button */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <a
            href="mailto:consult@cadence-x.com?subject=Cadence-X%20Consultation%20Inquiry"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
          >
            <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </a>

          <a
            href="mailto:consult@cadence-x.com"
            className="text-xs text-slate-400 hover:text-slate-600 font-mono-tag tracking-wide transition-colors"
          >
            consult@cadence-x.com
          </a>
        </div>
      </div>
    </section>
  );
};
