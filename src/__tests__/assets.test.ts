import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { ALL_SOUNDS } from '../data/sounds';

describe('Artifact Assets Integrity', () => {
  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');

  it('all 44 sounds have audio files in all 4 speaker catalogs', () => {
    const catalogs = ['chart', 'alex', 'f1', 'f2'];
    for (const sound of ALL_SOUNDS) {
      for (const cat of catalogs) {
        const audioPath = path.join(publicDir, 'audio', cat, `${sound.id}.mp3`);
        expect(
          fs.existsSync(audioPath),
          `Missing audio file: public/audio/${cat}/${sound.id}.mp3`
        ).toBe(true);
      }
    }
  });

  it('all 44 sounds have word pronunciation audio', () => {
    for (const sound of ALL_SOUNDS) {
      const audioPath = path.join(publicDir, 'audio', 'words', `${sound.id}.mp3`);
      expect(
        fs.existsSync(audioPath),
        `Missing word audio file: public/audio/words/${sound.id}.mp3`
      ).toBe(true);
    }
  });

  it('all 44 sounds have cropped symbol images without words', () => {
    for (const sound of ALL_SOUNDS) {
      const imgPath = path.join(publicDir, 'images', 'chart_symbol', `${sound.id}.png`);
      expect(
        fs.existsSync(imgPath),
        `Missing cropped symbol: public/images/chart_symbol/${sound.id}.png`
      ).toBe(true);
    }
  });

  it('all 44 sounds have cropped word strip images', () => {
    for (const sound of ALL_SOUNDS) {
      const imgPath = path.join(publicDir, 'images', 'chart_word', `${sound.id}.png`);
      expect(
        fs.existsSync(imgPath),
        `Missing cropped word: public/images/chart_word/${sound.id}.png`
      ).toBe(true);
    }
  });

  it('all 44 sounds have original chart cards and mouth articulation diagrams', () => {
    for (const sound of ALL_SOUNDS) {
      const chartPath = path.join(publicDir, 'images', 'chart', `${sound.id}.png`);
      const artPath = path.join(publicDir, 'images', 'articulation', `${sound.id}.jpg`);
      expect(fs.existsSync(chartPath)).toBe(true);
      expect(fs.existsSync(artPath)).toBe(true);
    }
  });
});
