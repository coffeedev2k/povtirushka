import { describe, it, expect } from 'vitest';
import {
  ALL_SOUNDS,
  ALL_SOUND_IDS,
  MONOPHTHONGS,
  DIPHTHONGS,
  CONSONANTS,
  VOWELS,
  getSoundsForGroup
} from '../data/sounds';

describe('English Sounds Data & Classification', () => {
  it('contains exactly 44 English phonemes', () => {
    expect(ALL_SOUNDS).toHaveLength(44);
    expect(ALL_SOUND_IDS).toHaveLength(44);
    const uniqueIds = new Set(ALL_SOUND_IDS);
    expect(uniqueIds.size).toBe(44);
  });

  it('contains exactly 12 monophthongs (pure vowels)', () => {
    expect(MONOPHTHONGS).toHaveLength(12);
    for (const sound of MONOPHTHONGS) {
      expect(sound.category).toBe('monophthong');
      expect(sound.ipa).toBeTruthy();
      expect(sound.label).toBeTruthy();
    }
  });

  it('contains exactly 8 diphthongs', () => {
    expect(DIPHTHONGS).toHaveLength(8);
    for (const sound of DIPHTHONGS) {
      expect(sound.category).toBe('diphthong');
      expect(sound.ipa).toBeTruthy();
      expect(sound.label).toBeTruthy();
    }
  });

  it('contains exactly 24 consonants', () => {
    expect(CONSONANTS).toHaveLength(24);
    for (const sound of CONSONANTS) {
      expect(sound.category.startsWith('consonant_')).toBe(true);
      expect(sound.ipa).toBeTruthy();
      expect(sound.label).toBeTruthy();
    }
  });

  it('contains exactly 20 total vowels (12 monophthongs + 8 diphthongs)', () => {
    expect(VOWELS).toHaveLength(20);
    expect(MONOPHTHONGS.length + DIPHTHONGS.length).toBe(VOWELS.length);
  });

  describe('getSoundsForGroup', () => {
    it('returns all 44 sounds for "all"', () => {
      const result = getSoundsForGroup('all');
      expect(result).toHaveLength(44);
    });

    it('returns 12 sounds for "monophthongs"', () => {
      const result = getSoundsForGroup('monophthongs');
      expect(result).toHaveLength(12);
      expect(result.every((s) => s.category === 'monophthong')).toBe(true);
    });

    it('returns 8 sounds for "diphthongs"', () => {
      const result = getSoundsForGroup('diphthongs');
      expect(result).toHaveLength(8);
      expect(result.every((s) => s.category === 'diphthong')).toBe(true);
    });

    it('returns 24 sounds for "consonants"', () => {
      const result = getSoundsForGroup('consonants');
      expect(result).toHaveLength(24);
      expect(result.every((s) => s.category.startsWith('consonant_'))).toBe(true);
    });

    it('returns 20 sounds for "vowels"', () => {
      const result = getSoundsForGroup('vowels');
      expect(result).toHaveLength(20);
    });

    it('returns selected subset for "custom"', () => {
      const customIds = ['sheep', 'tea', 'boy'];
      const result = getSoundsForGroup('custom', customIds);
      expect(result).toHaveLength(3);
      expect(result.map((s) => s.id)).toEqual(['sheep', 'boy', 'tea']);
    });

    it('falls back gracefully to all if custom selection is empty', () => {
      const result = getSoundsForGroup('custom', []);
      expect(result).toHaveLength(44);
    });
  });

  describe('University of Sheffield Phonemic Keywords Mapping', () => {
    const sheffieldMap: Record<string, string> = {
      // Consonants (24)
      '/p/': 'pea',
      '/b/': 'bee',
      '/t/': 'tea',
      '/d/': 'do',
      '/k/': 'cat',
      '/ɡ/': 'get',
      '/f/': 'fat',
      '/v/': 'vet',
      '/θ/': 'thin',
      '/ð/': 'then',
      '/s/': 'so',
      '/z/': 'zoo',
      '/ʃ/': 'shoe',
      '/ʒ/': 'leisure',
      '/h/': 'hat',
      '/tʃ/': 'chin',
      '/dʒ/': 'joke',
      '/m/': 'me',
      '/n/': 'no',
      '/ŋ/': 'sing',
      '/w/': 'wet',
      '/r/': 'red',
      '/l/': 'lip',
      '/j/': 'yet',
      // Vowels - Monophthongs (12)
      '/ɪ/': 'pit',
      '/e/': 'pet',
      '/æ/': 'pat',
      '/ɒ/': 'pot',
      '/ʊ/': 'put',
      '/ʌ/': 'cup',
      '/iː/': 'peep',
      '/ɑː/': 'part',
      '/ɔː/': 'port',
      '/uː/': 'food',
      '/ɜː/': 'bird',
      '/ə/': 'about',
      // Vowels - Diphthongs (8)
      '/eɪ/': 'bay',
      '/aɪ/': 'buy',
      '/ɔɪ/': 'boy',
      '/əʊ/': 'so',
      '/aʊ/': 'cow',
      '/ɪə/': 'hear',
      '/eə/': 'hair',
      '/ʊə/': 'pure'
    };

    it('every sound has the correct Sheffield keyword as its label', () => {
      for (const sound of ALL_SOUNDS) {
        const expectedWord = sheffieldMap[sound.ipa];
        expect(expectedWord, `Missing expectation for ${sound.ipa}`).toBeDefined();
        expect(sound.label).toBe(expectedWord);
      }
    });

    it('every sound includes the Sheffield keyword as its primary example word', () => {
      for (const sound of ALL_SOUNDS) {
        expect(sound.exampleWords[0]).toBe(sound.label);
      }
    });

    it('every sound has word transcription from the Sheffield table', () => {
      for (const sound of ALL_SOUNDS) {
        expect(sound.wordIpa).toBeTruthy();
      }
    });
  });
});
