import { describe, it, expect } from 'vitest';
import { getSoundsForGroup } from '../data/sounds';

describe('Drill Flow and Sound Advancement Engine', () => {
  it('advances through different sounds consecutively without repeating the same sound', () => {
    const pool = getSoundsForGroup('all');
    const poolIds = pool.map((s) => s.id);

    // Simulated queue engine
    let queue = [...poolIds];
    let currentIndex = 0;

    const playedSequence: string[] = [];

    // Simulate 200 consecutive advances
    for (let step = 0; step < 200; step++) {
      const currentId = queue[currentIndex];
      playedSequence.push(currentId);

      // Advance
      let nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        // Replenish
        let freshBatch = [...poolIds].sort(() => Math.random() - 0.5);
        if (freshBatch.length > 1 && freshBatch[0] === currentId) {
          const swapIdx = Math.floor(Math.random() * (freshBatch.length - 1)) + 1;
          const temp = freshBatch[0];
          freshBatch[0] = freshBatch[swapIdx];
          freshBatch[swapIdx] = temp;
        }
        queue = [...queue, ...freshBatch];
      }
      currentIndex = nextIndex;
    }

    expect(playedSequence).toHaveLength(200);

    // Verify that NO two consecutive sounds are identical
    for (let i = 1; i < playedSequence.length; i++) {
      expect(
        playedSequence[i],
        `Consecutive sounds at index ${i - 1} and ${i} must differ: got ${playedSequence[i - 1]} vs ${playedSequence[i]}`
      ).not.toBe(playedSequence[i - 1]);
    }
  });

  it('works for small groups like diphthongs (8 sounds)', () => {
    const diphthongs = getSoundsForGroup('diphthongs').map((s) => s.id);
    let queue = [...diphthongs];
    let currentIndex = 0;

    const played: string[] = [];
    for (let step = 0; step < 50; step++) {
      const currentId = queue[currentIndex];
      played.push(currentId);

      let nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        let fresh = [...diphthongs].sort(() => Math.random() - 0.5);
        if (fresh.length > 1 && fresh[0] === currentId) {
          const swap = 1;
          [fresh[0], fresh[swap]] = [fresh[swap], fresh[0]];
        }
        queue = [...queue, ...fresh];
      }
      currentIndex = nextIndex;
    }

    expect(played).toHaveLength(50);
    for (let i = 1; i < played.length; i++) {
      expect(played[i]).not.toBe(played[i - 1]);
    }
  });
});
