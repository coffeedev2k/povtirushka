import { SoundData, PhonemeGroupFilter } from '../types';

export const ALL_SOUNDS: SoundData[] = [
  // Monophthongs (12)
  {
    id: 'sheep',
    label: 'cheese',
    wordIpa: '/tʃiːz/',
    ipa: '/iː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['cheese', 'green', 'tree', 'eat'],
    description: 'Long high front unrounded vowel (as in cheese). Lips spread, tongue high near roof of mouth.'
  },
  {
    id: 'ship',
    label: 'fish',
    wordIpa: '/fɪʃ/',
    ipa: '/ɪ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['fish', 'milk', 'window', 'city'],
    description: 'Short lax front unrounded vowel (as in fish). Slightly more open than /iː/.'
  },
  {
    id: 'good',
    label: 'book',
    wordIpa: '/bʊk/',
    ipa: '/ʊ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['book', 'look', 'push', 'wood'],
    description: 'Short near-close back rounded vowel (as in book). Lips gently rounded.'
  },
  {
    id: 'shoot',
    label: 'moon',
    wordIpa: '/muːn/',
    ipa: '/uː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['moon', 'blue', 'soup', 'room'],
    description: 'Long close back rounded vowel (as in moon). Lips pursed and rounded.'
  },
  {
    id: 'bed',
    label: 'desk',
    wordIpa: '/desk/',
    ipa: '/e/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['desk', 'bed', 'egg', 'help'],
    description: 'Short open-mid front unrounded vowel (as in desk). Jaw slightly dropped, tongue mid-front.'
  },
  {
    id: 'teacher',
    label: 'banana',
    wordIpa: '/bəˈnɑːnə/',
    ipa: '/ə/',
    category: 'monophthong',
    categoryLabel: 'Schwa / Neutral',
    exampleWords: ['banana', 'sofa', 'police', 'about'],
    description: 'Mid-central neutral vowel (Schwa, as in banana). Completely relaxed mouth and tongue.'
  },
  {
    id: 'bird',
    label: 'bird',
    wordIpa: '/bɜːd/',
    ipa: '/ɜː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['bird', 'girl', 'world', 'shirt'],
    description: 'Long open-mid central unrounded vowel (as in bird). Neutral lips, tongue flat in center.'
  },
  {
    id: 'door',
    label: 'ball',
    wordIpa: '/bɔːl/',
    ipa: '/ɔː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['ball', 'door', 'horse', 'walk'],
    description: 'Long open-mid back rounded vowel (as in ball). Jaw open, lips rounded.'
  },
  {
    id: 'cat',
    label: 'apple',
    wordIpa: '/ˈæpl/',
    ipa: '/æ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['apple', 'cat', 'black', 'flag'],
    description: 'Short near-open front unrounded vowel (as in apple). Wide open mouth, tongue low and forward.'
  },
  {
    id: 'up',
    label: 'sun',
    wordIpa: '/sʌn/',
    ipa: '/ʌ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['sun', 'cup', 'bus', 'love'],
    description: 'Short open-mid back unrounded vowel (as in sun). Relaxed open jaw, tongue slightly back.'
  },
  {
    id: 'far',
    label: 'star',
    wordIpa: '/stɑː/',
    ipa: '/ɑː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['star', 'car', 'heart', 'park'],
    description: 'Long open back unrounded vowel (as in star). Wide open jaw, back of tongue lowered.'
  },
  {
    id: 'on',
    label: 'clock',
    wordIpa: '/klɒk/',
    ipa: '/ɒ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['clock', 'dog', 'box', 'orange'],
    description: 'Short open back rounded vowel (as in clock). Jaw low, lips open and rounded.'
  },

  // Diphthongs (8)
  {
    id: 'wait',
    label: 'train',
    wordIpa: '/treɪn/',
    ipa: '/eɪ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['train', 'rain', 'cake', 'day'],
    description: 'Closing diphthong gliding from /e/ toward /ɪ/ (as in train).'
  },
  {
    id: 'my',
    label: 'sky',
    wordIpa: '/skaɪ/',
    ipa: '/aɪ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['sky', 'bike', 'time', 'ice'],
    description: 'Closing diphthong gliding from /a/ toward /ɪ/ (as in sky).'
  },
  {
    id: 'boy',
    label: 'coin',
    wordIpa: '/kɔɪn/',
    ipa: '/ɔɪ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['coin', 'boy', 'toy', 'voice'],
    description: 'Closing diphthong gliding from /ɔː/ toward /ɪ/ (as in coin).'
  },
  {
    id: 'show',
    label: 'home',
    wordIpa: '/həʊm/',
    ipa: '/əʊ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['home', 'snow', 'boat', 'cold'],
    description: 'Closing diphthong gliding from schwa /ə/ toward /ʊ/ (as in home).'
  },
  {
    id: 'cow',
    label: 'cloud',
    wordIpa: '/klaʊd/',
    ipa: '/aʊ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['cloud', 'mouse', 'house', 'town'],
    description: 'Closing diphthong gliding from /a/ toward /ʊ/ (as in cloud).'
  },
  {
    id: 'here',
    label: 'ear',
    wordIpa: '/ɪə/',
    ipa: '/ɪə/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['ear', 'deer', 'hear', 'near'],
    description: 'Centering diphthong gliding from /ɪ/ toward schwa /ə/ (as in ear).'
  },
  {
    id: 'hair',
    label: 'bear',
    wordIpa: '/beə/',
    ipa: '/eə/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['bear', 'chair', 'hair', 'wear'],
    description: 'Centering diphthong gliding from /e/ toward schwa /ə/ (as in bear).'
  },
  {
    id: 'cure',
    label: 'tour',
    wordIpa: '/tʊə/',
    ipa: '/ʊə/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['tour', 'pure', 'cure', 'sure'],
    description: 'Centering diphthong gliding from /ʊ/ toward schwa /ə/ (as in tour).'
  },

  // Consonants - Plosives (6)
  {
    id: 'pea',
    label: 'pizza',
    wordIpa: '/ˈpiːtsə/',
    ipa: '/p/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Unvoiced)',
    exampleWords: ['pizza', 'pen', 'paper', 'stop'],
    description: 'Voiceless bilabial stop (as in pizza). Lips pressed firmly together then released with a puff of air.'
  },
  {
    id: 'boat',
    label: 'baby',
    wordIpa: '/ˈbeɪbi/',
    ipa: '/b/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Voiced)',
    exampleWords: ['baby', 'ball', 'book', 'cab'],
    description: 'Voiced bilabial stop (as in baby). Vocal cords vibrate as lips release trapped air.'
  },
  {
    id: 'tea',
    label: 'tiger',
    wordIpa: '/ˈtaɪɡə/',
    ipa: '/t/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Unvoiced)',
    exampleWords: ['tiger', 'tea', 'table', 'water'],
    description: 'Voiceless alveolar stop (as in tiger). Tongue tip against alveolar ridge behind upper teeth.'
  },
  {
    id: 'dog',
    label: 'door',
    wordIpa: '/dɔː/',
    ipa: '/d/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Voiced)',
    exampleWords: ['door', 'dog', 'day', 'under'],
    description: 'Voiced alveolar stop (as in door). Tongue tip against alveolar ridge with vocal cord vibration.'
  },
  {
    id: 'car',
    label: 'coffee',
    wordIpa: '/ˈkɒfi/',
    ipa: '/k/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Unvoiced)',
    exampleWords: ['coffee', 'cat', 'car', 'key'],
    description: 'Voiceless velar stop (as in coffee). Back of tongue touches soft palate (velum).'
  },
  {
    id: 'go',
    label: 'gold',
    wordIpa: '/ɡəʊld/',
    ipa: '/ɡ/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Voiced)',
    exampleWords: ['gold', 'game', 'green', 'big'],
    description: 'Voiced velar stop (as in gold). Back of tongue against velum with vocal vibration.'
  },

  // Consonants - Affricates (2)
  {
    id: 'cheese',
    label: 'chair',
    wordIpa: '/tʃeə/',
    ipa: '/tʃ/',
    category: 'consonant_affricate',
    categoryLabel: 'Affricate (Unvoiced)',
    exampleWords: ['chair', 'chocolate', 'cheese', 'match'],
    description: 'Voiceless postalveolar affricate (as in chair). Begins like /t/ and releases into /ʃ/.'
  },
  {
    id: 'june',
    label: 'juice',
    wordIpa: '/dʒuːs/',
    ipa: '/dʒ/',
    category: 'consonant_affricate',
    categoryLabel: 'Affricate (Voiced)',
    exampleWords: ['juice', 'jump', 'june', 'orange'],
    description: 'Voiced postalveolar affricate (as in juice). Begins like /d/ and releases into /ʒ/ with voice.'
  },

  // Consonants - Fricatives (8)
  {
    id: 'fly',
    label: 'fire',
    wordIpa: '/ˈfaɪə/',
    ipa: '/f/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['fire', 'fox', 'fish', 'coffee'],
    description: 'Voiceless labiodental fricative (as in fire). Upper front teeth lightly touch lower lip.'
  },
  {
    id: 'video',
    label: 'voice',
    wordIpa: '/vɔɪs/',
    ipa: '/v/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['voice', 'van', 'video', 'live'],
    description: 'Voiced labiodental fricative (as in voice). Upper teeth on lower lip with vocal vibration.'
  },
  {
    id: 'think',
    label: 'three',
    wordIpa: '/θriː/',
    ipa: '/θ/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['three', 'think', 'mouth', 'bath'],
    description: 'Voiceless dental fricative (as in three). Tongue tip placed gently between upper and lower teeth.'
  },
  {
    id: 'this',
    label: 'mother',
    wordIpa: '/ˈmʌðə/',
    ipa: '/ð/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['mother', 'they', 'this', 'father'],
    description: 'Voiced dental fricative (as in mother). Tongue tip between teeth with vocal vibration.'
  },
  {
    id: 'see',
    label: 'snake',
    wordIpa: '/sneɪk/',
    ipa: '/s/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['snake', 'sun', 'city', 'yes'],
    description: 'Voiceless alveolar fricative (as in snake). Air forced through narrow channel over tongue tip.'
  },
  {
    id: 'zoo',
    label: 'zebra',
    wordIpa: '/ˈzebrə/',
    ipa: '/z/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['zebra', 'zoo', 'zero', 'easy'],
    description: 'Voiced alveolar fricative (as in zebra). Like /s/ but with vocal cord vibration.'
  },
  {
    id: 'shall',
    label: 'shoe',
    wordIpa: '/ʃuː/',
    ipa: '/ʃ/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['shoe', 'ship', 'shop', 'fish'],
    description: 'Voiceless postalveolar fricative (as in shoe). Blade of tongue near back of alveolar ridge.'
  },
  {
    id: 'television',
    label: 'television',
    wordIpa: '/ˈtelɪvɪʒn/',
    ipa: '/ʒ/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['television', 'treasure', 'measure', 'vision'],
    description: 'Voiced postalveolar fricative (as in television). Like /ʃ/ but with vocal cord vibration.'
  },

  // Consonants - Nasals (3)
  {
    id: 'man',
    label: 'milk',
    wordIpa: '/mɪlk/',
    ipa: '/m/',
    category: 'consonant_nasal',
    categoryLabel: 'Nasal (Voiced)',
    exampleWords: ['milk', 'moon', 'money', 'come'],
    description: 'Voiced bilabial nasal (as in milk). Both lips closed; air escapes freely through the nose.'
  },
  {
    id: 'now',
    label: 'night',
    wordIpa: '/naɪt/',
    ipa: '/n/',
    category: 'consonant_nasal',
    categoryLabel: 'Nasal (Voiced)',
    exampleWords: ['night', 'nose', 'new', 'sun'],
    description: 'Voiced alveolar nasal (as in night). Tongue tip against alveolar ridge; air through nose.'
  },
  {
    id: 'singer',
    label: 'ring',
    wordIpa: '/rɪŋ/',
    ipa: '/ŋ/',
    category: 'consonant_nasal',
    categoryLabel: 'Nasal (Voiced)',
    exampleWords: ['ring', 'king', 'song', 'long'],
    description: 'Voiced velar nasal (as in ring). Back of tongue touches soft palate; air flows through nose.'
  },

  // Consonants - Approximants / Glottal (5)
  {
    id: 'hat',
    label: 'hat',
    wordIpa: '/hæt/',
    ipa: '/h/',
    category: 'consonant_fricative',
    categoryLabel: 'Glottal Fricative',
    exampleWords: ['hat', 'house', 'horse', 'heart'],
    description: 'Voiceless glottal fricative (as in hat). Breath exhaled through open vocal cords.'
  },
  {
    id: 'love',
    label: 'lemon',
    wordIpa: '/ˈlemən/',
    ipa: '/l/',
    category: 'consonant_approximant',
    categoryLabel: 'Lateral Approximant',
    exampleWords: ['lemon', 'lion', 'light', 'ball'],
    description: 'Voiced alveolar lateral approximant (as in lemon). Tongue tip on ridge, air flows around sides.'
  },
  {
    id: 'red',
    label: 'red',
    wordIpa: '/red/',
    ipa: '/r/',
    category: 'consonant_approximant',
    categoryLabel: 'Approximant (Voiced)',
    exampleWords: ['red', 'robot', 'run', 'read'],
    description: 'Voiced postalveolar approximant (as in red). Tongue curled back without touching palate.'
  },
  {
    id: 'wet',
    label: 'water',
    wordIpa: '/ˈwɔːtə/',
    ipa: '/w/',
    category: 'consonant_approximant',
    categoryLabel: 'Approximant (Voiced)',
    exampleWords: ['water', 'window', 'white', 'wind'],
    description: 'Voiced labial-velar approximant (as in water). Lips rounded, back of tongue raised.'
  },
  {
    id: 'yes',
    label: 'yellow',
    wordIpa: '/ˈjeləʊ/',
    ipa: '/j/',
    category: 'consonant_approximant',
    categoryLabel: 'Approximant (Voiced)',
    exampleWords: ['yellow', 'yes', 'yacht', 'you'],
    description: 'Voiced palatal approximant (as in yellow). Tongue near hard palate, gliding into vowel.'
  }
];

export const SOUNDS_BY_ID = new Map<string, SoundData>(
  ALL_SOUNDS.map((s) => [s.id, s])
);

export const ALL_SOUND_IDS: string[] = ALL_SOUNDS.map((s) => s.id);

export const MONOPHTHONGS: SoundData[] = ALL_SOUNDS.filter(
  (s) => s.category === 'monophthong'
);

export const DIPHTHONGS: SoundData[] = ALL_SOUNDS.filter(
  (s) => s.category === 'diphthong'
);

export const CONSONANTS: SoundData[] = ALL_SOUNDS.filter((s) =>
  s.category.startsWith('consonant_')
);

export const VOWELS: SoundData[] = ALL_SOUNDS.filter(
  (s) => s.category === 'monophthong' || s.category === 'diphthong'
);

export function getSoundsForGroup(
  filter: PhonemeGroupFilter,
  customIds?: string[]
): SoundData[] {
  switch (filter) {
    case 'monophthongs':
      return MONOPHTHONGS;
    case 'diphthongs':
      return DIPHTHONGS;
    case 'consonants':
      return CONSONANTS;
    case 'vowels':
      return VOWELS;
    case 'custom': {
      if (!customIds || customIds.length === 0) {
        return ALL_SOUNDS;
      }
      const set = new Set(customIds);
      const filtered = ALL_SOUNDS.filter((s) => set.has(s.id));
      return filtered.length > 0 ? filtered : ALL_SOUNDS;
    }
    case 'all':
    default:
      return ALL_SOUNDS;
  }
}
