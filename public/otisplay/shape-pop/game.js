/**
 * Shape Pop — Modernized Game Engine (Otis Play)
 * Tactile Floating Soap Bubbles & Balloons for Young Children (Ages 2-5)
 * Features:
 *  - Dual Play Modes:
 *      1. "Quest / Find & Pop": Guided rounds with spoken prompts & idle assist
 *      2. "Free Pop": Endless joyful bubble popping playground for toddlers
 *  - 10 Kawaii shapes with smiling faces & eye blinks
 *  - 8 Vibrant candy colors with gradients
 *  - Real-time Web Audio bubble pop synthesizer (variable pitch harmonics)
 *  - Spoken shape & color pronunciation via OtisSpeech
 *  - Smooth 60fps floating bubble physics with gentle drift
 *  - Water ripples, sparkle bursts, and OtisParticles
 *  - Multi-touch support for rapid, multi-finger popping
 *  - Sound, Voice, and Mode toggles with localStorage persistence
 */

(function () {
  'use strict';

  // ==========================================
  // 1. SHAPES & COLORS DATABASE
  // ==========================================
  const SHAPES_DATA = {
    circle: {
      id: 'circle',
      name: 'Circle',
      spokenName: 'Circle',
      renderPath(color) {
        return `
          <circle cx="50" cy="50" r="42" fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="3"/>
          <ellipse cx="40" cy="24" rx="14" ry="7" fill="rgba(255,255,255,0.45)" transform="rotate(-25 40 24)"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="37" cy="48" r="4.5" fill="#1E293B"/><circle cx="39" cy="46" r="1.5" fill="#FFFFFF"/></g>
            <g class="sp-eye"><circle cx="63" cy="48" r="4.5" fill="#1E293B"/><circle cx="65" cy="46" r="1.5" fill="#FFFFFF"/></g>
            <ellipse cx="28" cy="55" rx="4.5" ry="3" fill="#FDA7DF" opacity="0.85"/>
            <ellipse cx="72" cy="55" rx="4.5" ry="3" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 43 55 Q 50 63 57 55" fill="none" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    square: {
      id: 'square',
      name: 'Square',
      spokenName: 'Square',
      renderPath(color) {
        return `
          <rect x="10" y="10" width="80" height="80" rx="16" fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="3"/>
          <path d="M 22 18 Q 50 14 78 18" stroke="rgba(255,255,255,0.4)" stroke-width="4" stroke-linecap="round" fill="none"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="37" cy="48" r="4.5" fill="#1E293B"/><circle cx="39" cy="46" r="1.5" fill="#FFFFFF"/></g>
            <g class="sp-eye"><circle cx="63" cy="48" r="4.5" fill="#1E293B"/><circle cx="65" cy="46" r="1.5" fill="#FFFFFF"/></g>
            <ellipse cx="28" cy="55" rx="4.5" ry="3" fill="#FDA7DF" opacity="0.85"/>
            <ellipse cx="72" cy="55" rx="4.5" ry="3" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 43 55 Q 50 63 57 55" fill="none" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    triangle: {
      id: 'triangle',
      name: 'Triangle',
      spokenName: 'Triangle',
      renderPath(color) {
        return `
          <path d="M 50 10 Q 56 10 60 18 L 92 74 Q 96 82 87 84 L 13 84 Q 4 82 8 74 L 40 18 Q 44 10 50 10 Z" fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="41" cy="57" r="4" fill="#1E293B"/><circle cx="43" cy="55" r="1.3" fill="#FFFFFF"/></g>
            <g class="sp-eye"><circle cx="59" cy="57" r="4" fill="#1E293B"/><circle cx="61" cy="55" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="32" cy="63" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <ellipse cx="68" cy="63" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 45 64 Q 50 71 55 64" fill="none" stroke="#1E293B" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    star: {
      id: 'star',
      name: 'Star',
      spokenName: 'Star',
      renderPath(color) {
        return `
          <polygon points="50,7 62,34 92,36 69,56 76,86 50,69 24,86 31,56 8,36 38,34" fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="2.5" stroke-linejoin="round"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="42" cy="49" r="4" fill="#1E293B"/><circle cx="43.5" cy="47.5" r="1.3" fill="#FFFFFF"/></g>
            <g class="sp-eye"><circle cx="58" cy="49" r="4" fill="#1E293B"/><circle cx="59.5" cy="47.5" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="34" cy="55" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <ellipse cx="66" cy="55" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 45 56 Q 50 63 55 56" fill="none" stroke="#1E293B" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    heart: {
      id: 'heart',
      name: 'Heart',
      spokenName: 'Heart',
      renderPath(color) {
        return `
          <path d="M 50 86 C 22 66 10 52 10 33 C 10 19 21 9 35 9 C 42 9 47 13 50 18 C 53 13 58 9 65 9 C 79 9 90 19 90 33 C 90 52 78 66 50 86 Z" fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="3"/>
          <path d="M 22 22 Q 28 14 36 16" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round" fill="none"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="38" cy="42" r="4" fill="#1E293B"/><circle cx="40" cy="40" r="1.3" fill="#FFFFFF"/></g>
            <g class="sp-eye"><circle cx="62" cy="42" r="4" fill="#1E293B"/><circle cx="64" cy="40" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="30" cy="48" rx="4" ry="2.8" fill="#FDA7DF" opacity="0.85"/>
            <ellipse cx="70" cy="48" rx="4" ry="2.8" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 44 49 Q 50 56 56 49" fill="none" stroke="#1E293B" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    diamond: {
      id: 'diamond',
      name: 'Diamond',
      spokenName: 'Diamond',
      renderPath(color) {
        return `
          <path d="M 50 8 Q 54 8 57 12 L 88 47 Q 92 50 88 53 L 57 88 Q 54 92 50 92 Q 46 92 43 88 L 12 53 Q 8 50 12 47 L 43 12 Q 46 8 50 8 Z" fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="40" cy="48" r="4" fill="#1E293B"/><circle cx="42" cy="46" r="1.3" fill="#FFFFFF"/></g>
            <g class="sp-eye"><circle cx="60" cy="48" r="4" fill="#1E293B"/><circle cx="62" cy="46" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="32" cy="54" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <ellipse cx="68" cy="54" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 44 55 Q 50 62 56 55" fill="none" stroke="#1E293B" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    hexagon: {
      id: 'hexagon',
      name: 'Hexagon',
      spokenName: 'Hexagon',
      renderPath(color) {
        return `
          <path d="M 50 10 Q 55 10 58 14 L 88 32 Q 92 35 92 40 L 92 60 Q 92 65 88 68 L 58 86 Q 55 90 50 90 Q 45 90 42 86 L 12 68 Q 8 65 8 60 L 8 40 Q 8 35 12 32 L 42 14 Q 45 10 50 10 Z" fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="39" cy="48" r="4" fill="#1E293B"/><circle cx="41" cy="46" r="1.3" fill="#FFFFFF"/></g>
            <g class="sp-eye"><circle cx="61" cy="48" r="4" fill="#1E293B"/><circle cx="63" cy="46" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="31" cy="54" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <ellipse cx="69" cy="54" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 44 55 Q 50 62 56 55" fill="none" stroke="#1E293B" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    cloud: {
      id: 'cloud',
      name: 'Cloud',
      spokenName: 'Cloud',
      renderPath(color) {
        return `
          <path d="M 28 74 L 72 74 C 82 74 90 66 90 56 C 90 47 83 40 75 39 C 74 27 63 18 51 18 C 41 18 32 24 29 34 C 20 35 12 43 12 52 C 12 64 20 74 28 74 Z" fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="40" cy="51" r="4" fill="#1E293B"/><circle cx="42" cy="49" r="1.3" fill="#FFFFFF"/></g>
            <g class="sp-eye"><circle cx="60" cy="51" r="4" fill="#1E293B"/><circle cx="62" cy="49" r="1.3" fill="#FFFFFF"/></g>
            <ellipse cx="32" cy="57" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <ellipse cx="68" cy="57" rx="3.5" ry="2.5" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 44 57 Q 50 64 56 57" fill="none" stroke="#1E293B" stroke-width="2.8" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    crescent: {
      id: 'crescent',
      name: 'Moon',
      spokenName: 'Moon',
      renderPath(color) {
        return `
          <path d="M 62 12 C 34 14 16 38 18 66 C 20 84 34 94 48 94 C 54 94 60 92 64 90 C 44 80 36 56 46 36 C 52 24 62 16 74 12 C 70 12 66 12 62 12 Z" fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="3"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="35" cy="50" r="3.8" fill="#1E293B"/><circle cx="36.5" cy="48.5" r="1.2" fill="#FFFFFF"/></g>
            <ellipse cx="28" cy="57" rx="3.2" ry="2.2" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 33 58 Q 38 65 43 60" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>
          </g>
        `;
      }
    },
    flower: {
      id: 'flower',
      name: 'Flower',
      spokenName: 'Flower',
      renderPath(color) {
        return `
          <g fill="url(#sp-grad-${color.name})" stroke="${color.stroke}" stroke-width="2.5">
            <circle cx="50" cy="24" r="18"/>
            <circle cx="75" cy="42" r="18"/>
            <circle cx="65" cy="72" r="18"/>
            <circle cx="35" cy="72" r="18"/>
            <circle cx="25" cy="42" r="18"/>
          </g>
          <circle cx="50" cy="50" r="16" fill="#FFF275" stroke="#E5A910" stroke-width="2.5"/>
        `;
      },
      renderFace() {
        return `
          <g class="sp-face">
            <g class="sp-eye"><circle cx="44" cy="48" r="2.8" fill="#1E293B"/><circle cx="45" cy="47" r="1" fill="#FFFFFF"/></g>
            <g class="sp-eye"><circle cx="56" cy="48" r="2.8" fill="#1E293B"/><circle cx="57" cy="47" r="1" fill="#FFFFFF"/></g>
            <ellipse cx="40" cy="53" rx="2" ry="1.5" fill="#FDA7DF" opacity="0.85"/>
            <ellipse cx="60" cy="53" rx="2" ry="1.5" fill="#FDA7DF" opacity="0.85"/>
            <path d="M 46 52 Q 50 56 54 52" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
          </g>
        `;
      }
    }
  };

  const COLORS = [
    { name: 'red', spoken: 'Red', hex: '#FF4757', stops: ['#FF6B81', '#EE2E44'], stroke: '#D61930' },
    { name: 'yellow', spoken: 'Yellow', hex: '#FFC312', stops: ['#FED330', '#F79F1F'], stroke: '#D48810' },
    { name: 'blue', spoken: 'Blue', hex: '#0EA5E9', stops: ['#38BDF8', '#0284C7'], stroke: '#0369A1' },
    { name: 'green', spoken: 'Green', hex: '#2ED573', stops: ['#55E68C', '#20BF6B'], stroke: '#1B9A55' },
    { name: 'pink', spoken: 'Pink', hex: '#FDA7DF', stops: ['#FFB8EB', '#F368E0'], stroke: '#D94BBF' },
    { name: 'purple', spoken: 'Purple', hex: '#9980FA', stops: ['#A55EEA', '#8854D0'], stroke: '#703DB8' },
    { name: 'orange', spoken: 'Orange', hex: '#FF7F50', stops: ['#FFA07A', '#EE5A24'], stroke: '#C84010' }
  ];

  function getShapeKeys() {
    return Object.keys(SHAPES_DATA);
  }

  function createShapeSVG(shapeKey, color) {
    const shape = SHAPES_DATA[shapeKey];
    if (!shape) return '';
    return `
      <svg viewBox="0 0 100 100" class="sp-svg" role="img" aria-label="${color.spoken} ${shape.name}">
        <defs>
          <linearGradient id="sp-grad-${color.name}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color.stops[0]}"/>
            <stop offset="100%" stop-color="${color.stops[1]}"/>
          </linearGradient>
        </defs>
        ${shape.renderPath(color)}
        ${shape.renderFace()}
      </svg>
    `;
  }

  // ==========================================
  // 2. AUDIO & VOICE SYNTHESIZER
  // ==========================================
  const SoundEngine = {
    soundEnabled: localStorage.getItem('otisplay_sound') !== 'false',
    voiceEnabled: localStorage.getItem('otisplay_voice') !== 'false',
    audioCtx: null,

    getAudioContext() {
      if (!this.audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    },

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

    /**
     * Synthesizes a crisp, wet soap bubble pop with pleasant acoustic harmonics
     */
    playBubblePop(pitchShift = 1.0) {
      if (!this.soundEnabled) return;
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;
        const t = ctx.currentTime;

        // Base popping sweep (800Hz down to 120Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const startFreq = (750 + Math.random() * 150) * pitchShift;
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(110 * pitchShift, t + 0.09);

        gain.gain.setValueAtTime(0.45, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);

        // High frequency pop click transient (2600Hz down to 400Hz)
        const click = ctx.createOscillator();
        const clickGain = ctx.createGain();
        click.type = 'sine';
        click.frequency.setValueAtTime(2600 * pitchShift, t);
        click.frequency.exponentialRampToValueAtTime(450 * pitchShift, t + 0.035);

        clickGain.gain.setValueAtTime(0.35, t);
        clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

        click.connect(clickGain);
        clickGain.connect(ctx.destination);
        click.start(t);
        click.stop(t + 0.035);

        // Sub resonant thud (satisfying balloon body feel)
        const thud = ctx.createOscillator();
        const thudGain = ctx.createGain();
        thud.type = 'sine';
        thud.frequency.setValueAtTime(220 * pitchShift, t);
        thud.frequency.exponentialRampToValueAtTime(50 * pitchShift, t + 0.07);

        thudGain.gain.setValueAtTime(0.25, t);
        thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

        thud.connect(thudGain);
        thudGain.connect(ctx.destination);
        thud.start(t);
        thud.stop(t + 0.07);
      } catch (e) {}
    },

    /**
     * Soft wobble / funny squeak when child taps non-target in Quest mode
     */
    playSqueak() {
      if (!this.soundEnabled) return;
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, t);
        osc.frequency.exponentialRampToValueAtTime(360, t + 0.08);
        osc.frequency.exponentialRampToValueAtTime(240, t + 0.2);

        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
      } catch (e) {}
    },

    playSparkle() {
      if (!this.soundEnabled) return;
      try {
        if (typeof OtisAudio !== 'undefined' && OtisAudio.playSparkle) {
          OtisAudio.playSparkle();
        }
      } catch (e) {}
    },

    playFanfare() {
      if (!this.soundEnabled) return;
      try {
        if (typeof OtisAudio !== 'undefined' && OtisAudio.playFanfare) {
          OtisAudio.playFanfare();
        }
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

  // Pentatonic scale pitch multipliers for joyful Free Pop mode
  const PENTATONIC_PITCHES = [0.89, 1.0, 1.12, 1.33, 1.5, 1.78, 2.0];
  let pitchCounter = 0;

  // ==========================================
  // 3. GAME STATE & MODES
  // ==========================================
  const MODES = { QUEST: 'QUEST', FREE: 'FREE' };
  let currentMode = MODES.QUEST;

  const TOTAL_QUEST_ROUNDS = 5;
  let currentRound = 0;
  let currentTarget = null; // { shapeKey, color, countNeeded, countPopped }
  let activeBubbles = [];   // Array of bubble physics objects
  let totalPoppedCount = 0; // For Free Pop mode
  let isRoundTransitioning = false;
  let idleAssistTimer = null;
  let animationFrameId = null;

  // DOM Elements
  const arenaEl = document.getElementById('spArena');
  const missionBannerEl = document.getElementById('spMissionBanner');
  const targetIconBoxEl = document.getElementById('targetIconBox');
  const targetNameEl = document.getElementById('targetName');
  const missionInstructionEl = document.getElementById('spMissionInstruction');
  const starsTrackEl = document.getElementById('starsTrack');
  const statusMsgEl = document.getElementById('statusMsg');

  const btnMode = document.getElementById('btnMode');
  const btnSound = document.getElementById('btnSound');
  const btnVoice = document.getElementById('btnVoice');
  const btnReset = document.getElementById('btnReset');

  // ==========================================
  // 4. BUBBLE PHYSICS & LIFECYCLE
  // ==========================================
  class BubbleItem {
    constructor(shapeKey, color, isTarget = false, startY = null) {
      this.shapeKey = shapeKey;
      this.color = color;
      this.isTarget = isTarget;
      this.popped = false;

      // Dimensions: Generous touch targets for little fingers (86px - 104px)
      const arenaRect = arenaEl.getBoundingClientRect();
      const arenaW = arenaRect.width || window.innerWidth;
      const arenaH = arenaRect.height || (window.innerHeight - 180);

      const isMobile = arenaW < 640;
      this.size = isMobile ? (76 + Math.random() * 14) : (88 + Math.random() * 18);

      // Initial positions
      const pad = 12;
      this.x = pad + Math.random() * (arenaW - this.size - pad * 2);
      this.y = (startY !== null) ? startY : (pad + Math.random() * (arenaH - this.size - pad * 2));

      // Velocity: Gentle drifting speeds
      const speedScale = isMobile ? 0.6 : 0.8;
      this.vx = (Math.random() - 0.5) * 1.2 * speedScale;
      // In free mode bubbles drift gently upward; in quest mode they gently float in all directions
      if (currentMode === MODES.FREE) {
        this.vy = -(0.7 + Math.random() * 0.9) * speedScale;
      } else {
        this.vy = (Math.random() - 0.5) * 1.2 * speedScale;
      }

      // Wobble / Bobbing phase
      this.phase = Math.random() * Math.PI * 2;
      this.phaseSpeed = 0.02 + Math.random() * 0.02;
      this.wobbleAmp = 2 + Math.random() * 3;

      // Create DOM element
      this.el = document.createElement('div');
      this.el.className = 'sp-bubble';
      this.el.style.width = `${this.size}px`;
      this.el.style.height = `${this.size}px`;
      this.el.style.left = `${this.x}px`;
      this.el.style.top = `${this.y}px`;
      this.el.dataset.shapeKey = shapeKey;
      this.el.dataset.colorName = color.name;
      this.el.dataset.isTarget = isTarget ? 'true' : 'false';

      this.el.innerHTML = `
        <div class="sp-shape-content">
          ${createShapeSVG(shapeKey, color)}
        </div>
      `;

      // Multi-touch / rapid tap support via pointerdown
      this.el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        handleBubbleTap(this, e);
      });
    }

    update(arenaW, arenaH) {
      if (this.popped) return;

      this.phase += this.phaseSpeed;
      const wobbleX = Math.cos(this.phase) * this.wobbleAmp * 0.05;
      const wobbleY = Math.sin(this.phase) * this.wobbleAmp * 0.08;

      this.x += this.vx + wobbleX;
      this.y += this.vy + wobbleY;

      const pad = 4;
      const maxX = arenaW - this.size - pad;
      const maxY = arenaH - this.size - pad;

      if (currentMode === MODES.FREE) {
        // Horizontal soft bounce
        if (this.x < pad) { this.x = pad; this.vx = Math.abs(this.vx); }
        if (this.x > maxX) { this.x = maxX; this.vx = -Math.abs(this.vx); }
        // If floated off the top, recycle below the bottom
        if (this.y < -this.size - 20) {
          this.y = arenaH + 10 + Math.random() * 40;
          this.x = pad + Math.random() * (arenaW - this.size - pad * 2);
        }
      } else {
        // Quest Mode: Soft bouncing within arena
        if (this.x < pad) { this.x = pad; this.vx = Math.abs(this.vx) * 0.9; }
        if (this.x > maxX) { this.x = maxX; this.vx = -Math.abs(this.vx) * 0.9; }
        if (this.y < pad) { this.y = pad; this.vy = Math.abs(this.vy) * 0.9; }
        if (this.y > maxY) { this.y = maxY; this.vy = -Math.abs(this.vy) * 0.9; }
      }

      this.el.style.left = `${this.x}px`;
      this.el.style.top = `${this.y}px`;
    }

    pop(tapX, tapY) {
      if (this.popped) return;
      this.popped = true;
      this.el.classList.add('popping');

      // Create visual water ripple ring
      createPopRipple(tapX, tapY, this.color.hex);

      // OtisParticles & glitter confetti
      if (typeof OtisParticles !== 'undefined' && OtisParticles.burst) {
        OtisParticles.burst(tapX, tapY, this.color.hex, 16);
        OtisParticles.burst(tapX, tapY, '#FFD700', 8);
      }

      // Remove after burst animation
      setTimeout(() => {
        if (this.el && this.el.parentNode) {
          this.el.parentNode.removeChild(this.el);
        }
      }, 360);
    }

    wobble() {
      this.el.classList.add('wrong-wobble');
      setTimeout(() => {
        if (this.el) this.el.classList.remove('wrong-wobble');
      }, 450);
    }
  }

  // ==========================================
  // 5. VISUAL EFFECTS (Ripples, Toasts)
  // ==========================================
  function createPopRipple(x, y, colorHex) {
    const ripple = document.createElement('div');
    ripple.className = 'sp-pop-ripple';
    const size = 110;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.borderColor = colorHex || '#0EA5E9';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 560);
  }

  function createPopToast(x, y, text) {
    const toast = document.createElement('div');
    toast.className = 'sp-pop-toast';
    toast.textContent = text;
    toast.style.left = `${x}px`;
    toast.style.top = `${y}px`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 760);
  }

  // ==========================================
  // 6. MAIN ENGINE LOOP
  // ==========================================
  function startPhysicsLoop() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    function step() {
      const arenaRect = arenaEl.getBoundingClientRect();
      const arenaW = arenaRect.width || window.innerWidth;
      const arenaH = arenaRect.height || (window.innerHeight - 180);

      for (let i = 0; i < activeBubbles.length; i++) {
        activeBubbles[i].update(arenaW, arenaH);
      }

      animationFrameId = requestAnimationFrame(step);
    }
    animationFrameId = requestAnimationFrame(step);
  }

  // ==========================================
  // 7. BUBBLE TAP HANDLERS
  // ==========================================
  const CHEER_WORDS = ['POP! 🌟', 'Super! 🎉', 'Yay! 🎈', 'Awesome! ✨', 'Great! ⭐', 'Good Job! 💖'];

  function handleBubbleTap(bubble, e) {
    if (bubble.popped) return;

    // Get tap coordinate
    const rect = bubble.el.getBoundingClientRect();
    const tapX = e.clientX || (rect.left + rect.width / 2);
    const tapY = e.clientY || (rect.top + rect.height / 2);

    // Reset idle assistance timer
    resetIdleTimer();

    // ------------------------------------
    // MODE: FREE POP PLAYGROUND
    // ------------------------------------
    if (currentMode === MODES.FREE) {
      // Pick next pentatonic pitch
      const pitch = PENTATONIC_PITCHES[pitchCounter % PENTATONIC_PITCHES.length];
      pitchCounter++;
      SoundEngine.playBubblePop(pitch);

      bubble.pop(tapX, tapY);
      totalPoppedCount++;

      // Say the shape or color
      const shapeInfo = SHAPES_DATA[bubble.shapeKey];
      SoundEngine.speak(`${bubble.color.spoken} ${shapeInfo.name}`);

      createPopToast(tapX, tapY, getRandomItem(CHEER_WORDS));
      updateBottomBarUI();

      // Remove from array and spawn a new one to keep the playground lively
      const idx = activeBubbles.indexOf(bubble);
      if (idx !== -1) activeBubbles.splice(idx, 1);

      setTimeout(() => {
        if (currentMode === MODES.FREE && activeBubbles.length < 10) {
          spawnRandomBubble(true);
        }
      }, 400);
      return;
    }

    // ------------------------------------
    // MODE: QUEST / FIND & POP
    // ------------------------------------
    if (isRoundTransitioning) return;

    if (bubble.isTarget) {
      // SUCCESS: Popped target shape!
      SoundEngine.playBubblePop(1.15);
      bubble.pop(tapX, tapY);

      currentTarget.countPopped++;
      createPopToast(tapX, tapY, getRandomItem(CHEER_WORDS));

      // Remove from activeBubbles
      const idx = activeBubbles.indexOf(bubble);
      if (idx !== -1) activeBubbles.splice(idx, 1);

      const remaining = currentTarget.countNeeded - currentTarget.countPopped;

      if (remaining > 0) {
        // Still need more targets in this round
        SoundEngine.speak(`Awesome! ${remaining} more to find!`);
        statusMsgEl.innerHTML = `<span class="highlight">Find ${remaining}</span> more! 🎈`;
      } else {
        // ROUND COMPLETE!
        handleRoundComplete();
      }
    } else {
      // Tapped wrong shape: Gentle, encouraging, zero-stress
      bubble.wobble();
      SoundEngine.playSqueak();

      const tappedShape = SHAPES_DATA[bubble.shapeKey];
      const targetShape = SHAPES_DATA[currentTarget.shapeKey];

      // Encouraging hint without frustration
      const hintMsg = `That's a ${tappedShape.name}! Can you find the ${targetShape.name}?`;
      SoundEngine.speak(hintMsg);
      statusMsgEl.innerHTML = `That's a ${tappedShape.name}! Look for the <span class="highlight">${targetShape.name}</span>!`;
    }
  }

  // ==========================================
  // 8. QUEST MODE PROGRESSION
  // ==========================================
  function loadQuestRound(roundIndex) {
    currentRound = roundIndex;
    isRoundTransitioning = false;
    clearArena();
    resetIdleTimer();

    // End of Quest: Full celebration!
    if (currentRound >= TOTAL_QUEST_ROUNDS) {
      if (typeof createCelebration !== 'undefined') {
        createCelebration(
          document.body,
          'You popped them all!',
          '🎈',
          () => {
            currentRound = 0;
            loadQuestRound(0);
          },
          () => {
            window.location.href = '../index.html';
          }
        );
      }
      statusMsgEl.innerHTML = '🎉 <span class="highlight">All Done! Brilliant Job!</span> 🎉';
      return;
    }

    const allShapeKeys = getShapeKeys();
    const targetShapeKey = getRandomItem(allShapeKeys);
    const targetColor = getRandomItem(COLORS);
    const targetShape = SHAPES_DATA[targetShapeKey];

    // Determine target count & color specificity based on round difficulty
    // Round 0: 1 target shape (shape only prompt)
    // Round 1: 2 target shapes (shape only prompt)
    // Round 2: 3 target shapes (shape only prompt, counts remaining)
    // Round 3: 1 target shape with specific COLOR (e.g. "Find the Pink Star!")
    // Round 4: 2 target shapes with specific COLOR
    let countNeeded = 1;
    let colorSpecific = false;

    if (currentRound === 1) countNeeded = 2;
    if (currentRound === 2) countNeeded = 3;
    if (currentRound === 3) { countNeeded = 1; colorSpecific = true; }
    if (currentRound === 4) { countNeeded = 2; colorSpecific = true; }

    currentTarget = {
      shapeKey: targetShapeKey,
      color: targetColor,
      countNeeded: countNeeded,
      countPopped: 0,
      colorSpecific: colorSpecific
    };

    // Update Top Mission Banner
    targetIconBoxEl.innerHTML = createShapeSVG(targetShapeKey, targetColor);
    targetNameEl.textContent = colorSpecific ? `${targetColor.spoken} ${targetShape.name}` : targetShape.name;

    const missionText = colorSpecific
      ? `Pop ${countNeeded > 1 ? countNeeded + ' ' : 'the '}${targetColor.spoken} ${targetShape.name}${countNeeded > 1 ? 's' : ''}!`
      : `Pop ${countNeeded > 1 ? countNeeded + ' ' : 'the '}${targetShape.name}${countNeeded > 1 ? 's' : ''}!`;

    missionInstructionEl.textContent = missionText;

    // Spoken Audio Prompt
    SoundEngine.speak(missionText);

    // Populate play arena with bubbles:
    // Ensure exact count of targets + friendly variety of other shapes
    const totalBubblesOnScreen = Math.min(6 + currentRound, 9);
    const otherShapeKeys = allShapeKeys.filter(k => k !== targetShapeKey);

    const bubbleConfigs = [];

    // Add target bubbles
    for (let i = 0; i < countNeeded; i++) {
      bubbleConfigs.push({
        shapeKey: targetShapeKey,
        color: targetColor,
        isTarget: true
      });
    }

    // Fill remaining slots with non-targets
    const remainingSlots = totalBubblesOnScreen - countNeeded;
    for (let i = 0; i < remainingSlots; i++) {
      const nonTargetKey = getRandomItem(otherShapeKeys);
      let nonTargetColor = getRandomItem(COLORS);
      // In color-specific rounds, prevent matching both shape and color accidentally
      if (colorSpecific && nonTargetKey === targetShapeKey && nonTargetColor.name === targetColor.name) {
        nonTargetColor = COLORS.find(c => c.name !== targetColor.name) || nonTargetColor;
      }
      bubbleConfigs.push({
        shapeKey: nonTargetKey,
        color: nonTargetColor,
        isTarget: false
      });
    }

    // Shuffle and instantiate
    const shuffled = shuffleArray(bubbleConfigs);
    shuffled.forEach(cfg => {
      const bubble = new BubbleItem(cfg.shapeKey, cfg.color, cfg.isTarget);
      arenaEl.appendChild(bubble.el);
      activeBubbles.push(bubble);
    });

    updateBottomBarUI();
  }

  function handleRoundComplete() {
    isRoundTransitioning = true;
    SoundEngine.playSparkle();
    SoundEngine.speak('You found them all! Super!');

    statusMsgEl.innerHTML = '⭐ <span class="highlight">Super Star!</span> Round Complete! ⭐';

    // Highlight current star badge
    const stars = document.querySelectorAll('.sp-star-badge');
    if (stars[currentRound]) {
      stars[currentRound].classList.remove('active-round');
      stars[currentRound].classList.add('completed');
      stars[currentRound].textContent = '⭐';
    }

    // Pop or fade remaining non-target bubbles gracefully
    activeBubbles.forEach((b, i) => {
      setTimeout(() => {
        if (!b.popped) {
          b.el.style.transition = 'opacity 0.4s, transform 0.4s';
          b.el.style.opacity = '0.2';
          b.el.style.transform += ' scale(0.7)';
        }
      }, i * 60);
    });

    setTimeout(() => {
      loadQuestRound(currentRound + 1);
    }, 1100);
  }

  // ==========================================
  // 9. IDLE ASSISTANCE FOR YOUNG TODDLERS
  // ==========================================
  function resetIdleTimer() {
    if (idleAssistTimer) clearTimeout(idleAssistTimer);
    // Remove assist glow from any existing bubbles
    activeBubbles.forEach(b => {
      if (b.el) b.el.classList.remove('assist-glow');
    });

    if (currentMode !== MODES.QUEST) return;

    // After 6.5 seconds of no activity, give a gentle visual beacon
    idleAssistTimer = setTimeout(() => {
      if (isRoundTransitioning || currentMode !== MODES.QUEST) return;
      const targetBubbles = activeBubbles.filter(b => b.isTarget && !b.popped);
      if (targetBubbles.length > 0) {
        targetBubbles.forEach(b => b.el.classList.add('assist-glow'));
        const shape = SHAPES_DATA[currentTarget.shapeKey];
        SoundEngine.speak(`Here it is! Tap the ${currentTarget.colorSpecific ? currentTarget.color.spoken + ' ' : ''}${shape.name}!`);
      }
    }, 6500);
  }

  // ==========================================
  // 10. FREE POP MODE (BUBBLE CARNIVAL)
  // ==========================================
  function spawnRandomBubble(fromBottom = false) {
    const allKeys = getShapeKeys();
    const key = getRandomItem(allKeys);
    const color = getRandomItem(COLORS);

    const arenaRect = arenaEl.getBoundingClientRect();
    const arenaH = arenaRect.height || (window.innerHeight - 180);
    const startY = fromBottom ? (arenaH + 10 + Math.random() * 50) : null;

    const bubble = new BubbleItem(key, color, false, startY);
    arenaEl.appendChild(bubble.el);
    activeBubbles.push(bubble);
  }

  function startFreePopMode() {
    clearArena();
    resetIdleTimer();

    missionBannerEl.style.display = 'none';

    // Populate initial cluster of 8 fun bubbles
    for (let i = 0; i < 8; i++) {
      spawnRandomBubble(false);
    }

    SoundEngine.speak('Bubble Carnival! Pop as many as you like!');
    updateBottomBarUI();
  }

  function clearArena() {
    activeBubbles.forEach(b => {
      if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
    });
    activeBubbles = [];
    if (arenaEl) arenaEl.innerHTML = '';
  }

  // ==========================================
  // 11. UI CONTROLS & BOTTOM BAR
  // ==========================================
  function updateBottomBarUI() {
    if (currentMode === MODES.QUEST) {
      starsTrackEl.style.display = 'flex';
      starsTrackEl.innerHTML = '';

      for (let i = 0; i < TOTAL_QUEST_ROUNDS; i++) {
        const star = document.createElement('div');
        star.className = 'sp-star-badge';
        if (i < currentRound) {
          star.classList.add('completed');
          star.textContent = '⭐';
        } else if (i === currentRound) {
          star.classList.add('active-round');
          star.textContent = (i + 1).toString();
        } else {
          star.textContent = (i + 1).toString();
        }
        starsTrackEl.appendChild(star);
      }

      const remaining = currentTarget ? (currentTarget.countNeeded - currentTarget.countPopped) : 1;
      statusMsgEl.innerHTML = `Round <span class="highlight">${currentRound + 1}</span> of ${TOTAL_QUEST_ROUNDS} &middot; Pop ${remaining}!`;
    } else {
      // Free Pop Mode
      starsTrackEl.style.display = 'flex';
      starsTrackEl.innerHTML = `
        <div class="sp-counter-pill" title="Bubbles Popped">
          <span>🎈 Popped:</span>
          <span class="sp-counter-num">${totalPoppedCount}</span>
        </div>
      `;
      statusMsgEl.innerHTML = '✨ <span class="highlight">Free Play Mode</span> &middot; Tap any bubble to pop!';
    }
  }

  function updateControlsUI() {
    if (btnSound) {
      btnSound.classList.toggle('muted', !SoundEngine.soundEnabled);
      btnSound.innerHTML = SoundEngine.soundEnabled
        ? '<span>🎵</span><span>Sound</span>'
        : '<span>🔇</span><span>Muted</span>';
    }

    if (btnVoice) {
      btnVoice.classList.toggle('muted', !SoundEngine.voiceEnabled);
      btnVoice.innerHTML = SoundEngine.voiceEnabled
        ? '<span>🗣️</span><span>Voice</span>'
        : '<span>🤫</span><span>Quiet</span>';
    }

    if (btnMode) {
      btnMode.classList.toggle('active-mode', currentMode === MODES.FREE);
      btnMode.innerHTML = currentMode === MODES.QUEST
        ? '<span>🎈</span><span>Free Pop</span>'
        : '<span>🎯</span><span>Quest</span>';
    }
  }

  function setupControls() {
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        SoundEngine.toggleSound();
        updateControlsUI();
      });
    }

    if (btnVoice) {
      btnVoice.addEventListener('click', () => {
        SoundEngine.toggleVoice();
        updateControlsUI();
      });
    }

    if (btnMode) {
      btnMode.addEventListener('click', () => {
        if (currentMode === MODES.QUEST) {
          currentMode = MODES.FREE;
          startFreePopMode();
        } else {
          currentMode = MODES.QUEST;
          missionBannerEl.style.display = 'flex';
          currentRound = 0;
          loadQuestRound(0);
        }
        updateControlsUI();
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        SoundEngine.playBubblePop(1.0);
        if (currentMode === MODES.QUEST) {
          currentRound = 0;
          loadQuestRound(0);
        } else {
          totalPoppedCount = 0;
          startFreePopMode();
        }
      });
    }
  }

  // ==========================================
  // 12. INITIALIZATION
  // ==========================================
  function initGame() {
    setupControls();
    updateControlsUI();
    startPhysicsLoop();
    loadQuestRound(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }

})();
