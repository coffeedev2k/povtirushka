import { TrainingGroup, PresetMode } from '../types';

export const QUIZ_GROUPS: TrainingGroup[] = [
  {
    id: 'q1',
    name: 'Group 1: Zoo, Tea, Red',
    description: 'Initial warm-up with distinct plosive, fricative, and approximant.',
    soundIds: ['zoo', 'tea', 'red']
  },
  {
    id: 'q2',
    name: 'Group 2: So, Pet, Boy',
    description: 'Diphthongs and short vowel practice.',
    soundIds: ['show', 'bed', 'boy']
  },
  {
    id: 'q3',
    name: 'Group 3: Hear, Pure, Hair',
    description: 'Centering diphthongs (/ɪə/, /ʊə/, /eə/).',
    soundIds: ['here', 'cure', 'hair']
  },
  {
    id: 'q4',
    name: 'Group 4: Put, Food, Pure',
    description: 'Short /ʊ/, long /uː/, and diphthong /ʊə/.',
    soundIds: ['good', 'shoot', 'cure']
  },
  {
    id: 'q5',
    name: 'Group 5: Pea, Bee, Cat, Tea, Do',
    description: 'Plosive pairs: /p/, /b/, /k/, /t/, /d/.',
    soundIds: ['pea', 'boat', 'car', 'tea', 'dog']
  },
  {
    id: 'q6',
    name: 'Group 6: So, Leisure, Zoo, Shoe, Hat, Me',
    description: 'Fricatives /s/, /z/, /ʃ/, /ʒ/, glottal /h/, and nasal /m/.',
    soundIds: ['see', 'television', 'zoo', 'shall', 'hat', 'man']
  },
  {
    id: 'q7',
    name: 'Group 7: No, Sing, Lip, Red, Wet, Yet',
    description: 'Nasals and approximants (/n/, /ŋ/, /l/, /r/, /w/, /j/).',
    soundIds: ['now', 'singer', 'love', 'red', 'wet', 'yes']
  },
  {
    id: 'q8',
    name: 'Group 8: Pet, About, Bird, Port, Pure, Boy, So',
    description: 'Vowels and diphthongs review.',
    soundIds: ['bed', 'teacher', 'bird', 'door', 'cure', 'boy', 'show']
  },
  {
    id: 'q9',
    name: 'Group 9: Hear, Bay, Pure, Boy, So, Hair, Buy, Cow',
    description: 'Full 8 Diphthongs challenge!',
    soundIds: ['here', 'wait', 'cure', 'boy', 'show', 'hair', 'my', 'cow']
  },
  {
    id: 'q10',
    name: 'Group 10: Peep, Pit, Put, Food, Hear, Bay',
    description: 'High front & back vowel distinctions.',
    soundIds: ['sheep', 'ship', 'good', 'shoot', 'here', 'wait']
  },
  {
    id: 'q11',
    name: 'Group 11: Pat, Cup, Part, Pot, Hair, Buy, Cow',
    description: 'Low and back vowels plus diphthongs.',
    soundIds: ['cat', 'up', 'far', 'on', 'hair', 'my', 'cow']
  },
  {
    id: 'q12',
    name: 'Group 12: Chin, Joke, Fat, Vet, Then, Thin',
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
    name: 'Group 2: So, Pet, Boy',
    soundIds: ['show', 'bed', 'boy']
  },
  {
    id: 't3',
    name: 'Group 3: Put, Food, Pure',
    soundIds: ['good', 'shoot', 'cure']
  },
  {
    id: 't4',
    name: 'Group 4: Pea, Bee, Cat, Tea, Do',
    soundIds: ['pea', 'boat', 'car', 'tea', 'dog']
  },
  {
    id: 't5',
    name: 'Group 5: Pat, Cup, Part, Pot, Hair, Buy, Cow',
    soundIds: ['cat', 'up', 'far', 'on', 'hair', 'my', 'cow']
  },
  {
    id: 't6',
    name: 'Group 6: So, Leisure, Zoo, Shoe, Hat, Me',
    soundIds: ['see', 'television', 'zoo', 'shall', 'hat', 'man']
  },
  {
    id: 't7',
    name: 'Group 7: No, Sing, Lip, Red, Wet, Yet',
    soundIds: ['now', 'singer', 'love', 'red', 'wet', 'yes']
  },
  {
    id: 't8',
    name: 'Group 8: Hear, Pure, Hair',
    soundIds: ['here', 'cure', 'hair']
  },
  {
    id: 't9',
    name: 'Group 9: Hear, Bay, Pure, Boy, So, Hair, Buy, Cow',
    soundIds: ['here', 'wait', 'cure', 'boy', 'show', 'hair', 'my', 'cow']
  },
  {
    id: 't10',
    name: 'Group 10: Peep, Pit, Put, Food, Hear, Bay',
    soundIds: ['sheep', 'ship', 'good', 'shoot', 'here', 'wait']
  },
  {
    id: 't11',
    name: 'Group 11: Pet, About, Bird, Port, Pure, Boy, So',
    soundIds: ['bed', 'teacher', 'bird', 'door', 'cure', 'boy', 'show']
  },
  {
    id: 't12',
    name: 'Group 12: Chin, Joke, Fat, Vet, Then, Thin',
    soundIds: ['cheese', 'june', 'fly', 'video', 'this', 'think']
  }
];

export const MINIMAL_PAIRS_GROUPS: TrainingGroup[] = [
  {
    id: 'mp1',
    name: 'Minimal Pair: /iː/ vs /ɪ/ (peep vs pit)',
    description: 'Crucial contrast between long close front and short lax front vowels.',
    soundIds: ['sheep', 'ship']
  },
  {
    id: 'mp2',
    name: 'Minimal Pair: /ʊ/ vs /uː/ (put vs food)',
    description: 'Short rounded vowel /ʊ/ vs long back /uː/.',
    soundIds: ['good', 'shoot']
  },
  {
    id: 'mp3',
    name: 'Minimal Pair: /e/ vs /æ/ vs /ʌ/ (pet vs pat vs cup)',
    description: 'Front open-mid /e/, front near-open /æ/, and back open-mid /ʌ/.',
    soundIds: ['bed', 'cat', 'up']
  },
  {
    id: 'mp4',
    name: 'Minimal Pair: /θ/ vs /ð/ (thin vs then)',
    description: 'Voiceless vs voiced dental fricatives.',
    soundIds: ['think', 'this']
  },
  {
    id: 'mp5',
    name: 'Minimal Pair: /s/ vs /z/ vs /ʃ/ vs /ʒ/',
    description: 'Sibilants: so, zoo, shoe, leisure.',
    soundIds: ['see', 'zoo', 'shall', 'television']
  },
  {
    id: 'mp6',
    name: 'Minimal Pair: /tʃ/ vs /dʒ/ (chin vs joke)',
    description: 'Affricates: voiceless vs voiced.',
    soundIds: ['cheese', 'june']
  },
  {
    id: 'mp7',
    name: 'Minimal Pair: /w/ vs /v/ (wet vs vet)',
    description: 'Common ESL confusion: approximant /w/ vs fricative /v/.',
    soundIds: ['wet', 'video']
  },
  {
    id: 'mp8',
    name: 'Minimal Pair: /n/ vs /ŋ/ (no vs sing)',
    description: 'Alveolar nasal /n/ vs velar nasal /ŋ/.',
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
