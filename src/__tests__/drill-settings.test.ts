import { describe, it, expect, beforeEach } from 'vitest';
import {
  DEFAULT_DRILL_SETTINGS,
  loadDrillSettings,
  saveDrillSettings,
  loadAppMode,
  saveAppMode
} from '../services/storage';

// In-memory mock for localStorage in Node test runner
const memoryStorage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => memoryStorage.get(key) ?? null,
  setItem: (key: string, value: string) => memoryStorage.set(key, String(value)),
  removeItem: (key: string) => memoryStorage.delete(key),
  clear: () => memoryStorage.clear(),
  length: 0,
  key: () => null
};

if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true
  });
}

describe('Drill Settings & LocalStorage Service', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('provides sensible defaults for rapid phoneme pronunciation flow', () => {
    expect(DEFAULT_DRILL_SETTINGS.groupFilter).toBe('all');
    expect(DEFAULT_DRILL_SETTINGS.promptDelayMs).toBe(1500);
    expect(DEFAULT_DRILL_SETTINGS.postDelayMs).toBe(800);
    expect(DEFAULT_DRILL_SETTINGS.autoAdvance).toBe(true);
    expect(DEFAULT_DRILL_SETTINGS.cardDisplay).toBe('symbol_only');
    expect(DEFAULT_DRILL_SETTINGS.targetRepetitions).toBe(50);
    expect(DEFAULT_DRILL_SETTINGS.voiceMode).toBe('mix');
  });

  it('loads default drill settings if storage is empty', () => {
    const loaded = loadDrillSettings();
    expect(loaded).toEqual(DEFAULT_DRILL_SETTINGS);
  });

  it('saves and reloads custom drill settings', () => {
    const custom = {
      ...DEFAULT_DRILL_SETTINGS,
      promptDelayMs: 2500,
      postDelayMs: 1200,
      groupFilter: 'diphthongs' as const,
      voiceMode: 'alex' as const,
      cardDisplay: 'ipa_text' as const,
      targetRepetitions: 100
    };
    saveDrillSettings(custom);
    const loaded = loadDrillSettings();
    expect(loaded).toEqual(custom);
    expect(loaded.promptDelayMs).toBe(2500);
    expect(loaded.groupFilter).toBe('diphthongs');
    expect(loaded.voiceMode).toBe('alex');
  });

  it('handles app mode persistence', () => {
    expect(loadAppMode()).toBe('drill');
    saveAppMode('quiz');
    expect(loadAppMode()).toBe('quiz');
    saveAppMode('chart');
    expect(loadAppMode()).toBe('chart');
    saveAppMode('drill');
    expect(loadAppMode()).toBe('drill');
  });
});
