/**
 * ABC Animal Stickers — Sticker Album (Explore & Learn Mode)
 * Interactive A-Z Ribbon, Spotlight Showcase, Animal Carousel, Stamp Collection & Comprehensive Educational Facts
 */

function initBookView() {
  renderRibbon();
  renderAlbumContent();
}

/**
 * Renders the top horizontal A-Z letter ribbon
 */
function renderRibbon() {
  const ribbon = document.getElementById('abRibbon');
  if (!ribbon) return;
  ribbon.innerHTML = '';

  LETTERS.forEach(letter => {
    const isCurrent = letter === state.albumLetter;
    const isCollected = isLetterCollected(letter);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `ab-ribbon-btn ${isCurrent ? 'active' : ''} ${isCollected ? 'collected' : ''}`;
    btn.id = `ribbon-letter-${letter}`;
    btn.setAttribute('aria-label', `Letter ${letter}`);

    const displayLetter = getFormattedLetter(letter, state.caseMode);
    btn.innerHTML = `
      <span class="ab-ribbon-letter">${displayLetter}</span>
      ${isCollected ? '<span class="ab-ribbon-star" title="Sticker Collected">⭐</span>' : ''}
    `;

    btn.addEventListener('click', () => {
      selectLetter(letter);
      AlphaAudio.playPop();
    });

    ribbon.appendChild(btn);
  });

  scrollRibbonToActive();
}

function scrollRibbonToActive() {
  const ribbon = document.getElementById('abRibbon');
  const activeBtn = document.getElementById(`ribbon-letter-${state.albumLetter}`);
  if (ribbon && activeBtn) {
    const ribbonRect = ribbon.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const offset = btnRect.left - ribbonRect.left - ribbonRect.width / 2 + btnRect.width / 2;
    ribbon.scrollBy({ left: offset, behavior: 'smooth' });
  }
}

/**
 * Selects a specific letter in the album
 */
function selectLetter(letter) {
  state.albumLetter = letter;
  state.albumAnimalIdx = 0;
  renderRibbon();
  renderAlbumContent();
  scrollRibbonToActive();
}

/**
 * Switch view mode within the album: Spotlight vs Grid
 */
function setAlbumViewMode(mode) {
  state.albumView = mode;
  const btnSpotlight = document.getElementById('btnAlbumSpotlight');
  const btnGrid = document.getElementById('btnAlbumGrid');
  const viewSpotlight = document.getElementById('abSpotlightView');
  const viewGrid = document.getElementById('abGridView');

  if (mode === 'spotlight') {
    if (btnSpotlight) btnSpotlight.classList.add('active');
    if (btnGrid) btnGrid.classList.remove('active');
    if (viewSpotlight) viewSpotlight.classList.remove('hidden');
    if (viewGrid) viewGrid.classList.add('hidden');
    renderSpotlight();
  } else {
    if (btnSpotlight) btnSpotlight.classList.remove('active');
    if (btnGrid) btnGrid.classList.add('active');
    if (viewSpotlight) viewSpotlight.classList.add('hidden');
    if (viewGrid) viewGrid.classList.remove('hidden');
    renderGrid();
  }
}

/**
 * Renders whichever album subview is active
 */
function renderAlbumContent() {
  if (state.albumView === 'grid') {
    renderGrid();
  } else {
    renderSpotlight();
  }
}

/**
 * Navigates to next or previous animal within the current letter
 */
function navAnimal(delta) {
  const pool = ANIMALS[state.albumLetter] || [];
  if (pool.length <= 1) return;
  state.albumAnimalIdx = (state.albumAnimalIdx + delta + pool.length) % pool.length;
  AlphaAudio.playPop();
  renderSpotlight();
}

/**
 * Robust educational fact finder across all 120 animals
 */
function getAnimalFactEntry(letter, animalName) {
  const db = (typeof ANIMAL_FACTS !== 'undefined') ? ANIMAL_FACTS : (window.ANIMAL_FACTS || {});
  const list = db[letter] || [];
  const clean = (animalName || '').toLowerCase().trim();
  if (!clean || list.length === 0) return null;

  return list.find(f => f.name.toLowerCase() === clean) ||
         list.find(f => f.name.toLowerCase().includes(clean) || clean.includes(f.name.toLowerCase())) ||
         list[state.albumAnimalIdx % list.length] ||
         list[0] ||
         null;
}

/**
 * Renders the Letter Spotlight showcase card
 */
function renderSpotlight() {
  const spotlightEl = document.getElementById('abSpotlightView');
  if (!spotlightEl) return;

  const letter = state.albumLetter;
  const pool = ANIMALS[letter] || [];
  const currentAnimalStr = pool[state.albumAnimalIdx] || pool[0];
  const animalName = getAnimalName(currentAnimalStr);
  const animalEmoji = getAnimalEmoji(currentAnimalStr);
  const soundType = getAnimalSoundType(animalName);
  const isStamped = isAnimalStamped(letter, animalName);

  // Retrieve comprehensive educational facts
  const factEntry = getAnimalFactEntry(letter, animalName);

  spotlightEl.innerHTML = `
    <div class="ab-spotlight-card">
      <!-- Clean Top Header: Counter & Stamp Badge (Top-left redundant pill removed) -->
      <div class="ab-spotlight-header">
        <span class="ab-animal-counter">Friend ${state.albumAnimalIdx + 1} of ${pool.length}</span>
        ${isStamped ? '<span class="ab-stamped-pill">⭐ In Album</span>' : ''}
      </div>

      <!-- Main Animal Sticker Showcase -->
      <div class="ab-sticker-showcase">
        <button type="button" class="ab-carousel-arrow ab-arrow-prev" id="btnNavPrev" aria-label="Previous animal" ${pool.length <= 1 ? 'disabled' : ''}>
          <span>‹</span>
        </button>

        <div class="ab-sticker-hero-stage" id="spotlightHeroSticker" role="button" tabindex="0" title="Tap to hear animal!">
          <div class="ab-sticker-halo"></div>
          <div class="ab-sticker-wrapper">
            ${getAnimalImageHtml(letter, animalName, animalEmoji, 'ab-hero-img')}
          </div>
          <div class="ab-tap-hint">Tap me! 🎵</div>
        </div>

        <button type="button" class="ab-carousel-arrow ab-arrow-next" id="btnNavNext" aria-label="Next animal" ${pool.length <= 1 ? 'disabled' : ''}>
          <span>›</span>
        </button>
      </div>

      <!-- Animal Name Banner with Speaker -->
      <div class="ab-animal-title-row">
        <h2 class="ab-animal-name" id="spotlightAnimalTitle">
          <span>${animalName}</span>
          <button type="button" class="ab-speak-btn" id="btnSpeakName" aria-label="Pronounce ${animalName}" title="Hear name">
            <span>🔊</span>
          </button>
        </h2>
      </div>

      <!-- Multi-Animal Selector Pill Chips -->
      <div class="ab-animal-chips-row">
        ${pool.map((animStr, idx) => {
          const name = getAnimalName(animStr);
          const emoji = getAnimalEmoji(animStr);
          const activeClass = idx === state.albumAnimalIdx ? 'active' : '';
          const stamped = isAnimalStamped(letter, name);
          return `
            <button type="button" class="ab-animal-chip ${activeClass}" data-index="${idx}" title="${name}">
              <span class="ab-chip-emoji">${emoji}</span>
              <span class="ab-chip-text">${name}</span>
              ${stamped ? '<span class="ab-chip-star">⭐</span>' : ''}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Stamp Sticker Button -->
      <div class="ab-action-row">
        <button type="button" class="ab-stamp-btn ${isStamped ? 'stamped' : ''}" id="btnStampSticker">
          <span class="ab-stamp-icon">${isStamped ? '🌟' : '⭐'}</span>
          <span>${isStamped ? 'Stamped in Album!' : 'Stamp Sticker!'}</span>
        </button>
      </div>

      <!-- Comprehensive Educational Animal Encyclopedia Info -->
      ${factEntry ? `
        <div class="ab-facts-card" id="spotlightFacts">
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
                <button type="button" class="ab-read-fact-btn" id="btnReadFact" title="Listen to fun fact">
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

  // Carousel navigation
  const prevBtn = document.getElementById('btnNavPrev');
  if (prevBtn) prevBtn.addEventListener('click', () => navAnimal(-1));

  const nextBtn = document.getElementById('btnNavNext');
  if (nextBtn) nextBtn.addEventListener('click', () => navAnimal(1));

  // Tapping sticker hero plays sound & speaks name
  const heroSticker = document.getElementById('spotlightHeroSticker');
  if (heroSticker) {
    heroSticker.addEventListener('click', () => {
      AlphaAudio.playAnimalSound(soundType);
      AlphaSpeech.speak(animalName);
      heroSticker.classList.add('bounce');
      try {
        const rect = heroSticker.getBoundingClientRect();
        if (window.OtisParticles) {
          OtisParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#FFD700', 8);
        }
      } catch (e) {}
      setTimeout(() => heroSticker.classList.remove('bounce'), 600);
    });
  }

  // Speaker button next to title
  const speakNameBtn = document.getElementById('btnSpeakName');
  if (speakNameBtn) {
    speakNameBtn.addEventListener('click', () => {
      AlphaAudio.playPop();
      AlphaSpeech.speak(`${letter} is for ${animalName}!`);
    });
  }

  // Animal chips selector
  spotlightEl.querySelectorAll('.ab-animal-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const idx = parseInt(chip.dataset.index, 10);
      if (!isNaN(idx) && idx !== state.albumAnimalIdx) {
        state.albumAnimalIdx = idx;
        AlphaAudio.playPop();
        renderSpotlight();
      }
    });
  });

  // Stamp into album button
  const stampBtn = document.getElementById('btnStampSticker');
  if (stampBtn) {
    stampBtn.addEventListener('click', () => {
      stampAnimal(letter, animalName);
      AlphaAudio.playStamp();
      stampBtn.classList.add('stamped', 'pulse');
      stampBtn.innerHTML = `
        <span class="ab-stamp-icon">🌟</span>
        <span>Stamped in Album!</span>
      `;

      try {
        const rect = stampBtn.getBoundingClientRect();
        if (window.OtisParticles) {
          OtisParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#F59E0B', 18);
        }
      } catch (e) {}

      renderRibbon();
      setTimeout(() => stampBtn.classList.remove('pulse'), 500);
    });
  }

  // Read fun fact aloud
  const readFactBtn = document.getElementById('btnReadFact');
  if (readFactBtn && factEntry && factEntry.fun_fact) {
    readFactBtn.addEventListener('click', () => {
      AlphaAudio.playPop();
      AlphaSpeech.speakFact(animalName, factEntry.fun_fact);
      readFactBtn.classList.add('active');
      setTimeout(() => readFactBtn.classList.remove('active'), 800);
    });
  }
}

/**
 * Renders the All 26 Letters Grid
 */
function renderGrid() {
  const gridEl = document.getElementById('abGridView');
  if (!gridEl) return;
  gridEl.innerHTML = '';

  const totalCollected = state.collectedLetters.size;
  const header = document.createElement('div');
  header.className = 'ab-grid-summary';
  header.innerHTML = `
    <span>🌟 Letters Discovered: <strong>${totalCollected} / 26</strong></span>
    <span>Tap any letter card to explore!</span>
  `;
  gridEl.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'ab-book-grid';

  LETTERS.forEach(letter => {
    const isCurrent = letter === state.albumLetter;
    const isCollected = isLetterCollected(letter);
    const pool = ANIMALS[letter] || [];
    const animalStr = pool[0];
    const animalName = getAnimalName(animalStr);
    const animalEmoji = getAnimalEmoji(animalStr);
    const formattedLetter = getFormattedLetter(letter, state.caseMode);

    const card = document.createElement('div');
    card.className = `ab-grid-card ${isCurrent ? 'active' : ''} ${isCollected ? 'collected' : ''}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Letter ${letter}, ${animalName}`);

    card.innerHTML = `
      <div class="ab-grid-card-letter">${formattedLetter}</div>
      <div class="ab-grid-card-sticker">
        ${getAnimalImageHtml(letter, animalName, animalEmoji, 'ab-grid-thumb')}
      </div>
      <div class="ab-grid-card-name">${animalName}</div>
      ${isCollected ? '<div class="ab-grid-card-star" title="Collected">⭐</div>' : ''}
    `;

    card.addEventListener('click', () => {
      selectLetter(letter);
      setAlbumViewMode('spotlight');
      AlphaAudio.playPop();
    });

    grid.appendChild(card);
  });

  gridEl.appendChild(grid);
}