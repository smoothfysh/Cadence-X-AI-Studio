/**
 * Count & Drop — Modernized Game Engine (Otis Play)
 * Tactile Meadow Counting with Carved Wooden Toy Tray for Young Children (Ages 2-5)
 */

(function () {
  'use strict';

  // ==========================================
  // 1. ANIMAL CHARACTERS & SVG AVATARS
  // ==========================================
  const ANIMALS_DATA = [
    { id: 'cat', emoji: '🐱', name: 'Kittens', singular: 'Kitten', color: '#F59E0B' },
    { id: 'dog', emoji: '🐶', name: 'Puppies', singular: 'Puppy', color: '#8B5CF6' },
    { id: 'rabbit', emoji: '🐰', name: 'Bunnies', singular: 'Bunny', color: '#EC4899' },
    { id: 'panda', emoji: '🐼', name: 'Pandas', singular: 'Panda', color: '#10B981' },
    { id: 'frog', emoji: '🐸', name: 'Froggies', singular: 'Froggy', color: '#14B8A6' },
    { id: 'monkey', emoji: '🐵', name: 'Monkeys', singular: 'Monkey', color: '#F97316' },
    { id: 'pig', emoji: '🐷', name: 'Piggies', singular: 'Piggy', color: '#F43F5E' },
    { id: 'fox', emoji: '🦊', name: 'Foxes', singular: 'Fox', color: '#E11D48' },
    { id: 'chick', emoji: '🐥', name: 'Chicks', singular: 'Chick', color: '#EAB308' },
    { id: 'bear', emoji: '🐻', name: 'Teddy Bears', singular: 'Teddy Bear', color: '#6366F1' }
  ];

  // High-Resolution Kawaii SVG Avatars for Razor-Sharp Display
  const AnimalAvatars = {
    get(id) {
      switch (id) {
        case 'cat':
          return `
            <svg viewBox="0 0 80 80" width="100%" height="100%">
              <defs>
                <linearGradient id="catG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#FFA834"/><stop offset="100%" stop-color="#F28B10"/>
                </linearGradient>
                <linearGradient id="catEar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#FFB5BA"/><stop offset="100%" stop-color="#FF8A96"/>
                </linearGradient>
              </defs>
              <path d="M 16 38 L 12 14 L 34 26 Z" fill="url(#catG)" stroke="#C86A00" stroke-width="2" stroke-linejoin="round"/>
              <path d="M 18 34 L 16 19 L 30 27 Z" fill="url(#catEar)"/>
              <path d="M 64 38 L 68 14 L 46 26 Z" fill="url(#catG)" stroke="#C86A00" stroke-width="2" stroke-linejoin="round"/>
              <path d="M 62 34 L 64 19 L 50 27 Z" fill="url(#catEar)"/>
              <ellipse cx="40" cy="46" rx="30" ry="24" fill="url(#catG)" stroke="#C86A00" stroke-width="2"/>
              <path d="M 40 24 L 40 32" stroke="#D97200" stroke-width="3" stroke-linecap="round"/>
              <path d="M 33 26 L 35 33" stroke="#D97200" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M 47 26 L 45 33" stroke="#D97200" stroke-width="2.5" stroke-linecap="round"/>
              <ellipse cx="28" cy="44" rx="3.5" ry="4.5" fill="#3D2005"/>
              <circle cx="27" cy="42.5" r="1.5" fill="#FFFFFF"/>
              <ellipse cx="52" cy="44" rx="3.5" ry="4.5" fill="#3D2005"/>
              <circle cx="51" cy="42.5" r="1.5" fill="#FFFFFF"/>
              <circle cx="21" cy="50" r="5" fill="#FF7B89" opacity="0.5"/>
              <circle cx="59" cy="50" r="5" fill="#FF7B89" opacity="0.5"/>
              <polygon points="40,49 37,46 43,46" fill="#78350F"/>
              <path d="M 36 50 Q 40 53 44 50 Q 40 58 36 50 Z" fill="#991B1B"/>
              <path d="M 38 52 Q 40 55 42 52" fill="#F87171"/>
            </svg>
          `;
        case 'dog':
          return `
            <svg viewBox="0 0 80 80" width="100%" height="100%">
              <defs>
                <linearGradient id="dogG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#FCD34D"/><stop offset="100%" stop-color="#F59E0B"/>
                </linearGradient>
                <linearGradient id="dogEar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#B45309"/><stop offset="100%" stop-color="#78350F"/>
                </linearGradient>
              </defs>
              <ellipse cx="14" cy="42" rx="10" ry="18" fill="url(#dogEar)" transform="rotate(-15 14 42)"/>
              <ellipse cx="66" cy="42" rx="10" ry="18" fill="url(#dogEar)" transform="rotate(15 66 42)"/>
              <ellipse cx="40" cy="44" rx="28" ry="24" fill="url(#dogG)" stroke="#B45309" stroke-width="2"/>
              <ellipse cx="30" cy="40" rx="3.5" ry="4.5" fill="#3D2005"/>
              <circle cx="29" cy="38.5" r="1.5" fill="#FFFFFF"/>
              <ellipse cx="50" cy="40" rx="3.5" ry="4.5" fill="#3D2005"/>
              <circle cx="49" cy="38.5" r="1.5" fill="#FFFFFF"/>
              <circle cx="22" cy="48" r="4.5" fill="#FF7B89" opacity="0.5"/>
              <circle cx="58" cy="48" r="4.5" fill="#FF7B89" opacity="0.5"/>
              <ellipse cx="40" cy="47" rx="5" ry="4" fill="#3D2005"/>
              <path d="M 38 52 Q 40 58 42 52 Z" fill="#EF4444"/>
            </svg>
          `;
        case 'rabbit':
          return `
            <svg viewBox="0 0 80 80" width="100%" height="100%">
              <ellipse cx="26" cy="20" rx="7" ry="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" transform="rotate(-10 26 20)"/>
              <ellipse cx="26" cy="20" rx="4" ry="13" fill="#FDA4AF" transform="rotate(-10 26 20)"/>
              <ellipse cx="54" cy="20" rx="7" ry="18" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" transform="rotate(10 54 20)"/>
              <ellipse cx="54" cy="20" rx="4" ry="13" fill="#FDA4AF" transform="rotate(10 54 20)"/>
              <ellipse cx="40" cy="48" rx="28" ry="24" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
              <ellipse cx="30" cy="45" rx="3.5" ry="4.5" fill="#831843"/>
              <circle cx="29" cy="43.5" r="1.5" fill="#FFFFFF"/>
              <ellipse cx="50" cy="45" rx="3.5" ry="4.5" fill="#831843"/>
              <circle cx="49" cy="43.5" r="1.5" fill="#FFFFFF"/>
              <circle cx="21" cy="52" r="5" fill="#FB7185" opacity="0.5"/>
              <circle cx="59" cy="52" r="5" fill="#FB7185" opacity="0.5"/>
              <polygon points="40,51 37,48 43,48" fill="#FB7185"/>
              <path d="M 37 53 Q 40 56 43 53" fill="none" stroke="#831843" stroke-width="2" stroke-linecap="round"/>
            </svg>
          `;
        case 'panda':
          return `
            <svg viewBox="0 0 80 80" width="100%" height="100%">
              <circle cx="18" cy="24" r="10" fill="#1E293B"/>
              <circle cx="62" cy="24" r="10" fill="#1E293B"/>
              <ellipse cx="40" cy="46" rx="28" ry="24" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
              <ellipse cx="28" cy="42" rx="7" ry="9" fill="#1E293B" transform="rotate(-15 28 42)"/>
              <circle cx="29" cy="41" r="2.5" fill="#FFFFFF"/>
              <ellipse cx="52" cy="42" rx="7" ry="9" fill="#1E293B" transform="rotate(15 52 42)"/>
              <circle cx="51" cy="41" r="2.5" fill="#FFFFFF"/>
              <circle cx="19" cy="52" r="4.5" fill="#FDA4AF" opacity="0.5"/>
              <circle cx="61" cy="52" r="4.5" fill="#FDA4AF" opacity="0.5"/>
              <ellipse cx="40" cy="49" rx="4.5" ry="3.5" fill="#1E293B"/>
              <path d="M 36 54 Q 40 58 44 54" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
            </svg>
          `;
        case 'frog':
          return `
            <svg viewBox="0 0 80 80" width="100%" height="100%">
              <circle cx="22" cy="28" r="12" fill="#4ADE80" stroke="#16A34A" stroke-width="2"/>
              <circle cx="22" cy="28" r="6" fill="#FFFFFF"/>
              <circle cx="22" cy="28" r="3.5" fill="#14532D"/>
              <circle cx="58" cy="28" r="12" fill="#4ADE80" stroke="#16A34A" stroke-width="2"/>
              <circle cx="58" cy="28" r="6" fill="#FFFFFF"/>
              <circle cx="58" cy="28" r="3.5" fill="#14532D"/>
              <ellipse cx="40" cy="48" rx="28" ry="22" fill="#4ADE80" stroke="#16A34A" stroke-width="2"/>
              <circle cx="18" cy="48" r="5" fill="#FB7185" opacity="0.5"/>
              <circle cx="62" cy="48" r="5" fill="#FB7185" opacity="0.5"/>
              <path d="M 28 50 Q 40 60 52 50" fill="none" stroke="#14532D" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          `;
        default:
          // Fallback cute animal emoji badge
          const item = ANIMALS_DATA.find(a => a.id === id) || ANIMALS_DATA[0];
          return `<div style="font-size:2.4rem;display:flex;align-items:center;justify-content:center;width:100%;height:100%;">${item.emoji}</div>`;
      }
    }
  };

  const NUMBER_WORDS = [
    'Zero', 'One', 'Two', 'Three', 'Four',
    'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'
  ];

  const PITCH_SCALE = [
    261.63, 293.66, 329.63, 349.23, 392.00,
    440.00, 493.88, 523.25, 587.33, 659.25
  ];

  const ROUNDS_EASY = [1, 2, 3, 2, 4, 3, 5, 4];
  const ROUNDS_MEDIUM = [2, 3, 5, 4, 6, 5, 7, 6];

  // ==========================================
  // 2. AUDIO & SPEECH SYNTHESIZERS
  // ==========================================
  const SoundEngine = (() => {
    let audioCtx = null;
    let soundEnabled = true;

    function getContext() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }

    return {
      get enabled() { return soundEnabled; },
      set enabled(val) { soundEnabled = !!val; },

      playCountNote(count) {
        if (!soundEnabled) return;
        try {
          const ctx = getContext();
          const t = ctx.currentTime;
          const idx = Math.max(0, Math.min(count - 1, PITCH_SCALE.length - 1));
          const freq = PITCH_SCALE[idx];

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.46);

          const harm = ctx.createOscillator();
          const harmGain = ctx.createGain();
          harm.type = 'triangle';
          harm.frequency.setValueAtTime(freq * 3.8, t);
          harmGain.gain.setValueAtTime(0.001, t);
          harmGain.gain.linearRampToValueAtTime(0.12, t + 0.015);
          harmGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

          harm.connect(harmGain);
          harmGain.connect(ctx.destination);
          harm.start(t);
          harm.stop(t + 0.19);
        } catch (e) {
          console.warn('Audio note error:', e);
        }
      },

      playPopSound() {
        if (!soundEnabled) return;
        try {
          const ctx = getContext();
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(450, t);
          osc.frequency.exponentialRampToValueAtTime(160, t + 0.12);

          gain.gain.setValueAtTime(0.28, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.13);
        } catch (e) {
          console.warn('Audio pop error:', e);
        }
      },

      playFanfare() {
        if (!soundEnabled) return;
        try {
          const ctx = getContext();
          const t = ctx.currentTime;
          const notes = [
            { f: 261.63, delay: 0.00, dur: 0.18 },
            { f: 329.63, delay: 0.09, dur: 0.18 },
            { f: 392.00, delay: 0.18, dur: 0.18 },
            { f: 523.25, delay: 0.27, dur: 0.40 },
            { f: 659.25, delay: 0.36, dur: 0.60 }
          ];

          notes.forEach(({ f, delay, dur }) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, t + delay);

            gain.gain.setValueAtTime(0.001, t + delay);
            gain.gain.linearRampToValueAtTime(0.22, t + delay + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, t + delay + dur);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + delay);
            osc.stop(t + delay + dur + 0.02);
          });
        } catch (e) {
          console.warn('Fanfare error:', e);
        }
      },

      playWobble() {
        if (!soundEnabled) return;
        try {
          const ctx = getContext();
          const t = ctx.currentTime;
          [330, 260].forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(f, t + i * 0.12);
            gain.gain.setValueAtTime(0.18, t + i * 0.12);
            gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.12 + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t + i * 0.12);
            osc.stop(t + i * 0.12 + 0.23);
          });
        } catch (e) {
          console.warn('Wobble error:', e);
        }
      }
    };
  })();

  const VoiceEngine = (() => {
    const hasSpeech = 'speechSynthesis' in window;
    let voiceEnabled = true;

    return {
      get enabled() { return voiceEnabled && hasSpeech; },
      set enabled(val) { voiceEnabled = !!val; },
      hasSpeech,

      speak(text, rate = 0.95, pitch = 1.25) {
        if (!voiceEnabled || !hasSpeech) return;
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          utter.rate = rate;
          utter.pitch = pitch;
          utter.lang = 'en-US';
          window.speechSynthesis.speak(utter);
        } catch (e) {
          console.warn('Speech error:', e);
        }
      }
    };
  })();

  // ==========================================
  // 3. GAME STATE & SETTINGS
  // ==========================================
  const State = {
    mode: 'quest',
    maxCount: 5,
    roundIndex: 0,
    currentAnimal: ANIMALS_DATA[0],
    targetCount: 1,
    placedAnimals: [],
    roundSolved: false,
    autoAdvanceTimer: null
  };

  const DOM = {};

  function initDOMElements() {
    DOM.titleMascot = document.getElementById('cdTitleMascot');
    DOM.btnMode = document.getElementById('btnMode');
    DOM.btnMaxCount = document.getElementById('btnMaxCount');
    DOM.btnSound = document.getElementById('btnSound');
    DOM.btnVoice = document.getElementById('btnVoice');
    DOM.btnReset = document.getElementById('btnReset');

    DOM.missionBanner = document.getElementById('cdMissionBanner');
    DOM.promptBubble = document.getElementById('cdPromptBubble');
    DOM.promptText = document.getElementById('cdPromptText');
    DOM.targetBadge = document.getElementById('cdTargetBadge');
    DOM.targetEmoji = document.getElementById('cdTargetEmoji');
    DOM.targetNumber = document.getElementById('cdTargetNumber');
    DOM.countingPods = document.getElementById('cdCountingPods');

    DOM.meadowZone = document.getElementById('cdMeadowZone');
    DOM.meadowDropArea = document.getElementById('cdMeadowDropArea');
    DOM.meadowEmpty = document.getElementById('cdMeadowEmpty');
    DOM.placedContainer = document.getElementById('cdPlacedContainer');
    DOM.feedbackBanner = document.getElementById('cdFeedbackBanner');
    DOM.feedbackMsg = document.getElementById('cdFeedbackMsg');

    DOM.trayZone = document.getElementById('cdTrayZone');
    DOM.trayInstruction = document.getElementById('cdTrayInstruction');
    DOM.trayGrid = document.getElementById('cdTrayGrid');

    DOM.starsTrack = document.getElementById('cdStarsTrack');
  }

  function loadPreferences() {
    try {
      const savedSound = localStorage.getItem('otis_countdrop_sound');
      if (savedSound !== null) SoundEngine.enabled = savedSound === 'true';

      const savedVoice = localStorage.getItem('otis_countdrop_voice');
      if (savedVoice !== null) VoiceEngine.enabled = savedVoice === 'true';

      const savedMax = localStorage.getItem('otis_countdrop_maxcount');
      if (savedMax) State.maxCount = parseInt(savedMax, 10) === 10 ? 10 : 5;

      const savedMode = localStorage.getItem('otis_countdrop_mode');
      if (savedMode === 'free' || savedMode === 'quest') State.mode = savedMode;
    } catch (e) {
      console.warn('Storage read error:', e);
    }
  }

  function savePreferences() {
    try {
      localStorage.setItem('otis_countdrop_sound', String(SoundEngine.enabled));
      localStorage.setItem('otis_countdrop_voice', String(VoiceEngine.enabled));
      localStorage.setItem('otis_countdrop_maxcount', String(State.maxCount));
      localStorage.setItem('otis_countdrop_mode', State.mode);
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  }

  function updateToolbarUI() {
    if (DOM.btnSound) {
      DOM.btnSound.classList.toggle('muted', !SoundEngine.enabled);
      DOM.btnSound.innerHTML = SoundEngine.enabled ? '<span>🎵</span>' : '<span>🔇</span>';
      DOM.btnSound.title = SoundEngine.enabled ? 'Sound On' : 'Sound Muted';
    }
    if (DOM.btnVoice) {
      DOM.btnVoice.classList.toggle('muted', !VoiceEngine.enabled);
      DOM.btnVoice.innerHTML = VoiceEngine.enabled ? '<span>🔔</span>' : '<span>🔕</span>';
      DOM.btnVoice.title = VoiceEngine.enabled ? 'Voice On' : 'Voice Off';
    }
    if (DOM.btnMode) {
      DOM.btnMode.classList.toggle('active', State.mode === 'quest');
      DOM.btnMode.innerHTML = State.mode === 'quest' ? '<span>🎯 Quest</span>' : '<span>🎈 Free</span>';
    }
    if (DOM.btnMaxCount) {
      DOM.btnMaxCount.innerHTML = `<span>🔢 1–${State.maxCount}</span>`;
    }
  }

  // ==========================================
  // 4. ROUND SETUP & RENDERING
  // ==========================================
  function startSession() {
    State.roundIndex = 0;
    loadRound();
  }

  function getRoundsList() {
    return State.maxCount === 10 ? ROUNDS_MEDIUM : ROUNDS_EASY;
  }

  function loadRound() {
    if (State.autoAdvanceTimer) {
      clearTimeout(State.autoAdvanceTimer);
      State.autoAdvanceTimer = null;
    }

    const rounds = getRoundsList();

    if (State.mode === 'quest' && State.roundIndex >= rounds.length) {
      onQuestComplete();
      return;
    }

    State.roundSolved = false;
    State.placedAnimals = [];

    if (State.mode === 'quest') {
      State.targetCount = rounds[State.roundIndex];
      State.currentAnimal = ANIMALS_DATA[State.roundIndex % ANIMALS_DATA.length];
    } else {
      State.targetCount = State.maxCount;
      State.currentAnimal = ANIMALS_DATA[State.roundIndex % ANIMALS_DATA.length];
    }

    renderMissionBanner();
    renderMeadow();
    renderTray();
    renderStarsTrack();
    renderFeedback();

    if (State.mode === 'quest') {
      const prompt = `Drop ${State.targetCount} ${State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name} into the meadow!`;
      VoiceEngine.speak(prompt);
    } else {
      VoiceEngine.speak(`Drop cute animal friends into the meadow!`);
    }
  }

  // Render Mission Banner (Matching Screenshot Layout)
  function renderMissionBanner() {
    // Update Title Mascot Icon
    if (DOM.titleMascot) {
      DOM.titleMascot.innerHTML = AnimalAvatars.get(State.currentAnimal.id);
    }

    if (State.mode === 'quest') {
      DOM.targetBadge.style.display = 'inline-flex';
      DOM.targetEmoji.innerHTML = AnimalAvatars.get(State.currentAnimal.id);
      DOM.targetNumber.textContent = `× ${State.targetCount}`;

      const animalLabel = State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name;
      DOM.promptText.textContent = `Drop ${State.targetCount} ${animalLabel} into the meadow!`;

      // Render Montessori Stepping Stones (Pods)
      DOM.countingPods.style.display = 'flex';
      DOM.countingPods.innerHTML = '';
      for (let i = 1; i <= State.targetCount; i++) {
        const pod = document.createElement('div');
        pod.className = 'cd-pod';
        pod.id = `pod-${i}`;
        pod.textContent = '⭐';
        DOM.countingPods.appendChild(pod);
      }
    } else {
      DOM.targetBadge.style.display = 'inline-flex';
      DOM.targetEmoji.innerHTML = AnimalAvatars.get(State.currentAnimal.id);
      DOM.targetNumber.textContent = '';
      DOM.promptText.textContent = `Tap or drag any cute friends into the grass!`;
      DOM.countingPods.style.display = 'none';
    }
  }



  // Update Counting Pods
  function updateCountingPods() {
    if (State.mode !== 'quest') return;
    const count = State.placedAnimals.length;
    for (let i = 1; i <= State.targetCount; i++) {
      const pod = document.getElementById(`pod-${i}`);
      if (!pod) continue;
      if (i <= count) {
        pod.classList.add('filled');
        pod.textContent = '⭐';
      } else {
        pod.classList.remove('filled');
        pod.textContent = '⭐';
      }
    }
  }

  // Render Placed Animals in Meadow
  function renderMeadow() {
    DOM.placedContainer.innerHTML = '';
    const count = State.placedAnimals.length;

    if (count === 0) {
      DOM.meadowEmpty.style.display = 'flex';
    } else {
      DOM.meadowEmpty.style.display = 'none';

      State.placedAnimals.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'cd-placed-animal';
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', `${item.animal.singular} ${index + 1}. Tap to remove.`);
        el.title = `Tap to return ${item.animal.singular} to tray`;

        el.innerHTML = AnimalAvatars.get(item.animal.id);

        const badge = document.createElement('span');
        badge.className = 'cd-placed-badge';
        badge.textContent = String(index + 1);
        el.appendChild(badge);

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          removeAnimalFromMeadow(index);
        });

        DOM.placedContainer.appendChild(el);
      });
    }

    updateCountingPods();
  }

  // Render Animal Sticker Tiles in the Carved Wooden Tray
  function renderTray() {
    DOM.trayGrid.innerHTML = '';
    const totalTraySlots = State.maxCount;

    for (let i = 0; i < totalTraySlots; i++) {
      const animal = (State.mode === 'quest')
        ? State.currentAnimal
        : ANIMALS_DATA[i % ANIMALS_DATA.length];

      const isUsed = i < State.placedAnimals.length;
      const isFirstAvailable = !isUsed && (i === State.placedAnimals.length);

      const card = document.createElement('div');
      card.className = `cd-animal ${isUsed ? 'slot-disabled' : ''} ${isFirstAvailable && !State.roundSolved ? 'cd-animal-active' : ''}`;
      card.dataset.index = String(i);
      card.dataset.animalId = animal.id;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${animal.singular}. Drag or tap to drop into meadow.`);

      card.innerHTML = AnimalAvatars.get(animal.id);

      if (isFirstAvailable && !State.roundSolved) {
        const pointer = document.createElement('span');
        pointer.className = 'cd-pointer-hand';
        pointer.textContent = '👆';
        pointer.setAttribute('aria-hidden', 'true');
        card.appendChild(pointer);
      }

      if (!isUsed && !State.roundSolved) {
        setupDragAndTap(card, animal);
      }

      DOM.trayGrid.appendChild(card);
    }
  }

  // Render Celebratory Feedback Banner
  function renderFeedback() {
    const count = State.placedAnimals.length;

    if (State.mode === 'free') {
      if (count === 0) {
        if (DOM.feedbackBanner) DOM.feedbackBanner.style.display = 'none';
      } else {
        if (DOM.feedbackBanner) DOM.feedbackBanner.style.display = 'flex';
        DOM.feedbackMsg.className = 'cd-feedback-msg';
        DOM.feedbackMsg.textContent = `🌿 ${count} ${count === 1 ? 'friend' : 'friends'} playing!`;
      }
      return;
    }

    if (count === State.targetCount) {
      if (DOM.feedbackBanner) DOM.feedbackBanner.style.display = 'flex';
      DOM.feedbackMsg.className = 'cd-feedback-msg success';
      DOM.feedbackMsg.textContent = `Hooray! Exactly ${State.targetCount} ${State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name}! 🎉`;
    } else if (count > State.targetCount) {
      if (DOM.feedbackBanner) DOM.feedbackBanner.style.display = 'flex';
      DOM.feedbackMsg.className = 'cd-feedback-msg warning';
      DOM.feedbackMsg.textContent = `Too many! Tap one to hop back 🐾`;
    } else {
      if (DOM.feedbackBanner) DOM.feedbackBanner.style.display = 'none';
    }
  }

  // Render Bottom Milestone Stars Track (Matching Screenshot)
  function renderStarsTrack() {
    const rounds = getRoundsList();
    DOM.starsTrack.innerHTML = '';

    if (State.mode === 'quest') {
      DOM.starsTrack.style.display = 'flex';
      for (let i = 0; i < rounds.length; i++) {
        const star = document.createElement('div');
        star.className = 'cd-star-badge';
        if (i < State.roundIndex) {
          star.classList.add('completed');
          star.textContent = '⭐';
        } else if (i === State.roundIndex) {
          star.classList.add('current');
          star.textContent = '⭐';
        } else {
          star.textContent = '⭐';
        }
        DOM.starsTrack.appendChild(star);
      }
    } else {
      DOM.starsTrack.style.display = 'none';
    }
  }

  // ==========================================
  // 5. ANIMAL PLACEMENT ACTIONS
  // ==========================================
  function addAnimalToMeadow(animal, burstX, burstY) {
    if (State.placedAnimals.length >= State.maxCount) {
      VoiceEngine.speak('Meadow is full!');
      return;
    }

    State.placedAnimals.push({
      id: Date.now() + Math.random(),
      animal: animal
    });

    const currentCount = State.placedAnimals.length;
    SoundEngine.playCountNote(currentCount);

    const countWord = NUMBER_WORDS[currentCount] || String(currentCount);
    VoiceEngine.speak(`${countWord}!`);

    if (burstX && burstY && window.OtisParticles) {
      window.OtisParticles.burst(burstX, burstY, animal.color || '#F59E0B', 10);
    }

    renderMeadow();
    renderTray();
    renderFeedback();

    if (State.mode === 'quest') {
      if (currentCount === State.targetCount) {
        onTargetReached();
      } else if (currentCount > State.targetCount) {
        SoundEngine.playWobble();
      }
    }
  }

  function removeAnimalFromMeadow(index) {
    if (State.roundSolved) return;

    if (index >= 0 && index < State.placedAnimals.length) {
      State.placedAnimals.splice(index, 1);
      SoundEngine.playPopSound();

      const newCount = State.placedAnimals.length;
      if (newCount > 0) {
        const countWord = NUMBER_WORDS[newCount] || String(newCount);
        VoiceEngine.speak(countWord);
      }

      renderMeadow();
      renderTray();
      renderFeedback();
    }
  }

  function onTargetReached() {
    State.roundSolved = true;
    SoundEngine.playFanfare();

    const animalName = State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name;
    VoiceEngine.speak(`Hooray! Exactly ${State.targetCount} ${animalName}! Great job!`);

    if (window.OtisParticles) {
      const rect = DOM.meadowZone.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      window.OtisParticles.burst(centerX, centerY, '#F59E0B', 22);
      window.OtisParticles.burst(centerX - 60, centerY - 20, '#38BDF8', 14);
      window.OtisParticles.burst(centerX + 60, centerY - 20, '#4ADE80', 14);
    }

    renderMeadow();
    renderStarsTrack();
    renderFeedback();

    // Auto advance after celebratory fanfare
    State.autoAdvanceTimer = setTimeout(() => {
      advanceRound();
    }, 2400);
  }

  function advanceRound() {
    if (State.autoAdvanceTimer) {
      clearTimeout(State.autoAdvanceTimer);
      State.autoAdvanceTimer = null;
    }
    State.roundIndex++;
    loadRound();
  }

  function onQuestComplete() {
    SoundEngine.playFanfare();
    if (window.createCelebration) {
      window.createCelebration(
        document.body,
        'You Counted Them All!',
        '🌟',
        () => { startSession(); },
        () => { window.location.href = '../index.html'; }
      );
    } else {
      alert('Hooray! You completed all counting rounds!');
      startSession();
    }
  }

  // ==========================================
  // 6. TOUCH & POINTER INTERACTIONS
  // ==========================================
  function setupDragAndTap(cardEl, animal) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let dragClone = null;
    let offsetX = 0;
    let offsetY = 0;

    function onPointerDown(e) {
      if (State.roundSolved) return;
      if (e.button && e.button !== 0) return;

      e.preventDefault();
      cardEl.setPointerCapture(e.pointerId);

      startX = e.clientX;
      startY = e.clientY;
      isDragging = false;

      const rect = cardEl.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      cardEl.addEventListener('pointermove', onPointerMove);
      cardEl.addEventListener('pointerup', onPointerUp);
      cardEl.addEventListener('pointercancel', onPointerCancel);
    }

    function onPointerMove(e) {
      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);

      if (!isDragging && dist > 8) {
        isDragging = true;

        dragClone = cardEl.cloneNode(true);
        dragClone.classList.add('dragging');
        dragClone.style.left = `${e.clientX - offsetX}px`;
        dragClone.style.top = `${e.clientY - offsetY}px`;
        dragClone.style.width = `${cardEl.offsetWidth}px`;
        dragClone.style.height = `${cardEl.offsetHeight}px`;
        document.body.appendChild(dragClone);

        cardEl.style.opacity = '0.35';
      }

      if (isDragging && dragClone) {
        dragClone.style.left = `${e.clientX - offsetX}px`;
        dragClone.style.top = `${e.clientY - offsetY}px`;
      }
    }

    function onPointerUp(e) {
      cleanupListeners();

      if (isDragging) {
        cardEl.style.opacity = '1';

        const meadowRect = DOM.meadowZone.getBoundingClientRect();
        const isInsideMeadow = (
          e.clientX >= meadowRect.left &&
          e.clientX <= meadowRect.right &&
          e.clientY >= meadowRect.top &&
          e.clientY <= meadowRect.bottom
        );

        if (dragClone) {
          dragClone.remove();
          dragClone = null;
        }

        if (isInsideMeadow) {
          addAnimalToMeadow(animal, e.clientX, e.clientY);
        }
      } else {
        // Tap to leap!
        cleanupDragClone();
        cardEl.style.opacity = '1';

        const meadowRect = DOM.meadowZone.getBoundingClientRect();
        const dropX = meadowRect.left + meadowRect.width / 2;
        const dropY = meadowRect.top + meadowRect.height / 2;
        addAnimalToMeadow(animal, dropX, dropY);
      }
    }

    function onPointerCancel() {
      cleanupListeners();
      cleanupDragClone();
      cardEl.style.opacity = '1';
    }

    function cleanupDragClone() {
      if (dragClone) {
        dragClone.remove();
        dragClone = null;
      }
    }

    function cleanupListeners() {
      try { cardEl.releasePointerCapture(cardEl.dataset.pointerId || 0); } catch (e) {}
      cardEl.removeEventListener('pointermove', onPointerMove);
      cardEl.removeEventListener('pointerup', onPointerUp);
      cardEl.removeEventListener('pointercancel', onPointerCancel);
    }

    cardEl.addEventListener('pointerdown', onPointerDown);
  }

  // ==========================================
  // 7. EVENT LISTENERS & BOOTSTRAP
  // ==========================================
  function setupEventListeners() {
    DOM.btnMode.addEventListener('click', () => {
      State.mode = State.mode === 'quest' ? 'free' : 'quest';
      savePreferences();
      updateToolbarUI();
      startSession();
      SoundEngine.playPopSound();
    });

    DOM.btnMaxCount.addEventListener('click', () => {
      State.maxCount = State.maxCount === 5 ? 10 : 5;
      savePreferences();
      updateToolbarUI();
      startSession();
      SoundEngine.playPopSound();
    });

    DOM.btnSound.addEventListener('click', () => {
      SoundEngine.enabled = !SoundEngine.enabled;
      savePreferences();
      updateToolbarUI();
      if (SoundEngine.enabled) SoundEngine.playCountNote(3);
    });

    DOM.btnVoice.addEventListener('click', () => {
      VoiceEngine.enabled = !VoiceEngine.enabled;
      savePreferences();
      updateToolbarUI();
      if (VoiceEngine.enabled) VoiceEngine.speak('Voice on!');
    });

    DOM.btnReset.addEventListener('click', () => {
      SoundEngine.playPopSound();
      loadRound();
    });

    DOM.promptBubble.addEventListener('click', () => {
      if (State.mode === 'quest') {
        const animalLabel = State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name;
        VoiceEngine.speak(`Drop ${State.targetCount} ${animalLabel} into the meadow!`);
      } else {
        VoiceEngine.speak(`Explore and count the cute animal friends!`);
      }
      SoundEngine.playCountNote(1);
    });
  }

  function init() {
    initDOMElements();
    loadPreferences();
    updateToolbarUI();
    setupEventListeners();
    startSession();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
