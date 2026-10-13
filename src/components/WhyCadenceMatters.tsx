import React from 'react';
import { Briefcase, Compass, Layers, Award } from 'lucide-react';

export const WhyCadenceMatters: React.FC = () => {
  return (
    <section id="services" className="py-12 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Outer Dark Container */}
      <div className="bg-[#0A0F1D] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-slate-800/80 shadow-2xl relative overflow-hidden">
        {/* Subtle vertical pinstripe background texture */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #00F0FF, #00F0FF 1px, transparent 1px, transparent 32px)`,
          }}
        />

        {/* Header */}
        <div className="relative z-10 max-w-2xl mb-10 sm:mb-12">
          <span className="text-xs font-mono-tag font-semibold tracking-widest uppercase text-cyan-400 block mb-2">
            EXECUTIVE SERVICES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
            How We Can Partner
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hands-on product leadership, strategic advisory, and operational alignment for scaling companies.
          </p>
        </div>

        {/* 4 Feature Panels in a Row */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Interim CPO */}
          <div className="bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800/90 transition-all hover:border-slate-700 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Interim CPO
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Stepping in during critical growth or transition phases to lead your product organization, establish rigorous processes, and mentor your existing PMs while you search for a permanent hire.
              </p>
            </div>
          </div>

          {/* Card 2: Product Advisory */}
          <div className="bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800/90 transition-all hover:border-slate-700 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Product Advisory
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                High-level strategic partnership for founders and executives. I provide unbiased, expert sounding-board support to refine your product vision, roadmap, and go-to-market alignment.
              </p>
            </div>
          </div>

          {/* Card 3: Product Consulting */}
          <div className="bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800/90 transition-all hover:border-slate-700 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Product Consulting
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Targeted, hands-on intervention to solve specific product lifecycle challenges. From establishing agile rituals to untangling technical debt and restructuring product teams for maximum velocity.
              </p>
            </div>
          </div>

          {/* Card 4: Proven Expertise */}
          <div className="bg-slate-900/60 hover:bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800/90 transition-all hover:border-slate-700 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Proven Expertise
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Currently serving as a Product Director for multiple organizations. When you hire Cadence-X, you get active, modern industry expertise, not just theoretical frameworks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
