/**
 * Count & Drop — Modernized Game Engine (Otis Play)
 * Tactile Meadow Counting for Young Children & Toddlers (Ages 2-5)
 *
 * Key Features:
 *  - Dual Play Modes:
 *      1. "Count Quest": Guided numeracy rounds with spoken targets & milestones
 *      2. "Free Play": Open-ended toddler sandbox to explore numbers freely
 *  - Dual Interactions:
 *      1. Drag & Drop with glowing meadow snap & tactile physics
 *      2. Tap to Leap: Direct tap makes animal hop gracefully into the meadow
 *  - Montessori Stepping Stone Pods:
 *      Visual counting dots that light up as animals are placed (1-to-1 correspondence)
 *  - Web Audio Marimba/Xylophone Synthesizer:
 *      Musical ascending pitches for counts 1 to 10 to reinforce quantity
 *  - Spoken Numeracy & Encouragement via Web Speech API
 *  - 10 Lovable Animal Friends with Kawaii bounce & expressions
 *  - Tactile tap-to-return: Tap any animal in the meadow to send it hopping home
 *  - Difficulty range toggle (1-5 for toddlers, 1-10 for preschoolers)
 *  - LocalStorage persistence for Sound, Voice, Mode, and Difficulty
 */

(function () {
  'use strict';

  // ==========================================
  // 1. ANIMAL CHARACTERS DATABASE
  // ==========================================
  const ANIMALS_DATA = [
    { id: 'cat', emoji: '🐱', name: 'Kittens', singular: 'Kitten', soundName: 'meow', color: '#F59E0B' },
    { id: 'dog', emoji: '🐶', name: 'Puppies', singular: 'Puppy', soundName: 'woof', color: '#8B5CF6' },
    { id: 'rabbit', emoji: '🐰', name: 'Bunnies', singular: 'Bunny', soundName: 'hop', color: '#EC4899' },
    { id: 'panda', emoji: '🐼', name: 'Pandas', singular: 'Panda', soundName: 'munch', color: '#10B981' },
    { id: 'frog', emoji: '🐸', name: 'Froggies', singular: 'Froggy', soundName: 'ribbit', color: '#14B8A6' },
    { id: 'monkey', emoji: '🐵', name: 'Monkeys', singular: 'Monkey', soundName: 'ooh-ooh', color: '#F97316' },
    { id: 'pig', emoji: '🐷', name: 'Piggies', singular: 'Piggy', soundName: 'oink', color: '#F43F5E' },
    { id: 'fox', emoji: '🦊', name: 'Foxes', singular: 'Fox', soundName: 'yip', color: '#E11D48' },
    { id: 'chick', emoji: '🐥', name: 'Chicks', singular: 'Chick', soundName: 'cheep', color: '#EAB308' },
    { id: 'bear', emoji: '🐻', name: 'Teddy Bears', singular: 'Teddy Bear', soundName: 'growl', color: '#6366F1' }
  ];

  // Number words for clear speech
  const NUMBER_WORDS = [
    'Zero', 'One', 'Two', 'Three', 'Four',
    'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'
  ];

  // Musical pitches for counts 1 through 10 (C Major scale rising up)
  const PITCH_SCALE = [
    261.63, // 1: C4
    293.66, // 2: D4
    329.63, // 3: E4
    349.23, // 4: F4
    392.00, // 5: G4
    440.00, // 6: A4
    493.88, // 7: B4
    523.25, // 8: C5
    587.33, // 9: D5
    659.25  // 10: E5
  ];

  // Round progression presets for Quest Mode
  const ROUNDS_EASY = [1, 2, 3, 2, 4, 3, 5, 4]; // 8 rounds up to 5
  const ROUNDS_MEDIUM = [2, 3, 5, 4, 6, 5, 7, 6]; // 8 rounds up to 10

  // ==========================================
  // 2. AUDIO & SPEECH SYNTHESIZERS
  // ==========================================
  const SoundEngine = (() => {
    let audioCtx = null;
    let soundEnabled = true;

    function getContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    return {
      get enabled() { return soundEnabled; },
      set enabled(val) { soundEnabled = !!val; },

      // Ascending musical marimba chime for counting numbers
      playCountNote(count) {
        if (!soundEnabled) return;
        try {
          const ctx = getContext();
          const t = ctx.currentTime;
          const idx = Math.max(0, Math.min(count - 1, PITCH_SCALE.length - 1));
          const freq = PITCH_SCALE[idx];

          // Fundamental marimba bar oscillator
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          // Attack & woody exponential decay
          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.46);

          // Warm harmonic overtone (3.8x harmonic for marimba resonance)
          const harmOsc = ctx.createOscillator();
          const harmGain = ctx.createGain();
          harmOsc.type = 'triangle';
          harmOsc.frequency.setValueAtTime(freq * 3.8, t);
          harmGain.gain.setValueAtTime(0.001, t);
          harmGain.gain.linearRampToValueAtTime(0.12, t + 0.015);
          harmGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

          harmOsc.connect(harmGain);
          harmGain.connect(ctx.destination);
          harmOsc.start(t);
          harmOsc.stop(t + 0.19);
        } catch (e) {
          console.warn('Audio note error:', e);
        }
      },

      // Gentle pop sound when an animal is removed back to tray
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

      // Joyful celebration fanfare chord progression
      playFanfare() {
        if (!soundEnabled) return;
        try {
          const ctx = getContext();
          const t = ctx.currentTime;
          // C Major arpeggio into bright major chord
          const notes = [
            { f: 261.63, delay: 0.00, dur: 0.18 }, // C4
            { f: 329.63, delay: 0.09, dur: 0.18 }, // E4
            { f: 392.00, delay: 0.18, dur: 0.18 }, // G4
            { f: 523.25, delay: 0.27, dur: 0.40 }, // C5
            { f: 659.25, delay: 0.36, dur: 0.60 }  // E5
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

      // Gentle wobble / reminder tone when target is exceeded
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
          console.warn('Speech synthesis error:', e);
        }
      }
    };
  })();

  // ==========================================
  // 3. GAME STATE & SETTINGS
  // ==========================================
  const State = {
    mode: 'quest', // 'quest' | 'free'
    maxCount: 5,   // 5 or 10
    roundIndex: 0,
    currentAnimal: ANIMALS_DATA[0],
    targetCount: 3,
    placedAnimals: [], // array of { id, animal }
    roundSolved: false,
    autoAdvanceTimer: null,
    activePointerDrag: null
  };

  // DOM Elements
  const DOM = {};

  function initDOMElements() {
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
    DOM.meadowCountPill = document.getElementById('cdMeadowCountPill');
    DOM.meadowDropArea = document.getElementById('cdMeadowDropArea');
    DOM.meadowEmpty = document.getElementById('cdMeadowEmpty');
    DOM.placedContainer = document.getElementById('cdPlacedContainer');

    DOM.feedbackBanner = document.getElementById('cdFeedbackBanner');
    DOM.feedbackMsg = document.getElementById('cdFeedbackMsg');

    DOM.trayZone = document.getElementById('cdTrayZone');
    DOM.trayInstruction = document.getElementById('cdTrayInstruction');
    DOM.trayGrid = document.getElementById('cdTrayGrid');

    DOM.starsTrack = document.getElementById('cdStarsTrack');
    DOM.statusMsg = document.getElementById('cdStatusMsg');
  }

  // Load preferences from localStorage
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

  // Update Toolbar UI state (active / muted pills)
  function updateToolbarUI() {
    if (DOM.btnSound) {
      DOM.btnSound.classList.toggle('muted', !SoundEngine.enabled);
      DOM.btnSound.innerHTML = SoundEngine.enabled ? '<span>🎵</span>' : '<span>🔇</span>';
      DOM.btnSound.title = SoundEngine.enabled ? 'Sound On' : 'Sound Muted';
    }
    if (DOM.btnVoice) {
      DOM.btnVoice.classList.toggle('muted', !VoiceEngine.enabled);
      DOM.btnVoice.innerHTML = VoiceEngine.enabled ? '<span>🗣️</span>' : '<span>🤫</span>';
      DOM.btnVoice.title = VoiceEngine.enabled ? 'Voice On' : 'Voice Off';
    }
    if (DOM.btnMode) {
      DOM.btnMode.classList.toggle('active', State.mode === 'quest');
      const isQuest = State.mode === 'quest';
      DOM.btnMode.innerHTML = isQuest
        ? '<span>🎯 Quest</span>'
        : '<span>🎈 Free</span>';
    }
    if (DOM.btnMaxCount) {
      DOM.btnMaxCount.innerHTML = `<span>🔢 1–${State.maxCount}</span>`;
    }
  }

  // ==========================================
  // 4. ROUND SETUP & LOGIC
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

    // Check if Quest completed
    if (State.mode === 'quest' && State.roundIndex >= rounds.length) {
      onQuestComplete();
      return;
    }

    State.roundSolved = false;
    State.placedAnimals = [];

    // Select Animal & Target
    if (State.mode === 'quest') {
      State.targetCount = rounds[State.roundIndex];
      // Cycle through animals, varied each round
      State.currentAnimal = ANIMALS_DATA[State.roundIndex % ANIMALS_DATA.length];
    } else {
      // Free Play: target is flexible sandbox
      State.targetCount = State.maxCount;
      State.currentAnimal = ANIMALS_DATA[State.roundIndex % ANIMALS_DATA.length];
    }

    // Refresh All UI
    renderMissionBanner();
    renderMeadow();
    renderTray();
    renderStarsTrack();
    renderFeedback();

    // Speak initial mission prompt in Quest mode
    if (State.mode === 'quest') {
      const prompt = `Can you drop ${State.targetCount} ${State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name} into the meadow?`;
      VoiceEngine.speak(prompt);
    } else {
      VoiceEngine.speak(`Drop cute animal friends into the meadow!`);
    }
  }

  // Render Mission / Target Display
  function renderMissionBanner() {
    if (State.mode === 'quest') {
      DOM.targetBadge.style.display = 'inline-flex';
      DOM.targetEmoji.textContent = State.currentAnimal.emoji;
      DOM.targetNumber.textContent = `× ${State.targetCount}`;

      const animalLabel = State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name;
      DOM.promptText.textContent = `Drop ${State.targetCount} ${animalLabel} into the meadow!`;

      // Render Montessori Counting Pods (Stepping Stones)
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
      // Free Play Mode
      DOM.targetBadge.style.display = 'inline-flex';
      DOM.targetEmoji.textContent = '🌿';
      DOM.targetNumber.textContent = '';
      DOM.promptText.textContent = `Tap or drag any cute friends into the grass!`;
      DOM.countingPods.style.display = 'none';
    }
  }

  // Update Counting Pods filling
  function updateCountingPods() {
    if (State.mode !== 'quest') return;
    const count = State.placedAnimals.length;
    for (let i = 1; i <= State.targetCount; i++) {
      const pod = document.getElementById(`pod-${i}`);
      if (!pod) continue;
      if (i <= count) {
        pod.classList.add('filled');
        pod.textContent = String(i);
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
      DOM.meadowCountPill.style.display = 'none';
    } else {
      DOM.meadowEmpty.style.display = 'none';
      DOM.meadowCountPill.style.display = 'block';
      if (State.mode === 'quest') {
        const label = count === 1 ? State.currentAnimal.singular : State.currentAnimal.name;
        DOM.meadowCountPill.textContent = `${count} / ${State.targetCount} ${State.currentAnimal.emoji}`;
      } else {
        DOM.meadowCountPill.textContent = `${count} in meadow 🐾`;
      }

      State.placedAnimals.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'cd-placed-animal';
        el.textContent = item.animal.emoji;
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label', `${item.animal.singular} ${index + 1}. Tap to remove.`);
        el.title = `Tap to return ${item.animal.singular} to tray`;

        // Number badge on animal
        const badge = document.createElement('span');
        badge.className = 'cd-placed-badge';
        badge.textContent = String(index + 1);
        el.appendChild(badge);

        // Remove indicator
        const removeHint = document.createElement('span');
        removeHint.className = 'cd-placed-remove-hint';
        removeHint.textContent = 'Tap to remove';
        el.appendChild(removeHint);

        // Tap in meadow to send back to tray!
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          removeAnimalFromMeadow(index);
        });

        DOM.placedContainer.appendChild(el);
      });
    }

    updateCountingPods();
    DOM.meadowZone.classList.toggle('round-won', State.roundSolved);
  }

  // Render Animal Stickers in Tray
  function renderTray() {
    DOM.trayGrid.innerHTML = '';
    const availableCount = State.maxCount - State.placedAnimals.length;

    DOM.trayInstruction.textContent = availableCount > 0
      ? `Tap to hop, or drag into grass!`
      : `All in the meadow! 🎉`;

    // In Quest mode: show current animal stickers
    // In Free mode: show a joyful mix of animals
    const totalTraySlots = State.maxCount;

    for (let i = 0; i < totalTraySlots; i++) {
      const animal = (State.mode === 'quest')
        ? State.currentAnimal
        : ANIMALS_DATA[i % ANIMALS_DATA.length];

      const isUsed = i < State.placedAnimals.length;

      const card = document.createElement('div');
      card.className = `cd-animal ${isUsed ? 'slot-disabled' : ''}`;
      card.textContent = animal.emoji;
      card.dataset.index = String(i);
      card.dataset.animalId = animal.id;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${animal.singular}. Drag or tap to drop into meadow.`);

      if (!isUsed && !State.roundSolved) {
        setupDragAndTap(card, animal);
      }

      DOM.trayGrid.appendChild(card);
    }
  }

  // Render Feedback Banner
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

    // Quest Mode Feedback
    if (count === State.targetCount) {
      if (DOM.feedbackBanner) DOM.feedbackBanner.style.display = 'flex';
      DOM.feedbackMsg.className = 'cd-feedback-msg success';
      DOM.feedbackMsg.textContent = `Hooray! Exactly ${State.targetCount} ${State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name}! 🎉`;
    } else if (count > State.targetCount) {
      if (DOM.feedbackBanner) DOM.feedbackBanner.style.display = 'flex';
      DOM.feedbackMsg.className = 'cd-feedback-msg warning';
      DOM.feedbackMsg.textContent = `Too many! Tap an animal to hop back 🐾`;
    } else {
      // Under target: Keep meadow completely clean and uncluttered!
      if (DOM.feedbackBanner) DOM.feedbackBanner.style.display = 'none';
    }
  }

  // Render Bottom Star Track
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

      DOM.statusMsg.textContent = '';
      DOM.statusMsg.style.display = 'none';
    } else {
      DOM.starsTrack.style.display = 'none';
      DOM.statusMsg.textContent = '';
      DOM.statusMsg.style.display = 'none';
    }
  }

  // ==========================================
  // 5. ANIMAL PLACEMENT & ACTIONS
  // ==========================================

  // Add an animal into the meadow
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

    // Musical count audio + speech
    SoundEngine.playCountNote(currentCount);

    const countWord = NUMBER_WORDS[currentCount] || String(currentCount);
    VoiceEngine.speak(`${countWord}!`);

    // Visual sparkle particles at drop point
    if (burstX && burstY && window.OtisParticles) {
      window.OtisParticles.burst(burstX, burstY, animal.color || '#14B8A6', 10);
    }

    renderMeadow();
    renderTray();
    renderFeedback();

    // Check Quest goal condition
    if (State.mode === 'quest') {
      if (currentCount === State.targetCount) {
        onTargetReached();
      } else if (currentCount > State.targetCount) {
        SoundEngine.playWobble();
      }
    }
  }

  // Remove an animal from meadow (tap in meadow)
  function removeAnimalFromMeadow(index) {
    if (State.roundSolved) return; // Prevent edits once target celebratory moment has triggered

    if (index >= 0 && index < State.placedAnimals.length) {
      const removed = State.placedAnimals.splice(index, 1)[0];
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

  // Target reached celebration
  function onTargetReached() {
    State.roundSolved = true;
    SoundEngine.playFanfare();

    const animalName = State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name;
    VoiceEngine.speak(`Hooray! Exactly ${State.targetCount} ${animalName}! Great job!`);

    // Confetti particles across the meadow
    if (window.OtisParticles) {
      const rect = DOM.meadowZone.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      window.OtisParticles.burst(centerX, centerY, '#F59E0B', 22);
      window.OtisParticles.burst(centerX - 60, centerY - 20, '#14B8A6', 14);
      window.OtisParticles.burst(centerX + 60, centerY - 20, '#EC4899', 14);
    }

    renderMeadow();
    renderStarsTrack();
    renderFeedback();

    // Auto advance after 2.4s to give child joyful reward time
    State.autoAdvanceTimer = setTimeout(() => {
      advanceRound();
    }, 2400);
  }

  // Advance to next round
  function advanceRound() {
    if (State.autoAdvanceTimer) {
      clearTimeout(State.autoAdvanceTimer);
      State.autoAdvanceTimer = null;
    }
    State.roundIndex++;
    loadRound();
  }

  // Quest complete celebration
  function onQuestComplete() {
    SoundEngine.playFanfare();
    if (window.createCelebration) {
      window.createCelebration(
        document.body,
        'You Counted Them All!',
        '🌟',
        () => {
          startSession();
        },
        () => {
          window.location.href = '../index.html';
        }
      );
    } else {
      alert('Hooray! You completed all counting rounds!');
      startSession();
    }
    DOM.statusMsg.textContent = 'All rounds complete! 🎉';
  }

  // ==========================================
  // 6. TOUCH & POINTER INTERACTIONS
  // (Both Drag & Drop AND Tap to Leap)
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
      if (e.button && e.button !== 0) return; // primary mouse only

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

      // If finger moved > 8px, initiate DRAG
      if (!isDragging && dist > 8) {
        isDragging = true;

        // Create elevated floating drag avatar
        dragClone = cardEl.cloneNode(true);
        dragClone.classList.add('dragging');
        dragClone.style.left = `${e.clientX - offsetX}px`;
        dragClone.style.top = `${e.clientY - offsetY}px`;
        dragClone.style.width = `${cardEl.offsetWidth}px`;
        dragClone.style.height = `${cardEl.offsetHeight}px`;
        document.body.appendChild(dragClone);

        cardEl.style.opacity = '0.4';
      }

      if (isDragging && dragClone) {
        dragClone.style.left = `${e.clientX - offsetX}px`;
        dragClone.style.top = `${e.clientY - offsetY}px`;

        // Check if pointer is over meadow
        const meadowRect = DOM.meadowZone.getBoundingClientRect();
        const isOverMeadow = (
          e.clientX >= meadowRect.left &&
          e.clientX <= meadowRect.right &&
          e.clientY >= meadowRect.top &&
          e.clientY <= meadowRect.bottom
        );

        DOM.meadowZone.classList.toggle('drag-over', isOverMeadow);
      }
    }

    function onPointerUp(e) {
      cleanupListeners();

      if (isDragging) {
        // Was dragging: check if dropped inside meadow
        DOM.meadowZone.classList.remove('drag-over');
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
        // Was a TAP! (Young children favorite action: tap to leap)
        cleanupDragClone();
        cardEl.style.opacity = '1';

        // Animate hop into meadow
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
      DOM.meadowZone.classList.remove('drag-over');
    }

    function cleanupDragClone() {
      if (dragClone) {
        dragClone.remove();
        dragClone = null;
      }
    }

    function cleanupListeners() {
      try {
        cardEl.releasePointerCapture(cardEl.dataset.pointerId || 0);
      } catch (e) {}
      cardEl.removeEventListener('pointermove', onPointerMove);
      cardEl.removeEventListener('pointerup', onPointerUp);
      cardEl.removeEventListener('pointercancel', onPointerCancel);
    }

    cardEl.addEventListener('pointerdown', onPointerDown);
  }

  // ==========================================
  // 7. EVENT LISTENERS & INITIALIZATION
  // ==========================================
  function setupEventListeners() {
    // Mode Toggle (Quest vs Free Play)
    DOM.btnMode.addEventListener('click', () => {
      State.mode = State.mode === 'quest' ? 'free' : 'quest';
      savePreferences();
      updateToolbarUI();
      startSession();
      SoundEngine.playPopSound();
    });

    // Max Count Toggle (5 vs 10)
    DOM.btnMaxCount.addEventListener('click', () => {
      State.maxCount = State.maxCount === 5 ? 10 : 5;
      savePreferences();
      updateToolbarUI();
      startSession();
      SoundEngine.playPopSound();
    });

    // Sound FX Toggle
    DOM.btnSound.addEventListener('click', () => {
      SoundEngine.enabled = !SoundEngine.enabled;
      savePreferences();
      updateToolbarUI();
      if (SoundEngine.enabled) SoundEngine.playCountNote(3);
    });

    // Voice Speech Toggle
    DOM.btnVoice.addEventListener('click', () => {
      VoiceEngine.enabled = !VoiceEngine.enabled;
      savePreferences();
      updateToolbarUI();
      if (VoiceEngine.enabled) VoiceEngine.speak('Voice on!');
    });

    // Reset Round
    DOM.btnReset.addEventListener('click', () => {
      SoundEngine.playPopSound();
      loadRound();
    });

    // Speak Prompt Bubble on Tap
    DOM.promptBubble.addEventListener('click', () => {
      if (State.mode === 'quest') {
        const animalLabel = State.targetCount === 1 ? State.currentAnimal.singular : State.currentAnimal.name;
        VoiceEngine.speak(`Drop ${State.targetCount} ${animalLabel} into the meadow!`);
      } else {
        VoiceEngine.speak(`Explore and count the cute animals!`);
      }
    });
  }

  // Boot Engine
  function init() {
    initDOMElements();
    loadPreferences();
    updateToolbarUI();
    setupEventListeners();
    startSession();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
