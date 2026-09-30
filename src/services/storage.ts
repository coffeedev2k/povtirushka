import { GameProgress, GameSettings, DrillSettings, AppMode } from '../types';

const SETTINGS_KEY = 'est_settings_v1';
const PROGRESS_KEY = 'est_progress_v1';
const DRILL_SETTINGS_KEY = 'est_drill_settings_v1';
const APP_MODE_KEY = 'est_app_mode_v1';

export const DEFAULT_DRILL_SETTINGS: DrillSettings = {
  groupFilter: 'all',
  customSoundIds: [],
  promptDelayMs: 1500, // 1.5 seconds pause for user to pronounce
  postDelayMs: 800, // 0.8 seconds pause after system pronunciation
  autoAdvance: true,
  targetRepetitions: 50, // default target batch: 50 items (or null for infinite)
  voiceMode: 'mix',
  playWordToo: false,
  cardDisplay: 'symbol_only', // default to cropped symbol (word hidden) as requested
  shuffle: true,
  volume: 0.9,
  playbackRate: 1.0
};

export const DEFAULT_SETTINGS: GameSettings = {
  preset: 'quiz',
  voiceMode: 'mix',
  cardStyle: 'chart',
  layoutMode: 'scattered',
  feedbackMode: 'yes',
  autoReplay: true,
  autoReplayIntervalSec: 5,
  successThreshold: 10,
  maxSequenceLength: 3,
  volume: 0.85,
  playbackRate: 1.0,
  theme: 'slate'
};

export const DEFAULT_PROGRESS: GameProgress = {
  preset: 'quiz',
  currentGroupIndex: 0,
  sequenceLength: 1,
  currentStreak: 0,
  totalCorrect: 0,
  totalMistakes: 0,
  bestStreak: 0,
  customSoundIds: []
};

export function loadSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load settings from localStorage', err);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Failed to save settings to localStorage', err);
  }
}

export function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_PROGRESS, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load progress from localStorage', err);
  }
  return DEFAULT_PROGRESS;
}

export function saveProgress(progress: GameProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Failed to save progress to localStorage', err);
  }
}

export function resetStoredProgress(preset: GameSettings['preset']): GameProgress {
  const fresh: GameProgress = {
    ...DEFAULT_PROGRESS,
    preset,
    currentGroupIndex: 0,
    sequenceLength: 1,
    currentStreak: 0
  };
  saveProgress(fresh);
  return fresh;
}

export function loadDrillSettings(): DrillSettings {
  try {
    const raw = localStorage.getItem(DRILL_SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_DRILL_SETTINGS, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load drill settings from localStorage', err);
  }
  return DEFAULT_DRILL_SETTINGS;
}

export function saveDrillSettings(settings: DrillSettings): void {
  try {
    localStorage.setItem(DRILL_SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Failed to save drill settings to localStorage', err);
  }
}

export function loadAppMode(): AppMode {
  try {
    const raw = localStorage.getItem(APP_MODE_KEY);
    if (raw === 'drill' || raw === 'chart' || raw === 'quiz') {
      return raw;
    }
  } catch (err) {
    console.warn('Failed to load app mode', err);
  }
  return 'drill'; // Default to the drill trainer!
}

export function saveAppMode(mode: AppMode): void {
  try {
    localStorage.setItem(APP_MODE_KEY, mode);
  } catch (err) {
    console.warn('Failed to save app mode', err);
  }
}
