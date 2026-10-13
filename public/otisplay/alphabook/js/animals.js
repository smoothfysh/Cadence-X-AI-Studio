/**
 * ABC Animal Stickers — Animals & Phonics Database
 * 26 Letters, 120 Lovable Animal Characters, Phonics Data & Synthesized Sound Types
 */

const ANIMALS = {
  A: ['Alligator🐊', 'Ant🐜', 'Antelope🦌', 'Ape🦧', 'Armadillo🦔'],
  B: ['Bear🐻', 'Bat🦇', 'Bee🐝', 'Butterfly🦋', 'Beaver🦫', 'Buffalo🐃'],
  C: ['Cat🐱', 'Cow🐄', 'Cheetah🐆', 'Camel🐫', 'Crab🦀', 'Caterpillar🐛'],
  D: ['Dog🐶', 'Dolphin🐬', 'Duck🦆', 'Donkey🫏', 'Deer🦌', 'Dragonfly🦗'],
  E: ['Elephant🐘', 'Eagle🦅', 'Eel🐟', 'Emu🦃', 'Elk🦌'],
  F: ['Fox🦊', 'Frog🐸', 'Flamingo🦩', 'Fish🐟', 'Ferret🐹', 'Falcon🦅'],
  G: ['Giraffe🦒', 'Gorilla🦍', 'Goat🐐', 'Goldfish🐟', 'Grasshopper🦗', 'Guinea Pig🐹'],
  H: ['Hippo🦛', 'Horse🐴', 'Hedgehog🦔', 'Hamster🐹', 'Hyena🐺', 'Hawk🦅'],
  I: ['Iguana🦎', 'Impala🦌', 'Ibis🦩', 'Insect🐛'],
  J: ['Jaguar🐆', 'Jellyfish🪼', 'Blue Jay🐦', 'Jackal🐺'],
  K: ['Kangaroo🦘', 'Koala🐨', 'Kingfisher🐦', 'Kiwi🐦'],
  L: ['Lion🦁', 'Leopard🐆', 'Llama🦙', 'Lemur🐒', 'Lobster🦞', 'Ladybug🐞'],
  M: ['Monkey🐵', 'Mouse🐭', 'Meerkat🐹', 'Moose🦌', 'Mole🐹'],
  N: ['Newt🦎', 'Narwhal🐋', 'Nightingale🐦', 'Numbat🐹'],
  O: ['Owl🦉', 'Octopus🐙', 'Otter🦦', 'Ostrich🦃', 'Orangutan🦧'],
  P: ['Penguin🐧', 'Panda🐼', 'Pig🐷', 'Parrot🦜', 'Polar Bear🐻‍❄️', 'Peacock🦚'],
  Q: ['Quail🐦', 'Quokka🦘', 'Quoll🐱'],
  R: ['Rabbit🐰', 'Rhino🦏', 'Raccoon🦝', 'Rat🐀', 'Reindeer🦌'],
  S: ['Sloth🦥', 'Shark🦈', 'Snake🐍', 'Sheep🐑', 'Squirrel🐿️', 'Seal🦭'],
  T: ['Tiger🐯', 'Turtle🐢', 'Toucan🐦', 'Turkey🦃', 'Toad🐸'],
  U: ['Urchin🪸', 'Umbrellabird🐦', 'Urial🐐'],
  V: ['Vulture🦅', 'Viper🐍', 'Vicuña🦙'],
  W: ['Whale🐋', 'Wolf🐺', 'Walrus🦭', 'Wombat🐹', 'Weasel🐹'],
  X: ['X-ray Tetra🐟', 'Xenops🐦'],
  Y: ['Yak🐃', 'Yellowjacket🐝'],
  Z: ['Zebra🦓', 'Zebu🐃']
};

const LETTERS = Object.keys(ANIMALS);

const ANIMAL_TO_LETTER = {};
LETTERS.forEach(letter => {
  ANIMALS[letter].forEach(animal => {
    ANIMAL_TO_LETTER[animal] = letter;
  });
});

/**
 * Phonics Data for Preschoolers
 * Provides phonetic pronunciation cues for speech synthesis and display
 */
const PHONICS_DATA = {
  A: { sound: 'ah', spoken: 'A says ah! Alligator!' },
  B: { sound: 'buh', spoken: 'B says buh! Bear!' },
  C: { sound: 'kuh', spoken: 'C says kuh! Cat!' },
  D: { sound: 'duh', spoken: 'D says duh! Dog!' },
  E: { sound: 'eh', spoken: 'E says eh! Elephant!' },
  F: { sound: 'fff', spoken: 'F says fff! Fox!' },
  G: { sound: 'guh', spoken: 'G says guh! Giraffe!' },
  H: { sound: 'huh', spoken: 'H says huh! Hippo!' },
  I: { sound: 'ih', spoken: 'I says ih! Iguana!' },
  J: { sound: 'juh', spoken: 'J says juh! Jaguar!' },
  K: { sound: 'kuh', spoken: 'K says kuh! Kangaroo!' },
  L: { sound: 'lll', spoken: 'L says lll! Lion!' },
  M: { sound: 'mmm', spoken: 'M says mmm! Monkey!' },
  N: { sound: 'nnn', spoken: 'N says nnn! Narwhal!' },
  O: { sound: 'ah', spoken: 'O says ah! Owl!' },
  P: { sound: 'puh', spoken: 'P says puh! Penguin!' },
  Q: { sound: 'kwuh', spoken: 'Q says kwuh! Quail!' },
  R: { sound: 'rrr', spoken: 'R says rrr! Rabbit!' },
  S: { sound: 'sss', spoken: 'S says sss! Sloth!' },
  T: { sound: 'tuh', spoken: 'T says tuh! Tiger!' },
  U: { sound: 'uh', spoken: 'U says uh! Umbrellabird!' },
  V: { sound: 'vvv', spoken: 'V says vvv! Vulture!' },
  W: { sound: 'wuh', spoken: 'W says wuh! Whale!' },
  X: { sound: 'eks', spoken: 'X says eks! X-ray Tetra!' },
  Y: { sound: 'yuh', spoken: 'Y says yuh! Yak!' },
  Z: { sound: 'zzz', spoken: 'Z says zzz! Zebra!' }
};

/**
 * Animal sound categories for procedural Web Audio sound synthesis
 */
const ANIMAL_SOUND_TYPES = {
  // Birds
  'Eagle': 'chirp', 'Falcon': 'chirp', 'Hawk': 'chirp', 'Nightingale': 'chirp',
  'Parrot': 'chirp', 'Quail': 'chirp', 'Toucan': 'chirp', 'Umbrellabird': 'chirp',
  'Xenops': 'chirp', 'Blue Jay': 'chirp', 'Kingfisher': 'chirp', 'Kiwi': 'chirp',
  'Flamingo': 'chirp', 'Ibis': 'chirp', 'Ostrich': 'chirp', 'Owl': 'chirp', 'Duck': 'quack',
  // Big cats & wild carnivores
  'Lion': 'growl', 'Tiger': 'growl', 'Bear': 'growl', 'Polar Bear': 'growl',
  'Cheetah': 'growl', 'Jaguar': 'growl', 'Leopard': 'growl', 'Wolf': 'howl',
  'Cat': 'meow', 'Dog': 'woof',
  // Insects & amphibians
  'Frog': 'ribbit', 'Toad': 'ribbit', 'Bee': 'buzz', 'Yellowjacket': 'buzz',
  'Caterpillar': 'pop', 'Grasshopper': 'chirp', 'Dragonfly': 'buzz',
  // Marine
  'Dolphin': 'sonar', 'Whale': 'sonar', 'Seal': 'bark', 'Walrus': 'bark',
  // Squeakers & small mammals
  'Mouse': 'squeak', 'Rat': 'squeak', 'Guinea Pig': 'squeak', 'Hamster': 'squeak',
  'Mole': 'squeak', 'Monkey': 'chatter', 'Ape': 'chatter', 'Gorilla': 'growl',
  // Farm animals
  'Cow': 'moo', 'Sheep': 'baa', 'Pig': 'oink', 'Donkey': 'bray', 'Horse': 'neigh'
};

function getRandomAnimal(letter) {
  const pool = ANIMALS[letter] || ANIMALS['A'];
  return pool[Math.floor(Math.random() * pool.length)];
}

function getAnimalEmoji(str) {
  if (!str) return '🐾';
  const match = str.match(/\p{Extended_Pictographic}/u);
  return match ? match[0] : '🐾';
}

function getAnimalName(str) {
  if (!str) return '';
  return str.replace(/[^\p{L}\p{N}\s'-]/gu, '').trim();
}

function getFormattedLetter(letter, mode = 'both') {
  if (!letter) return '';
  const upper = letter.toUpperCase();
  const lower = letter.toLowerCase();
  if (mode === 'upper') return upper;
  if (mode === 'lower') return lower;
  return `${upper}${lower}`; // e.g. "Aa"
}

function getAnimalSoundType(name) {
  return ANIMAL_SOUND_TYPES[name] || 'pop';
}

/**
 * Returns resilient HTML for displaying an animal sticker:
 * Uses lazy loading, async decoding, primary asset URI, ASCII fallback for Vicuna,
 * and high-res emoji fallback if the image cannot be loaded.
 */
function getAnimalImageHtml(letter, name, emoji, extraClass = '') {
  const encLetter = encodeURIComponent(letter);
  const encName = encodeURIComponent(name);
  const altText = `${letter} is for ${name}`;
  const primaryPath = `assets/${encLetter}%20${encName}.png`;
  const asciiName = name.replace('ñ', 'n');
  const asciiPath = `assets/${encLetter}%20${encodeURIComponent(asciiName)}.png`;

  return `<img src="${primaryPath}" alt="${altText}" class="ab-sticker-img ${extraClass}" loading="lazy" decoding="async" onerror="if(!this.dataset.asciiTried){this.dataset.asciiTried='1';this.src='${asciiPath}';}else{this.outerHTML='<span class=\\'ab-sticker-emoji ${extraClass}\\' role=\\'img\\' aria-label=\\'${name}\\'>${emoji}</span>';}">`;
}

/**
 * Retrieves educational encyclopedia facts for an animal
 */
function getAnimalFactEntry(letter, animalName) {
  const db = (typeof ANIMAL_FACTS !== 'undefined') ? ANIMAL_FACTS : (window.ANIMAL_FACTS || {});
  const list = db[letter] || [];
  const clean = (animalName || '').toLowerCase().trim();
  if (!clean || list.length === 0) return null;

  return list.find(f => f.name.toLowerCase() === clean) ||
         list.find(f => f.name.toLowerCase().includes(clean) || clean.includes(f.name.toLowerCase())) ||
         list[0] ||
         null;
}

if (typeof window !== 'undefined') {
  window.getAnimalFactEntry = getAnimalFactEntry;
}
