import { useState, useEffect, useRef, useCallback } from 'react';
import {
  AppMode,
  DrillSettings,
  GameSettings,
  GameProgress,
  SoundData,
  CardPosition
} from './types';
import { SOUNDS_BY_ID } from './data/sounds';
import { getPresetGroups } from './data/presets';
import {
  loadAppMode,
  saveAppMode,
  loadDrillSettings,
  saveDrillSettings,
  loadSettings,
  saveSettings,
  loadProgress,
  saveProgress,
  resetStoredProgress
} from './services/storage';
import { audioManager } from './services/audio';
import { generateScatteredPositions } from './utils/scatter';
import { Header } from './components/Header';
import { DrillTrainer } from './components/DrillTrainer';
import { DrillSettingsModal } from './components/DrillSettingsModal';
import { CustomSoundSelectorModal } from './components/CustomSoundSelectorModal';
import { GameBoard } from './components/GameBoard';
import { SettingsModal } from './components/SettingsModal';
import { GroupSelectorModal } from './components/GroupSelectorModal';
import { ChartExplorerModal } from './components/ChartExplorerModal';
import { ArticulationModal } from './components/ArticulationModal';
import { VictoryModal } from './components/VictoryModal';
import { StartOverlay } from './components/StartOverlay';

export default function App() {
  // Primary app mode ('drill' by default)
  const [appMode, setAppMode] = useState<AppMode>(loadAppMode);

  // Drill Trainer Settings
  const [drillSettings, setDrillSettings] = useState<DrillSettings>(loadDrillSettings);
  const [isDrillSettingsOpen, setIsDrillSettingsOpen] = useState(false);
  const [isCustomSoundSelectorOpen, setIsCustomSoundSelectorOpen] = useState(false);

  // Quiz Game Settings & Progress
  const [gameSettings, setGameSettings] = useState<GameSettings>(loadSettings);
  const [progress, setProgress] = useState<GameProgress>(loadProgress);
  const [hasStartedQuiz, setHasStartedQuiz] = useState(false);

  // Modals
  const [isGameSettingsOpen, setIsGameSettingsOpen] = useState(false);
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false);
  const [isChartExplorerOpen, setIsChartExplorerOpen] = useState(false);
  const [selectedArticulationSound, setSelectedArticulationSound] = useState<SoundData | null>(null);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  // Quiz round state
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);
  const [isPlayingQuizAudio, setIsPlayingQuizAudio] = useState(false);
  const [mistakeSoundId, setMistakeSoundId] = useState<string | null>(null);
  const [successSoundId, setSuccessSoundId] = useState<string | null>(null);

  const autoReplayTimerRef = useRef<number | null>(null);
  const isAdvancingRef = useRef(false);

  // Quiz preset groups
  const quizGroups = getPresetGroups(gameSettings.preset, progress.customSoundIds);
  const clampedGroupIndex = Math.min(progress.currentGroupIndex, Math.max(0, quizGroups.length - 1));
  const currentQuizGroup = quizGroups[clampedGroupIndex] || quizGroups[0];

  // Sync mode changes to storage
  const handleAppModeChange = (mode: AppMode) => {
    setAppMode(mode);
    saveAppMode(mode);
    if (mode === 'chart') {
      setIsChartExplorerOpen(true);
    }
  };

  // Sync audio volume and speed
  useEffect(() => {
    const vol = appMode === 'drill' ? drillSettings.volume : gameSettings.volume;
    const rate = appMode === 'drill' ? drillSettings.playbackRate : gameSettings.playbackRate;
    audioManager.setVolume(vol);
    audioManager.setPlaybackRate(rate);
  }, [appMode, drillSettings.volume, drillSettings.playbackRate, gameSettings.volume, gameSettings.playbackRate]);

  // Update Drill Settings
  const handleUpdateDrillSettings = (newSettings: Partial<DrillSettings>) => {
    setDrillSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveDrillSettings(updated);
      return updated;
    });
  };

  // Update Quiz Settings
  const handleUpdateGameSettings = (newSettings: Partial<GameSettings>) => {
    setGameSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });

    if (newSettings.preset && newSettings.preset !== gameSettings.preset) {
      setProgress((prev) => {
        const updated: GameProgress = {
          ...prev,
          preset: newSettings.preset!,
          currentGroupIndex: 0,
          currentStreak: 0,
          sequenceLength: 1
        };
        saveProgress(updated);
        return updated;
      });
    }
  };

  // Update Master Volume
  const handleUpdateVolume = (vol: number) => {
    if (appMode === 'drill') {
      handleUpdateDrillSettings({ volume: vol });
    } else {
      handleUpdateGameSettings({ volume: vol });
    }
  };

  // Play Quiz Sequence Audio
  const playQuizSequence = useCallback(
    async (seq: string[]) => {
      if (seq.length === 0) return;
      setIsPlayingQuizAudio(true);
      await audioManager.playSequence(seq, gameSettings.voiceMode, {
        onComplete: () => {
          setIsPlayingQuizAudio(false);
        },
        pauseMs: 450
      });
      setIsPlayingQuizAudio(false);
    },
    [gameSettings.voiceMode]
  );

  // Start new Quiz round
  const startNewQuizRound = useCallback(
    (groupIndex: number, seqLength: number) => {
      const currentGrp = quizGroups[groupIndex] || quizGroups[0];
      if (!currentGrp || currentGrp.soundIds.length === 0) return;

      const shuffled = [...currentGrp.soundIds].sort(() => Math.random() - 0.5);
      const targetCount = Math.min(seqLength, shuffled.length);
      const newSequence = shuffled.slice(0, targetCount);

      setCurrentSequence(newSequence);
      setMatchedIndices([]);
      setMistakeSoundId(null);
      setSuccessSoundId(null);
      isAdvancingRef.current = false;

      const positions = generateScatteredPositions(currentGrp.soundIds);
      setCardPositions(positions);

      if (hasStartedQuiz) {
        playQuizSequence(newSequence);
      }
    },
    [quizGroups, hasStartedQuiz, playQuizSequence]
  );

  useEffect(() => {
    if (appMode === 'quiz') {
      startNewQuizRound(clampedGroupIndex, progress.sequenceLength);
    }
  }, [appMode, clampedGroupIndex, progress.sequenceLength, gameSettings.preset, startNewQuizRound]);

  // Quiz auto-replay timer
  useEffect(() => {
    if (
      appMode !== 'quiz' ||
      !hasStartedQuiz ||
      !gameSettings.autoReplay ||
      isPlayingQuizAudio ||
      isAdvancingRef.current
    ) {
      if (autoReplayTimerRef.current) {
        window.clearTimeout(autoReplayTimerRef.current);
        autoReplayTimerRef.current = null;
      }
      return;
    }

    autoReplayTimerRef.current = window.setTimeout(() => {
      if (!isPlayingQuizAudio && !isAdvancingRef.current && currentSequence.length > 0) {
        playQuizSequence(currentSequence);
      }
    }, gameSettings.autoReplayIntervalSec * 1000);

    return () => {
      if (autoReplayTimerRef.current) {
        window.clearTimeout(autoReplayTimerRef.current);
        autoReplayTimerRef.current = null;
      }
    };
  }, [appMode, hasStartedQuiz, gameSettings.autoReplay, gameSettings.autoReplayIntervalSec, isPlayingQuizAudio, currentSequence, playQuizSequence]);

  // Quiz card click handler
  const handleQuizCardClick = async (clickedSoundId: string) => {
    if (isAdvancingRef.current || currentSequence.length === 0) return;

    if (autoReplayTimerRef.current) {
      window.clearTimeout(autoReplayTimerRef.current);
      autoReplayTimerRef.current = null;
    }

    const currentTargetIndex = matchedIndices.length;
    const expectedSoundId = currentSequence[currentTargetIndex];

    if (clickedSoundId === expectedSoundId) {
      setSuccessSoundId(clickedSoundId);
      setTimeout(() => setSuccessSoundId(null), 350);

      audioManager.playFeedback('success', clickedSoundId, gameSettings.feedbackMode);

      const nextMatched = [...matchedIndices, currentTargetIndex];
      setMatchedIndices(nextMatched);

      if (nextMatched.length === currentSequence.length) {
        isAdvancingRef.current = true;
        const nextStreak = progress.currentStreak + 1;
        const nextTotalCorrect = progress.totalCorrect + 1;
        const nextBestStreak = Math.max(progress.bestStreak, nextStreak);

        let nextSequenceLength = progress.sequenceLength;
        let nextGroupIndex = clampedGroupIndex;
        let nextStreakValue = nextStreak;

        if (nextStreak >= gameSettings.successThreshold) {
          nextStreakValue = 0;
          nextSequenceLength = progress.sequenceLength + 1;

          if (nextSequenceLength > gameSettings.maxSequenceLength) {
            nextSequenceLength = 1;
            nextGroupIndex = clampedGroupIndex + 1;

            if (nextGroupIndex >= quizGroups.length) {
              const finishedProgress: GameProgress = {
                ...progress,
                currentStreak: 0,
                totalCorrect: nextTotalCorrect,
                bestStreak: nextBestStreak
              };
              setProgress(finishedProgress);
              saveProgress(finishedProgress);
              setIsVictoryOpen(true);
              return;
            }
          }
        }

        const updatedProgress: GameProgress = {
          ...progress,
          currentGroupIndex: nextGroupIndex,
          sequenceLength: nextSequenceLength,
          currentStreak: nextStreakValue,
          totalCorrect: nextTotalCorrect,
          bestStreak: nextBestStreak
        };
        setProgress(updatedProgress);
        saveProgress(updatedProgress);

        setTimeout(() => {
          if (nextGroupIndex === clampedGroupIndex && nextSequenceLength === progress.sequenceLength) {
            startNewQuizRound(nextGroupIndex, nextSequenceLength);
          }
        }, 700);
      }
    } else {
      setMistakeSoundId(clickedSoundId);
      setTimeout(() => setMistakeSoundId(null), 500);

      audioManager.playFeedback('mistake');

      const updatedProgress: GameProgress = {
        ...progress,
        currentStreak: 0,
        totalMistakes: progress.totalMistakes + 1
      };
      setProgress(updatedProgress);
      saveProgress(updatedProgress);
      setMatchedIndices([]);

      setTimeout(() => {
        if (!isAdvancingRef.current) {
          playQuizSequence(currentSequence);
        }
      }, 700);
    }
  };

  // Keyboard shortcut listener for global modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      if (e.key === 'Escape') {
        if (selectedArticulationSound) {
          setSelectedArticulationSound(null);
        } else if (isCustomSoundSelectorOpen) {
          setIsCustomSoundSelectorOpen(false);
        } else if (isDrillSettingsOpen) {
          setIsDrillSettingsOpen(false);
        } else if (isGameSettingsOpen) {
          setIsGameSettingsOpen(false);
        } else if (isChartExplorerOpen) {
          setIsChartExplorerOpen(false);
        } else if (isGroupSelectorOpen) {
          setIsGroupSelectorOpen(false);
        } else {
          if (appMode === 'drill') {
            setIsDrillSettingsOpen(true);
          } else {
            setIsGameSettingsOpen(true);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedArticulationSound,
    isCustomSoundSelectorOpen,
    isDrillSettingsOpen,
    isGameSettingsOpen,
    isChartExplorerOpen,
    isGroupSelectorOpen,
    appMode
  ]);

  const displayedQuizSounds = currentQuizGroup.soundIds
    .map((id) => SOUNDS_BY_ID.get(id))
    .filter((s): s is SoundData => s !== undefined);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Universal Top Header */}
      <Header
        appMode={appMode}
        onChangeAppMode={handleAppModeChange}
        drillSettings={drillSettings}
        gameSettings={gameSettings}
        progress={progress}
        onOpenDrillSettings={() => setIsDrillSettingsOpen(true)}
        onOpenGameSettings={() => setIsGameSettingsOpen(true)}
        onOpenChartExplorer={() => setIsChartExplorerOpen(true)}
        onUpdateVolume={handleUpdateVolume}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full relative">
        {appMode === 'drill' && (
          <DrillTrainer
            settings={drillSettings}
            onUpdateSettings={handleUpdateDrillSettings}
            onOpenSettings={() => setIsDrillSettingsOpen(true)}
            onOpenArticulation={(sound) => setSelectedArticulationSound(sound)}
            onOpenCustomSoundSelector={() => setIsCustomSoundSelectorOpen(true)}
          />
        )}

        {appMode === 'quiz' && (
          <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto relative p-4">
            <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold uppercase">Группа {clampedGroupIndex + 1}/{quizGroups.length}:</span>
                <span className="text-sm font-bold text-white">{currentQuizGroup.name}</span>
              </div>
              <button
                onClick={() => setIsGroupSelectorOpen(true)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium px-3 py-1 bg-slate-800 rounded-lg cursor-pointer"
              >
                Сменить группу
              </button>
            </div>

            <GameBoard
              displayedSounds={displayedQuizSounds}
              cardPositions={cardPositions}
              layoutMode={gameSettings.layoutMode}
              cardStyle={gameSettings.cardStyle}
              currentSequence={currentSequence}
              matchedIndices={matchedIndices}
              mistakeSoundId={mistakeSoundId}
              successSoundId={successSoundId}
              onCardClick={handleQuizCardClick}
              onOpenArticulation={(sound) => setSelectedArticulationSound(sound)}
            />

            {!hasStartedQuiz && (
              <StartOverlay
                onStart={() => {
                  audioManager.ensureContext();
                  setHasStartedQuiz(true);
                  playQuizSequence(currentSequence);
                }}
                onOpenChart={() => setIsChartExplorerOpen(true)}
              />
            )}
          </div>
        )}
      </main>

      {/* Drill Settings Modal */}
      <DrillSettingsModal
        isOpen={isDrillSettingsOpen}
        onClose={() => setIsDrillSettingsOpen(false)}
        settings={drillSettings}
        onUpdateSettings={handleUpdateDrillSettings}
        onOpenCustomSoundSelector={() => setIsCustomSoundSelectorOpen(true)}
      />

      {/* Custom Phoneme Multiselect Modal */}
      <CustomSoundSelectorModal
        isOpen={isCustomSoundSelectorOpen}
        onClose={() => setIsCustomSoundSelectorOpen(false)}
        selectedSoundIds={drillSettings.customSoundIds}
        onChangeSelectedSoundIds={(ids) => {
          handleUpdateDrillSettings({
            groupFilter: 'custom',
            customSoundIds: ids
          });
        }}
      />

      {/* Quiz Settings Modal */}
      {isGameSettingsOpen && (
        <SettingsModal
          settings={gameSettings}
          onUpdateSettings={handleUpdateGameSettings}
          onClose={() => setIsGameSettingsOpen(false)}
          onResetProgress={() => {
            const fresh = resetStoredProgress(gameSettings.preset);
            setProgress(fresh);
            setIsVictoryOpen(false);
            startNewQuizRound(0, 1);
          }}
        />
      )}

      {/* Group Selector Modal (Quiz) */}
      {isGroupSelectorOpen && (
        <GroupSelectorModal
          groups={quizGroups}
          currentGroupIndex={clampedGroupIndex}
          preset={gameSettings.preset}
          customSoundIds={progress.customSoundIds || []}
          onSelectGroup={(idx) => {
            setProgress((prev) => {
              const updated = { ...prev, currentGroupIndex: idx, sequenceLength: 1, currentStreak: 0 };
              saveProgress(updated);
              return updated;
            });
            setIsGroupSelectorOpen(false);
            startNewQuizRound(idx, 1);
          }}
          onUpdateCustomSounds={(ids: string[]) => {
            setProgress((prev) => {
              const updated = { ...prev, customSoundIds: ids, currentGroupIndex: 0 };
              saveProgress(updated);
              return updated;
            });
          }}
          onClose={() => setIsGroupSelectorOpen(false)}
        />
      )}

      {/* 44 Sounds Chart Explorer Modal */}
      {isChartExplorerOpen && (
        <ChartExplorerModal
          cardStyle={gameSettings.cardStyle}
          voiceMode={drillSettings.voiceMode}
          onClose={() => {
            setIsChartExplorerOpen(false);
            if (appMode === 'chart') {
              setAppMode('drill');
            }
          }}
          onOpenArticulation={(sound) => setSelectedArticulationSound(sound)}
        />
      )}

      {/* Mouth Articulation Diagram Modal */}
      <ArticulationModal
        sound={selectedArticulationSound}
        voiceMode={appMode === 'drill' ? drillSettings.voiceMode : gameSettings.voiceMode}
        onClose={() => setSelectedArticulationSound(null)}
      />

      {/* Victory Celebration Modal */}
      {isVictoryOpen && (
        <VictoryModal
          preset={gameSettings.preset}
          totalCorrect={progress.totalCorrect}
          totalMistakes={progress.totalMistakes}
          onRestartMode={() => {
            const fresh = resetStoredProgress(gameSettings.preset);
            setProgress(fresh);
            setIsVictoryOpen(false);
            startNewQuizRound(0, 1);
          }}
          onSwitchMode={(nextPreset) => {
            handleUpdateGameSettings({ preset: nextPreset });
            setIsVictoryOpen(false);
          }}
        />
      )}
    </div>
  );
}
