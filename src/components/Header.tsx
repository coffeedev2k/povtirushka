import React, { useState } from 'react';
import {
  Settings,
  BookOpen,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Headphones,
  Zap,
  Target
} from 'lucide-react';
import { AppMode, GameProgress, GameSettings, DrillSettings } from '../types';

interface HeaderProps {
  appMode: AppMode;
  onChangeAppMode: (mode: AppMode) => void;
  drillSettings: DrillSettings;
  gameSettings: GameSettings;
  progress: GameProgress;
  onOpenDrillSettings: () => void;
  onOpenGameSettings: () => void;
  onOpenChartExplorer: () => void;
  onUpdateVolume: (vol: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  appMode,
  onChangeAppMode,
  drillSettings,
  gameSettings,
  onOpenDrillSettings,
  onOpenGameSettings,
  onOpenChartExplorer,
  onUpdateVolume
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const currentVolume = appMode === 'drill' ? drillSettings.volume : gameSettings.volume;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (currentVolume > 0) {
      onUpdateVolume(0);
    } else {
      onUpdateVolume(0.85);
    }
  };

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white px-4 py-2.5 shadow-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                  English Sounds Teacher
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Повторюшка
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Mode Switcher Tabs */}
        <div className="flex items-center bg-slate-950/70 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => onChangeAppMode('drill')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              appMode === 'drill'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Тренажёр</span>
          </button>

          <button
            onClick={() => {
              onChangeAppMode('chart');
              onOpenChartExplorer();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              appMode === 'chart'
                ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md shadow-sky-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-300" />
            <span>Таблица фонем</span>
          </button>

          <button
            onClick={() => onChangeAppMode('quiz')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              appMode === 'quiz'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-emerald-300" />
            <span>Квиз</span>
          </button>
        </div>

        {/* Right Tools & Audio */}
        <div className="flex items-center gap-2">
          {/* Volume Control */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={toggleMute}
              title={currentVolume > 0 ? 'Выключить звук' : 'Включить звук'}
              className="text-slate-300 hover:text-white cursor-pointer"
            >
              {currentVolume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-indigo-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={currentVolume}
              onChange={(e) => onUpdateVolume(parseFloat(e.target.value))}
              className="w-14 sm:w-18 accent-indigo-500 h-1.5 cursor-pointer"
              title={`Громкость: ${Math.round(currentVolume * 100)}%`}
            />
          </div>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={appMode === 'drill' ? onOpenDrillSettings : onOpenGameSettings}
            title="Настройки (Esc)"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-indigo-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

