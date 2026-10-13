/**
 * ABC Animal Stickers — State Management & Persistence
 */

const STORAGE_KEYS = {
  LETTERS: 'otis_abc_collected_letters',
  STICKERS: 'otis_abc_collected_stickers',
  SOUND: 'otis_abc_sound_enabled',
  VOICE: 'otis_abc_voice_enabled',
  CASE: 'otis_abc_case_mode'
};

const state = {
  // Preferences
  soundEnabled: loadBool(STORAGE_KEYS.SOUND, true),
  voiceEnabled: loadBool(STORAGE_KEYS.VOICE, true),
  caseMode: loadStr(STORAGE_KEYS.CASE, 'both'), // 'both' | 'upper' | 'lower'

  // Current view mode (defaults to Quest)
  currentMode: 'quest', // 'album' | 'quest'

  // Sticker Album state
  albumLetter: 'A',
  albumAnimalIdx: 0,
  albumView: 'spotlight', // 'spotlight' | 'grid'

  // Collection records
  collectedLetters: loadSet(STORAGE_KEYS.LETTERS),
  collectedStickers: loadSet(STORAGE_KEYS.STICKERS),

  // Match Game (Letter Quest) state
  questRound: 0,
  questRoundsTotal: 5,
  questStars: 0,
  questLetters: [],
  questTargetLetter: 'A',
  questCorrectAnimal: '',
  questChoices: [],
  questAdvancing: false,

  // Inactivity hint tracking
  inactivityTimer: null
};

function loadBool(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val === 'true' : fallback;
  } catch (e) {
    return fallback;
  }
}

function loadStr(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val || fallback;
  } catch (e) {
    return fallback;
  }
}

function loadSet(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (e) {
    return new Set();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.SOUND, String(state.soundEnabled));
    localStorage.setItem(STORAGE_KEYS.VOICE, String(state.voiceEnabled));
    localStorage.setItem(STORAGE_KEYS.CASE, state.caseMode);
    localStorage.setItem(STORAGE_KEYS.LETTERS, JSON.stringify([...state.collectedLetters]));
    localStorage.setItem(STORAGE_KEYS.STICKERS, JSON.stringify([...state.collectedStickers]));
  } catch (e) {}
}

function stampAnimal(letter, name) {
  const stickerKey = `${letter}:${name}`;
  const isNew = !state.collectedStickers.has(stickerKey);
  state.collectedStickers.add(stickerKey);
  state.collectedLetters.add(letter);
  saveState();
  return isNew;
}

function isAnimalStamped(letter, name) {
  return state.collectedStickers.has(`${letter}:${name}`);
}

function isLetterCollected(letter) {
  return state.collectedLetters.has(letter);
}

function resetQuestState(letters) {
  state.questLetters = letters;
  state.questRound = 0;
  state.questStars = 0;
  state.questAdvancing = false;
}