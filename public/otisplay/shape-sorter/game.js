/**
 * Shape Sorter — Modernized Game Engine (Otis Play)
 * Aimed at toddlers & young children (Ages 2-4)
 * Features:
 *  - Tactile wooden toybox feel
 *  - Dual interaction: Smooth Pointer Drag & Drop + Tap-to-Place
 *  - Magnetic snap proximity detection
 *  - Kawaii friendly facial expressions with blinking eyes
 *  - Rich Web Audio (wooden block snap + chimes + fanfares)
 *  - Spoken shape pronunciation via OtisSpeech
 *  - Sound and Voice toggle controls with localStorage persistence
 *  - 3 progressive rounds with 10 distinctive shapes
 *  - Idle hint assist for young children
 */

(function () {
  'use strict';

  // ==========================================
  // 1. SHAPE DATABASE & SVG GENERATOR
  // ==========================================
  const SHAPES_DATA = {
    circle: {
      id: 'circle',
      name: 'Circle',
      spokenName: 'Circle',
      color: '#FF6B8B',
      gradStops: ['#FFA2B6', '#FF537B'],
      stroke: '#E0335D',
      renderPath(isShadow) {
        if (isShadow) {
          return '<circle cx="50" cy="50" r="42" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4"/>';
        }
        return `
          <circle cx="50" cy="50" r="42" fill="url(#ss-grad-circle)" stroke="#E0335D" stroke-width="3"/>
          <ellipse cx="40" cy="24" rx="14" ry="7" fill="rgba(255,255,255,0.45)" transform="rotate(-25 40 24)"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="37" cy="48" r="4.5" fill="#2C3437"/><circle cx="39" cy="46" r="1.5" fill="#FFFFFF"/></g>
            <g class="ss-eye"><circle cx="63" cy="48" r="4.5" fill="#2C3437"/><circle cx="65" cy="46" r="1.5" fill="#FFFFFF"/></g>
            <ellipse cx="28" cy="55" rx="4.5" ry="3" fill="#FFAEC0" opacity="0.85"/>
            <ellipse cx="72" cy="55" rx="4.5" ry="3" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 43 55 Q 50 63 57 55" fill="none" stroke="#2C3437" stroke-width="3" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    square: {
      id: 'square',
      name: 'Square',
      spokenName: 'Square',
      color: '#20C997',
      gradStops: ['#5CF1C5', '#16A085'],
      stroke: '#107C66',
      renderPath(isShadow) {
        if (isShadow) {
          return '<rect x="10" y="10" width="80" height="80" rx="16" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4"/>';
        }
        return `
          <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#ss-grad-square)" stroke="#107C66" stroke-width="3"/>
          <path d="M 22 18 Q 50 14 78 18" stroke="rgba(255,255,255,0.4)" stroke-width="4" stroke-linecap="round" fill="none"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="37" cy="48" r="4.5" fill="#2C3437"/><circle cx="39" cy="46" r="1.5" fill="#FFFFFF"/></g>
            <g class="ss-eye"><circle cx="63" cy="48" r="4.5" fill="#2C3437"/><circle cx="65" cy="46" r="1.5" fill="#FFFFFF"/></g>
            <ellipse cx="28" cy="55" rx="4.5" ry="3" fill="#FFAEC0" opacity="0.85"/>
            <ellipse cx="72" cy="55" rx="4.5" ry="3" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 43 55 Q 50 63 57 55" fill="none" stroke="#2C3437" stroke-width="3" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    triangle: {
      id: 'triangle',
      name: 'Triangle',
      spokenName: 'Triangle',
      color: '#F59E0B',
      gradStops: ['#FDE047', '#EAB308'],
      stroke: '#CA8A04',
      renderPath(isShadow) {
        if (isShadow) {
          return '<path d="M 50 10 Q 56 10 60 18 L 92 74 Q 96 82 87 84 L 13 84 Q 4 82 8 74 L 40 18 Q 44 10 50 10 Z" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4"/>';
        }
        return `
          <path d="M 50 10 Q 56 10 60 18 L 92 74 Q 96 82 87 84 L 13 84 Q 4 82 8 74 L 40 18 Q 44 10 50 10 Z" fill="url(#ss-grad-triangle)" stroke="#CA8A04" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="41" cy="57" r="4" fill="#2C3437"/><circle cx="43" cy="55" r="1.3" fill="#FFFFFF"/></g>
            <g class="ss-eye"><circle cx="59" cy="57" r="4" fill="#2C3437"/><circle cx="61" cy="55" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="32" cy="63" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <ellipse cx="68" cy="63" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 45 64 Q 50 71 55 64" fill="none" stroke="#2C3437" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    star: {
      id: 'star',
      name: 'Star',
      spokenName: 'Star',
      color: '#FFB800',
      gradStops: ['#FFF066', '#FFA000'],
      stroke: '#D97706',
      renderPath(isShadow) {
        if (isShadow) {
          return '<polygon points="50,7 62,34 92,36 69,56 76,86 50,69 24,86 31,56 8,36 38,34" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4" stroke-linejoin="round"/>';
        }
        return `
          <polygon points="50,7 62,34 92,36 69,56 76,86 50,69 24,86 31,56 8,36 38,34" fill="url(#ss-grad-star)" stroke="#D97706" stroke-width="2.5" stroke-linejoin="round"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="42" cy="49" r="4" fill="#2C3437"/><circle cx="43.5" cy="47.5" r="1.3" fill="#FFFFFF"/></g>
            <g class="ss-eye"><circle cx="58" cy="49" r="4" fill="#2C3437"/><circle cx="59.5" cy="47.5" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="34" cy="55" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <ellipse cx="66" cy="55" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 45 56 Q 50 63 55 56" fill="none" stroke="#2C3437" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    heart: {
      id: 'heart',
      name: 'Heart',
      spokenName: 'Heart',
      color: '#F43F5E',
      gradStops: ['#FB7185', '#E11D48'],
      stroke: '#BE123C',
      renderPath(isShadow) {
        if (isShadow) {
          return '<path d="M 50 86 C 22 66 10 52 10 33 C 10 19 21 9 35 9 C 42 9 47 13 50 18 C 53 13 58 9 65 9 C 79 9 90 19 90 33 C 90 52 78 66 50 86 Z" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4"/>';
        }
        return `
          <path d="M 50 86 C 22 66 10 52 10 33 C 10 19 21 9 35 9 C 42 9 47 13 50 18 C 53 13 58 9 65 9 C 79 9 90 19 90 33 C 90 52 78 66 50 86 Z" fill="url(#ss-grad-heart)" stroke="#BE123C" stroke-width="3"/>
          <path d="M 22 22 Q 28 14 36 16" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round" fill="none"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="38" cy="42" r="4" fill="#2C3437"/><circle cx="40" cy="40" r="1.3" fill="#FFFFFF"/></g>
            <g class="ss-eye"><circle cx="62" cy="42" r="4" fill="#2C3437"/><circle cx="64" cy="40" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="30" cy="48" rx="4" ry="2.8" fill="#FFAEC0" opacity="0.85"/>
            <ellipse cx="70" cy="48" rx="4" ry="2.8" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 44 49 Q 50 56 56 49" fill="none" stroke="#2C3437" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    diamond: {
      id: 'diamond',
      name: 'Diamond',
      spokenName: 'Diamond',
      color: '#0EA5E9',
      gradStops: ['#38BDF8', '#0284C7'],
      stroke: '#0369A1',
      renderPath(isShadow) {
        if (isShadow) {
          return '<path d="M 50 8 Q 54 8 57 12 L 88 47 Q 92 50 88 53 L 57 88 Q 54 92 50 92 Q 46 92 43 88 L 12 53 Q 8 50 12 47 L 43 12 Q 46 8 50 8 Z" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4"/>';
        }
        return `
          <path d="M 50 8 Q 54 8 57 12 L 88 47 Q 92 50 88 53 L 57 88 Q 54 92 50 92 Q 46 92 43 88 L 12 53 Q 8 50 12 47 L 43 12 Q 46 8 50 8 Z" fill="url(#ss-grad-diamond)" stroke="#0369A1" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="40" cy="48" r="4" fill="#2C3437"/><circle cx="42" cy="46" r="1.3" fill="#FFFFFF"/></g>
            <g class="ss-eye"><circle cx="60" cy="48" r="4" fill="#2C3437"/><circle cx="62" cy="46" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="32" cy="54" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <ellipse cx="68" cy="54" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 44 55 Q 50 62 56 55" fill="none" stroke="#2C3437" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    hexagon: {
      id: 'hexagon',
      name: 'Hexagon',
      spokenName: 'Hexagon',
      color: '#8B5CF6',
      gradStops: ['#A78BFA', '#7C3AED'],
      stroke: '#6D28D9',
      renderPath(isShadow) {
        if (isShadow) {
          return '<path d="M 50 10 Q 55 10 58 14 L 88 32 Q 92 35 92 40 L 92 60 Q 92 65 88 68 L 58 86 Q 55 90 50 90 Q 45 90 42 86 L 12 68 Q 8 65 8 60 L 8 40 Q 8 35 12 32 L 42 14 Q 45 10 50 10 Z" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4"/>';
        }
        return `
          <path d="M 50 10 Q 55 10 58 14 L 88 32 Q 92 35 92 40 L 92 60 Q 92 65 88 68 L 58 86 Q 55 90 50 90 Q 45 90 42 86 L 12 68 Q 8 65 8 60 L 8 40 Q 8 35 12 32 L 42 14 Q 45 10 50 10 Z" fill="url(#ss-grad-hexagon)" stroke="#6D28D9" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="39" cy="48" r="4" fill="#2C3437"/><circle cx="41" cy="46" r="1.3" fill="#FFFFFF"/></g>
            <g class="ss-eye"><circle cx="61" cy="48" r="4" fill="#2C3437"/><circle cx="63" cy="46" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="31" cy="54" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <ellipse cx="69" cy="54" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 44 55 Q 50 62 56 55" fill="none" stroke="#2C3437" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    cloud: {
      id: 'cloud',
      name: 'Cloud',
      spokenName: 'Cloud',
      color: '#06B6D4',
      gradStops: ['#67E8F9', '#0891B2'],
      stroke: '#0E7490',
      renderPath(isShadow) {
        if (isShadow) {
          return '<path d="M 28 74 L 72 74 C 82 74 90 66 90 56 C 90 47 83 40 75 39 C 74 27 63 18 51 18 C 41 18 32 24 29 34 C 20 35 12 43 12 52 C 12 64 20 74 28 74 Z" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4"/>';
        }
        return `
          <path d="M 28 74 L 72 74 C 82 74 90 66 90 56 C 90 47 83 40 75 39 C 74 27 63 18 51 18 C 41 18 32 24 29 34 C 20 35 12 43 12 52 C 12 64 20 74 28 74 Z" fill="url(#ss-grad-cloud)" stroke="#0E7490" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="40" cy="51" r="4" fill="#2C3437"/><circle cx="42" cy="49" r="1.3" fill="#FFFFFF"/></g>
            <g class="ss-eye"><circle cx="60" cy="51" r="4" fill="#2C3437"/><circle cx="62" cy="49" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="32" cy="57" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <ellipse cx="68" cy="57" rx="3.5" ry="2.5" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 44 57 Q 50 64 56 57" fill="none" stroke="#2C3437" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    crescent: {
      id: 'crescent',
      name: 'Moon',
      spokenName: 'Crescent Moon',
      color: '#EAB308',
      gradStops: ['#FDE047', '#CA8A04'],
      stroke: '#A16207',
      renderPath(isShadow) {
        if (isShadow) {
          return '<path d="M 62 12 C 34 14 16 38 18 66 C 20 84 34 94 48 94 C 54 94 60 92 64 90 C 44 80 36 56 46 36 C 52 24 62 16 74 12 C 70 12 66 12 62 12 Z" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4"/>';
        }
        return `
          <path d="M 62 12 C 34 14 16 38 18 66 C 20 84 34 94 48 94 C 54 94 60 92 64 90 C 44 80 36 56 46 36 C 52 24 62 16 74 12 C 70 12 66 12 62 12 Z" fill="url(#ss-grad-crescent)" stroke="#A16207" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="35" cy="50" r="3.8" fill="#2C3437"/><circle cx="36.5" cy="48.5" r="1.2" fill="#FFFFFF"/></g>
            <ellipse cx="28" cy="57" rx="3.2" ry="2.2" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 33 58 Q 38 65 43 60" fill="none" stroke="#2C3437" stroke-width="2.5" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    oval: {
      id: 'oval',
      name: 'Oval',
      spokenName: 'Oval',
      color: '#10B981',
      gradStops: ['#6EE7B7', '#059669'],
      stroke: '#047857',
      renderPath(isShadow) {
        if (isShadow) {
          return '<ellipse cx="50" cy="50" rx="36" ry="44" fill="rgba(60,65,75,0.25)" stroke="rgba(80,85,95,0.4)" stroke-width="3" stroke-dasharray="5,4"/>';
        }
        return `
          <ellipse cx="50" cy="50" rx="36" ry="44" fill="url(#ss-grad-oval)" stroke="#047857" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="ss-face">
            <g class="ss-eye"><circle cx="39" cy="47" r="4" fill="#2C3437"/><circle cx="41" cy="45" r="1.3" fill="#FFFFFF"/></g>
            <g class="ss-eye"><circle cx="61" cy="47" r="4" fill="#2C3437"/><circle cx="63" cy="45" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="30" cy="54" rx="4" ry="2.8" fill="#FFAEC0" opacity="0.85"/>
            <ellipse cx="70" cy="54" rx="4" ry="2.8" fill="#FFAEC0" opacity="0.85"/>
            <path d="M 44 54 Q 50 62 56 54" fill="none" stroke="#2C3437" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    }
  };

  function createShapeSVG(shapeKey, isShadow = false) {
    const shape = SHAPES_DATA[shapeKey];
    if (!shape) return '';
    return `
      <svg viewBox="0 0 100 100" class="ss-svg" role="img" aria-label="${shape.name}">
        <defs>
          <linearGradient id="ss-grad-${shape.id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${shape.gradStops[0]}"/>
            <stop offset="100%" stop-color="${shape.gradStops[1]}"/>
          </linearGradient>
        </defs>
        ${shape.renderPath(isShadow)}
        ${!isShadow ? shape.renderFace() : ''}
      </svg>
    `;
  }

  // ==========================================
  // 2. AUDIO & SPEECH ENGINE
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

    playSnap() {
      if (!this.soundEnabled) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = OtisAudio._ctx || new AudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const t = ctx.currentTime;

        // Warm wood block tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(70, t + 0.08);
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.08);

        // Tactile snap transient
        const snap = ctx.createOscillator();
        const snapGain = ctx.createGain();
        snap.type = 'sine';
        snap.frequency.setValueAtTime(1400, t);
        snap.frequency.exponentialRampToValueAtTime(300, t + 0.04);
        snapGain.gain.setValueAtTime(0.3, t);
        snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        snap.connect(snapGain);
        snapGain.connect(ctx.destination);
        snap.start(t);
        snap.stop(t + 0.04);
      } catch (e) {}

      try {
        OtisAudio.playChime();
      } catch (e) {}
    },

    playLift() {
      if (!this.soundEnabled) return;
      try {
        OtisAudio.playPop();
      } catch (e) {}
    },

    playWobble() {
      if (!this.soundEnabled) return;
      try {
        OtisAudio.playWobble();
      } catch (e) {}
    },

    playFanfare() {
      if (!this.soundEnabled) return;
      try {
        OtisAudio.playFanfare();
      } catch (e) {}
    },

    speak(text) {
      if (!this.voiceEnabled) return;
      try {
        if (typeof OtisSpeech !== 'undefined' && OtisSpeech.speak) {
          OtisSpeech.speak(text);
        }
      } catch (e) {}
    }
  };

  // ==========================================
  // 3. ROUND PROGRESSION CONFIGURATION
  // ==========================================
  const ROUNDS_CONFIG = [
    {
      roundNum: 1,
      shapes: ['circle', 'square', 'triangle', 'star'],
      subtitle: 'Round 1 of 3: Find 4 fun shapes!'
    },
    {
      roundNum: 2,
      shapes: ['circle', 'square', 'triangle', 'heart', 'diamond'],
      subtitle: 'Round 2 of 3: 5 shapes to match!'
    },
    {
      roundNum: 3,
      shapes: ['star', 'heart', 'hexagon', 'cloud', 'crescent', 'oval'],
      subtitle: 'Round 3 of 3: Final challenge!'
    }
  ];

  // ==========================================
  // 4. GAME ENGINE
  // ==========================================
  let currentRoundIdx = 0;
  let activeShapes = [];
  let matchedCount = 0;
  let selectedShapeEl = null;
  let idleTimer = null;

  // Active drag tracking
  let activeDrag = null;

  // DOM Elements
  const trayGridEl = document.getElementById('trayGrid');
  const boardGridEl = document.getElementById('boardGrid');
  const statusMsgEl = document.getElementById('statusMsg');
  const starBadges = document.querySelectorAll('.ss-star-badge');
  const soundBtn = document.getElementById('btnSound');
  const voiceBtn = document.getElementById('btnVoice');
  const resetBtn = document.getElementById('btnReset');

  function updateControlsUI() {
    if (soundBtn) {
      soundBtn.classList.toggle('muted', !SoundEngine.soundEnabled);
      soundBtn.innerHTML = SoundEngine.soundEnabled
        ? '<span>🎵</span><span>Sound</span>'
        : '<span>🔇</span><span>Muted</span>';
    }
    if (voiceBtn) {
      voiceBtn.classList.toggle('muted', !SoundEngine.voiceEnabled);
      voiceBtn.innerHTML = SoundEngine.voiceEnabled
        ? '<span>🗣️</span><span>Voice</span>'
        : '<span>🤫</span><span>Quiet</span>';
    }
  }

  function updateStarsUI() {
    starBadges.forEach((badge, idx) => {
      badge.classList.toggle('completed', idx < currentRoundIdx);
      badge.innerHTML = idx < currentRoundIdx ? '⭐' : `${idx + 1}`;
    });
  }

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    // Remove any previous idle wiggle
    document.querySelectorAll('.ss-shape.idle-hint-wiggle').forEach(el => {
      el.classList.remove('idle-hint-wiggle');
      el.style.animation = '';
    });
    document.querySelectorAll('.ss-slot.hint-target').forEach(el => {
      el.classList.remove('hint-target');
    });

    idleTimer = setTimeout(() => {
      const remainingShapes = document.querySelectorAll('.ss-shape:not(.dragging)');
      if (remainingShapes.length > 0) {
        const hintShape = remainingShapes[0];
        hintShape.style.animation = 'idleHintWiggle 1s ease 3';
        const targetSlot = document.querySelector(`.ss-slot[data-shape-id="${hintShape.dataset.shapeId}"]:not(.filled)`);
        if (targetSlot) {
          targetSlot.classList.add('hint-target');
          setTimeout(() => targetSlot.classList.remove('hint-target'), 3500);
        }
      }
    }, 7000);
  }

  // ==========================================
  // 5. ROUND INITIALIZATION
  // ==========================================
  function startRound(roundIndex = 0) {
    if (roundIndex >= ROUNDS_CONFIG.length) {
      // Game Complete Celebration
      celebrateVictory();
      return;
    }

    currentRoundIdx = roundIndex;
    matchedCount = 0;
    selectedShapeEl = null;
    activeDrag = null;

    updateStarsUI();

    const roundData = ROUNDS_CONFIG[currentRoundIdx];
    activeShapes = [...roundData.shapes];

    if (statusMsgEl) {
      statusMsgEl.innerHTML = `<span class="highlight">Round ${roundData.roundNum}</span> of ${ROUNDS_CONFIG.length} &middot; Match ${activeShapes.length} shapes!`;
    }

    // Clear grids
    trayGridEl.innerHTML = '';
    boardGridEl.innerHTML = '';

    // Shuffle shapes for tray
    const trayShapes = shuffleArray([...activeShapes]);
    // Independently shuffle slots for puzzle board
    const slotShapes = shuffleArray([...activeShapes]);

    // Populate Tray with bays & shapes
    trayShapes.forEach((shapeKey, idx) => {
      const bay = document.createElement('div');
      bay.className = 'ss-bay';
      bay.dataset.bayIndex = idx;

      const shapeEl = document.createElement('div');
      shapeEl.className = 'ss-shape idle-breath';
      shapeEl.dataset.shapeId = shapeKey;
      shapeEl.dataset.bayIndex = idx;
      shapeEl.innerHTML = createShapeSVG(shapeKey, false);

      bay.appendChild(shapeEl);
      trayGridEl.appendChild(bay);

      setupShapeInteractions(shapeEl);
    });

    // Populate Puzzle Board with recessed cutout slots
    slotShapes.forEach((shapeKey) => {
      const slot = document.createElement('div');
      slot.className = 'ss-slot';
      slot.dataset.shapeId = shapeKey;
      slot.innerHTML = createShapeSVG(shapeKey, true);

      boardGridEl.appendChild(slot);

      setupSlotInteractions(slot);
    });

    resetIdleTimer();
  }

  // ==========================================
  // 6. SHAPE INTERACTION LOGIC (DRAG & TAP)
  // ==========================================
  function setupShapeInteractions(shapeEl) {
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerStartTime = 0;
    let isDragging = false;
    let currentBay = shapeEl.parentElement;
    let placeholder = null;
    let initialRect = null;
    let offsetX = 0;
    let offsetY = 0;

    shapeEl.addEventListener('pointerdown', (e) => {
      // Don't drag if filled
      if (shapeEl.classList.contains('placed') || shapeEl.classList.contains('locked')) return;

      resetIdleTimer();

      // Only left clicks / primary touches
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      pointerStartTime = performance.now();
      isDragging = false;

      initialRect = shapeEl.getBoundingClientRect();
      offsetX = e.clientX - initialRect.left;
      offsetY = e.clientY - initialRect.top;

      try {
        shapeEl.setPointerCapture(e.pointerId);
      } catch (err) {}

      // Pointermove listener for dragging
      const onPointerMove = (ev) => {
        const deltaX = ev.clientX - pointerStartX;
        const deltaY = ev.clientY - pointerStartY;
        const dist = Math.hypot(deltaX, deltaY);

        // Start drag once moved beyond 5px
        if (!isDragging && dist > 5) {
          isDragging = true;
          shapeEl.classList.remove('idle-breath');
          shapeEl.classList.add('dragging');
          shapeEl.classList.remove('selected');

          // If there was a tap selection elsewhere, clear it
          if (selectedShapeEl && selectedShapeEl !== shapeEl) {
            selectedShapeEl.classList.remove('selected');
            selectedShapeEl = null;
          }

          // Create placeholder to prevent tray reflow
          placeholder = document.createElement('div');
          placeholder.className = 'ss-placeholder';
          currentBay.appendChild(placeholder);

          // Position fixed to follow pointer
          shapeEl.style.width = `${initialRect.width}px`;
          shapeEl.style.height = `${initialRect.height}px`;
          shapeEl.style.left = `${initialRect.left}px`;
          shapeEl.style.top = `${initialRect.top}px`;

          SoundEngine.playLift();
          const shapeInfo = SHAPES_DATA[shapeEl.dataset.shapeId];
          if (shapeInfo) SoundEngine.speak(shapeInfo.spokenName);
        }

        if (isDragging) {
          const curLeft = ev.clientX - offsetX;
          const curTop = ev.clientY - offsetY;
          shapeEl.style.left = `${curLeft}px`;
          shapeEl.style.top = `${curTop}px`;

          // Check proximity to matching slots for magnetic snapping
          checkMagneticSnapping(shapeEl, ev.clientX, ev.clientY);
        }
      };

      const onPointerUp = (ev) => {
        try {
          shapeEl.releasePointerCapture(e.pointerId);
        } catch (err) {}

        shapeEl.removeEventListener('pointermove', onPointerMove);
        shapeEl.removeEventListener('pointerup', onPointerUp);
        shapeEl.removeEventListener('pointercancel', onPointerUp);

        const duration = performance.now() - pointerStartTime;
        const dist = Math.hypot(ev.clientX - pointerStartX, ev.clientY - pointerStartY);

        if (isDragging) {
          // Finish Drag & Drop
          finishDragDrop(shapeEl, currentBay, placeholder, ev.clientX, ev.clientY);
        } else if (dist < 8 && duration < 400) {
          // Clean Tap (Tap-to-Place Mode)
          handleShapeTap(shapeEl);
        }
      };

      shapeEl.addEventListener('pointermove', onPointerMove);
      shapeEl.addEventListener('pointerup', onPointerUp);
      shapeEl.addEventListener('pointercancel', onPointerUp);
    });
  }

  // Check magnetic proximity to slots while dragging
  function checkMagneticSnapping(shapeEl, clientX, clientY) {
    const shapeId = shapeEl.dataset.shapeId;
    let foundMagnetic = false;

    document.querySelectorAll('.ss-slot:not(.filled)').forEach(slot => {
      const rect = slot.getBoundingClientRect();
      const slotCenterX = rect.left + rect.width / 2;
      const slotCenterY = rect.top + rect.height / 2;
      const distance = Math.hypot(clientX - slotCenterX, clientY - slotCenterY);
      const snapRadius = Math.max(rect.width, rect.height) * 0.85;

      if (distance < snapRadius) {
        slot.classList.add('hover');
        if (slot.dataset.shapeId === shapeId) {
          slot.classList.add('magnetic');
          foundMagnetic = true;
        }
      } else {
        slot.classList.remove('hover');
        slot.classList.remove('magnetic');
      }
    });

    return foundMagnetic;
  }

  // Finish Drag and Drop
  function finishDragDrop(shapeEl, bayEl, placeholderEl, clientX, clientY) {
    shapeEl.classList.remove('dragging');

    // Find dropped slot
    const shapeId = shapeEl.dataset.shapeId;
    let targetSlot = null;
    let minDistance = Infinity;

    document.querySelectorAll('.ss-slot:not(.filled)').forEach(slot => {
      const rect = slot.getBoundingClientRect();
      const slotCenterX = rect.left + rect.width / 2;
      const slotCenterY = rect.top + rect.height / 2;
      const distance = Math.hypot(clientX - slotCenterX, clientY - slotCenterY);
      const snapRadius = Math.max(rect.width, rect.height) * 0.9;

      if (distance < snapRadius && distance < minDistance) {
        minDistance = distance;
        targetSlot = slot;
      }
    });

    // Clear hover and magnetic styles on all slots
    document.querySelectorAll('.ss-slot').forEach(s => {
      s.classList.remove('hover');
      s.classList.remove('magnetic');
    });

    if (targetSlot && targetSlot.dataset.shapeId === shapeId) {
      // MATCH!
      if (placeholderEl) placeholderEl.remove();
      executeSuccessfulMatch(shapeEl, targetSlot);
    } else {
      // MISSED OR WRONG DROP — Smooth elastic return to bay
      SoundEngine.playWobble();
      glideBackToBay(shapeEl, bayEl, placeholderEl);
    }
  }

  // Smooth elastic glide back to origin bay
  function glideBackToBay(shapeEl, bayEl, placeholderEl) {
    const bayRect = bayEl.getBoundingClientRect();
    shapeEl.style.transition = 'all 0.35s cubic-bezier(0.17, 0.89, 0.32, 1.25)';
    shapeEl.style.left = `${bayRect.left + (bayRect.width - shapeEl.offsetWidth) / 2}px`;
    shapeEl.style.top = `${bayRect.top + (bayRect.height - shapeEl.offsetHeight) / 2}px`;

    setTimeout(() => {
      shapeEl.style.transition = '';
      shapeEl.style.position = '';
      shapeEl.style.left = '';
      shapeEl.style.top = '';
      shapeEl.style.width = '';
      shapeEl.style.height = '';
      shapeEl.classList.add('idle-breath');
      if (placeholderEl) placeholderEl.remove();
      bayEl.appendChild(shapeEl);
    }, 360);
  }

  // Handle Tap-to-Select alternative
  function handleShapeTap(shapeEl) {
    SoundEngine.playLift();

    if (selectedShapeEl === shapeEl) {
      // Deselect
      shapeEl.classList.remove('selected');
      shapeEl.classList.add('idle-breath');
      selectedShapeEl = null;
      document.querySelectorAll('.ss-slot.hint-target').forEach(s => s.classList.remove('hint-target'));
      return;
    }

    if (selectedShapeEl) {
      selectedShapeEl.classList.remove('selected');
      selectedShapeEl.classList.add('idle-breath');
    }

    selectedShapeEl = shapeEl;
    shapeEl.classList.remove('idle-breath');
    shapeEl.classList.add('selected');

    const shapeInfo = SHAPES_DATA[shapeEl.dataset.shapeId];
    if (shapeInfo) SoundEngine.speak(shapeInfo.spokenName);

    // Gently highlight target slot for toddlers
    document.querySelectorAll('.ss-slot').forEach(s => {
      s.classList.remove('hint-target');
      if (s.dataset.shapeId === shapeEl.dataset.shapeId && !s.classList.contains('filled')) {
        s.classList.add('hint-target');
      }
    });
  }

  // ==========================================
  // 7. SLOT INTERACTION LOGIC (TAP TO PLACE)
  // ==========================================
  function setupSlotInteractions(slot) {
    slot.addEventListener('click', (e) => {
      resetIdleTimer();

      if (slot.classList.contains('filled')) return;

      if (selectedShapeEl) {
        if (slot.dataset.shapeId === selectedShapeEl.dataset.shapeId) {
          // Tap-to-Place Match!
          const shapeToPlace = selectedShapeEl;
          selectedShapeEl = null;
          document.querySelectorAll('.ss-slot.hint-target').forEach(s => s.classList.remove('hint-target'));
          flyShapeToSlot(shapeToPlace, slot);
        } else {
          // Wrong slot tap
          SoundEngine.playWobble();
          slot.classList.add('hover');
          setTimeout(() => slot.classList.remove('hover'), 300);
        }
      }
    });
  }

  // Animate shape flying from tray into slot for Tap-to-Place
  function flyShapeToSlot(shapeEl, slot) {
    const bay = shapeEl.parentElement;
    const startRect = shapeEl.getBoundingClientRect();
    const endRect = slot.getBoundingClientRect();

    const placeholder = document.createElement('div');
    placeholder.className = 'ss-placeholder';
    bay.appendChild(placeholder);

    shapeEl.classList.remove('selected');
    shapeEl.style.position = 'fixed';
    shapeEl.style.left = `${startRect.left}px`;
    shapeEl.style.top = `${startRect.top}px`;
    shapeEl.style.width = `${startRect.width}px`;
    shapeEl.style.height = `${startRect.height}px`;
    shapeEl.style.zIndex = '9999';
    shapeEl.style.transition = 'all 0.4s cubic-bezier(0.17, 0.89, 0.32, 1.25)';

    requestAnimationFrame(() => {
      shapeEl.style.left = `${endRect.left + (endRect.width - startRect.width) / 2}px`;
      shapeEl.style.top = `${endRect.top + (endRect.height - startRect.height) / 2}px`;
      shapeEl.style.transform = 'scale(1.05)';

      setTimeout(() => {
        placeholder.remove();
        executeSuccessfulMatch(shapeEl, slot);
      }, 400);
    });
  }

  // ==========================================
  // 8. SUCCESSFUL MATCH EXECUTION
  // ==========================================
  function executeSuccessfulMatch(shapeEl, slot) {
    const shapeId = shapeEl.dataset.shapeId;
    const shapeInfo = SHAPES_DATA[shapeId];

    // Audio & tactile feedback
    SoundEngine.playSnap();

    // Particle burst at slot center
    const rect = slot.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    try {
      if (typeof OtisParticles !== 'undefined' && OtisParticles.burst) {
        OtisParticles.burst(centerX, centerY, shapeInfo ? shapeInfo.color : '#FF7B89', 18);
        OtisParticles.burst(centerX, centerY, '#FFD700', 10);
      }
    } catch (e) {}

    // Mark slot filled with placed shape
    slot.classList.add('filled');
    slot.innerHTML = createShapeSVG(shapeId, false);
    slot.dataset.filled = 'true';

    // Remove dragging shape from DOM
    shapeEl.remove();

    matchedCount++;

    // Spoken encouragement
    const cheers = ['Great job!', 'Super!', 'Yay!', 'Awesome!'];
    const cheer = cheers[Math.floor(Math.random() * cheers.length)];
    if (shapeInfo) {
      SoundEngine.speak(`${shapeInfo.name}! ${cheer}`);
    }

    // Update status
    const remaining = activeShapes.length - matchedCount;
    if (statusMsgEl) {
      if (remaining > 0) {
        statusMsgEl.innerHTML = `<span class="highlight">${remaining}</span> shape${remaining === 1 ? '' : 's'} remaining!`;
      } else {
        statusMsgEl.innerHTML = `<span class="highlight">Round Complete! 🎉</span>`;
      }
    }

    // Check round complete
    if (matchedCount >= activeShapes.length) {
      handleRoundComplete();
    } else {
      resetIdleTimer();
    }
  }

  function handleRoundComplete() {
    clearTimeout(idleTimer);
    SoundEngine.playFanfare();

    // Update star badge
    if (starBadges[currentRoundIdx]) {
      starBadges[currentRoundIdx].classList.add('completed');
      starBadges[currentRoundIdx].innerHTML = '⭐';
    }

    setTimeout(() => {
      currentRoundIdx++;
      startRound(currentRoundIdx);
    }, 900);
  }

  // ==========================================
  // 9. VICTORY CELEBRATION
  // ==========================================
  function celebrateVictory() {
    clearTimeout(idleTimer);
    SoundEngine.playFanfare();

    if (statusMsgEl) {
      statusMsgEl.innerHTML = `🌟 <span class="highlight">All Done! You are a superstar!</span> 🌟`;
    }

    try {
      if (typeof createCelebration === 'function') {
        createCelebration(
          document.body,
          'You matched all the shapes!',
          '🌟',
          () => {
            startRound(0);
          },
          () => {
            window.location.href = '../index.html';
          }
        );
      }
    } catch (err) {
      // Fallback if shared celebration isn't available
      alert('Hooray! You matched all the shapes!');
      startRound(0);
    }
  }

  // Helper shuffle function (Fisher-Yates)
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ==========================================
  // 10. SETUP & GLOBAL LISTENERS
  // ==========================================
  function init() {
    updateControlsUI();
    updateStarsUI();

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        SoundEngine.toggleSound();
        updateControlsUI();
      });
    }

    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        SoundEngine.toggleVoice();
        updateControlsUI();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        SoundEngine.playLift();
        startRound(currentRoundIdx);
      });
    }

    // Dismiss active tap-selection if clicked outside
    document.addEventListener('pointerdown', (e) => {
      if (selectedShapeEl && !e.target.closest('.ss-shape') && !e.target.closest('.ss-slot')) {
        selectedShapeEl.classList.remove('selected');
        selectedShapeEl.classList.add('idle-breath');
        selectedShapeEl = null;
        document.querySelectorAll('.ss-slot.hint-target').forEach(s => s.classList.remove('hint-target'));
      }
    });

    startRound(0);
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
