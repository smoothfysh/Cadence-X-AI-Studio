/**
 * Memory Path — Modernized Game Engine (Otis Play by Cadence-X)
 * The Enchanted Crystal Glade: Musical Gemstone Memory for Young Children (Ages 3-6)
 *
 * Highlights:
 *  - Dual Play Modes:
 *      1. "Quest / Adventure Path": Gentle progressive levels with Montessori melody step pods
 *      2. "Free Melody": Open-ended musical crystal sandbox with no mistakes or pressure
 *  - Pentatonic Crystal Synthesizer: 6 tuned harmonics (C5, D5, E5, G5, A5, C6) that always harmonize
 *  - Otis the Star Owl Mascot: Expressive, animated guide with blinks, hops, and cheerful chirps
 *  - Montessori Step Pods: Real-time visual progress showing how many melody notes have been played
 *  - Non-Punitive Toddler Friendly Design: Soft wobble & boing on mismatch, instant "Watch Again" replay
 *  - Inactivity Hint Assist: Gentle visual shimmer & prompt if the child stops tapping for 6 seconds
 *  - Spoken Audio Guidance via OtisSpeech & Web Audio API
 *  - Speed Toggle: "Normal (750ms)" or "Gentle (1050ms)" for toddlers who need slower pacing
 *  - Settings persistence (Sound, Voice, Speed, Mode) via localStorage
 */

(function () {
  'use strict';

  // ==========================================
  // 1. CRYSTALS & MUSICAL NOTES DATABASE
  // ==========================================
  const CRYSTALS_DATA = [
    {
      id: 'ruby',
      name: 'Ruby Star',
      spokenName: 'Ruby Star',
      note: 'C5',
      freq: 523.25,
      color: '#FF3366',
      glowColor: '#FF3366',
      glowSoft: 'rgba(255, 51, 102, 0.45)',
      renderSVG() {
        return `
          <svg viewBox="0 0 80 80" class="mp-gem-svg">
            <defs>
              <linearGradient id="mp-grad-ruby" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FF758F"/>
                <stop offset="60%" stop-color="#FF3366"/>
                <stop offset="100%" stop-color="#C9184A"/>
              </linearGradient>
            </defs>
            <polygon points="40,6 72,28 60,72 20,72 8,28" fill="url(#mp-grad-ruby)" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
            <polygon points="40,16 62,32 52,64 28,64 18,32" fill="#FF4D6D" opacity="0.85"/>
            <polygon points="40,24 54,36 48,56 32,56 26,36" fill="#FFF0F3" opacity="0.45"/>
            <circle cx="34" cy="26" r="3.5" fill="#FFFFFF" opacity="0.9"/>
          </svg>
        `;
      }
    },
    {
      id: 'amber',
      name: 'Amber Sun',
      spokenName: 'Amber Sun',
      note: 'D5',
      freq: 587.33,
      color: '#F59E0B',
      glowColor: '#F59E0B',
      glowSoft: 'rgba(245, 158, 11, 0.45)',
      renderSVG() {
        return `
          <svg viewBox="0 0 80 80" class="mp-gem-svg">
            <defs>
              <linearGradient id="mp-grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FDE68A"/>
                <stop offset="50%" stop-color="#F59E0B"/>
                <stop offset="100%" stop-color="#D97706"/>
              </linearGradient>
            </defs>
            <polygon points="40,4 66,24 74,54 54,76 26,76 6,54 14,24" fill="url(#mp-grad-amber)" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
            <polygon points="40,14 60,30 66,50 50,68 30,68 14,50 20,30" fill="#FBBF24" opacity="0.85"/>
            <polygon points="40,22 52,34 56,48 44,60 36,60 24,48 28,34" fill="#FFFFFF" opacity="0.5"/>
            <circle cx="34" cy="24" r="3.5" fill="#FFFFFF" opacity="0.95"/>
          </svg>
        `;
      }
    },
    {
      id: 'emerald',
      name: 'Emerald Mint',
      spokenName: 'Emerald Mint',
      note: 'E5',
      freq: 659.25,
      color: '#10B981',
      glowColor: '#10B981',
      glowSoft: 'rgba(16, 185, 129, 0.45)',
      renderSVG() {
        return `
          <svg viewBox="0 0 80 80" class="mp-gem-svg">
            <defs>
              <linearGradient id="mp-grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6EE7B7"/>
                <stop offset="50%" stop-color="#10B981"/>
                <stop offset="100%" stop-color="#047857"/>
              </linearGradient>
            </defs>
            <polygon points="40,6 74,40 40,74 6,40" fill="url(#mp-grad-emerald)" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
            <polygon points="40,16 64,40 40,64 16,40" fill="#34D399" opacity="0.85"/>
            <polygon points="40,26 54,40 40,54 26,40" fill="#ECFDF5" opacity="0.5"/>
            <circle cx="35" cy="32" r="3.5" fill="#FFFFFF" opacity="0.9"/>
          </svg>
        `;
      }
    },
    {
      id: 'sapphire',
      name: 'Sapphire Heart',
      spokenName: 'Sapphire Heart',
      note: 'G5',
      freq: 783.99,
      color: '#3B82F6',
      glowColor: '#3B82F6',
      glowSoft: 'rgba(59, 130, 246, 0.45)',
      renderSVG() {
        return `
          <svg viewBox="0 0 80 80" class="mp-gem-svg">
            <defs>
              <linearGradient id="mp-grad-sapphire" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#93C5FD"/>
                <stop offset="55%" stop-color="#3B82F6"/>
                <stop offset="100%" stop-color="#1D4ED8"/>
              </linearGradient>
            </defs>
            <path d="M 40 76 L 10 46 C 0 32 6 12 26 12 C 34 12 38 18 40 22 C 42 18 46 12 54 12 C 74 12 80 32 70 46 Z" fill="url(#mp-grad-sapphire)" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M 40 64 L 20 42 C 14 32 18 18 30 18 C 36 18 39 24 40 26 C 41 24 44 18 50 18 C 62 18 66 32 60 42 Z" fill="#60A5FA" opacity="0.85"/>
            <ellipse cx="32" cy="26" rx="6" ry="4" fill="#FFFFFF" opacity="0.65" transform="rotate(-20 32 26)"/>
          </svg>
        `;
      }
    },
    {
      id: 'amethyst',
      name: 'Amethyst Gem',
      spokenName: 'Amethyst Gem',
      note: 'A5',
      freq: 880.00,
      color: '#8B5CF6',
      glowColor: '#8B5CF6',
      glowSoft: 'rgba(139, 92, 246, 0.45)',
      renderSVG() {
        return `
          <svg viewBox="0 0 80 80" class="mp-gem-svg">
            <defs>
              <linearGradient id="mp-grad-amethyst" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#DDD6FE"/>
                <stop offset="50%" stop-color="#8B5CF6"/>
                <stop offset="100%" stop-color="#5B21B6"/>
              </linearGradient>
            </defs>
            <polygon points="26,6 54,6 74,26 74,54 54,74 26,74 6,54 6,26" fill="url(#mp-grad-amethyst)" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
            <polygon points="30,16 50,16 64,30 64,50 50,64 30,64 16,50 16,30" fill="#A78BFA" opacity="0.85"/>
            <polygon points="34,26 46,26 54,34 54,46 46,54 34,54 26,46 26,34" fill="#F5F3FF" opacity="0.5"/>
            <circle cx="32" cy="24" r="3.5" fill="#FFFFFF" opacity="0.95"/>
          </svg>
        `;
      }
    },
    {
      id: 'topaz',
      name: 'Topaz Aqua',
      spokenName: 'Topaz Aqua',
      note: 'C6',
      freq: 1046.50,
      color: '#06B6D4',
      glowColor: '#06B6D4',
      glowSoft: 'rgba(6, 182, 212, 0.45)',
      renderSVG() {
        return `
          <svg viewBox="0 0 80 80" class="mp-gem-svg">
            <defs>
              <linearGradient id="mp-grad-topaz" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#A5F3FC"/>
                <stop offset="50%" stop-color="#06B6D4"/>
                <stop offset="100%" stop-color="#0E7490"/>
              </linearGradient>
            </defs>
            <polygon points="40,4 72,20 72,60 40,76 8,60 8,20" fill="url(#mp-grad-topaz)" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
            <polygon points="40,16 62,28 62,52 40,64 18,52 18,28" fill="#22D3EE" opacity="0.85"/>
            <polygon points="40,26 52,34 52,46 40,52 28,46 28,34" fill="#ECFEFF" opacity="0.5"/>
            <circle cx="34" cy="24" r="3.5" fill="#FFFFFF" opacity="0.95"/>
          </svg>
        `;
      }
    }
  ];

  // ==========================================
  // 2. QUEST LEVEL CONFIGURATION (AGES 3-6)
  // ==========================================
  const QUEST_LEVELS = [
    {
      levelNum: 1,
      title: 'Sparkle Steps',
      gemCount: 3,
      seqLength: 2,
      spokenIntro: 'Level 1! Watch the 2 shining crystals!'
    },
    {
      levelNum: 2,
      title: 'Melody Trail',
      gemCount: 3,
      seqLength: 3,
      spokenIntro: 'Level 2! Can you play 3 crystal notes?'
    },
    {
      levelNum: 3,
      title: 'Crystal Meadow',
      gemCount: 4,
      seqLength: 3,
      spokenIntro: 'Level 3! Listen to the 3-note melody!'
    },
    {
      levelNum: 4,
      title: 'Star Path',
      gemCount: 4,
      seqLength: 4,
      spokenIntro: 'Level 4! Follow the 4 glowing gems!'
    },
    {
      levelNum: 5,
      title: 'Glade Symphony',
      gemCount: 5,
      seqLength: 4,
      spokenIntro: 'Level 5! A beautiful 4-gem song!'
    },
    {
      levelNum: 6,
      title: 'Grand Melodist',
      gemCount: 5,
      seqLength: 5,
      spokenIntro: 'Final challenge! The grand 5-crystal melody!'
    }
  ];

  // ==========================================
  // 3. SOUND SYNTHESIZER (WEB AUDIO API)
  // ==========================================
  const SoundEngine = (() => {
    let audioCtx = null;

    function getContext() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    return {
      // Celestial crystal bell harmonic synthesizer
      playCrystalTone(frequency) {
        if (!gameState.soundEnabled) return;
        const ctx = getContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.32, now);
        masterGain.connect(ctx.destination);

        // Fundamental sine chime
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(frequency, now);
        gain1.gain.setValueAtTime(0.8, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
        osc1.connect(gain1);
        gain1.connect(masterGain);
        osc1.start(now);
        osc1.stop(now + 0.85);

        // Bell harmonic overtone (2x octave shimmer)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(frequency * 2, now);
        gain2.gain.setValueAtTime(0.35, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc2.connect(gain2);
        gain2.connect(masterGain);
        osc2.start(now);
        osc2.stop(now + 0.5);

        // Crystal sparkle overtone (3x sparkle)
        const osc3 = ctx.createOscillator();
        const gain3 = ctx.createGain();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(frequency * 3, now);
        gain3.gain.setValueAtTime(0.18, now);
        gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc3.connect(gain3);
        gain3.connect(masterGain);
        osc3.start(now);
        osc3.stop(now + 0.35);
      },

      playPop() {
        if (!gameState.soundEnabled) return;
        try {
          if (window.OtisAudio && window.OtisAudio.playPop) {
            window.OtisAudio.playPop();
          }
        } catch (e) {}
      },

      playGentleWobble() {
        if (!gameState.soundEnabled) return;
        const ctx = getContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.22);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      },

      playMascotChirp() {
        if (!gameState.soundEnabled) return;
        const ctx = getContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        [880, 1174].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.2, now + idx * 0.1 + 0.08);
          gain.gain.setValueAtTime(0.2, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.09);
        });
      },

      playFanfare() {
        if (!gameState.soundEnabled) return;
        try {
          if (window.OtisAudio && window.OtisAudio.playFanfare) {
            window.OtisAudio.playFanfare();
          }
        } catch (e) {}
      }
    };
  })();

  // ==========================================
  // 4. SPEECH NARRATOR
  // ==========================================
  const Narrator = {
    speak(text) {
      if (!gameState.voiceEnabled) return;
      try {
        if (window.OtisSpeech && window.OtisSpeech.speak) {
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
  // 5. GAME STATE
  // ==========================================
  const gameState = {
    // Preferences (loaded from localStorage)
    soundEnabled: localStorage.getItem('otis_mp_sound') !== 'false',
    voiceEnabled: localStorage.getItem('otis_mp_voice') !== 'false',
    isSlowPace: localStorage.getItem('otis_mp_pace') === 'slow', // normal (750ms) vs gentle (1050ms)
    mode: localStorage.getItem('otis_mp_mode') || 'quest', // 'quest' or 'free'

    // Runtime Quest State
    levelIndex: 0,
    sequence: [],
    playerSeq: [],
    activeCrystals: [],
    gemElements: [],
    isShowing: false,
    canTap: false,
    inactivityTimer: null,
    hasStartedFirstRound: false
  };

  // DOM Elements cache
  const elements = {};

  // ==========================================
  // 6. INITIALIZATION & SETUP
  // ==========================================
  function initGame() {
    cacheElements();
    attachEventListeners();
    updateControlsUI();
    loadCurrentMode();
  }

  function cacheElements() {
    elements.gameContainer = document.getElementById('memoryPathGame');
    elements.btnMode = document.getElementById('btnMode');
    elements.btnPace = document.getElementById('btnPace');
    elements.btnSound = document.getElementById('btnSound');
    elements.btnVoice = document.getElementById('btnVoice');
    elements.btnReset = document.getElementById('btnReset');

    elements.mascotWrapper = document.getElementById('mpMascot');
    elements.promptBubble = document.getElementById('mpPromptBubble');
    elements.promptIcon = document.getElementById('mpPromptIcon');
    elements.promptText = document.getElementById('mpPromptText');
    elements.stepPods = document.getElementById('mpStepPods');

    elements.gemsContainer = document.getElementById('mpGemsContainer');
    elements.startBtn = document.getElementById('mpStartBtn');
    elements.replayBtn = document.getElementById('mpReplayBtn');

    elements.starsTrack = document.getElementById('mpStarsTrack');
    elements.statusMsg = document.getElementById('mpStatusMsg');
  }

  function attachEventListeners() {
    // Mode button
    if (elements.btnMode) {
      elements.btnMode.addEventListener('click', () => {
        SoundEngine.playPop();
        toggleMode();
      });
    }

    // Pace (Speed) button
    if (elements.btnPace) {
      elements.btnPace.addEventListener('click', () => {
        SoundEngine.playPop();
        gameState.isSlowPace = !gameState.isSlowPace;
        localStorage.setItem('otis_mp_pace', gameState.isSlowPace ? 'slow' : 'normal');
        updateControlsUI();
        Narrator.speak(gameState.isSlowPace ? 'Gentle pace' : 'Normal pace');
      });
    }

    // Sound toggle
    if (elements.btnSound) {
      elements.btnSound.addEventListener('click', () => {
        gameState.soundEnabled = !gameState.soundEnabled;
        localStorage.setItem('otis_mp_sound', gameState.soundEnabled ? 'true' : 'false');
        if (gameState.soundEnabled) SoundEngine.playPop();
        updateControlsUI();
      });
    }

    // Voice toggle
    if (elements.btnVoice) {
      elements.btnVoice.addEventListener('click', () => {
        SoundEngine.playPop();
        gameState.voiceEnabled = !gameState.voiceEnabled;
        localStorage.setItem('otis_mp_voice', gameState.voiceEnabled ? 'true' : 'false');
        updateControlsUI();
        if (gameState.voiceEnabled) {
          Narrator.speak('Voice is on!');
        }
      });
    }

    // Reset button
    if (elements.btnReset) {
      elements.btnReset.addEventListener('click', () => {
        SoundEngine.playPop();
        resetCurrentRound();
      });
    }

    // Otis Mascot tap
    if (elements.mascotWrapper) {
      elements.mascotWrapper.addEventListener('click', () => {
        mascotReact();
      });
    }

    // Prompt bubble tap (re-reads instruction)
    if (elements.promptBubble) {
      elements.promptBubble.addEventListener('click', () => {
        SoundEngine.playPop();
        Narrator.speak(elements.promptText.textContent);
      });
    }

    // Start button
    if (elements.startBtn) {
      elements.startBtn.addEventListener('click', () => {
        SoundEngine.playPop();
        elements.startBtn.style.display = 'none';
        gameState.hasStartedFirstRound = true;
        showSequence();
      });
    }

    // Replay button
    if (elements.replayBtn) {
      elements.replayBtn.addEventListener('click', () => {
        SoundEngine.playPop();
        elements.replayBtn.classList.remove('visible');
        clearInactivityTimer();
        showSequence();
      });
    }
  }

  function updateControlsUI() {
    if (elements.btnMode) {
      if (gameState.mode === 'quest') {
        elements.btnMode.innerHTML = '<span>🎯 Quest</span>';
        elements.btnMode.classList.add('active');
      } else {
        elements.btnMode.innerHTML = '<span>🎵 Melody</span>';
        elements.btnMode.classList.remove('active');
      }
    }

    if (elements.btnPace) {
      elements.btnPace.innerHTML = gameState.isSlowPace
        ? '<span>🐢 Gentle</span>'
        : '<span>🐰 Normal</span>';
    }

    if (elements.btnSound) {
      elements.btnSound.innerHTML = gameState.soundEnabled
        ? '<span>🎵</span>'
        : '<span>🔇</span>';
      elements.btnSound.classList.toggle('muted', !gameState.soundEnabled);
    }

    if (elements.btnVoice) {
      elements.btnVoice.innerHTML = gameState.voiceEnabled
        ? '<span>🗣️</span>'
        : '<span>🤫</span>';
      elements.btnVoice.classList.toggle('muted', !gameState.voiceEnabled);
    }
  }

  function toggleMode() {
    gameState.mode = gameState.mode === 'quest' ? 'free' : 'quest';
    localStorage.setItem('otis_mp_mode', gameState.mode);
    updateControlsUI();
    loadCurrentMode();
  }

  function loadCurrentMode() {
    clearInactivityTimer();
    if (gameState.mode === 'quest') {
      loadQuestLevel(gameState.levelIndex);
    } else {
      loadFreeMelodyMode();
    }
  }

  function resetCurrentRound() {
    clearInactivityTimer();
    if (gameState.mode === 'quest') {
      loadQuestLevel(gameState.levelIndex);
    } else {
      loadFreeMelodyMode();
    }
  }

  // ==========================================
  // 7. QUEST MODE IMPLEMENTATION
  // ==========================================
  function loadQuestLevel(lvlIndex) {
    if (lvlIndex >= QUEST_LEVELS.length) {
      // Victory celebration
      handleQuestAllComplete();
      return;
    }

    const levelData = QUEST_LEVELS[lvlIndex];
    gameState.levelIndex = lvlIndex;
    gameState.isShowing = false;
    gameState.canTap = false;
    gameState.playerSeq = [];
    gameState.gemElements = [];

    // Hide replay button
    elements.replayBtn.classList.remove('visible');

    // Pick crystals for this level
    gameState.activeCrystals = CRYSTALS_DATA.slice(0, levelData.gemCount);

    // Render milestone stars track
    renderMilestoneStars();

    // Render step pods (Montessori sequence beads)
    renderStepPods(levelData.seqLength);

    // Build gem cards
    renderGemCards(gameState.activeCrystals);

    // Generate random sequence without immediate repeats
    generateSequence(levelData.gemCount, levelData.seqLength);

    // Update status text
    elements.statusMsg.textContent = `Level ${levelData.levelNum} of ${QUEST_LEVELS.length} · ${levelData.title}`;

    // Prompt & Initiation
    if (!gameState.hasStartedFirstRound && lvlIndex === 0) {
      setPrompt('▶ Press Start to begin the song!', '✨');
      elements.startBtn.style.display = 'inline-flex';
      Narrator.speak('Welcome to Memory Path! Press Start to hear the melody!');
    } else {
      elements.startBtn.style.display = 'none';
      setTimeout(() => {
        showSequence();
      }, 500);
    }
  }

  function renderMilestoneStars() {
    elements.starsTrack.innerHTML = '';
    QUEST_LEVELS.forEach((lvl, idx) => {
      const star = document.createElement('div');
      star.className = 'mp-star-milestone';
      star.textContent = '★';
      if (idx < gameState.levelIndex) {
        star.classList.add('completed');
      } else if (idx === gameState.levelIndex) {
        star.classList.add('current');
      }
      elements.starsTrack.appendChild(star);
    });
  }

  function renderStepPods(count) {
    elements.stepPods.innerHTML = '';
    elements.stepPods.style.display = 'flex';
    for (let i = 0; i < count; i++) {
      const pod = document.createElement('div');
      pod.className = 'mp-step-pod';
      pod.dataset.step = i;
      elements.stepPods.appendChild(pod);
    }
  }

  function renderGemCards(crystals) {
    elements.gemsContainer.innerHTML = '';
    gameState.gemElements = [];

    crystals.forEach((crystal, idx) => {
      const card = document.createElement('div');
      card.className = 'mp-gem-card';
      card.dataset.gemIndex = idx;
      card.style.setProperty('--gem-color', crystal.color);
      card.style.setProperty('--gem-glow', crystal.glowColor);
      card.style.setProperty('--gem-glow-soft', crystal.glowSoft);

      // Gem Pointer (shows on lit)
      const pointer = document.createElement('div');
      pointer.className = 'mp-gem-pointer';
      pointer.textContent = '👆';
      card.appendChild(pointer);

      // Gem SVG graphic
      const svgBox = document.createElement('div');
      svgBox.className = 'mp-gem-svg-box';
      svgBox.innerHTML = crystal.renderSVG();
      card.appendChild(svgBox);

      // Gem Note Badge
      const badge = document.createElement('div');
      badge.className = 'mp-gem-badge';
      badge.textContent = crystal.note;
      card.appendChild(badge);

      // Pointer events for instant toddler tactile response
      card.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        handleGemTap(idx, card);
      });

      elements.gemsContainer.appendChild(card);
      gameState.gemElements.push(card);
    });
  }

  function generateSequence(gemCount, seqLength) {
    gameState.sequence = [];
    for (let i = 0; i < seqLength; i++) {
      let nextGem;
      do {
        nextGem = Math.floor(Math.random() * gemCount);
      } while (i > 0 && nextGem === gameState.sequence[i - 1]);
      gameState.sequence.push(nextGem);
    }
  }

  // ==========================================
  // 8. SEQUENCE PLAYBACK & DEMONSTRATION
  // ==========================================
  function showSequence() {
    gameState.isShowing = true;
    gameState.canTap = false;
    gameState.playerSeq = [];
    elements.replayBtn.classList.remove('visible');
    clearInactivityTimer();

    // Reset step pods
    resetStepPodsVisual();

    // Prompt banner
    setPrompt('👀 Watch & listen closely...', '🎶');
    Narrator.speak('Watch and listen closely!');

    // Pacing interval based on user toggle
    const stepDuration = gameState.isSlowPace ? 1050 : 750;
    const litDuration = Math.round(stepDuration * 0.7);

    let stepIdx = 0;

    const timer = setInterval(() => {
      // Un-light previous gem
      if (stepIdx > 0) {
        const prevGem = gameState.gemElements[gameState.sequence[stepIdx - 1]];
        if (prevGem) prevGem.classList.remove('lit');
        unhighlightStepPod(stepIdx - 1);
      }

      // Check if finished sequence
      if (stepIdx >= gameState.sequence.length) {
        clearInterval(timer);
        gameState.isShowing = false;
        finishDemonstration();
        return;
      }

      // Light up current gem
      const currentGemIdx = gameState.sequence[stepIdx];
      const gemEl = gameState.gemElements[currentGemIdx];
      const crystal = gameState.activeCrystals[currentGemIdx];

      if (gemEl && crystal) {
        gemEl.classList.add('lit');
        SoundEngine.playCrystalTone(crystal.freq);
        spawnFloatingNote(gemEl, '🎵');
        highlightStepPod(stepIdx, crystal.color);
      }

      // Timeout to turn off lit state before next step
      setTimeout(() => {
        if (gemEl) gemEl.classList.remove('lit');
      }, litDuration);

      stepIdx++;
    }, stepDuration);
  }

  function finishDemonstration() {
    setPrompt('✨ Your turn! Tap the gems in order!', '👉');
    Narrator.speak('Your turn! Tap the crystals in the same order!');
    gameState.canTap = true;
    gameState.playerSeq = [];

    // Reset step pods to empty state ready for player input
    resetStepPodsVisual();

    // Mascot encourages player
    mascotCheer();

    // Start 6-second inactivity reminder
    resetInactivityTimer();
  }

  function highlightStepPod(step, color) {
    const pod = elements.stepPods.querySelector(`[data-step="${step}"]`);
    if (pod) {
      pod.classList.add('active-playing');
      pod.style.backgroundColor = color;
      pod.style.borderColor = '#FFFFFF';
    }
  }

  function unhighlightStepPod(step) {
    const pod = elements.stepPods.querySelector(`[data-step="${step}"]`);
    if (pod) {
      pod.classList.remove('active-playing');
    }
  }

  function fillStepPod(step, color) {
    const pod = elements.stepPods.querySelector(`[data-step="${step}"]`);
    if (pod) {
      pod.classList.remove('active-playing');
      pod.classList.add('filled');
      pod.style.backgroundColor = color;
      pod.style.borderColor = '#FFFFFF';
      pod.style.color = '#FFFFFF';
    }
  }

  function resetStepPodsVisual() {
    const pods = elements.stepPods.querySelectorAll('.mp-step-pod');
    pods.forEach((pod) => {
      pod.className = 'mp-step-pod';
      pod.style.backgroundColor = '';
      pod.style.borderColor = '';
      pod.style.color = '';
    });
  }

  // ==========================================
  // 9. PLAYER INTERACTION & CHECKING
  // ==========================================
  function handleGemTap(gemIdx, gemEl) {
    // In Free Melody Mode: purely musical sandbox
    if (gameState.mode === 'free') {
      handleFreeMelodyTap(gemIdx, gemEl);
      return;
    }

    // In Quest Mode: check if tap is allowed
    if (!gameState.canTap || gameState.isShowing) return;

    const crystal = gameState.activeCrystals[gemIdx];
    if (!crystal) return;

    // Reset hint pulses
    clearGemHints();
    resetInactivityTimer();

    // Tactile tap feedback
    gemEl.classList.add('active-tap', 'lit');
    SoundEngine.playCrystalTone(crystal.freq);
    spawnFloatingNote(gemEl, '✨');

    setTimeout(() => {
      gemEl.classList.remove('active-tap');
      gemEl.classList.remove('lit');
    }, 220);

    // Record step
    gameState.playerSeq.push(gemIdx);
    const currentStep = gameState.playerSeq.length - 1;

    // Verify step against sequence
    if (gameState.playerSeq[currentStep] !== gameState.sequence[currentStep]) {
      // Gentle mismatch handling
      handleMistake(gemEl, crystal);
      return;
    }

    // Step was correct! Fill corresponding Montessori step pod
    fillStepPod(currentStep, crystal.color);

    // Check if entire sequence is completed
    if (gameState.playerSeq.length === gameState.sequence.length) {
      handleLevelComplete();
    }
  }

  function handleMistake(gemEl, crystal) {
    gameState.canTap = false;
    clearInactivityTimer();

    gemEl.classList.add('wobble');
    SoundEngine.playGentleWobble();

    mascotConfused();
    setPrompt('🤔 Almost! Watch Otis show the song again!', '🔁');
    Narrator.speak('Almost! Let\'s watch the melody again!');

    // Show glowing replay button
    elements.replayBtn.classList.add('visible');

    setTimeout(() => {
      gemEl.classList.remove('wobble');
    }, 550);
  }

  function handleLevelComplete() {
    gameState.canTap = false;
    clearInactivityTimer();

    setPrompt('🌟 You got it! Magnificent melody!', '🎉');
    Narrator.speak('Hooray! You got it!');
    mascotCheer();

    // Play victory musical wave across gems
    const activeLength = gameState.activeCrystals.length;
    gameState.activeCrystals.forEach((crystal, idx) => {
      setTimeout(() => {
        const gemEl = gameState.gemElements[idx];
        if (gemEl) {
          gemEl.classList.add('lit');
          SoundEngine.playCrystalTone(crystal.freq);
          spawnFloatingNote(gemEl, '🌟');
          setTimeout(() => gemEl.classList.remove('lit'), 240);
        }
      }, idx * 90);
    });

    // Particle burst from center
    setTimeout(() => {
      SoundEngine.playFanfare();
      const rect = elements.gemsContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      if (window.OtisParticles && window.OtisParticles.burst) {
        window.OtisParticles.burst(centerX, centerY, '#F59E0B', 20);
        window.OtisParticles.burst(centerX - 60, centerY, '#8B5CF6', 15);
        window.OtisParticles.burst(centerX + 60, centerY, '#06B6D4', 15);
      }
    }, activeLength * 90 + 50);

    // Advance to next level after delay
    setTimeout(() => {
      gameState.levelIndex++;
      loadQuestLevel(gameState.levelIndex);
    }, 1800);
  }

  function handleQuestAllComplete() {
    setPrompt('🏆 Master of the Crystals!', '👑');
    Narrator.speak('Amazing! You completed all the crystal paths!');

    if (window.createCelebration) {
      window.createCelebration(
        document.body,
        'Master of the Crystals! 💎',
        '🏆',
        () => {
          gameState.levelIndex = 0;
          loadQuestLevel(0);
        },
        () => {
          window.location.href = '../index.html';
        }
      );
    }
  }

  // ==========================================
  // 10. FREE MELODY MODE (SANDBOX)
  // ==========================================
  function loadFreeMelodyMode() {
    gameState.canTap = true;
    gameState.isShowing = false;
    gameState.activeCrystals = CRYSTALS_DATA; // All 6 crystals available

    elements.replayBtn.classList.remove('visible');
    elements.startBtn.style.display = 'none';
    elements.stepPods.style.display = 'none';

    setPrompt('🎵 Tap any crystal to play beautiful music!', '✨');
    Narrator.speak('Melody Mode! Tap any crystal to play music!');

    elements.statusMsg.textContent = 'Free Melody Mode · Play notes freely';

    renderGemCards(gameState.activeCrystals);
  }

  function handleFreeMelodyTap(gemIdx, gemEl) {
    const crystal = gameState.activeCrystals[gemIdx];
    if (!crystal) return;

    gemEl.classList.add('active-tap', 'lit');
    SoundEngine.playCrystalTone(crystal.freq);
    spawnFloatingNote(gemEl, '🎵');

    const rect = gemEl.getBoundingClientRect();
    if (window.OtisParticles && window.OtisParticles.burst) {
      window.OtisParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, crystal.color, 8);
    }

    setTimeout(() => {
      gemEl.classList.remove('active-tap');
      gemEl.classList.remove('lit');
    }, 250);
  }

  // ==========================================
  // 11. INACTIVITY HINT ASSIST
  // ==========================================
  function resetInactivityTimer() {
    clearInactivityTimer();
    gameState.inactivityTimer = setTimeout(() => {
      triggerInactivityHint();
    }, 6000);
  }

  function clearInactivityTimer() {
    if (gameState.inactivityTimer) {
      clearTimeout(gameState.inactivityTimer);
      gameState.inactivityTimer = null;
    }
  }

  function triggerInactivityHint() {
    if (!gameState.canTap || gameState.isShowing || gameState.mode !== 'quest') return;

    const currentStep = gameState.playerSeq.length;
    if (currentStep >= gameState.sequence.length) return;

    const targetGemIdx = gameState.sequence[currentStep];
    const targetGemEl = gameState.gemElements[targetGemIdx];

    if (targetGemEl) {
      targetGemEl.classList.add('hint-shimmer');
      mascotCheer();
      Narrator.speak('Which crystal was next? Look for the gentle sparkle!');
    }
  }

  function clearGemHints() {
    gameState.gemElements.forEach((el) => {
      if (el) el.classList.remove('hint-shimmer');
    });
  }

  // ==========================================
  // 12. HELPER UTILITIES & VISUAL FX
  // ==========================================
  function setPrompt(text, icon = '💬') {
    if (elements.promptText) elements.promptText.textContent = text;
    if (elements.promptIcon) elements.promptIcon.textContent = icon;
  }

  function spawnFloatingNote(element, symbol = '🎵') {
    const rect = element.getBoundingClientRect();
    const note = document.createElement('div');
    note.className = 'mp-floating-note';
    note.textContent = symbol;
    note.style.left = `${rect.left + rect.width / 2}px`;
    note.style.top = `${rect.top}px`;
    document.body.appendChild(note);

    setTimeout(() => {
      note.remove();
    }, 850);
  }

  function mascotReact() {
    SoundEngine.playMascotChirp();
    mascotCheer();
    Narrator.speak('Hoot hoot! Let\'s follow the singing crystals!');
  }

  function mascotCheer() {
    const svg = elements.mascotWrapper ? elements.mascotWrapper.querySelector('.mp-mascot-svg') : null;
    if (svg) {
      svg.classList.remove('cheer', 'wobble');
      void svg.offsetWidth; // trigger reflow
      svg.classList.add('cheer');
      setTimeout(() => svg.classList.remove('cheer'), 600);
    }
  }

  function mascotConfused() {
    const svg = elements.mascotWrapper ? elements.mascotWrapper.querySelector('.mp-mascot-svg') : null;
    if (svg) {
      svg.classList.remove('cheer', 'wobble');
      void svg.offsetWidth; // trigger reflow
      svg.classList.add('wobble');
      setTimeout(() => svg.classList.remove('wobble'), 500);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
  } else {
    initGame();
  }
})();
