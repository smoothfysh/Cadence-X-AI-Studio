/**
 * ABC Animal Stickers — Audio & Speech Synthesis Engine
 * Procedural Web Audio API sound generator & child-friendly Web Speech API narrator
 */

const AlphaAudio = (() => {
  let ctx = null;

  function getContext() {
    if (!ctx) {
      if (window.OtisAudio && window.OtisAudio.getContext) {
        ctx = window.OtisAudio.getContext();
      } else {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function playTone(freq, duration, type = 'sine', gainVal = 0.25) {
    if (!state.soundEnabled) return;
    try {
      const c = getContext();
      if (!c) return;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime);
      gain.gain.setValueAtTime(gainVal, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + duration);
    } catch (e) {}
  }

  return {
    getContext,

    // Button tap / bubble pop
    playPop() {
      if (!state.soundEnabled) return;
      try {
        const c = getContext();
        if (!c) return;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(650, c.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, c.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, c.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(c.currentTime);
        osc.stop(c.currentTime + 0.12);
      } catch (e) {}
    },

    // Musical Marimba chime for letters & correct matches
    playChime() {
      if (!state.soundEnabled) return;
      try {
        const c = getContext();
        if (!c) return;
        const t = c.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((f, i) => {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t + i * 0.08);
          gain.gain.setValueAtTime(0.2, t + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(c.destination);
          osc.start(t + i * 0.08);
          osc.stop(t + i * 0.08 + 0.35);
        });
      } catch (e) {}
    },

    // Shimmering fairy sparkle
    playSparkle() {
      if (!state.soundEnabled) return;
      try {
        const c = getContext();
        if (!c) return;
        const t = c.currentTime;
        const freqs = [1046, 1318, 1567, 2093, 2637];
        freqs.forEach((f, i) => {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t + i * 0.05);
          gain.gain.setValueAtTime(0.12, t + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.22);
          osc.connect(gain);
          gain.connect(c.destination);
          osc.start(t + i * 0.05);
          osc.stop(t + i * 0.05 + 0.22);
        });
      } catch (e) {}
    },

    // Tactile stamp thump + golden bell for collecting stickers
    playStamp() {
      if (!state.soundEnabled) return;
      try {
        const c = getContext();
        if (!c) return;
        const t = c.currentTime;
        // Deep stamp thump
        const oscThump = c.createOscillator();
        const gainThump = c.createGain();
        oscThump.type = 'triangle';
        oscThump.frequency.setValueAtTime(160, t);
        oscThump.frequency.exponentialRampToValueAtTime(50, t + 0.15);
        gainThump.gain.setValueAtTime(0.4, t);
        gainThump.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        oscThump.connect(gainThump);
        gainThump.connect(c.destination);
        oscThump.start(t);
        oscThump.stop(t + 0.15);

        // Golden bell chime follow-through
        setTimeout(() => this.playSparkle(), 80);
      } catch (e) {}
    },

    // Gentle harmless cartoon wobble / boing for distractors
    playBoing() {
      if (!state.soundEnabled) return;
      try {
        const c = getContext();
        if (!c) return;
        const t = c.currentTime;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.25);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      } catch (e) {}
    },

    // Grand victory fanfare
    playFanfare() {
      if (!state.soundEnabled) return;
      try {
        if (window.OtisAudio && window.OtisAudio.playFanfare) {
          window.OtisAudio.playFanfare();
          return;
        }
        const c = getContext();
        if (!c) return;
        const t = c.currentTime;
        const melody = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        melody.forEach((f, i) => {
          const osc = c.createOscillator();
          const gain = c.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, t + i * 0.14);
          gain.gain.setValueAtTime(0.25, t + i * 0.14);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.14 + 0.45);
          osc.connect(gain);
          gain.connect(c.destination);
          osc.start(t + i * 0.14);
          osc.stop(t + i * 0.14 + 0.45);
        });
      } catch (e) {}
    },

    // Playful procedural animal sounds
    playAnimalSound(soundType) {
      if (!state.soundEnabled) return;
      try {
        const c = getContext();
        if (!c) return;
        const t = c.currentTime;

        switch (soundType) {
          case 'chirp': {
            // Bird chirp: two quick upward sweeps
            for (let i = 0; i < 2; i++) {
              const startT = t + i * 0.12;
              const osc = c.createOscillator();
              const gain = c.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(1800, startT);
              osc.frequency.exponentialRampToValueAtTime(3200, startT + 0.08);
              gain.gain.setValueAtTime(0.18, startT);
              gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.08);
              osc.connect(gain);
              gain.connect(c.destination);
              osc.start(startT);
              osc.stop(startT + 0.08);
            }
            break;
          }

          case 'growl': {
            // Friendly low rumble
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(95, t);
            osc.frequency.exponentialRampToValueAtTime(65, t + 0.3);
            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(t);
            osc.stop(t + 0.3);
            break;
          }

          case 'buzz': {
            // Bee buzz
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(240, t);
            gain.gain.setValueAtTime(0.15, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(t);
            osc.stop(t + 0.28);
            break;
          }

          case 'ribbit': {
            // Frog ribbit: two quick squelches
            for (let i = 0; i < 2; i++) {
              const startT = t + i * 0.14;
              const osc = c.createOscillator();
              const gain = c.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(180, startT);
              osc.frequency.exponentialRampToValueAtTime(90, startT + 0.09);
              gain.gain.setValueAtTime(0.22, startT);
              gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.09);
              osc.connect(gain);
              gain.connect(c.destination);
              osc.start(startT);
              osc.stop(startT + 0.09);
            }
            break;
          }

          case 'meow': {
            // Cat meow: gentle pitch sweep
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, t);
            osc.frequency.linearRampToValueAtTime(740, t + 0.15);
            osc.frequency.exponentialRampToValueAtTime(400, t + 0.35);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(t);
            osc.stop(t + 0.35);
            break;
          }

          case 'woof': {
            // Friendly puppy bark
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, t);
            osc.frequency.exponentialRampToValueAtTime(110, t + 0.16);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(t);
            osc.stop(t + 0.16);
            break;
          }

          case 'sonar': {
            // Submarine ping for ocean creatures
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, t);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(t);
            osc.stop(t + 0.5);
            break;
          }

          case 'squeak': {
            // Mouse squeak
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(2200, t);
            osc.frequency.exponentialRampToValueAtTime(1500, t + 0.12);
            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
            osc.connect(gain);
            gain.connect(c.destination);
            osc.start(t);
            osc.stop(t + 0.12);
            break;
          }

          default:
            this.playPop();
            break;
        }
      } catch (e) {}
    }
  };
})();

/**
 * Child-Friendly Speech Engine
 * Tuned with gentle pitch and steady cadence for preschool listeners
 */
const AlphaSpeech = (() => {
  const supportsSpeech = 'speechSynthesis' in window;

  function stop() {
    if (supportsSpeech) {
      window.speechSynthesis.cancel();
    }
  }

  function speak(text) {
    if (!state.voiceEnabled || !supportsSpeech || !text) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.88;    // Friendly, unhurried preschool pace
      utter.pitch = 1.15;   // Warm, engaging tone
      utter.lang = 'en-US';
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  return {
    supportsSpeech,
    stop,
    speak,

    speakLetterPhonics(letter, name) {
      const data = PHONICS_DATA[letter];
      const cue = data ? data.spoken : `${letter} is for ${name}!`;
      speak(cue);
    },

    speakPrompt(letter) {
      speak(`Can you find the animal that starts with letter ${letter}?`);
    },

    speakEncouragement(letter, name) {
      const compliments = ['Super job!', 'Hooray!', 'You did it!', 'Wonderful!'];
      const comp = compliments[Math.floor(Math.random() * compliments.length)];
      speak(`${comp} ${letter} is for ${name}!`);
    },

    speakGentleRetry(distractorName, targetLetter) {
      speak(`That's ${distractorName}! Let's find the animal that starts with ${targetLetter}!`);
    },

    speakFact(name, factText) {
      if (!factText) return;
      speak(`Fun animal fact! ${factText}`);
    }
  };
})();
