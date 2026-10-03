import { SoundData, PhonemeGroupFilter } from '../types';

export const ALL_SOUNDS: SoundData[] = [
  // Monophthongs (12)
  {
    id: 'sheep',
    label: 'peep',
    wordIpa: '/piːp/',
    ipa: '/iː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['peep', 'see', 'feet', 'team'],
    description: 'Long high front unrounded vowel (as in peep). Lips spread, tongue high near roof of mouth.'
  },
  {
    id: 'ship',
    label: 'pit',
    wordIpa: '/pɪt/',
    ipa: '/ɪ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['pit', 'sit', 'in', 'fish'],
    description: 'Short lax front unrounded vowel (as in pit). Slightly more open than /iː/.'
  },
  {
    id: 'good',
    label: 'put',
    wordIpa: '/pʊt/',
    ipa: '/ʊ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['put', 'book', 'look', 'push'],
    description: 'Short near-close back rounded vowel (as in put). Lips gently rounded.'
  },
  {
    id: 'shoot',
    label: 'food',
    wordIpa: '/fuːd/',
    ipa: '/uː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['food', 'blue', 'two', 'group'],
    description: 'Long close back rounded vowel (as in food). Lips pursed and rounded.'
  },
  {
    id: 'bed',
    label: 'pet',
    wordIpa: '/pet/',
    ipa: '/e/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['pet', 'men', 'red', 'said'],
    description: 'Short open-mid front unrounded vowel (as in pet). Jaw slightly dropped, tongue mid-front.'
  },
  {
    id: 'teacher',
    label: 'about',
    wordIpa: '/əbaʊt/',
    ipa: '/ə/',
    category: 'monophthong',
    categoryLabel: 'Schwa / Neutral',
    exampleWords: ['about', 'banana', 'water', 'police'],
    description: 'Mid-central neutral vowel (Schwa, as in about). Completely relaxed mouth and tongue.'
  },
  {
    id: 'bird',
    label: 'bird',
    wordIpa: '/bɜːd/',
    ipa: '/ɜː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['bird', 'word', 'turn', 'girl'],
    description: 'Long open-mid central unrounded vowel (as in bird). Neutral lips, tongue flat in center.'
  },
  {
    id: 'door',
    label: 'port',
    wordIpa: '/pɔːt/',
    ipa: '/ɔː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['port', 'four', 'saw', 'walk'],
    description: 'Long open-mid back rounded vowel (as in port). Jaw open, lips rounded.'
  },
  {
    id: 'cat',
    label: 'pat',
    wordIpa: '/pæt/',
    ipa: '/æ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['pat', 'apple', 'man', 'black'],
    description: 'Short near-open front unrounded vowel (as in pat). Wide open mouth, tongue low and forward.'
  },
  {
    id: 'up',
    label: 'cup',
    wordIpa: '/kʌp/',
    ipa: '/ʌ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['cup', 'sun', 'love', 'luck'],
    description: 'Short open-mid back unrounded vowel (as in cup). Relaxed open jaw, tongue slightly back.'
  },
  {
    id: 'far',
    label: 'part',
    wordIpa: '/pɑːt/',
    ipa: '/ɑː/',
    category: 'monophthong',
    categoryLabel: 'Long Vowel',
    exampleWords: ['part', 'car', 'heart', 'calm'],
    description: 'Long open back unrounded vowel (as in part). Wide open jaw, back of tongue lowered.'
  },
  {
    id: 'on',
    label: 'pot',
    wordIpa: '/pɒt/',
    ipa: '/ɒ/',
    category: 'monophthong',
    categoryLabel: 'Short Vowel',
    exampleWords: ['pot', 'hot', 'dog', 'box'],
    description: 'Short open back rounded vowel (as in pot). Jaw low, lips open and rounded.'
  },

  // Diphthongs (8)
  {
    id: 'here',
    label: 'hear',
    wordIpa: '/hɪə/',
    ipa: '/ɪə/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['hear', 'ear', 'near', 'beer'],
    description: 'Centering diphthong gliding from /ɪ/ toward schwa /ə/ (as in hear).'
  },
  {
    id: 'wait',
    label: 'bay',
    wordIpa: '/beɪ/',
    ipa: '/eɪ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['bay', 'day', 'train', 'face'],
    description: 'Closing diphthong gliding from /e/ toward /ɪ/ (as in bay).'
  },
  {
    id: 'cure',
    label: 'pure',
    wordIpa: '/pjʊə/',
    ipa: '/ʊə/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['pure', 'tour', 'cure', 'sure'],
    description: 'Centering diphthong gliding from /ʊ/ toward schwa /ə/ (as in pure).'
  },
  {
    id: 'boy',
    label: 'boy',
    wordIpa: '/bɔɪ/',
    ipa: '/ɔɪ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['boy', 'coin', 'voice', 'toy'],
    description: 'Closing diphthong gliding from /ɔː/ toward /ɪ/ (as in boy).'
  },
  {
    id: 'show',
    label: 'so',
    wordAudio: 'so-v',
    wordIpa: '/səʊ/',
    ipa: '/əʊ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['so', 'go', 'home', 'boat'],
    description: 'Closing diphthong gliding from schwa /ə/ toward /ʊ/ (as in so).'
  },
  {
    id: 'hair',
    label: 'hair',
    wordIpa: '/heə/',
    ipa: '/eə/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['hair', 'care', 'bear', 'there'],
    description: 'Centering diphthong gliding from /e/ toward schwa /ə/ (as in hair).'
  },
  {
    id: 'my',
    label: 'buy',
    wordIpa: '/baɪ/',
    ipa: '/aɪ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['buy', 'fly', 'time', 'eye'],
    description: 'Closing diphthong gliding from /a/ toward /ɪ/ (as in buy).'
  },
  {
    id: 'cow',
    label: 'cow',
    wordIpa: '/kaʊ/',
    ipa: '/aʊ/',
    category: 'diphthong',
    categoryLabel: 'Diphthong',
    exampleWords: ['cow', 'now', 'house', 'mouth'],
    description: 'Closing diphthong gliding from /a/ toward /ʊ/ (as in cow).'
  },

  // Consonants - Plosives (6)
  {
    id: 'pea',
    label: 'pea',
    wordIpa: '/piː/',
    ipa: '/p/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Unvoiced)',
    exampleWords: ['pea', 'pen', 'stop', 'happy'],
    description: 'Voiceless bilabial stop (as in pea). Lips pressed firmly together then released with a puff of air.'
  },
  {
    id: 'boat',
    label: 'bee',
    wordIpa: '/biː/',
    ipa: '/b/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Voiced)',
    exampleWords: ['bee', 'bed', 'big', 'cab'],
    description: 'Voiced bilabial stop (as in bee). Vocal cords vibrate as lips release trapped air.'
  },
  {
    id: 'tea',
    label: 'tea',
    wordIpa: '/tiː/',
    ipa: '/t/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Unvoiced)',
    exampleWords: ['tea', 'time', 'cat', 'water'],
    description: 'Voiceless alveolar stop (as in tea). Tongue tip against alveolar ridge behind upper teeth.'
  },
  {
    id: 'dog',
    label: 'do',
    wordIpa: '/duː/',
    ipa: '/d/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Voiced)',
    exampleWords: ['do', 'day', 'red', 'under'],
    description: 'Voiced alveolar stop (as in do). Tongue tip against alveolar ridge with vocal cord vibration.'
  },
  {
    id: 'car',
    label: 'cat',
    wordIpa: '/kæt/',
    ipa: '/k/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Unvoiced)',
    exampleWords: ['cat', 'car', 'black', 'key'],
    description: 'Voiceless velar stop (as in cat). Back of tongue touches soft palate (velum).'
  },
  {
    id: 'go',
    label: 'get',
    wordIpa: '/get/',
    ipa: '/ɡ/',
    category: 'consonant_plosive',
    categoryLabel: 'Plosive (Voiced)',
    exampleWords: ['get', 'good', 'dog', 'big'],
    description: 'Voiced velar stop (as in get). Back of tongue against velum with vocal vibration.'
  },

  // Consonants - Affricates (2)
  {
    id: 'cheese',
    label: 'chin',
    wordIpa: '/ʧɪn/',
    ipa: '/tʃ/',
    category: 'consonant_affricate',
    categoryLabel: 'Affricate (Unvoiced)',
    exampleWords: ['chin', 'chair', 'match', 'picture'],
    description: 'Voiceless postalveolar affricate (as in chin). Begins like /t/ and releases into /ʃ/.'
  },
  {
    id: 'june',
    label: 'joke',
    wordIpa: '/ʤəʊk/',
    ipa: '/dʒ/',
    category: 'consonant_affricate',
    categoryLabel: 'Affricate (Voiced)',
    exampleWords: ['joke', 'judge', 'jump', 'age'],
    description: 'Voiced postalveolar affricate (as in joke). Begins like /d/ and releases into /ʒ/ with voice.'
  },

  // Consonants - Fricatives (8)
  {
    id: 'fly',
    label: 'fat',
    wordIpa: '/fæt/',
    ipa: '/f/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['fat', 'far', 'fish', 'coffee'],
    description: 'Voiceless labiodental fricative (as in fat). Upper front teeth lightly touch lower lip.'
  },
  {
    id: 'video',
    label: 'vet',
    wordIpa: '/vet/',
    ipa: '/v/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['vet', 'voice', 'live', 'leave'],
    description: 'Voiced labiodental fricative (as in vet). Upper teeth on lower lip with vocal vibration.'
  },
  {
    id: 'think',
    label: 'thin',
    wordIpa: '/θɪn/',
    ipa: '/θ/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['thin', 'three', 'bath', 'mouth'],
    description: 'Voiceless dental fricative (as in thin). Tongue tip placed gently between upper and lower teeth.'
  },
  {
    id: 'this',
    label: 'then',
    wordIpa: '/ðen/',
    ipa: '/ð/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['then', 'that', 'they', 'mother'],
    description: 'Voiced dental fricative (as in then). Tongue tip between teeth with vocal vibration.'
  },
  {
    id: 'see',
    label: 'so',
    wordAudio: 'so',
    wordIpa: '/səʊ/',
    ipa: '/s/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Unvoiced)',
    exampleWords: ['so', 'sun', 'city', 'yes'],
    description: 'Voiceless alveolar fricative (as in so). Air forced through narrow channel over tongue tip.'
  },
  {
    id: 'zoo',
    label: 'zoo',
    wordIpa: '/zuː/',
    ipa: '/z/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['zoo', 'zero', 'buzz', 'easy'],
    description: 'Voiced alveolar fricative (as in zoo). Like /s/ but with vocal cord vibration.'
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
    label: 'leisure',
    wordIpa: '/leʒə/',
    ipa: '/ʒ/',
    category: 'consonant_fricative',
    categoryLabel: 'Fricative (Voiced)',
    exampleWords: ['leisure', 'measure', 'vision', 'beige'],
    description: 'Voiced postalveolar fricative (as in leisure). Like /ʃ/ but with vocal cord vibration.'
  },

  // Consonants - Nasals (3)
  {
    id: 'man',
    label: 'me',
    wordIpa: '/miː/',
    ipa: '/m/',
    category: 'consonant_nasal',
    categoryLabel: 'Nasal (Voiced)',
    exampleWords: ['me', 'my', 'man', 'come'],
    description: 'Voiced bilabial nasal (as in me). Both lips closed; air escapes freely through the nose.'
  },
  {
    id: 'now',
    label: 'no',
    wordIpa: '/nəʊ/',
    ipa: '/n/',
    category: 'consonant_nasal',
    categoryLabel: 'Nasal (Voiced)',
    exampleWords: ['no', 'new', 'sun', 'night'],
    description: 'Voiced alveolar nasal (as in no). Tongue tip against alveolar ridge; air through nose.'
  },
  {
    id: 'singer',
    label: 'sing',
    wordIpa: '/sɪŋ/',
    ipa: '/ŋ/',
    category: 'consonant_nasal',
    categoryLabel: 'Nasal (Voiced)',
    exampleWords: ['sing', 'song', 'long', 'think'],
    description: 'Voiced velar nasal (as in sing). Back of tongue touches soft palate; air flows through nose.'
  },

  // Consonants - Approximants / Glottal (5)
  {
    id: 'hat',
    label: 'hat',
    wordIpa: '/hæt/',
    ipa: '/h/',
    category: 'consonant_fricative',
    categoryLabel: 'Glottal Fricative',
    exampleWords: ['hat', 'here', 'hot', 'home'],
    description: 'Voiceless glottal fricative (as in hat). Breath exhaled through open vocal cords.'
  },
  {
    id: 'love',
    label: 'lip',
    wordIpa: '/lɪp/',
    ipa: '/l/',
    category: 'consonant_approximant',
    categoryLabel: 'Lateral Approximant',
    exampleWords: ['lip', 'look', 'light', 'ball'],
    description: 'Voiced alveolar lateral approximant (as in lip). Tongue tip on ridge, air flows around sides.'
  },
  {
    id: 'red',
    label: 'red',
    wordIpa: '/red/',
    ipa: '/r/',
    category: 'consonant_approximant',
    categoryLabel: 'Approximant (Voiced)',
    exampleWords: ['red', 'run', 'read', 'right'],
    description: 'Voiced postalveolar approximant (as in red). Tongue curled back without touching palate.'
  },
  {
    id: 'wet',
    label: 'wet',
    wordIpa: '/wet/',
    ipa: '/w/',
    category: 'consonant_approximant',
    categoryLabel: 'Approximant (Voiced)',
    exampleWords: ['wet', 'wait', 'we', 'water'],
    description: 'Voiced labial-velar approximant (as in wet). Lips rounded, back of tongue raised.'
  },
  {
    id: 'yes',
    label: 'yet',
    wordIpa: '/jet/',
    ipa: '/j/',
    category: 'consonant_approximant',
    categoryLabel: 'Approximant (Voiced)',
    exampleWords: ['yet', 'yellow', 'you', 'year'],
    description: 'Voiced palatal approximant (as in yet). Tongue near hard palate, gliding into vowel.'
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
