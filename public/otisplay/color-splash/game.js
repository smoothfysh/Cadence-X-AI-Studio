/**
 * Color Splash — Modernized Game Engine (Otis Play)
 * Aimed at toddlers & young children (Ages 2-4)
 * Features:
 *  - Tactile watercolor studio & paint splat aesthetic
 *  - Kawaii animated paint droplet character ("Splishy") with blinking eyes and giggles
 *  - Organic SVG paint splat buttons with glossy reflections and high readability
 *  - Background watercolor canvas splatter engine with liquid physics
 *  - Dual Play: Guided 3-Round Star Match Game + Sensory Free Splash Mode
 *  - Multi-sensory Web Audio (wet paint splats, bubble pops, giggles, chimes, fanfares)
 *  - OtisSpeech spoken color pronunciation & non-punitive guidance
 *  - Independent Sound (🎵) & Voice (🗣️) toggles with localStorage persistence
 *  - Inactivity hint assist after 6 seconds of idle time
 *  - 3 progressive rounds with golden star badge rewards
 */

(function () {
  'use strict';

  // ==========================================
  // 1. COLOR DATABASE & PALETTES
  // ==========================================
  const COLORS = {
    red: {
      id: 'red',
      name: 'Red',
      spokenName: 'Red',
      hex: '#EF4444',
      gradStops: ['#F87171', '#DC2626'],
      darkHex: '#B91C1C',
      textColor: '#FFFFFF',
      lightBg: '#FEE2E2'
    },
    blue: {
      id: 'blue',
      name: 'Blue',
      spokenName: 'Blue',
      hex: '#3B82F6',
      gradStops: ['#60A5FA', '#2563EB'],
      darkHex: '#1D4ED8',
      textColor: '#FFFFFF',
      lightBg: '#DBEAFE'
    },
    yellow: {
      id: 'yellow',
      name: 'Yellow',
      spokenName: 'Yellow',
      hex: '#FACC15',
      gradStops: ['#FEF08A', '#EAB308'],
      darkHex: '#CA8A04',
      textColor: '#713F12',
      lightBg: '#FEF9C3'
    },
    green: {
      id: 'green',
      name: 'Green',
      spokenName: 'Green',
      hex: '#22C55E',
      gradStops: ['#4ADE80', '#16A34A'],
      darkHex: '#15803D',
      textColor: '#FFFFFF',
      lightBg: '#DCFCE7'
    },
    orange: {
      id: 'orange',
      name: 'Orange',
      spokenName: 'Orange',
      hex: '#F97316',
      gradStops: ['#FB923C', '#EA580C'],
      darkHex: '#C2410C',
      textColor: '#FFFFFF',
      lightBg: '#FFEDD5'
    },
    purple: {
      id: 'purple',
      name: 'Purple',
      spokenName: 'Purple',
      hex: '#A855F7',
      gradStops: ['#C084FC', '#9333EA'],
      darkHex: '#7E22CE',
      textColor: '#FFFFFF',
      lightBg: '#F3E8FF'
    },
    pink: {
      id: 'pink',
      name: 'Pink',
      spokenName: 'Pink',
      hex: '#EC4899',
      gradStops: ['#F472B6', '#DB2777'],
      darkHex: '#BE185D',
      textColor: '#FFFFFF',
      lightBg: '#FCE7F3'
    },
    cyan: {
      id: 'cyan',
      name: 'Sky Blue',
      spokenName: 'Sky Blue',
      hex: '#06B6D4',
      gradStops: ['#67E8F9', '#0891B2'],
      darkHex: '#0E7490',
      textColor: '#FFFFFF',
      lightBg: '#CFFAFE'
    },
    brown: {
      id: 'brown',
      name: 'Brown',
      spokenName: 'Brown',
      hex: '#8D6E63',
      gradStops: ['#A1887F', '#6D4C41'],
      darkHex: '#4E342E',
      textColor: '#FFFFFF',
      lightBg: '#EFEBE9'
    },
    white: {
      id: 'white',
      name: 'White',
      spokenName: 'White',
      hex: '#FFFFFF',
      gradStops: ['#FFFFFF', '#E2E8F0'],
      darkHex: '#94A3B8',
      textColor: '#334155',
      lightBg: '#F8FAFC'
    },
    rainbow: {
      id: 'rainbow',
      name: 'Rainbow',
      spokenName: 'Rainbow',
      hex: '#EC4899',
      gradStops: ['#F43F5E', '#8B5CF6'],
      darkHex: '#6D28D9',
      textColor: '#FFFFFF',
      lightBg: '#F5F3FF',
      isRainbow: true
    }
  };

  // Rounds Structure
  const ROUNDS_CONFIG = [
    {
      roundNum: 1,
      title: 'Primary Colors',
      pool: ['red', 'blue', 'yellow'],
      turnsCount: 3,
      optionsPerTurn: 3
    },
    {
      roundNum: 2,
      title: 'Rainbow Garden',
      pool: ['green', 'orange', 'purple', 'pink'],
      turnsCount: 4,
      optionsPerTurn: 4
    },
    {
      roundNum: 3,
      title: 'Master Painter',
      pool: ['cyan', 'brown', 'white', 'rainbow'],
      turnsCount: 4,
      optionsPerTurn: 4
    }
  ];

  // Praise phrases for toddlers
  const PRAISE_PHRASES = [
    'Super splash!',
    'Great job!',
    'Wonderful!',
    'Awesome!',
    'Splendid color!',
    'Yay, high five!',
    'You did it!'
  ];

  // ==========================================
  // 2. AUDIO & SPEECH SYNTHESIZER
  // ==========================================
  const SoundEngine = {
    soundEnabled: localStorage.getItem('otisplay_sound') !== 'false',
    voiceEnabled: localStorage.getItem('otisplay_voice') !== 'false',

    toggleSound() {
      this.soundEnabled = !this.soundEnabled;
      localStorage.setItem('otisplay_sound', this.soundEnabled);
      return this.soundEnabled;
    },

    toggleVoice() {
      this.voiceEnabled = !this.voiceEnabled;
      localStorage.setItem('otisplay_voice', this.voiceEnabled);
      return this.voiceEnabled;
    },

    getAudioContext() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        if (!window._csAudioCtx) {
          window._csAudioCtx = new AudioCtx();
        }
        if (window._csAudioCtx.state === 'suspended') {
          window._csAudioCtx.resume();
        }
        return window._csAudioCtx;
      } catch (e) {
        return null;
      }
    },

    // Juicy paint splatter liquid sound
    playSplash() {
      if (!this.soundEnabled) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;
      try {
        const t = ctx.currentTime;

        // Bubble oscillator drop
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(360, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.18);
        oscGain.gain.setValueAtTime(0.35, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.18);

        // Filtered noise burst for liquid "splat"
        const bufferSize = ctx.sampleRate * 0.12;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, t);
        filter.frequency.exponentialRampToValueAtTime(300, t + 0.12);
        filter.Q.value = 2.5;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.2, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        whiteNoise.start(t);
        whiteNoise.stop(t + 0.12);
      } catch (e) {}
    },

    // Light playful bubble pop for canvas touches
    playBubblePop() {
      if (!this.soundEnabled) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;
      try {
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const startFreq = 500 + Math.random() * 250;
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.09);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
      } catch (e) {}
    },

    // Cute squeak / giggle when tapping Splishy
    playGiggle() {
      if (!this.soundEnabled) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;
      try {
        const t = ctx.currentTime;
        // Chirp 1
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(450, t);
        osc1.frequency.exponentialRampToValueAtTime(680, t + 0.07);
        gain1.gain.setValueAtTime(0.2, t);
        gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(t);
        osc1.stop(t + 0.07);

        // Chirp 2
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(650, t + 0.08);
        osc2.frequency.exponentialRampToValueAtTime(920, t + 0.16);
        gain2.gain.setValueAtTime(0.22, t + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(t + 0.08);
        osc2.stop(t + 0.16);
      } catch (e) {}
    },

    playChime() {
      if (!this.soundEnabled) return;
      try {
        if (window.OtisAudio && typeof window.OtisAudio.playChime === 'function') {
          window.OtisAudio.playChime();
        }
      } catch (e) {}
    },

    playWobble() {
      if (!this.soundEnabled) return;
      try {
        if (window.OtisAudio && typeof window.OtisAudio.playWobble === 'function') {
          window.OtisAudio.playWobble();
        }
      } catch (e) {}
    },

    playFanfare() {
      if (!this.soundEnabled) return;
      try {
        if (window.OtisAudio && typeof window.OtisAudio.playFanfare === 'function') {
          window.OtisAudio.playFanfare();
        }
      } catch (e) {}
    },

    speak(text) {
      if (!this.voiceEnabled) return;
      try {
        if (window.OtisSpeech && typeof window.OtisSpeech.speak === 'function') {
          window.OtisSpeech.speak(text);
        } else if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          utter.rate = 0.9;
          utter.pitch = 1.25;
          utter.lang = 'en-US';
          window.speechSynthesis.speak(utter);
        }
      } catch (e) {}
    }
  };

  // ==========================================
  // 3. SVG ARTWORK GENERATORS
  // ==========================================

  // Splishy the Paint Droplet Character
  function buildSplishySVG(color, isHappy = false) {
    const gradId = `splishy-grad-${color.id}`;
    let fillAttr = `url(#${gradId})`;
    let gradDef = `
      <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color.gradStops[0]}"/>
        <stop offset="100%" stop-color="${color.gradStops[1]}"/>
      </linearGradient>
    `;

    if (color.isRainbow) {
      fillAttr = `url(#splishy-grad-rainbow)`;
      gradDef = `
        <linearGradient id="splishy-grad-rainbow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#EF4444"/>
          <stop offset="25%" stop-color="#FACC15"/>
          <stop offset="50%" stop-color="#22C55E"/>
          <stop offset="75%" stop-color="#06B6D4"/>
          <stop offset="100%" stop-color="#A855F7"/>
        </linearGradient>
      `;
    }

    const strokeColor = color.darkHex || '#475569';
    const cheekFill = color.id === 'pink' || color.id === 'red' ? '#FFFFFF' : '#FFAEC0';
    const cheekOpacity = color.id === 'pink' || color.id === 'red' ? '0.6' : '0.85';

    // Face features (Happy wide eyes vs Kawaii normal eyes)
    let eyeLeft, eyeRight, mouth;
    if (isHappy) {
      // Cheerful crescent eyes ^ ^
      eyeLeft = `<path d="M 46 95 Q 56 82 66 95" fill="none" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round"/>`;
      eyeRight = `<path d="M 94 95 Q 104 82 114 95" fill="none" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round"/>`;
      mouth = `
        <path d="M 66 112 Q 80 132 94 112 Z" fill="#E11D48" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M 72 122 Q 80 128 88 122" fill="#FDA4AF"/>
      `;
    } else {
      // Kawaii sparkle eyes with blinking
      eyeLeft = `
        <g class="cs-eye">
          <ellipse cx="56" cy="94" rx="7.5" ry="8.5" fill="#1E293B"/>
          <circle cx="53" cy="90" r="3" fill="#FFFFFF"/>
          <circle cx="58" cy="97" r="1.5" fill="#FFFFFF"/>
        </g>
      `;
      eyeRight = `
        <g class="cs-eye">
          <ellipse cx="104" cy="94" rx="7.5" ry="8.5" fill="#1E293B"/>
          <circle cx="101" cy="90" r="3" fill="#FFFFFF"/>
          <circle cx="106" cy="97" r="1.5" fill="#FFFFFF"/>
        </g>
      `;
      mouth = `<path d="M 70 114 Q 80 125 90 114" fill="none" stroke="#1E293B" stroke-width="3.5" stroke-linecap="round"/>`;
    }

    return `
      <svg viewBox="0 0 160 180" class="cs-character-svg" role="img" aria-label="Splishy the ${color.name} Paint Droplet">
        <defs>
          ${gradDef}
          <filter id="cs-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Main Teardrop Paint Body -->
        <path d="M 80 16
                 C 94 48, 138 88, 138 126
                 C 138 158, 112 176, 80 176
                 C 48 176, 22 158, 22 126
                 C 22 88, 66 48, 80 16 Z"
              fill="${fillAttr}"
              stroke="${strokeColor}"
              stroke-width="3.5"
              stroke-linejoin="round"/>

        <!-- Glossy Specular Light Reflection -->
        <path d="M 80 28
                 C 88 52, 118 82, 122 110
                 C 123 118, 114 118, 112 110
                 C 108 85, 82 56, 75 35
                 C 73 30, 78 26, 80 28 Z"
              fill="rgba(255, 255, 255, 0.55)"/>

        <!-- Side Highlight Bubble -->
        <ellipse cx="40" cy="135" rx="8" ry="14" fill="rgba(255, 255, 255, 0.3)" transform="rotate(-30 40 135)"/>

        <!-- Kawaii Face Features -->
        <g class="cs-face">
          <!-- Rosy Cheeks -->
          <ellipse cx="44" cy="108" rx="6.5" ry="4.5" fill="${cheekFill}" opacity="${cheekOpacity}"/>
          <ellipse cx="116" cy="108" rx="6.5" ry="4.5" fill="${cheekFill}" opacity="${cheekOpacity}"/>

          <!-- Eyes -->
          ${eyeLeft}
          ${eyeRight}

          <!-- Mouth -->
          ${mouth}
        </g>
      </svg>
    `;
  }

  // Organic Paint Splat Button SVG
  function buildSplatButtonSVG(color) {
    const gradId = `splat-grad-${color.id}`;
    let fillAttr = `url(#${gradId})`;
    let gradDef = `
      <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${color.gradStops[0]}"/>
        <stop offset="100%" stop-color="${color.gradStops[1]}"/>
      </linearGradient>
    `;

    if (color.isRainbow) {
      fillAttr = `url(#splat-grad-rainbow)`;
      gradDef = `
        <linearGradient id="splat-grad-rainbow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#EF4444"/>
          <stop offset="30%" stop-color="#FACC15"/>
          <stop offset="60%" stop-color="#22C55E"/>
          <stop offset="85%" stop-color="#06B6D4"/>
          <stop offset="100%" stop-color="#A855F7"/>
        </linearGradient>
      `;
    }

    const strokeColor = color.darkHex || '#334155';

    return `
      <svg viewBox="0 0 100 100" class="cs-splat-svg" role="img" aria-hidden="true">
        <defs>${gradDef}</defs>
        <!-- Soft Drop Shadow Under Blob -->
        <path d="M 50 12
                 C 66 10, 74 21, 82 28
                 C 92 36, 97 51, 92 67
                 C 88 81, 80 88, 68 94
                 C 54 100, 38 96, 27 89
                 C 14 80, 6 65, 10 49
                 C 14 31, 32 14, 50 12 Z"
              fill="rgba(0, 0, 0, 0.12)"/>

        <!-- Main Splat Blob -->
        <path d="M 50 8
                 C 66 6, 74 18, 82 25
                 C 92 33, 97 48, 92 64
                 C 88 78, 80 85, 68 91
                 C 54 97, 38 93, 27 86
                 C 14 77, 6 62, 10 46
                 C 14 28, 32 10, 50 8 Z"
              fill="${fillAttr}"
              stroke="#FFFFFF"
              stroke-width="4.5"/>

        <path d="M 50 8
                 C 66 6, 74 18, 82 25
                 C 92 33, 97 48, 92 64
                 C 88 78, 80 85, 68 91
                 C 54 97, 38 93, 27 86
                 C 14 77, 6 62, 10 46
                 C 14 28, 32 10, 50 8 Z"
              fill="none"
              stroke="${strokeColor}"
              stroke-width="1.8"/>

        <!-- Splatter Drips -->
        <circle cx="88" cy="18" r="4.5" fill="${fillAttr}" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="95" cy="74" r="3.5" fill="${fillAttr}" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="16" cy="80" r="4" fill="${fillAttr}" stroke="#FFFFFF" stroke-width="1.5"/>
        <circle cx="12" cy="22" r="3.2" fill="${fillAttr}" stroke="#FFFFFF" stroke-width="1.5"/>

        <!-- Specular Highlight Drop -->
        <path d="M 38 18 C 50 14 62 16 70 24 C 62 21 50 20 40 24 C 36 26 34 22 38 18 Z" fill="rgba(255, 255, 255, 0.65)"/>
        <ellipse cx="30" cy="34" rx="4.5" ry="7" fill="rgba(255, 255, 255, 0.45)" transform="rotate(-30 30 34)"/>
      </svg>
    `;
  }

  // Organic Paint Puddle Base SVG (Underneath 3D cushion buttons, matching Image 1)
  function buildPuddleSVG(color) {
    let fillColor = color.hex;
    if (color.isRainbow) fillColor = '#8B5CF6';

    return `
      <svg viewBox="0 0 130 90" class="cs-puddle-svg" aria-hidden="true">
        <path d="M 24 45
                 C 10 32, 12 18, 28 15
                 C 45 12, 54 20, 65 15
                 C 78 10, 95 12, 108 18
                 C 122 25, 125 40, 116 52
                 C 126 66, 116 80, 100 82
                 C 88 84, 80 74, 68 76
                 C 54 82, 42 84, 32 78
                 C 20 72, 14 66, 12 55
                 C 10 48, 16 46, 24 45 Z"
              fill="${fillColor}"
              opacity="0.95"/>
        <circle cx="14" cy="62" r="3.5" fill="${fillColor}"/>
        <circle cx="118" cy="72" r="4.2" fill="${fillColor}"/>
        <circle cx="94" cy="85" r="3.2" fill="${fillColor}"/>
        <circle cx="28" cy="12" r="2.8" fill="${fillColor}"/>
      </svg>
    `;
  }

  // ==========================================
  // 4. WATERCOLOR CANVAS SPLATTER SYSTEM
  // ==========================================
  class SplashCanvasEngine {
    constructor(canvasEl) {
      this.canvas = canvasEl;
      this.ctx = canvasEl.getContext('2d');
      this.splats = [];
      this.resize();
      window.addEventListener('resize', () => this.resize());
      if (window.ResizeObserver && this.canvas.parentElement) {
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.canvas.parentElement);
      }
    }

    resize() {
      if (!this.canvas.parentElement) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = Math.round(rect.width * dpr);
      this.canvas.height = Math.round(rect.height * dpr);
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
      this.redraw();
    }

    clear() {
      const dpr = window.devicePixelRatio || 1;
      this.ctx.clearRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);
      this.splats = [];
    }

    addSplash(x, y, colorHex, baseRadius = 40, count = 14) {
      // Generate smooth harmonic boundary points (zero sharp edges!)
      const numPoints = 16;
      const points = [];
      const phase = Math.random() * Math.PI * 2;
      const waveFreq1 = 3;
      const waveFreq2 = 5;

      for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints;
        const lobe1 = Math.sin(angle * waveFreq1 + phase) * 0.28;
        const lobe2 = Math.cos(angle * waveFreq2 + phase * 1.4) * 0.16;
        const jitter = (Math.random() - 0.5) * 0.12;
        const r = baseRadius * Math.max(0.65, (1.0 + lobe1 + lobe2 + jitter));
        points.push({
          x: x + Math.cos(angle) * r,
          y: y + Math.sin(angle) * r
        });
      }

      // Natural satellite droplets of varied sizes
      const droplets = [];
      const dropCount = Math.floor(count * (0.8 + Math.random() * 0.5));
      for (let i = 0; i < dropCount; i++) {
        const angle = (Math.PI * 2 * i) / dropCount + (Math.random() - 0.5) * 0.8;
        const dist = baseRadius * (1.2 + Math.random() * 1.5);
        const radius = Math.max(2, (baseRadius * 0.18) * (0.35 + Math.random() * 0.9));
        droplets.push({
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          r: radius
        });
      }

      const splatData = {
        x,
        y,
        colorHex,
        baseRadius,
        points,
        droplets
      };

      this.splats.push(splatData);
      if (this.splats.length > 60) this.splats.shift(); // Limit canvas memory

      this.drawSplat(splatData);
    }

    drawSplat(splat) {
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = 0.84;
      ctx.fillStyle = splat.colorHex;

      // 1. Draw smooth organic central splash using quadratic bezier curve through midpoints (NO sharp edges!)
      const pts = splat.points;
      const len = pts.length;
      if (len >= 3) {
        ctx.beginPath();
        const firstMidX = (pts[0].x + pts[len - 1].x) / 2;
        const firstMidY = (pts[0].y + pts[len - 1].y) / 2;
        ctx.moveTo(firstMidX, firstMidY);

        for (let i = 0; i < len; i++) {
          const next = pts[(i + 1) % len];
          const midX = (pts[i].x + next.x) / 2;
          const midY = (pts[i].y + next.y) / 2;
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, midX, midY);
        }
        ctx.closePath();
        ctx.fill();
      }

      // 2. Natural satellite droplets
      splat.droplets.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    }

    redraw() {
      const dpr = window.devicePixelRatio || 1;
      this.ctx.clearRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);
      this.splats.forEach(s => this.drawSplat(s));
    }
  }

  // ==========================================
  // 5. GAME CONTROLLER
  // ==========================================
  class ColorSplashGame {
    constructor() {
      // DOM Elements
      this.charBox = document.getElementById('csCharacterBox');
      this.charSection = document.getElementById('csCharacterSection');
      this.auraGlow = document.getElementById('csAuraGlow');
      this.promptBubble = document.getElementById('csPromptBubble');
      this.promptText = document.getElementById('csPromptText');
      this.optionsContainer = document.getElementById('csOptionsContainer');
      this.statusMsg = document.getElementById('csStatusMsg');
      this.canvasEl = document.getElementById('csSplashCanvas');

      // Control Buttons
      this.btnSound = document.getElementById('btnSound');
      this.btnVoice = document.getElementById('btnVoice');
      this.btnReset = document.getElementById('btnReset');
      this.btnMode = document.getElementById('btnMode');
      this.freeStudioBar = document.getElementById('csFreeStudioBar');
      this.freePaletteScroll = document.getElementById('csFreePaletteScroll');
      this.btnClearCanvas = document.getElementById('btnClearCanvas');

      // Star Badges
      this.stars = [
        document.getElementById('csStar1'),
        document.getElementById('csStar2'),
        document.getElementById('csStar3')
      ];

      // Canvas Engine
      this.canvasEngine = new SplashCanvasEngine(this.canvasEl);

      // State
      this.currentRoundIndex = 0;
      this.turnInRound = 0;
      this.currentTargetColor = null;
      this.canTap = true;
      this.isFreeMode = false;
      this.selectedFreeColor = COLORS.red;
      this.idleTimer = null;
      this.isHintActive = false;

      this.init();
    }

    init() {
      this.bindControls();
      this.setupFreePalette();
      this.setupCanvasInteractivity();
      this.updateToolbarIcons();
      this.loadRound(0);
    }

    bindControls() {
      // Sound Toggle
      if (this.btnSound) {
        this.btnSound.addEventListener('click', () => {
          const enabled = SoundEngine.toggleSound();
          this.btnSound.classList.toggle('muted', !enabled);
          this.btnSound.innerHTML = enabled ? '<span>🎵</span><span>Sound</span>' : '<span>🔇</span><span>Muted</span>';
          if (enabled) SoundEngine.playBubblePop();
        });
      }

      // Voice Toggle
      if (this.btnVoice) {
        this.btnVoice.addEventListener('click', () => {
          const enabled = SoundEngine.toggleVoice();
          this.btnVoice.classList.toggle('muted', !enabled);
          this.btnVoice.innerHTML = enabled ? '<span>🗣️</span><span>Voice</span>' : '<span>🤫</span><span>Voice Off</span>';
          if (enabled) SoundEngine.speak('Voice is on!');
        });
      }

      // Reset Button
      if (this.btnReset) {
        this.btnReset.addEventListener('click', () => {
          SoundEngine.playBubblePop();
          this.canvasEngine.clear(); // Wipes all splashes clean!
          this.turnInRound = 0;
          this.loadRound(this.currentRoundIndex);
        });
      }

      // Mode Switch: Match Game vs Free Splash
      if (this.btnMode) {
        this.btnMode.addEventListener('click', () => {
          this.toggleMode();
        });
      }

      // Clear Canvas Button
      if (this.btnClearCanvas) {
        this.btnClearCanvas.addEventListener('click', () => {
          SoundEngine.playSplash();
          this.canvasEngine.clear();
        });
      }

      // Tapping Splishy directly -> giggle & wiggle & splash in free mode!
      if (this.charBox) {
        this.charBox.addEventListener('pointerdown', (e) => {
          e.stopPropagation();
          this.handleSplishyTap(e);
        });
      }

      // Tapping prompt bubble -> re-speak instructions
      if (this.promptBubble) {
        this.promptBubble.addEventListener('click', () => {
          if (this.currentTargetColor) {
            SoundEngine.playBubblePop();
            SoundEngine.speak(`Can you tap the ${this.currentTargetColor.spokenName} button?`);
          }
        });
      }
    }

    updateToolbarIcons() {
      if (this.btnSound) {
        const enabled = SoundEngine.soundEnabled;
        this.btnSound.classList.toggle('muted', !enabled);
        this.btnSound.innerHTML = enabled ? '<span>🎵</span><span>Sound</span>' : '<span>🔇</span><span>Muted</span>';
      }
      if (this.btnVoice) {
        const enabled = SoundEngine.voiceEnabled;
        this.btnVoice.classList.toggle('muted', !enabled);
        this.btnVoice.innerHTML = enabled ? '<span>🗣️</span><span>Voice</span>' : '<span>🤫</span><span>Voice Off</span>';
      }
    }

    toggleMode() {
      this.isFreeMode = !this.isFreeMode;
      SoundEngine.playBubblePop();
      this.canvasEngine.clear(); // Clear canvas on mode toggle!

      if (this.isFreeMode) {
        this.btnMode.innerHTML = '<span>🎯</span><span>Match Game</span>';
        this.btnMode.classList.add('active');
        this.freeStudioBar.classList.add('open');
        this.promptText.innerHTML = '🎨 Tap anywhere to splash paint!';
        this.optionsContainer.style.display = 'none';
        SoundEngine.speak('Free Splash mode! Tap anywhere to paint!');
      } else {
        this.btnMode.innerHTML = '<span>🎨</span><span>Free Splash</span>';
        this.btnMode.classList.remove('active');
        this.freeStudioBar.classList.remove('open');
        this.optionsContainer.style.display = 'flex';
        this.loadTurn();
      }
      this.canvasEngine.resize();
    }

    setupFreePalette() {
      if (!this.freePaletteScroll) return;
      this.freePaletteScroll.innerHTML = '';

      Object.values(COLORS).forEach((color) => {
        const well = document.createElement('button');
        well.className = 'cs-paint-well';
        if (color.isRainbow) well.classList.add('rainbow');
        else well.style.background = color.hex;
        well.title = color.name;
        well.setAttribute('aria-label', `Select ${color.name}`);

        if (color.id === this.selectedFreeColor.id) {
          well.classList.add('active');
        }

        well.addEventListener('click', () => {
          SoundEngine.playBubblePop();
          this.selectedFreeColor = color;
          this.freePaletteScroll.querySelectorAll('.cs-paint-well').forEach(w => w.classList.remove('active'));
          well.classList.add('active');
          this.charBox.innerHTML = buildSplishySVG(color);
          SoundEngine.speak(color.spokenName);
        });

        this.freePaletteScroll.appendChild(well);
      });
    }

    setupCanvasInteractivity() {
      // Tap anywhere on easel card or drag finger in Free Mode to paint splashes!
      const easel = document.getElementById('csEaselCard') || this.canvasEl.parentElement;
      if (!easel) return;

      let isPointerDown = false;
      let lastSplashX = -999;
      let lastSplashY = -999;
      let lastSplashTime = 0;

      const doSplash = (clientX, clientY, isDrag = false) => {
        const rect = this.canvasEl.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

        if (this.isFreeMode) {
          const color = this.selectedFreeColor.isRainbow
            ? COLORS[Object.keys(COLORS)[Math.floor(Math.random() * (Object.keys(COLORS).length - 1))]]
            : this.selectedFreeColor;
          const radius = isDrag ? 26 + Math.random() * 16 : 46 + Math.random() * 26;
          const dropCount = isDrag ? 7 : 14;
          this.canvasEngine.addSplash(x, y, color.hex, radius, dropCount);
          SoundEngine.playBubblePop();
          if (window.OtisParticles) {
            window.OtisParticles.burst(clientX, clientY, color.hex, isDrag ? 5 : 10);
          }
        } else if (!isDrag) {
          // In Match Mode: background gentle ripple on empty canvas space
          if (this.currentTargetColor) {
            this.canvasEngine.addSplash(x, y, this.currentTargetColor.hex, 30, 8);
            SoundEngine.playBubblePop();
          }
        }
        this.resetIdleTimer();
      };

      easel.addEventListener('pointerdown', (e) => {
        // If clicking buttons or other interactive controls outside the canvas, ignore
        if (
          e.target.closest('button') ||
          e.target.closest('.cs-prompt-bubble') ||
          e.target.closest('.cs-free-studio-bar')
        ) {
          return;
        }
        // In match mode, don't double-trigger if clicking the character directly (charBox handles it)
        if (!this.isFreeMode && e.target.closest('.cs-character-box')) {
          return;
        }

        isPointerDown = true;
        lastSplashX = e.clientX;
        lastSplashY = e.clientY;
        lastSplashTime = performance.now();
        doSplash(e.clientX, e.clientY, false);
      });

      easel.addEventListener('pointermove', (e) => {
        if (!isPointerDown || !this.isFreeMode) return;
        const now = performance.now();
        const dx = e.clientX - lastSplashX;
        const dy = e.clientY - lastSplashY;
        const dist = Math.hypot(dx, dy);
        // Responsive finger-painting while dragging on easel
        if (dist > 28 || (dist > 12 && now - lastSplashTime > 85)) {
          lastSplashX = e.clientX;
          lastSplashY = e.clientY;
          lastSplashTime = now;
          doSplash(e.clientX, e.clientY, true);
        }
      });

      const endPointer = () => {
        isPointerDown = false;
      };
      window.addEventListener('pointerup', endPointer);
      window.addEventListener('pointercancel', endPointer);
    }

    handleSplishyTap(e) {
      if (this.isFreeMode) {
        SoundEngine.playGiggle();
        this.charBox.classList.remove('giggle', 'bounce');
        void this.charBox.offsetWidth; // Trigger reflow
        this.charBox.classList.add('giggle');
        SoundEngine.speak(`${this.selectedFreeColor.spokenName}! Tee-hee!`);

        // Also splash paint at Splishy's position!
        const rect = this.canvasEl.getBoundingClientRect();
        const clientX = e && e.clientX ? e.clientX : (rect.left + rect.width / 2);
        const clientY = e && e.clientY ? e.clientY : (rect.top + rect.height / 2);
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const color = this.selectedFreeColor.isRainbow
          ? COLORS[Object.keys(COLORS)[Math.floor(Math.random() * (Object.keys(COLORS).length - 1))]]
          : this.selectedFreeColor;
        this.canvasEngine.addSplash(x, y, color.hex, 48 + Math.random() * 26, 14);
        SoundEngine.playBubblePop();
        if (window.OtisParticles) {
          window.OtisParticles.burst(clientX, clientY, color.hex, 10);
        }
        this.resetIdleTimer();
        return;
      }

      // In Match Mode: Splishy IS the target color!
      // If a child taps the big character, celebrate it as a correct match!
      const correctBtn = this.optionsContainer.querySelector(`[data-color-id="${this.currentTargetColor.id}"]`);
      if (correctBtn && this.canTap) {
        this.handleOptionTap(correctBtn, this.currentTargetColor);
      } else {
        SoundEngine.playGiggle();
        this.charBox.classList.add('giggle');
      }
    }

    // ==========================================
    // 6. ROUND & TURN MANAGEMENT
    // ==========================================

    loadRound(roundIdx) {
      if (roundIdx >= ROUNDS_CONFIG.length) {
        this.handleGameComplete();
        return;
      }

      this.currentRoundIndex = roundIdx;
      this.turnInRound = 0;
      const roundData = ROUNDS_CONFIG[roundIdx];

      // Update star badges UI
      this.stars.forEach((star, idx) => {
        if (idx < roundIdx) {
          star.classList.add('completed');
          star.innerHTML = '⭐';
        } else {
          star.classList.remove('completed');
          star.innerHTML = `${idx + 1}`;
        }
      });

      this.loadTurn();
    }

    loadTurn() {
      const roundData = ROUNDS_CONFIG[this.currentRoundIndex];
      this.canTap = true;
      this.isHintActive = false;

      // Pick target color for this turn
      const pool = roundData.pool;
      const targetColorKey = pool[this.turnInRound % pool.length];
      this.currentTargetColor = COLORS[targetColorKey];

      // Render Splishy character
      this.charBox.innerHTML = buildSplishySVG(this.currentTargetColor, false);
      this.charBox.classList.remove('bounce', 'wobble', 'giggle');

      // Update aura glow color
      if (this.auraGlow) {
        this.auraGlow.style.background = `radial-gradient(ellipse at center, ${this.currentTargetColor.hex}55 0%, transparent 70%)`;
      }

      // Update Prompt text
      this.promptText.innerHTML = `Tap the <span class="target-highlight" style="background:${this.currentTargetColor.lightBg}; color:${this.currentTargetColor.darkHex}; padding: 3px 12px; border-radius: 999px; border: 2px solid ${this.currentTargetColor.hex}; font-weight:800; display:inline-block;">${this.currentTargetColor.name}</span> button!`;

      // Update Bottom Status
      this.statusMsg.innerHTML = `<span class="highlight">Round ${roundData.roundNum}</span> of 3 &middot; ${roundData.title} (${this.turnInRound + 1}/${roundData.turnsCount})`;

      // Pick distractor options
      const allColorKeys = Object.keys(COLORS).filter(k => k !== 'rainbow' && k !== this.currentTargetColor.id);
      const shuffledDistractors = window.shuffleArray ? window.shuffleArray(allColorKeys) : allColorKeys.sort(() => Math.random() - 0.5);

      const numDistractors = roundData.optionsPerTurn - 1;
      const turnOptions = [this.currentTargetColor];
      for (let i = 0; i < numDistractors; i++) {
        turnOptions.push(COLORS[shuffledDistractors[i]]);
      }

      // Shuffle options row
      const finalOptions = window.shuffleArray ? window.shuffleArray(turnOptions) : turnOptions.sort(() => Math.random() - 0.5);

      // Render 3D Cushion Buttons on Paint Puddle Bases (Matching Image 1)
      this.optionsContainer.innerHTML = '';
      finalOptions.forEach((optColor) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cs-cushion-btn';
        btn.dataset.colorId = optColor.id;
        btn.title = optColor.name;
        btn.setAttribute('aria-label', optColor.name);

        const isTarget = optColor.id === this.currentTargetColor.id;
        if (isTarget) {
          btn.classList.add('target-btn');
        }

        btn.innerHTML = `
          <!-- Paint Puddle Splash Base Underneath (Matching Image 1) -->
          <div class="cs-puddle-base">
            ${buildPuddleSVG(optColor)}
          </div>
          <!-- 3D Cushion Beveled Squircle Face (Matching Image 1) -->
          <div class="cs-cushion-face" style="background: linear-gradient(180deg, ${optColor.gradStops[0]} 0%, ${optColor.gradStops[1]} 100%);">
            <span class="cs-cushion-label" style="color: ${optColor.textColor}">${optColor.name}</span>
          </div>
        `;

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleOptionTap(btn, optColor);
        });

        this.optionsContainer.appendChild(btn);
      });

      // Spoken prompt
      SoundEngine.speak(`Tap the ${this.currentTargetColor.spokenName} button!`);

      // Arm idle hint timer
      this.resetIdleTimer();
    }

    handleOptionTap(btn, tappedColor) {
      if (!this.canTap) return;
      this.resetIdleTimer();

      // Clear any hint pulses
      this.optionsContainer.querySelectorAll('.cs-cushion-btn, .cs-splat-btn').forEach(b => b.classList.remove('hint'));

      if (tappedColor.id === this.currentTargetColor.id) {
        // === CORRECT TAP ===
        this.canTap = false;

        // Splat Sound & Harmonic Chime
        SoundEngine.playSplash();
        SoundEngine.playChime();

        // Splishy happy celebration bounce!
        this.charBox.innerHTML = buildSplishySVG(this.currentTargetColor, true);
        this.charBox.classList.remove('bounce', 'wobble');
        void this.charBox.offsetWidth;
        this.charBox.classList.add('bounce');

        btn.classList.add('matched');

        // Burst physical particle droplets
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (window.OtisParticles) {
          window.OtisParticles.burst(centerX, centerY, this.currentTargetColor.hex, 22);
        }

        // Splat huge watercolor splash on easel canvas behind Splishy!
        const charRect = this.charBox.getBoundingClientRect();
        const canvasRect = this.canvasEl.getBoundingClientRect();
        const splashX = (charRect.left + charRect.width / 2) - canvasRect.left;
        const splashY = (charRect.top + charRect.height / 2) - canvasRect.top;
        this.canvasEngine.addSplash(splashX, splashY, this.currentTargetColor.hex, 60, 16);

        // Encouraging speech praise
        const randomPraise = PRAISE_PHRASES[Math.floor(Math.random() * PRAISE_PHRASES.length)];
        SoundEngine.speak(`${this.currentTargetColor.spokenName}! ${randomPraise}`);

        // Advance progress
        this.turnInRound++;
        const roundData = ROUNDS_CONFIG[this.currentRoundIndex];

        setTimeout(() => {
          if (this.turnInRound >= roundData.turnsCount) {
            // Completed Round!
            this.handleRoundComplete();
          } else {
            // Next turn in same round
            this.loadTurn();
          }
        }, 1150);

      } else {
        // === GENTLE NON-PUNITIVE DISTRACTOR TAP ===
        btn.classList.add('wrong');
        SoundEngine.playWobble();

        // Educational spoken guidance: "That's Blue! Can you find Red?"
        SoundEngine.speak(`That's ${tappedColor.spokenName}! Where is ${this.currentTargetColor.spokenName}?`);

        setTimeout(() => {
          btn.classList.remove('wrong');
        }, 450);
      }
    }

    handleRoundComplete() {
      // Award star badge
      const star = this.stars[this.currentRoundIndex];
      if (star) {
        star.classList.add('completed');
        star.innerHTML = '⭐';
      }

      SoundEngine.playFanfare();

      // Show temporary celebratory status
      this.statusMsg.innerHTML = `<span class="highlight">⭐ Round ${this.currentRoundIndex + 1} Cleared!</span> Awesome!`;

      // Advance to next round after pleasant celebration pause
      setTimeout(() => {
        this.loadRound(this.currentRoundIndex + 1);
      }, 1400);
    }

    handleGameComplete() {
      // All 3 rounds mastered!
      SoundEngine.playFanfare();

      if (window.createCelebration) {
        window.createCelebration(
          document.body,
          'You are a Color Master! 🎨',
          '🌟',
          () => {
            // Play Again
            this.currentRoundIndex = 0;
            this.turnInRound = 0;
            this.canvasEngine.clear();
            this.loadRound(0);
          },
          () => {
            window.location.href = '../index.html';
          }
        );
      }

      this.statusMsg.innerHTML = `<span class="highlight">🌈 Amazing Artist!</span> You know all colors!`;
    }

    // ==========================================
    // 7. INACTIVITY HINT ASSIST
    // ==========================================

    resetIdleTimer() {
      if (this.idleTimer) clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        this.triggerIdleHint();
      }, 6000);
    }

    triggerIdleHint() {
      if (!this.canTap || this.isFreeMode || !this.currentTargetColor) return;
      this.isHintActive = true;

      // Splishy wiggles to draw toddler's attention
      this.charBox.classList.remove('giggle');
      void this.charBox.offsetWidth;
      this.charBox.classList.add('giggle');

      // Pulse correct splat button
      const correctBtn = this.optionsContainer.querySelector(`[data-color-id="${this.currentTargetColor.id}"]`);
      if (correctBtn) {
        correctBtn.classList.add('hint');
      }

      // Gentle voice reminder
      SoundEngine.speak(`Here is ${this.currentTargetColor.spokenName}!`);
    }
  }

  // ==========================================
  // 8. BOOTSTRAP ON LOAD
  // ==========================================
  window.addEventListener('DOMContentLoaded', () => {
    window._colorSplashApp = new ColorSplashGame();
  });

})();
