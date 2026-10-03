import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Volume2,
  Settings as SettingsIcon,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  Clock,
  Gauge,
  Activity,
  CheckCircle2,
  Mic,
  Volume1
} from 'lucide-react';
import {
  SoundData,
  DrillSettings,
  DrillPhase,
  PhonemeGroupFilter,
  VoiceMode
} from '../types';
import { ALL_SOUNDS, SOUNDS_BY_ID, getSoundsForGroup } from '../data/sounds';
import { audioManager } from '../services/audio';
import { getAssetUrl } from '../utils/assets';
import confetti from 'canvas-confetti';

interface DrillTrainerProps {
  settings: DrillSettings;
  onUpdateSettings: (newSettings: Partial<DrillSettings>) => void;
  onOpenSettings: () => void;
  onOpenArticulation: (sound: SoundData) => void;
  onOpenCustomSoundSelector: () => void;
}

export const DrillTrainer: React.FC<DrillTrainerProps> = ({
  settings,
  onUpdateSettings,
  onOpenSettings,
  onOpenArticulation,
  onOpenCustomSoundSelector
}) => {
  // Available pool of sounds for current filter
  const pool = useMemo(() => {
    return getSoundsForGroup(settings.groupFilter, settings.customSoundIds);
  }, [settings.groupFilter, settings.customSoundIds]);

  // Queue of sound IDs to run through
  const [queue, setQueue] = useState<string[]>([]);
  const [queueIndex, setQueueIndex] = useState<number>(0);

  // Flow phase
  const [phase, setPhase] = useState<DrillPhase>('idle');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Timer countdown progress (0 to 100%)
  const [countdownPercent, setCountdownPercent] = useState<number>(100);
  const [remainingMs, setRemainingMs] = useState<number>(settings.promptDelayMs);

  // Repetition stats
  const [repetitionCount, setRepetitionCount] = useState<number>(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isSessionCompleteModalOpen, setIsSessionCompleteModalOpen] = useState<boolean>(false);

  // Reveal state for card if display mode is 'symbol_then_reveal' or manual reveal
  const [isManuallyRevealed, setIsManuallyRevealed] = useState<boolean>(false);
  const [activeSpeaker, setActiveSpeaker] = useState<'chart' | 'alex' | 'f1' | 'f2' | null>(null);

  // References to keep mutable values fresh inside timers and avoid stale closures
  const settingsRef = useRef<DrillSettings>(settings);
  settingsRef.current = settings;

  const queueRef = useRef<string[]>([]);
  const currentIndexRef = useRef<number>(0);
  const phaseRef = useRef<DrillPhase>('idle');
  const isPausedRef = useRef<boolean>(false);
  const repetitionCountRef = useRef<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timerFrameRef = useRef<number | null>(null);
  const postPauseTimeoutRef = useRef<number | null>(null);

  // Current active sound object for rendering
  const currentSoundId = queue[queueIndex] || queueRef.current[currentIndexRef.current] || pool[0]?.id || 'sheep';
  const currentSound = SOUNDS_BY_ID.get(currentSoundId) || pool[0] || ALL_SOUNDS[0];

  // Helper to shuffle an array (Fisher-Yates)
  const shuffleArray = useCallback(<T,>(items: T[]): T[] => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  // Clean up all pending timers, animation frames, and active audio
  const stopAllTimersAndAudio = useCallback(() => {
    if (timerFrameRef.current !== null) {
      cancelAnimationFrame(timerFrameRef.current);
      timerFrameRef.current = null;
    }
    if (postPauseTimeoutRef.current !== null) {
      clearTimeout(postPauseTimeoutRef.current);
      postPauseTimeoutRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    audioManager.stopAll();
  }, []);

  // Initialize or replenish queue when pool changes
  useEffect(() => {
    if (pool.length === 0) return;
    stopAllTimersAndAudio();

    const ids = pool.map((s) => s.id);
    const initialQueue = settings.shuffle ? shuffleArray(ids) : ids;

    queueRef.current = initialQueue;
    currentIndexRef.current = 0;
    setQueue(initialQueue);
    setQueueIndex(0);

    // If was already playing, restart with new pool
    if (phaseRef.current === 'prompt' || phaseRef.current === 'system_speak' || phaseRef.current === 'post_pause') {
      startPromptPhase(initialQueue[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, settings.shuffle, shuffleArray]);

  // Session timer ticker
  useEffect(() => {
    if (!sessionStartTime || isPaused || phase === 'idle' || phase === 'completed') {
      return;
    }
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionStartTime, isPaused, phase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllTimersAndAudio();
    };
  }, [stopAllTimersAndAudio]);

  // Step 2 & 3: Play system audio and handle post-pause auto-advance
  const playSystemAudioAndAdvance = useCallback(
    async (soundId: string) => {
      stopAllTimersAndAudio();
      phaseRef.current = 'system_speak';
      setPhase('system_speak');

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        await audioManager.playDrillPhoneme(
          soundId,
          settingsRef.current.voiceMode,
          settingsRef.current.playWordToo,
          controller.signal,
          (voice) => setActiveSpeaker(voice)
        );

        if (controller.signal.aborted) return;

        // Sound played! Count this repetition
        const nextRepCount = repetitionCountRef.current + 1;
        repetitionCountRef.current = nextRepCount;
        setRepetitionCount(nextRepCount);

        // Check if target repetitions reached
        const target = settingsRef.current.targetRepetitions;
        if (target !== null && target > 0 && nextRepCount >= target) {
          phaseRef.current = 'completed';
          setPhase('completed');
          setIsSessionCompleteModalOpen(true);
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {}
          return;
        }

        // Post-pause phase
        phaseRef.current = 'post_pause';
        setPhase('post_pause');

        // Automatic advance to the NEXT sound!
        if (settingsRef.current.autoAdvance && !isPausedRef.current) {
          postPauseTimeoutRef.current = window.setTimeout(() => {
            advanceToNextSound();
          }, Math.max(50, settingsRef.current.postDelayMs));
        }
      } catch {
        // Aborted or interrupted
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stopAllTimersAndAudio]
  );

  // Step 1: Start prompt phase with smooth countdown animation
  const startPromptPhase = useCallback(
    (soundId: string) => {
      stopAllTimersAndAudio();
      setIsManuallyRevealed(false);
      phaseRef.current = 'prompt';
      setPhase('prompt');

      const delay = Math.max(100, settingsRef.current.promptDelayMs);
      setCountdownPercent(100);
      setRemainingMs(delay);

      const startTime = performance.now();

      const tick = (now: number) => {
        if (phaseRef.current !== 'prompt' || isPausedRef.current) return;

        const elapsed = now - startTime;
        const remaining = Math.max(0, delay - elapsed);
        const percent = Math.max(0, (remaining / delay) * 100);

        setCountdownPercent(percent);
        setRemainingMs(Math.round(remaining));

        if (remaining <= 0) {
          timerFrameRef.current = null;
          playSystemAudioAndAdvance(soundId);
        } else {
          timerFrameRef.current = requestAnimationFrame(tick);
        }
      };

      timerFrameRef.current = requestAnimationFrame(tick);
    },
    [stopAllTimersAndAudio, playSystemAudioAndAdvance]
  );

  // Advance to NEXT, DIFFERENT sound
  const advanceToNextSound = useCallback(() => {
    stopAllTimersAndAudio();

    const currentQueue = queueRef.current;
    if (currentQueue.length === 0) return;

    const currentId = currentQueue[currentIndexRef.current];
    let nextIndex = currentIndexRef.current + 1;

    // If reached end of current queue, replenish with fresh shuffled batch
    if (nextIndex >= currentQueue.length) {
      const poolIds = pool.map((s) => s.id);
      const freshBatch = settingsRef.current.shuffle ? shuffleArray(poolIds) : [...poolIds];

      // Ensure first sound of next batch is DIFFERENT from the last sound
      if (freshBatch.length > 1 && freshBatch[0] === currentId) {
        const swapIdx = Math.floor(Math.random() * (freshBatch.length - 1)) + 1;
        const temp = freshBatch[0];
        freshBatch[0] = freshBatch[swapIdx];
        freshBatch[swapIdx] = temp;
      }

      const updatedQueue = [...currentQueue, ...freshBatch];
      queueRef.current = updatedQueue;
      setQueue(updatedQueue);
    }

    currentIndexRef.current = nextIndex;
    setQueueIndex(nextIndex);

    const nextSoundId = queueRef.current[nextIndex];
    startPromptPhase(nextSoundId);
  }, [pool, shuffleArray, stopAllTimersAndAudio, startPromptPhase]);

  // Step back to previous sound
  const stepToPreviousSound = useCallback(() => {
    if (currentIndexRef.current <= 0) return;
    stopAllTimersAndAudio();

    const prevIndex = currentIndexRef.current - 1;
    currentIndexRef.current = prevIndex;
    setQueueIndex(prevIndex);

    const prevSoundId = queueRef.current[prevIndex];
    if (prevSoundId) {
      startPromptPhase(prevSoundId);
    }
  }, [stopAllTimersAndAudio, startPromptPhase]);

  // Replay current sound
  const replayCurrentSound = useCallback(() => {
    stopAllTimersAndAudio();
    const currentId = queueRef.current[currentIndexRef.current] || pool[0]?.id || 'sheep';
    playSystemAudioAndAdvance(currentId);
  }, [pool, stopAllTimersAndAudio, playSystemAudioAndAdvance]);

  // Start trainer session
  const startTrainer = useCallback(() => {
    audioManager.ensureContext();
    if (!sessionStartTime) {
      setSessionStartTime(Date.now());
    }
    isPausedRef.current = false;
    setIsPaused(false);

    const activeId = queueRef.current[currentIndexRef.current] || pool[0]?.id || 'sheep';
    startPromptPhase(activeId);
  }, [sessionStartTime, pool, startPromptPhase]);

  // Pause or Resume
  const togglePause = useCallback(() => {
    if (phaseRef.current === 'idle') {
      startTrainer();
      return;
    }

    if (isPausedRef.current) {
      // Resume
      isPausedRef.current = false;
      setIsPaused(false);
      audioManager.ensureContext();

      const activeId = queueRef.current[currentIndexRef.current] || pool[0]?.id || 'sheep';
      startPromptPhase(activeId);
    } else {
      // Pause
      isPausedRef.current = true;
      setIsPaused(true);
      phaseRef.current = 'paused';
      setPhase('paused');
      stopAllTimersAndAudio();
    }
  }, [startTrainer, startPromptPhase, pool, stopAllTimersAndAudio]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
      } else if (e.code === 'ArrowRight' || e.code === 'Enter') {
        e.preventDefault();
        advanceToNextSound();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stepToPreviousSound();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        replayCurrentSound();
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        onOpenArticulation(currentSound);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePause, advanceToNextSound, stepToPreviousSound, replayCurrentSound, onOpenArticulation, currentSound]);

  // Determine category badge colors and label
  const categoryInfo = useMemo(() => {
    if (currentSound.category === 'monophthong') {
      return {
        label: 'Monophthong (Pure Vowel)',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
      };
    }
    if (currentSound.category === 'diphthong') {
      return {
        label: 'Diphthong (Gliding Vowel)',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      };
    }
    return {
      label: currentSound.categoryLabel || 'Consonant',
      badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
    };
  }, [currentSound]);

  // Pace in reps per minute
  const repsPerMin = useMemo(() => {
    if (elapsedSeconds <= 5 || repetitionCount === 0) return 0;
    return Math.round((repetitionCount / elapsedSeconds) * 60);
  }, [repetitionCount, elapsedSeconds]);

  // Formatting elapsed seconds mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Group quick filter button
  const handleGroupFilterChange = (filter: PhonemeGroupFilter) => {
    if (filter === 'custom') {
      onOpenCustomSoundSelector();
      return;
    }
    onUpdateSettings({ groupFilter: filter });
  };

  // Voice quick button
  const handleVoiceChange = (voice: VoiceMode) => {
    onUpdateSettings({ voiceMode: voice });
  };

  // Check if word should be visible
  const isWordRevealed =
    settings.cardDisplay === 'full_card' ||
    isManuallyRevealed ||
    (settings.cardDisplay === 'symbol_then_reveal' &&
      (phase === 'system_speak' || phase === 'post_pause' || phase === 'completed'));

  return (
    <div className="flex flex-col flex-1 max-w-4xl w-full mx-auto px-4 py-4 select-none">
      {/* Top Quick Control Strip */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 shadow-lg mb-4 flex flex-wrap items-center justify-between gap-3">
        {/* Phoneme Group Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Group:
          </span>
          {[
            { id: 'all', label: 'All (44)' },
            { id: 'monophthongs', label: 'Monophthongs (12)' },
            { id: 'diphthongs', label: 'Diphthongs (8)' },
            { id: 'consonants', label: 'Consonants (24)' },
            { id: 'vowels', label: 'All Vowels (20)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleGroupFilterChange(tab.id as PhonemeGroupFilter)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                settings.groupFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => handleGroupFilterChange('custom')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
              settings.groupFilter === 'custom'
                ? 'bg-indigo-600 text-white shadow-md font-semibold'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Custom {settings.groupFilter === 'custom' ? `(${pool.length})` : '...'}
          </button>
        </div>

        {/* Quick Voice Selector & Settings button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950/70 border border-slate-700 rounded-xl p-1 text-xs">
            <span className="text-slate-400 px-2 flex items-center gap-1 font-medium">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              Voice:
            </span>
            {[
              { id: 'chart', label: 'Chart' },
              { id: 'alex', label: 'Alex' },
              { id: 'f1', label: 'F1' },
              { id: 'f2', label: 'F2' },
              { id: 'mix', label: 'Mix' }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => handleVoiceChange(v.id as VoiceMode)}
                className={`px-2 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  settings.voiceMode === v.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenSettings}
            title="Drill Settings (Esc)"
            className="p-2 bg-slate-700/80 hover:bg-slate-600 text-slate-200 rounded-xl transition-all cursor-pointer hover:shadow"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress & Speed Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {/* Repetitions counter */}
        <div className="bg-slate-800/70 border border-slate-700/70 rounded-xl p-2.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Reps</div>
            <div className="text-lg font-bold text-white leading-tight">
              {repetitionCount}
              {settings.targetRepetitions ? (
                <span className="text-xs text-slate-400 font-normal"> / {settings.targetRepetitions}</span>
              ) : (
                <span className="text-xs text-indigo-400 font-normal"> (unlimited)</span>
              )}
            </div>
          </div>
        </div>

        {/* Speed / Rate */}
        <div className="bg-slate-800/70 border border-slate-700/70 rounded-xl p-2.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Speed</div>
            <div className="text-lg font-bold text-white leading-tight">
              {repsPerMin} <span className="text-xs text-slate-400 font-normal">sounds/min</span>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-slate-800/70 border border-slate-700/70 rounded-xl p-2.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Session Time</div>
            <div className="text-lg font-bold text-white leading-tight font-mono">
              {formatTime(elapsedSeconds)}
            </div>
          </div>
        </div>

        {/* Current Delay Setting */}
        <div className="bg-slate-800/70 border border-slate-700/70 rounded-xl p-2.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-slate-400 font-medium">Prompt Delay</div>
            <div className="text-lg font-bold text-amber-300 leading-tight">
              {(settings.promptDelayMs / 1000).toFixed(1)} sec
            </div>
          </div>
        </div>
      </div>

      {/* Main Flashcard Stage */}
      <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center justify-center min-h-[420px] overflow-hidden">
        {/* Top badge with sound category */}
        <div className="flex items-center justify-between w-full mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border uppercase ${categoryInfo.badgeClass}`}
          >
            {categoryInfo.label}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenArticulation(currentSound)}
              title="Show mouth articulation diagram (Key A)"
              className="px-3 py-1.5 bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              Articulation
            </button>

            <button
              onClick={() => setIsManuallyRevealed((prev) => !prev)}
              title={isWordRevealed ? 'Hide example word' : 'Show example word'}
              className="p-1.5 bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs font-medium rounded-xl flex items-center transition-colors cursor-pointer"
            >
              {isWordRevealed ? (
                <EyeOff className="w-4 h-4 text-slate-400" />
              ) : (
                <Eye className="w-4 h-4 text-indigo-400" />
              )}
            </button>
          </div>
        </div>

        {/* Phase Action Indicator */}
        <div className="w-full max-w-md mb-6">
          {phase === 'prompt' && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm sm:text-base animate-pulse mb-2">
                <Mic className="w-4 h-4 text-indigo-400" />
                <span>Say the phoneme aloud!</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  {(remainingMs / 1000).toFixed(1)}s
                </span>
              </div>
              {/* Animated Countdown Timer Bar */}
              <div className="w-full bg-slate-700/60 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-600/50">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-75"
                  style={{ width: `${countdownPercent}%` }}
                />
              </div>
            </div>
          )}

          {phase === 'system_speak' && (
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap items-center justify-center gap-2 text-emerald-300 font-semibold text-sm sm:text-base mb-2">
                <Volume2 className="w-5 h-5 text-emerald-400 animate-bounce" />
                <span>System pronouncing:</span>
                <span className="font-mono font-bold text-white bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                  {currentSound.ipa}
                </span>
                {activeSpeaker && (
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700 flex items-center gap-1 shadow-sm">
                    <span>🎙️</span>
                    <span>
                      {activeSpeaker === 'alex'
                        ? 'Alex (Male)'
                        : activeSpeaker === 'chart'
                        ? 'Chart (UK)'
                        : activeSpeaker === 'f1'
                        ? 'Female 1'
                        : 'Female 2'}
                    </span>
                  </span>
                )}
              </div>
              <div className="w-full bg-slate-700/60 rounded-full h-2.5 overflow-hidden p-0.5 border border-emerald-500/40">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-full animate-pulse" />
              </div>
            </div>
          )}

          {phase === 'post_pause' && (
            <div className="flex flex-col items-center">
              <div className="text-slate-400 text-xs sm:text-sm font-medium mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Pause before next sound...
              </div>
              <div className="w-full bg-slate-700/40 rounded-full h-2.5 overflow-hidden" />
            </div>
          )}

          {phase === 'paused' && (
            <div className="flex flex-col items-center">
              <div className="text-amber-400 text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Pause className="w-4 h-4" />
                Trainer Paused
              </div>
              <div className="text-xs text-slate-400">Press Space to continue</div>
            </div>
          )}

          {phase === 'idle' && (
            <div className="flex flex-col items-center">
              <div className="text-slate-300 text-sm font-medium mb-1">
                Click Start Drill or press Space
              </div>
            </div>
          )}
        </div>

        {/* Center Phoneme Card Visual */}
        <div className="flex flex-col items-center justify-center my-2">
          {/* Card Presentation based on settings */}
          {settings.cardDisplay === 'symbol_only' || settings.cardDisplay === 'symbol_then_reveal' ? (
            <div className="flex flex-col items-center">
              {/* Cropped symbol card - strictly without word */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-600/80 bg-slate-900 shadow-2xl p-2 transition-transform hover:scale-105 duration-200">
                <img
                  src={getAssetUrl(`images/chart_symbol/${currentSound.id}.png`)}
                  alt={currentSound.label}
                  className="w-32 h-26 sm:w-44 sm:h-36 object-contain"
                />
              </div>

              {/* Reveal word section if allowed */}
              {isWordRevealed ? (
                <div className="mt-3 flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-1.5 animate-fade-in shadow-md">
                  <span className="text-xs text-slate-400">Word hint:</span>
                  <span className="text-sm font-bold text-amber-300 font-mono">
                    {currentSound.label}
                  </span>
                  {currentSound.wordIpa && (
                    <span className="text-xs font-mono text-slate-400">
                      {currentSound.wordIpa}
                    </span>
                  )}
                  <button
                    onClick={() => audioManager.playWord(currentSound.id)}
                    title="Play word"
                    className="p-1 hover:bg-slate-700 rounded text-slate-300 hover:text-white cursor-pointer"
                  >
                    <Volume1 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="mt-3 text-xs text-slate-500 italic">
                  (word hint hidden for clean phoneme drilling)
                </div>
              )}
            </div>
          ) : settings.cardDisplay === 'ipa_text' ? (
            /* High-contrast crisp IPA typography */
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-br from-indigo-900/60 to-slate-900 border-2 border-indigo-500/40 shadow-2xl flex flex-col items-center justify-center p-4">
                <span className="text-5xl sm:text-7xl font-extrabold text-white tracking-wider font-mono drop-shadow-md">
                  {currentSound.ipa}
                </span>
                <span className="text-xs text-indigo-300 font-medium mt-2">
                  {currentSound.categoryLabel}
                </span>
              </div>
              {isWordRevealed && (
                <div className="mt-3 text-sm font-bold text-amber-300 font-mono flex items-center gap-1.5">
                  <span>{currentSound.label}</span>
                  {currentSound.wordIpa && (
                    <span className="text-xs text-slate-400 font-normal">
                      {currentSound.wordIpa}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Full card (with original word included) */
            <div className="flex flex-col items-center">
              <div className="rounded-2xl overflow-hidden border-2 border-slate-600/80 bg-slate-900 shadow-2xl p-2">
                <img
                  src={getAssetUrl(`images/chart/${currentSound.id}.png`)}
                  alt={currentSound.label}
                  className="w-36 h-36 sm:w-48 sm:h-48 object-contain"
                />
              </div>
            </div>
          )}

          {/* Large IPA transcription subtitle */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-wide">
              {currentSound.ipa}
            </span>
          </div>

          {/* Example words list */}
          <div className="text-xs text-slate-400 mt-1 max-w-sm text-center">
            {currentSound.exampleWords.join(' • ')}
          </div>
        </div>

        {/* Floating Idle Overlay if trainer hasn't started */}
        {phase === 'idle' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mb-4">
              <Mic className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Phoneme Pronunciation Drill</h2>
            <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
              Phoneme symbol is displayed. During the pause (
              <strong className="text-indigo-300">
                {(settings.promptDelayMs / 1000).toFixed(1)} sec
              </strong>
              ), pronounce the sound aloud. Then the system speaks reference pronunciation for verification.
            </p>
            <button
              onClick={startTrainer}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-base rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center gap-2.5 transition-all transform hover:scale-105 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              Start Drill (Space)
            </button>
          </div>
        )}
      </div>

      {/* Control Buttons Bar */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 mt-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
        {/* Left: Previous & Replay */}
        <div className="flex items-center gap-2">
          <button
            onClick={stepToPreviousSound}
            disabled={queueIndex <= 0}
            title="Previous Sound (Left Arrow)"
            className="p-3 bg-slate-700/80 hover:bg-slate-600 disabled:opacity-40 disabled:pointer-events-none text-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          >
            <SkipBack className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={replayCurrentSound}
            title="Replay System Audio (Key R)"
            className="p-3 bg-slate-700/80 hover:bg-slate-600 text-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span>Replay (R)</span>
          </button>
        </div>

        {/* Center: Play / Pause */}
        <button
          onClick={togglePause}
          title={isPaused || phase === 'idle' ? 'Resume (Space)' : 'Pause (Space)'}
          className={`px-8 py-3 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-lg transition-all transform hover:scale-105 cursor-pointer ${
            isPaused || phase === 'idle'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white shadow-emerald-600/30'
              : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 text-white shadow-indigo-600/30'
          }`}
        >
          {isPaused || phase === 'idle' ? (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>Start / Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-5 h-5 fill-current" />
              <span>Pause</span>
            </>
          )}
        </button>

        {/* Right: Next Sound */}
        <div className="flex items-center gap-2">
          <button
            onClick={advanceToNextSound}
            title="Next Sound (Right Arrow or Enter)"
            className="px-4 py-3 bg-slate-700/80 hover:bg-slate-600 text-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm font-semibold"
          >
            <span>Next</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Reached Modal */}
      {isSessionCompleteModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Target Reached!</h3>
            <p className="text-sm text-slate-300 mb-6">
              You successfully completed your drill session of{' '}
              <strong className="text-emerald-400">{repetitionCount}</strong> phonemes!
            </p>

            <div className="grid grid-cols-2 gap-3 bg-slate-800/80 rounded-2xl p-4 mb-6 border border-slate-700/80 text-left">
              <div>
                <div className="text-xs text-slate-400 font-medium">Total Time</div>
                <div className="text-lg font-bold text-white font-mono">{formatTime(elapsedSeconds)}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Average Pace</div>
                <div className="text-lg font-bold text-emerald-400">{repsPerMin} sounds/min</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsSessionCompleteModalOpen(false);
                  advanceToNextSound();
                }}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Continue Drill
              </button>
              <button
                onClick={() => {
                  repetitionCountRef.current = 0;
                  setRepetitionCount(0);
                  setIsSessionCompleteModalOpen(false);
                  advanceToNextSound();
                }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition-colors cursor-pointer text-sm"
              >
                Reset Counter & Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
