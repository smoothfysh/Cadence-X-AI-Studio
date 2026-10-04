/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TempoVisualizer } from './components/TempoVisualizer.tsx';
import { WhyCadenceMatters } from './components/WhyCadenceMatters.tsx';
import { AppsAndAbout } from './components/AppsAndAbout.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0B1C30] flex flex-col font-sans">
      {/* Top Navigation Bar with authentic spinning logo */}
      <Header />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* Hero Section with Spinning Logo */}
        <Hero />

        {/* Interactive Multi-Track Tempo Alignment Waveform Visualizer */}
        <TempoVisualizer />

        {/* Why Cadence Matters (Operational Dividend Section) */}
        <WhyCadenceMatters />

        {/* Dual Cards: Apps & About Me linking directly to apps.html & about.html */}
        <AppsAndAbout />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
