/**
 * ABC Animal Stickers — App Orchestration & Controls
 * View routing, toolbar controls (Mode, Case, Sound, Voice, Reset), keyboard accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  bindToolbarControls();
  bindKeyboardControls();
  initBookView();

  // Restore initial view (starts in Quest mode)
  showView('quest');
}

/**
 * Switch views between Sticker Album and Letter Quest
 */
function showView(view) {
  // Normalize synonyms
  if (view === 'book') view = 'album';
  if (view === 'game') view = 'quest';

  state.currentMode = view;

  const viewAlbum = document.getElementById('viewAlbum');
  const viewQuest = document.getElementById('viewQuest');
  const btnModeAlbum = document.getElementById('btnModeAlbum');
  const btnModeQuest = document.getElementById('btnModeQuest');

  if (view === 'quest') {
    if (viewAlbum) viewAlbum.classList.remove('active');
    if (viewQuest) viewQuest.classList.add('active');
    if (btnModeAlbum) btnModeAlbum.classList.remove('active');
    if (btnModeQuest) btnModeQuest.classList.add('active');
    startQuest(false);
  } else {
    if (viewQuest) viewQuest.classList.remove('active');
    if (viewAlbum) viewAlbum.classList.add('active');
    if (btnModeQuest) btnModeQuest.classList.remove('active');
    if (btnModeAlbum) btnModeAlbum.classList.add('active');
    renderAlbumContent();
    scrollRibbonToActive();
  }
}

/**
 * Top Toolbar Controls (Mode, Case, Sound, Voice, Shuffle)
 */
function bindToolbarControls() {
  // Mode toggles
  const btnModeAlbum = document.getElementById('btnModeAlbum');
  const btnModeQuest = document.getElementById('btnModeQuest');

  if (btnModeAlbum) {
    btnModeAlbum.addEventListener('click', () => {
      AlphaAudio.playPop();
      showView('album');
    });
  }

  if (btnModeQuest) {
    btnModeQuest.addEventListener('click', () => {
      AlphaAudio.playPop();
      showView('quest');
    });
  }

  // Case toggle: 'both' (Aa) -> 'upper' (A) -> 'lower' (a)
  const btnCase = document.getElementById('btnToggleCase');
  updateCaseButtonLabel();
  if (btnCase) {
    btnCase.addEventListener('click', () => {
      AlphaAudio.playPop();
      if (state.caseMode === 'both') state.caseMode = 'upper';
      else if (state.caseMode === 'upper') state.caseMode = 'lower';
      else state.caseMode = 'both';

      saveState();
      updateCaseButtonLabel();
      renderRibbon();
      renderAlbumContent();
      if (state.currentMode === 'quest') {
        const target = state.questTargetLetter;
        const promptBubble = document.getElementById('questPromptLetter');
        if (promptBubble) {
          const replayBtn = document.getElementById('btnReplayPrompt');
          promptBubble.innerHTML = `
            <span class="ab-quest-target-char">${getFormattedLetter(target, state.caseMode)}</span>
          `;
          if (replayBtn) promptBubble.appendChild(replayBtn);
        }
      }
    });
  }

  // Sound toggle (FX)
  const btnSound = document.getElementById('btnToggleSound');
  updateSoundButtonLabel();
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      saveState();
      updateSoundButtonLabel();
      if (state.soundEnabled) AlphaAudio.playPop();
    });
  }

  // Voice toggle (Speech)
  const btnVoice = document.getElementById('btnToggleVoice');
  updateVoiceButtonLabel();
  if (btnVoice) {
    btnVoice.addEventListener('click', () => {
      state.voiceEnabled = !state.voiceEnabled;
      saveState();
      updateVoiceButtonLabel();
      if (state.voiceEnabled) {
        AlphaSpeech.speak('Voice is on!');
      } else {
        AlphaSpeech.stop();
      }
    });
  }

  // Shuffle / Reset
  const btnShuffle = document.getElementById('btnShuffle');
  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      AlphaAudio.playPop();
      if (state.currentMode === 'quest') {
        startQuest(true);
      } else {
        // Pick random letter in album
        const randomL = LETTERS[Math.floor(Math.random() * LETTERS.length)];
        selectLetter(randomL);
      }
    });
  }

  // Album subview toggles (Spotlight vs Grid)
  const btnSpotlight = document.getElementById('btnAlbumSpotlight');
  const btnGrid = document.getElementById('btnAlbumGrid');
  if (btnSpotlight) {
    btnSpotlight.addEventListener('click', () => {
      AlphaAudio.playPop();
      setAlbumViewMode('spotlight');
    });
  }
  if (btnGrid) {
    btnGrid.addEventListener('click', () => {
      AlphaAudio.playPop();
      setAlbumViewMode('grid');
    });
  }
}

function updateCaseButtonLabel() {
  const btnCase = document.getElementById('btnToggleCase');
  if (!btnCase) return;
  const labelSpan = btnCase.querySelector('.btn-label') || btnCase;
  if (state.caseMode === 'both') {
    labelSpan.innerHTML = '<span>🔤 Aa</span>';
  } else if (state.caseMode === 'upper') {
    labelSpan.innerHTML = '<span>🔤 A</span>';
  } else {
    labelSpan.innerHTML = '<span>🔤 a</span>';
  }
}

function updateSoundButtonLabel() {
  const btnSound = document.getElementById('btnToggleSound');
  if (!btnSound) return;
  const icon = state.soundEnabled ? '🎵' : '🔇';
  btnSound.innerHTML = `<span>${icon}</span><span class="btn-text">${state.soundEnabled ? 'Sound' : 'Mute'}</span>`;
  btnSound.classList.toggle('active', state.soundEnabled);
}

function updateVoiceButtonLabel() {
  const btnVoice = document.getElementById('btnToggleVoice');
  if (!btnVoice) return;
  const icon = state.voiceEnabled ? '🗣️' : '🤫';
  btnVoice.innerHTML = `<span>${icon}</span><span class="btn-text">${state.voiceEnabled ? 'Voice' : 'Quiet'}</span>`;
  btnVoice.classList.toggle('active', state.voiceEnabled);
}

/**
 * Keyboard Navigation for Classroom & Desktop Use
 */
function bindKeyboardControls() {
  document.addEventListener('keydown', (e) => {
    // If typing in input, ignore
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Escape closes full size image preview
    if (e.key === 'Escape') {
      closeImagePreview();
      return;
    }

    // Space repeats audio or plays pop
    if (e.key === ' ') {
      e.preventDefault();
      if (state.currentMode === 'quest') {
        AlphaSpeech.speakPrompt(state.questTargetLetter);
      } else {
        const pool = ANIMALS[state.albumLetter] || [];
        const animStr = pool[state.albumAnimalIdx];
        AlphaSpeech.speakLetterPhonics(state.albumLetter, getAnimalName(animStr));
      }
      return;
    }

    // Letter keys A-Z jump directly in album mode
    const key = e.key.toUpperCase();
    if (LETTERS.includes(key)) {
      if (state.currentMode !== 'album') {
        showView('album');
      }
      selectLetter(key);
      AlphaAudio.playPop();
      return;
    }

    // Arrow keys
    if (e.key === 'ArrowLeft') {
      if (state.currentMode === 'album') {
        if (state.albumView === 'spotlight') {
          navAnimal(-1);
        } else {
          const idx = LETTERS.indexOf(state.albumLetter);
          const prevL = LETTERS[(idx - 1 + LETTERS.length) % LETTERS.length];
          selectLetter(prevL);
        }
      }
      return;
    }

    if (e.key === 'ArrowRight') {
      if (state.currentMode === 'album') {
        if (state.albumView === 'spotlight') {
          navAnimal(1);
        } else {
          const idx = LETTERS.indexOf(state.albumLetter);
          const nextL = LETTERS[(idx + 1) % LETTERS.length];
          selectLetter(nextL);
        }
      }
      return;
    }

    // Number keys 1, 2, 3 for Letter Quest choices
    if (state.currentMode === 'quest' && ['1', '2', '3'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const cards = document.querySelectorAll('.ab-quest-choice-card');
      if (cards[idx]) {
        cards[idx].click();
      }
    }
  });
}

// Global hooks for backwards compatibility
window.showView = showView;
window.startGame = () => showView('quest');
window.continueGame = () => showView('quest');
window.quitGame = () => showView('album');
window.openModal = (l) => { selectLetter(l); setAlbumViewMode('spotlight'); };
window.closeModal = closeImagePreview;
window.navAnimal = navAnimal;