import { TrainingGroup, PresetMode } from '../types';

export const QUIZ_GROUPS: TrainingGroup[] = [
  {
    id: 'q1',
    name: 'Group 1: Zebra, Tiger, Red',
    description: 'Initial warm-up with distinct plosive, fricative, and approximant.',
    soundIds: ['zoo', 'tea', 'red']
  },
  {
    id: 'q2',
    name: 'Group 2: Home, Desk, Coin',
    description: 'Diphthongs and short vowel practice.',
    soundIds: ['show', 'bed', 'boy']
  },
  {
    id: 'q3',
    name: 'Group 3: Ear, Tour, Bear',
    description: 'Centering diphthongs (/ɪə/, /ʊə/, /eə/).',
    soundIds: ['here', 'cure', 'hair']
  },
  {
    id: 'q4',
    name: 'Group 4: Book, Moon, Tour',
    description: 'Short /ʊ/, long /uː/, and diphthong /ʊə/.',
    soundIds: ['good', 'shoot', 'cure']
  },
  {
    id: 'q5',
    name: 'Group 5: Pizza, Baby, Coffee, Tiger, Door',
    description: 'Plosive pairs: /p/, /b/, /k/, /t/, /d/.',
    soundIds: ['pea', 'boat', 'car', 'tea', 'dog']
  },
  {
    id: 'q6',
    name: 'Group 6: Snake, Television, Zebra, Shoe, Hat, Milk',
    description: 'Fricatives /s/, /z/, /ʃ/, /ʒ/, glottal /h/, and nasal /m/.',
    soundIds: ['see', 'television', 'zoo', 'shall', 'hat', 'man']
  },
  {
    id: 'q7',
    name: 'Group 7: Night, Ring, Lemon, Red, Water, Yellow',
    description: 'Nasals and approximants (/n/, /ŋ/, /l/, /r/, /w/, /j/).',
    soundIds: ['now', 'singer', 'love', 'red', 'wet', 'yes']
  },
  {
    id: 'q8',
    name: 'Group 8: Desk, Banana, Bird, Ball, Tour, Coin, Home',
    description: 'Vowels and diphthongs review.',
    soundIds: ['bed', 'teacher', 'bird', 'door', 'cure', 'boy', 'show']
  },
  {
    id: 'q9',
    name: 'Group 9: Ear, Train, Tour, Coin, Home, Bear, Sky, Cloud',
    description: 'Full 8 Diphthongs challenge!',
    soundIds: ['here', 'wait', 'cure', 'boy', 'show', 'hair', 'my', 'cow']
  },
  {
    id: 'q10',
    name: 'Group 10: Cheese, Fish, Book, Moon, Ear, Train',
    description: 'High front & back vowel distinctions.',
    soundIds: ['sheep', 'ship', 'good', 'shoot', 'here', 'wait']
  },
  {
    id: 'q11',
    name: 'Group 11: Apple, Sun, Star, Clock, Bear, Sky, Cloud',
    description: 'Low and back vowels plus diphthongs.',
    soundIds: ['cat', 'up', 'far', 'on', 'hair', 'my', 'cow']
  },
  {
    id: 'q12',
    name: 'Group 12: Chair, Juice, Fire, Voice, Mother, Three',
    description: 'Advanced dental fricatives and affricates.',
    soundIds: ['cheese', 'june', 'fly', 'video', 'this', 'think']
  }
];

export const TRAINING_GROUPS: TrainingGroup[] = [
  {
    id: 't1',
    name: 'Group 1: Dental & Affricate Pairs',
    description: 'Intensive start: /tʃ/, /dʒ/, /f/, /v/, /ð/, /θ/',
    soundIds: ['cheese', 'june', 'fly', 'video', 'this', 'think']
  },
  {
    id: 't2',
    name: 'Group 2: Home, Desk, Coin',
    soundIds: ['show', 'bed', 'boy']
  },
  {
    id: 't3',
    name: 'Group 3: Book, Moon, Tour',
    soundIds: ['good', 'shoot', 'cure']
  },
  {
    id: 't4',
    name: 'Group 4: Pizza, Baby, Coffee, Tiger, Door',
    soundIds: ['pea', 'boat', 'car', 'tea', 'dog']
  },
  {
    id: 't5',
    name: 'Group 5: Apple, Sun, Star, Clock, Bear, Sky, Cloud',
    soundIds: ['cat', 'up', 'far', 'on', 'hair', 'my', 'cow']
  },
  {
    id: 't6',
    name: 'Group 6: Snake, Television, Zebra, Shoe, Hat, Milk',
    soundIds: ['see', 'television', 'zoo', 'shall', 'hat', 'man']
  },
  {
    id: 't7',
    name: 'Group 7: Night, Ring, Lemon, Red, Water, Yellow',
    soundIds: ['now', 'singer', 'love', 'red', 'wet', 'yes']
  },
  {
    id: 't8',
    name: 'Group 8: Ear, Tour, Bear',
    soundIds: ['here', 'cure', 'hair']
  },
  {
    id: 't9',
    name: 'Group 9: Ear, Train, Tour, Coin, Home, Bear, Sky, Cloud',
    soundIds: ['here', 'wait', 'cure', 'boy', 'show', 'hair', 'my', 'cow']
  },
  {
    id: 't10',
    name: 'Group 10: Cheese, Fish, Book, Moon, Ear, Train',
    soundIds: ['sheep', 'ship', 'good', 'shoot', 'here', 'wait']
  },
  {
    id: 't11',
    name: 'Group 11: Desk, Banana, Bird, Ball, Tour, Coin, Home',
    soundIds: ['bed', 'teacher', 'bird', 'door', 'cure', 'boy', 'show']
  },
  {
    id: 't12',
    name: 'Group 12: Chair, Juice, Fire, Voice, Mother, Three',
    soundIds: ['cheese', 'june', 'fly', 'video', 'this', 'think']
  }
];

export const MINIMAL_PAIRS_GROUPS: TrainingGroup[] = [
  {
    id: 'mp1',
    name: 'Contrast Pair: /iː/ vs /ɪ/ (cheese vs fish)',
    description: 'Distinct anchor words: /iː/ in cheese vs /ɪ/ in fish.',
    soundIds: ['sheep', 'ship']
  },
  {
    id: 'mp2',
    name: 'Contrast Pair: /ʊ/ vs /uː/ (book vs moon)',
    description: 'Distinct anchor words: /ʊ/ in book vs /uː/ in moon.',
    soundIds: ['good', 'shoot']
  },
  {
    id: 'mp3',
    name: 'Contrast Group: /e/ vs /æ/ vs /ʌ/ (desk vs apple vs sun)',
    description: 'Distinct anchor words: desk, apple, and sun.',
    soundIds: ['bed', 'cat', 'up']
  },
  {
    id: 'mp4',
    name: 'Contrast Pair: /θ/ vs /ð/ (three vs mother)',
    description: 'Voiceless /θ/ in three vs voiced /ð/ in mother.',
    soundIds: ['think', 'this']
  },
  {
    id: 'mp5',
    name: 'Sibilants Group: /s/ vs /z/ vs /ʃ/ vs /ʒ/',
    description: 'Distinct anchor words: snake, zebra, shoe, television.',
    soundIds: ['see', 'zoo', 'shall', 'television']
  },
  {
    id: 'mp6',
    name: 'Affricates Pair: /tʃ/ vs /dʒ/ (chair vs juice)',
    description: 'Voiceless /tʃ/ in chair vs voiced /dʒ/ in juice.',
    soundIds: ['cheese', 'june']
  },
  {
    id: 'mp7',
    name: 'Approximant vs Fricative: /w/ vs /v/ (water vs voice)',
    description: 'Approximant /w/ in water vs fricative /v/ in voice.',
    soundIds: ['wet', 'video']
  },
  {
    id: 'mp8',
    name: 'Nasals Pair: /n/ vs /ŋ/ (night vs ring)',
    description: 'Alveolar nasal /n/ in night vs velar nasal /ŋ/ in ring.',
    soundIds: ['now', 'singer']
  }
];

export const FULL_CHART_GROUPS: TrainingGroup[] = [
  {
    id: 'fc1',
    name: 'All 12 Monophthongs (Pure Vowels)',
    soundIds: ['sheep', 'ship', 'good', 'shoot', 'bed', 'teacher', 'bird', 'door', 'cat', 'up', 'far', 'on']
  },
  {
    id: 'fc2',
    name: 'All 8 Diphthongs (Gliding Vowels)',
    soundIds: ['here', 'wait', 'cure', 'boy', 'show', 'hair', 'my', 'cow']
  },
  {
    id: 'fc3',
    name: 'All 24 Consonants',
    soundIds: [
      'pea', 'boat', 'tea', 'dog', 'cheese', 'june', 'car', 'go',
      'fly', 'video', 'think', 'this', 'see', 'zoo', 'shall', 'television',
      'man', 'now', 'singer', 'hat', 'love', 'red', 'wet', 'yes'
    ]
  }
];

export function getPresetGroups(mode: PresetMode, customSoundIds?: string[]): TrainingGroup[] {
  switch (mode) {
    case 'quiz':
      return QUIZ_GROUPS;
    case 'training':
      return TRAINING_GROUPS;
    case 'minimal_pairs':
      return MINIMAL_PAIRS_GROUPS;
    case 'full':
      return FULL_CHART_GROUPS;
    case 'custom':
      if (customSoundIds && customSoundIds.length > 0) {
        return [
          {
            id: 'custom_group',
            name: `Custom Practice (${customSoundIds.length} sounds)`,
            soundIds: customSoundIds
          }
        ];
      }
      return QUIZ_GROUPS;
  }
}
