export type SoundCategory =
  | 'monophthong'
  | 'diphthong'
  | 'consonant_plosive'
  | 'consonant_fricative'
  | 'consonant_affricate'
  | 'consonant_nasal'
  | 'consonant_approximant';

export interface SoundData {
  id: string;
  label: string;
  ipa: string;
  category: SoundCategory;
  categoryLabel: string;
  exampleWords: string[];
  description: string;
}

export type PhonemeGroupFilter =
  | 'all'
  | 'monophthongs'
  | 'diphthongs'
  | 'consonants'
  | 'vowels'
  | 'custom';

export type DrillCardDisplayMode =
  | 'symbol_only'
  | 'symbol_then_reveal'
  | 'ipa_text'
  | 'full_card';

export type DrillPhase =
  | 'idle'
  | 'prompt'
  | 'system_speak'
  | 'post_pause'
  | 'paused'
  | 'completed';

export interface DrillSettings {
  groupFilter: PhonemeGroupFilter;
  customSoundIds: string[];
  promptDelayMs: number; // delay before system pronounces (e.g. 1500ms)
  postDelayMs: number; // pause after system audio before advancing (e.g. 800ms)
  autoAdvance: boolean; // whether to automatically advance
  targetRepetitions: number | null; // null for infinite (∞), or 25, 50, 100, etc.
  voiceMode: VoiceMode;
  playWordToo: boolean; // also pronounce the example word after sound
  cardDisplay: DrillCardDisplayMode;
  shuffle: boolean;
  volume: number;
  playbackRate: number;
}

export interface DrillStats {
  totalCompleted: number;
  totalSessionTimeMs: number;
  soundCounts: Record<string, number>;
  startTime: number | null;
}

export type AppMode = 'drill' | 'chart' | 'quiz';

export interface TrainingGroup {
  id: string;
  name: string;
  description?: string;
  soundIds: string[];
}

export type PresetMode = 'quiz' | 'training' | 'minimal_pairs' | 'full' | 'custom';

export type VoiceMode = 'mix' | 'chart' | 'alex' | 'f1' | 'f2';

export type CardStyle = 'chart' | 'smiles';

export type LayoutMode = 'scattered' | 'grid';

export type FeedbackMode = 'yes' | 'word' | 'none';

export type ThemeMode = 'dark' | 'slate' | 'light';

export interface GameSettings {
  preset: PresetMode;
  voiceMode: VoiceMode;
  cardStyle: CardStyle;
  layoutMode: LayoutMode;
  feedbackMode: FeedbackMode;
  autoReplay: boolean;
  autoReplayIntervalSec: number;
  successThreshold: number;
  maxSequenceLength: number;
  volume: number;
  playbackRate: number;
  theme: ThemeMode;
}

export interface GameProgress {
  preset: PresetMode;
  currentGroupIndex: number;
  sequenceLength: number;
  currentStreak: number;
  totalCorrect: number;
  totalMistakes: number;
  bestStreak: number;
  customSoundIds?: string[];
}

export interface CardPosition {
  soundId: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  rotationDeg: number; // gentle tilt -4 to +4 deg
}
