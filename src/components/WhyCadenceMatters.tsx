import React from 'react';
import { BarChart3, Compass, UserCheck, Briefcase } from 'lucide-react';

export const WhyCadenceMatters: React.FC = () => {
  return (
    <section id="services" className="py-12 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Outer Dark Container */}
      <div className="bg-[#080D1A] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 text-white border border-slate-800/80 shadow-2xl relative overflow-hidden">
        
        {/* Header with Handwritten Accents */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10 sm:mb-12 relative z-10">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono-tag font-semibold tracking-[0.14em] uppercase text-cyan-400 block mb-2.5">
              EXECUTIVE SERVICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight text-white mb-3">
              How We Can Partner
            </h2>
            <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed">
              Hands-on product leadership, strategic advisory, and operational alignment for scaling companies.
            </p>
          </div>

          {/* Whimsical Handwritten Note matching attached reference */}
          <div className="font-handwriting text-xl sm:text-2xl text-sky-400 leading-tight select-none rotate-[-5deg] self-start sm:self-auto sm:text-right sm:pr-4">
            <span>Better teams.</span>
            <br />
            <span>Better products.</span>
          </div>
        </div>

        {/* 4 Refined Editorial Service Columns */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8 pt-4 border-t border-slate-800/60">
          
          {/* Service 1: Interim CPO */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Interim CPO
              </h3>
              <p className="text-xs sm:text-[13.5px] text-slate-400 leading-relaxed">
                Stepping in during critical growth or transition phases to lead your product organization, establish rigorous processes, and mentor your existing PMs while you search for a permanent hire.
              </p>
            </div>
          </div>

          {/* Service 2: Product Advisory */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Product Advisory
              </h3>
              <p className="text-xs sm:text-[13.5px] text-slate-400 leading-relaxed">
                High-level strategic partnership for founders and executives. I provide unbiased, expert sounding-board support to refine your product vision, roadmap, and go-to-market alignment.
              </p>
            </div>
          </div>

          {/* Service 3: Product Consulting */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Product Consulting
              </h3>
              <p className="text-xs sm:text-[13.5px] text-slate-400 leading-relaxed">
                Targeted, hands-on intervention to solve specific product lifecycle challenges. From establishing agile rituals to untangling technical debt and restructuring product teams for maximum velocity.
              </p>
            </div>
          </div>

          {/* Service 4: Proven Expertise */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Proven Expertise
              </h3>
              <p className="text-xs sm:text-[13.5px] text-slate-400 leading-relaxed">
                Currently serving as a Product Director for multiple organizations. When you hire Cadence-X, you get active, modern industry expertise, not just theoretical frameworks.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
