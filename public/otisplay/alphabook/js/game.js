/**
 * ABC Animal Stickers — Letter Quest (Animal Match Challenge)
 * Guided Non-Punitive Preschool Matching Game with Procedural Audio & Inactivity Hints
 */

function safeShuffleArray(arr) {
  if (typeof shuffleArray === 'function') {
    return shuffleArray(arr);
  }
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuest(fresh = true) {
  clearInactivityTimer();

  // Activate view directly without calling showView('quest') recursively
  state.currentMode = 'quest';
  const viewAlbum = document.getElementById('viewAlbum');
  const viewQuest = document.getElementById('viewQuest');
  const btnModeAlbum = document.getElementById('btnModeAlbum');
  const btnModeQuest = document.getElementById('btnModeQuest');

  if (viewAlbum) viewAlbum.classList.remove('active');
  if (viewQuest) viewQuest.classList.add('active');
  if (btnModeAlbum) btnModeAlbum.classList.remove('active');
  if (btnModeQuest) btnModeQuest.classList.add('active');

  // If starting fresh or letters not initialized, choose 5 letters
  if (fresh || !state.questLetters || state.questLetters.length === 0) {
    let candidatePool = LETTERS.filter(l => !state.collectedLetters.has(l));
    if (candidatePool.length < 5) {
      candidatePool = [...LETTERS];
    }
    const shuffled = safeShuffleArray(candidatePool);
    const selectedLetters = shuffled.slice(0, 5);
    resetQuestState(selectedLetters);
  }

  renderQuestHeader();
  loadQuestRound();
}

function renderQuestHeader() {
  const roundEl = document.getElementById('questRoundBadge');
  const starsEl = document.getElementById('questStarsTrack');

  if (roundEl) {
    roundEl.textContent = `Round ${state.questRound + 1} of ${state.questRoundsTotal}`;
  }

  if (starsEl) {
    starsEl.innerHTML = '';
    for (let i = 0; i < state.questRoundsTotal; i++) {
      const starSpan = document.createElement('span');
      starSpan.className = `ab-quest-star ${i < state.questStars ? 'earned' : 'empty'}`;
      starSpan.textContent = i < state.questStars ? '⭐' : '⚪';
      starsEl.appendChild(starSpan);
    }
  }
}

function loadQuestRound() {
  clearInactivityTimer();
  state.questAdvancing = false;

  const targetLetter = state.questLetters[state.questRound] || 'A';
  state.questTargetLetter = targetLetter;
  state.questCorrectAnimal = getRandomAnimal(targetLetter);

  // Pick 2 distractor animals from different letters
  const distractorLetters = LETTERS.filter(l => l !== targetLetter);
  const distractors = [];
  const usedAnimals = new Set();
  usedAnimals.add(state.questCorrectAnimal);

  while (distractors.length < 2) {
    const randomL = distractorLetters[Math.floor(Math.random() * distractorLetters.length)];
    const randomA = getRandomAnimal(randomL);
    if (!usedAnimals.has(randomA)) {
      usedAnimals.add(randomA);
      distractors.push(randomA);
    }
  }

  // Shuffle 3 choices
  state.questChoices = safeShuffleArray([state.questCorrectAnimal, ...distractors]);

  renderQuestHeader();

  // Prompt banner
  const promptBubble = document.getElementById('questPromptLetter');
  const promptText = document.getElementById('questPromptText');
  const formattedLetter = getFormattedLetter(targetLetter, state.caseMode);

  if (promptBubble) {
    promptBubble.innerHTML = `
      <span class="ab-quest-target-char">${formattedLetter}</span>
      <button type="button" class="ab-quest-replay-btn" id="btnReplayPrompt" aria-label="Repeat question">
        <span>🔊</span>
      </button>
    `;
    const replayBtn = document.getElementById('btnReplayPrompt');
    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        AlphaAudio.playPop();
        AlphaSpeech.speakPrompt(targetLetter);
      });
    }
  }

  if (promptText) {
    promptText.textContent = `Which animal starts with letter ${targetLetter}?`;
  }

  // Speak prompt
  AlphaSpeech.speakPrompt(targetLetter);

  // Render choice cards
  const container = document.getElementById('questChoicesGrid');
  if (!container) return;
  container.innerHTML = '';

  state.questChoices.forEach((animalStr) => {
    const name = getAnimalName(animalStr);
    const emoji = getAnimalEmoji(animalStr);
    const letter = ANIMAL_TO_LETTER[animalStr] || targetLetter;

    const card = document.createElement('div');
    card.className = 'ab-quest-choice-card';
    card.dataset.animal = animalStr;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Choose ${name}`);

    card.innerHTML = `
      <button type="button" class="ab-choice-zoom-btn" title="View full size" aria-label="Zoom in on ${name}">
        <span>🔍</span>
      </button>
      <div class="ab-choice-sticker-box">
        ${getAnimalImageHtml(letter, name, emoji, 'ab-choice-img')}
      </div>
      <div class="ab-choice-label-bar">
        <span class="ab-choice-name">${name}</span>
      </div>
    `;

    // Zoom expand handler
    const zoomBtn = card.querySelector('.ab-choice-zoom-btn');
    if (zoomBtn) {
      zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        AlphaAudio.playPop();
        showImagePreview(animalStr);
      });
    }

    // Card tap choice handler
    card.addEventListener('click', () => handleQuestChoice(card, animalStr));

    container.appendChild(card);
  });

  // Start 7-second inactivity hint timer
  startInactivityTimer();
}

function handleQuestChoice(cardEl, animalStr) {
  if (state.questAdvancing) return;
  clearInactivityTimer();

  const isCorrect = animalStr === state.questCorrectAnimal;
  const animalName = getAnimalName(animalStr);
  const targetLetter = state.questTargetLetter;

  if (isCorrect) {
    state.questAdvancing = true;
    cardEl.classList.add('correct');

    // Stamp progress
    stampAnimal(targetLetter, animalName);
    state.questStars++;
    renderQuestHeader();

    // Multi-sensory rewards
    AlphaAudio.playChime();
    AlphaAudio.playSparkle();
    AlphaSpeech.speakEncouragement(targetLetter, animalName);

    try {
      const rect = cardEl.getBoundingClientRect();
      if (window.OtisParticles) {
        OtisParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#FFD700', 20);
      }
    } catch (e) {}

    // Advance round
    setTimeout(() => {
      if (state.questRound + 1 >= state.questRoundsTotal) {
        showQuestCompleteCelebration();
      } else {
        state.questRound++;
        loadQuestRound();
      }
    }, 1200);
  } else {
    // Gentle distractor guidance: harmless wobble, no red penalty
    cardEl.classList.add('wobble');
    AlphaAudio.playBoing();
    AlphaSpeech.speakGentleRetry(animalName, targetLetter);

    setTimeout(() => {
      cardEl.classList.remove('wobble');
      startInactivityTimer();
    }, 600);
  }
}

/**
 * 7-Second Inactivity Hint Assist
 */
function startInactivityTimer() {
  clearInactivityTimer();
  state.inactivityTimer = setTimeout(() => {
    // Find the correct card and gently pulse it with a glowing halo
    const correctCard = document.querySelector(`.ab-quest-choice-card[data-animal="${state.questCorrectAnimal}"]`);
    if (correctCard && !state.questAdvancing) {
      correctCard.classList.add('hint-pulse');
      AlphaSpeech.speak(`Here is letter ${state.questTargetLetter}! Can you find the ${getAnimalName(state.questCorrectAnimal)}?`);
      setTimeout(() => correctCard.classList.remove('hint-pulse'), 2500);
    }
  }, 7000);
}

function clearInactivityTimer() {
  if (state.inactivityTimer) {
    clearTimeout(state.inactivityTimer);
    state.inactivityTimer = null;
  }
}

/**
 * Quest Complete Victory Celebration
 */
function showQuestCompleteCelebration() {
  clearInactivityTimer();
  AlphaAudio.playFanfare();

  // Burst confetti fireworks
  try {
    if (window.OtisParticles) {
      OtisParticles.burst(window.innerWidth * 0.3, window.innerHeight * 0.4, '#F59E0B', 24);
      OtisParticles.burst(window.innerWidth * 0.7, window.innerHeight * 0.4, '#FF7B89', 24);
    }
  } catch (e) {}

  const overlay = document.createElement('div');
  overlay.className = 'ab-celeb-overlay';
  overlay.innerHTML = `
    <div class="ab-celeb-card">
      <div class="ab-celeb-trophy" aria-hidden="true">🏆</div>
      <h2 class="ab-celeb-title">Hooray! Quest Complete!</h2>
      <p class="ab-celeb-msg">
        You earned all <strong>5 Golden Stars</strong>! ⭐⭐⭐⭐⭐
      </p>
      <div class="ab-celeb-stats">
        <span>📖 Total Letters Collected: <strong>${state.collectedLetters.size} / 26</strong></span>
      </div>
      <div class="ab-celeb-buttons">
        <button type="button" class="ab-celeb-btn primary" id="btnCelebPlayAgain">
          <span>🎯 Play Next Quest</span>
        </button>
        <button type="button" class="ab-celeb-btn secondary" id="btnCelebAlbum">
          <span>📖 Sticker Album</span>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('#btnCelebPlayAgain').addEventListener('click', () => {
    overlay.remove();
    AlphaAudio.playPop();
    startQuest(true);
  });

  overlay.querySelector('#btnCelebAlbum').addEventListener('click', () => {
    overlay.remove();
    AlphaAudio.playPop();
    showView('album');
  });
}

/**
 * Full Screen Image & Educational Fact Preview Overlay
 */
function showImagePreview(animalStr) {
  closeImagePreview();
  const name = getAnimalName(animalStr);
  const emoji = getAnimalEmoji(animalStr);
  const letter = ANIMAL_TO_LETTER[animalStr] || 'A';
  const factEntry = typeof getAnimalFactEntry === 'function' ? getAnimalFactEntry(letter, name) : null;

  const overlay = document.createElement('div');
  overlay.className = 'ab-preview-overlay';
  overlay.id = 'abImagePreviewOverlay';
  overlay.innerHTML = `
    <div class="ab-preview-card" role="dialog" aria-label="${name} details">
      <button type="button" class="ab-preview-close" aria-label="Close preview">✕</button>

      <div class="ab-preview-header">
        <span class="ab-preview-letter">${letter}</span>
        <span class="ab-preview-name">${name}</span>
        <button type="button" class="ab-speak-btn" id="btnPreviewPronounce" title="Hear Name" aria-label="Pronounce ${name}">
          <span>🔊</span>
        </button>
      </div>

      <div class="ab-preview-img-box" id="previewImgBox">
        ${getAnimalImageHtml(letter, name, emoji, 'ab-preview-large-img')}
      </div>

      ${factEntry ? `
        <div class="ab-facts-card ab-preview-facts" id="previewFacts">
          <div class="ab-facts-title">
            <span>📖</span>
            <span>Animal Encyclopedia</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Type</span>
            <span class="fact-value">${factEntry.type || '—'}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Home</span>
            <span class="fact-value">${factEntry.native_to || '—'}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Size</span>
            <span class="fact-value">${factEntry.size || '—'}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Diet</span>
            <span class="fact-value">${factEntry.diet || '—'}</span>
          </div>
          <div class="fact-row">
            <span class="fact-label">Loves</span>
            <span class="fact-value">${factEntry.favorite_food || '—'}</span>
          </div>
          ${factEntry.fun_fact ? `
            <div class="fact-fun-box">
              <div class="fact-fun-header">
                <span>⭐ Fun Fact</span>
                <button type="button" class="ab-read-fact-btn" id="btnPreviewReadFact" title="Listen to fun fact">
                  <span>🗣️ Read to Me</span>
                </button>
              </div>
              <div class="fact-fun-text">${factEntry.fun_fact}</div>
            </div>
          ` : ''}
        </div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('.ab-preview-close').addEventListener('click', closeImagePreview);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeImagePreview();
  });

  const pronounceBtn = overlay.querySelector('#btnPreviewPronounce');
  if (pronounceBtn) {
    pronounceBtn.addEventListener('click', () => {
      AlphaAudio.playPop();
      AlphaSpeech.speak(`${letter} is for ${name}`);
    });
  }

  const readFactBtn = overlay.querySelector('#btnPreviewReadFact');
  if (readFactBtn && factEntry && factEntry.fun_fact) {
    readFactBtn.addEventListener('click', () => {
      AlphaAudio.playPop();
      AlphaSpeech.speakFact(name, factEntry.fun_fact);
      readFactBtn.classList.add('active');
      setTimeout(() => readFactBtn.classList.remove('active'), 800);
    });
  }
}

function closeImagePreview() {
  const existing = document.getElementById('abImagePreviewOverlay');
  if (existing) {
    existing.remove();
  }
}