import React from 'react';
import { X } from 'lucide-react';
import { SoundData } from '../types';
import { ALL_SOUNDS, MONOPHTHONGS, DIPHTHONGS, CONSONANTS } from '../data/sounds';

interface CustomSoundSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSoundIds: string[];
  onChangeSelectedSoundIds: (ids: string[]) => void;
}

export const CustomSoundSelectorModal: React.FC<CustomSoundSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedSoundIds,
  onChangeSelectedSoundIds
}) => {
  if (!isOpen) return null;

  // An empty custom selection must stay empty. Treating it as "all sounds"
  // made the first click remove one sound from a set of 44 instead of selecting
  // the single sound the user clicked.
  const selectedSet = new Set(selectedSoundIds);

  const toggleSound = (id: string) => {
    const nextSet = new Set(selectedSet);
    if (nextSet.has(id)) {
      if (nextSet.size > 1) {
        nextSet.delete(id);
      }
    } else {
      nextSet.add(id);
    }
    onChangeSelectedSoundIds(Array.from(nextSet));
  };

  const selectGroup = (sounds: SoundData[]) => {
    const nextSet = new Set(selectedSet);
    for (const s of sounds) {
      nextSet.add(s.id);
    }
    onChangeSelectedSoundIds(Array.from(nextSet));
  };

  const deselectGroup = (sounds: SoundData[]) => {
    const nextSet = new Set(selectedSet);
    for (const s of sounds) {
      if (nextSet.size > 1) {
        nextSet.delete(s.id);
      }
    }
    onChangeSelectedSoundIds(Array.from(nextSet));
  };

  const selectAll = () => {
    onChangeSelectedSoundIds(ALL_SOUNDS.map((s) => s.id));
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full shadow-2xl flex flex-col my-8 max-h-[90vh] animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/40">
          <div>
            <h2 className="text-lg font-bold text-white">Выбор фонем для тренировки</h2>
            <p className="text-xs text-slate-400">
              Выбрано {selectedSet.size} из {ALL_SOUNDS.length} фонем
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Bulk Action Buttons */}
        <div className="px-6 py-3 bg-slate-800/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Выбрать все (44)
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 mr-1">Быстрый выбор:</span>
            <button
              onClick={() => selectGroup(MONOPHTHONGS)}
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-emerald-300 rounded-md font-medium cursor-pointer"
            >
              + Гласные (12)
            </button>
            <button
              onClick={() => selectGroup(DIPHTHONGS)}
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-amber-300 rounded-md font-medium cursor-pointer"
            >
              + Дифтонги (8)
            </button>
            <button
              onClick={() => selectGroup(CONSONANTS)}
              className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-sky-300 rounded-md font-medium cursor-pointer"
            >
              + Согласные (24)
            </button>
          </div>
        </div>

        {/* Phoneme Grid */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Monophthongs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Монофтонги (12)
              </span>
              <button
                onClick={() => deselectGroup(MONOPHTHONGS)}
                className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
              >
                Снять монофтонги
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {MONOPHTHONGS.map((sound) => {
                const isSelected = selectedSet.has(sound.id);
                return (
                  <button
                    key={sound.id}
                    onClick={() => toggleSound(sound.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600/20 border-emerald-500/80 text-white shadow-sm'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <span className="text-xl font-bold font-mono">{sound.ipa}</span>
                    <span className="text-[11px] text-slate-300 mt-0.5">{sound.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diphthongs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Дифтонги (8)
              </span>
              <button
                onClick={() => deselectGroup(DIPHTHONGS)}
                className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
              >
                Снять дифтонги
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DIPHTHONGS.map((sound) => {
                const isSelected = selectedSet.has(sound.id);
                return (
                  <button
                    key={sound.id}
                    onClick={() => toggleSound(sound.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600/20 border-amber-500/80 text-white shadow-sm'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <span className="text-xl font-bold font-mono">{sound.ipa}</span>
                    <span className="text-[11px] text-slate-300 mt-0.5">{sound.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consonants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Согласные (24)
              </span>
              <button
                onClick={() => deselectGroup(CONSONANTS)}
                className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
              >
                Снять согласные
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {CONSONANTS.map((sound) => {
                const isSelected = selectedSet.has(sound.id);
                return (
                  <button
                    key={sound.id}
                    onClick={() => toggleSound(sound.id)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-600/20 border-sky-500/80 text-white shadow-sm'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <span className="text-xl font-bold font-mono">{sound.ipa}</span>
                    <span className="text-[11px] text-slate-300 mt-0.5">{sound.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Применить ({selectedSet.size} фонем)
          </button>
        </div>
      </div>
    </div>
  );
};
