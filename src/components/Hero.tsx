import React from 'react';
import { SpinningLogo } from './SpinningLogo.tsx';

export interface HeroProps {
  onOpenConsultModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultModal }) => {
  return (
    <section className="pt-10 sm:pt-14 pb-10 sm:pb-14 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Two-Column Desktop Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Large Animated Spinning Logo, Wordmark & Tagline */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center py-4">
          <SpinningLogo
            size="hero-large"
            interactive={true}
            className="shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5"
          />

          {/* Wordmark with Cobalt-Blue Em-Dash */}
          <h1 className="font-archivo text-3xl sm:text-4xl lg:text-[40px] tracking-wider text-slate-900 flex items-center justify-center gap-2 mt-6">
            <span>CADENCE</span>
            <span className="text-[#1D4ED8] font-normal inline-block select-none scale-x-125">—</span>
            <span>X</span>
          </h1>

          {/* Subtitle Tagline directly beneath the logo */}
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal tracking-wide">
            The Rhythm of Product Development
          </p>
        </div>

        {/* Center Divider: Subtle Vertical Hairline on Desktop */}
        <div className="hidden lg:flex lg:col-span-1 justify-center self-stretch">
          <div className="w-px h-full min-h-[300px] bg-[#E8E4DA]" />
        </div>

        {/* Right Column: Expert Product Leadership Consultation Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left py-2">
          {/* Eyebrow Label */}
          <span className="text-[11px] font-mono-tag font-semibold tracking-[0.14em] uppercase text-[#1D4ED8] block mb-3">
            EXPERT PRODUCT LEADERSHIP
          </span>

          {/* Editorial Serif Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-tight text-[#0F172A] leading-[1.12] mb-4">
            When You Need It.
          </h2>

          {/* Narrative Body */}
          <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-lg mb-8">
            I help scaling companies find their operational rhythm. Through Cadence-X, I offer Interim CPO, Product Advisory, and Consulting services drawn from 20+ years of engineering and product leadership. Whether you need strategic direction, alignment, or fractional executive leadership, I bring battle-tested frameworks to help your organization build and deliver relentlessly.
          </p>

          {/* Action Row: CTA, Email Link & Playful Handwritten Accent */}
          <div className="flex items-center gap-8 sm:gap-12 flex-wrap">
            <div>
              <button
                type="button"
                onClick={onOpenConsultModal}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-medium text-sm transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Book a Consultation</span>
              </button>

              <a
                href="mailto:consult@cadence-x.com"
                className="text-xs text-slate-500 hover:text-slate-800 font-mono-tag tracking-wide block mt-3 transition-colors"
              >
                consult@cadence-X.com
              </a>
            </div>

            {/* Handwritten script note matching attached reference */}
            <div className="font-handwriting text-xl sm:text-2xl text-[#1D4ED8] leading-tight select-none rotate-[-7deg]">
              <span>Strategy.</span>
              <br />
              <span>Execution.</span>
              <br />
              <span>Impact.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
