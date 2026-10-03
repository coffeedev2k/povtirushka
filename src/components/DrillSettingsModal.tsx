import React from 'react';
import {
  X,
  Volume2,
  Clock,
  Layers,
  Repeat,
  Check,
  Eye,
  Sliders
} from 'lucide-react';
import {
  DrillSettings,
  PhonemeGroupFilter,
  VoiceMode,
  DrillCardDisplayMode
} from '../types';

interface DrillSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DrillSettings;
  onUpdateSettings: (newSettings: Partial<DrillSettings>) => void;
  onOpenCustomSoundSelector: () => void;
}

export const DrillSettingsModal: React.FC<DrillSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenCustomSoundSelector
}) => {
  if (!isOpen) return null;

  const targetOptions = [
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
    { label: '250', value: 250 },
    { label: '500', value: 500 },
    { label: '1000', value: 1000 },
    { label: '∞ Без лимита', value: null }
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col my-8 animate-fade-in max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Настройки тренажёра</h2>
              <p className="text-xs text-slate-400">Параметры скорости, голоса и отображения карточек</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Section: Phoneme Groups */}
          <div>
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-indigo-400" />
              Группа фонем для отработки
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'all', title: 'Все фонемы', count: '44 звука', desc: 'Полный набор языка' },
                { id: 'monophthongs', title: 'Гласные (не дифтонги)', count: '12 звуков', desc: 'Чистые монофтонги' },
                { id: 'diphthongs', title: 'Только дифтонги', count: '8 звуков', desc: 'Двойные гласные' },
                { id: 'consonants', title: 'Только согласные', count: '24 звука', desc: 'Взрывные, щелевые и др.' },
                { id: 'vowels', title: 'Все гласные', count: '20 звуков', desc: 'Монофтонги + дифтонги' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => onUpdateSettings({ groupFilter: g.id as PhonemeGroupFilter })}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    settings.groupFilter === g.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">{g.title}</span>
                    {settings.groupFilter === g.id && (
                      <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    )}
                  </div>
                  <div className="text-[11px] text-indigo-300 font-medium">{g.count}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{g.desc}</div>
                </button>
              ))}

              {/* Custom selection card */}
              <button
                onClick={() => {
                  onOpenCustomSoundSelector();
                  onClose();
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  settings.groupFilter === 'custom'
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-800/60 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-white">Выборочно</span>
                  {settings.groupFilter === 'custom' && (
                    <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  )}
                </div>
                <div className="text-[11px] text-indigo-300 font-medium">Настроить список</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Выбрать любые галочками</div>
              </button>
            </div>
          </div>

          {/* Section: Delays & Timing */}
          <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-4 space-y-4">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Тайминги и паузы
            </label>

            {/* Prompt delay */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">
                  Пауза на произнесение пользователем (до эталонного звука):
                </span>
                <span className="font-bold text-amber-300 font-mono text-sm">
                  {(settings.promptDelayMs / 1000).toFixed(1)} сек ({settings.promptDelayMs} мс)
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="6000"
                step="100"
                value={settings.promptDelayMs}
                onChange={(e) => onUpdateSettings({ promptDelayMs: Number(e.target.value) })}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.4 сек (быстро)</span>
                <span>1.5 сек (стандарт)</span>
                <span>3.0 сек</span>
                <span>6.0 сек</span>
              </div>
            </div>

            {/* Post delay */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">
                  Пауза после эталонного звука (до следующей карточки):
                </span>
                <span className="font-bold text-sky-300 font-mono text-sm">
                  {(settings.postDelayMs / 1000).toFixed(1)} сек ({settings.postDelayMs} мс)
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="100"
                value={settings.postDelayMs}
                onChange={(e) => onUpdateSettings({ postDelayMs: Number(e.target.value) })}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0.1 сек</span>
                <span>0.8 сек (стандарт)</span>
                <span>3.0 сек</span>
              </div>
            </div>

            {/* Auto-advance toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
              <div>
                <div className="text-xs font-semibold text-slate-200">Автопереход к следующей карточке</div>
                <div className="text-[11px] text-slate-400">
                  Если выключено, переход происходит только по клику или нажатию Пробела
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoAdvance}
                  onChange={(e) => onUpdateSettings({ autoAdvance: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>

          {/* Section: Session Repetitions Target */}
          <div>
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-2">
              <Repeat className="w-4 h-4 text-emerald-400" />
              Количество повторений за тренировочную сессию
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {targetOptions.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => onUpdateSettings({ targetRepetitions: opt.value })}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                    settings.targetRepetitions === opt.value
                      ? 'bg-emerald-600/30 border-emerald-500 text-white shadow-sm'
                      : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Image & Card Display */}
          <div>
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-purple-400" />
              Отображение символа и картинки
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {
                  id: 'symbol_only',
                  title: 'Только символ (картинка без слова)',
                  desc: 'Слово полностью отделено и скрыто — тренируйте чистое чтение знака'
                },
                {
                  id: 'symbol_then_reveal',
                  title: 'Символ, затем слово после озвучки',
                  desc: 'Во время паузы слово скрыто, при произнесении открывается для самопроверки'
                },
                {
                  id: 'ipa_text',
                  title: 'Крупный IPA шрифт (/t/, /iː/)',
                  desc: 'Чёткая векторная типографика фонетических символов'
                },
                {
                  id: 'full_card',
                  title: 'Полная карточка со словом',
                  desc: 'Оригинальная карточка чарта вместе со словом'
                }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => onUpdateSettings({ cardDisplay: style.id as DrillCardDisplayMode })}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    settings.cardDisplay === style.id
                      ? 'bg-purple-600/20 border-purple-500 text-white'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">{style.title}</span>
                    {settings.cardDisplay === style.id && (
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section: Audio Catalog & Voice */}
          <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-4 space-y-3">
            <label className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-indigo-400" />
              Каталог голоса и звуки
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'chart', title: 'Chart Voice', desc: 'Классический чарт' },
                { id: 'alex', title: 'Alex', desc: 'Мужской голос' },
                { id: 'f1', title: 'Female 1', desc: 'Женский голос 1' },
                { id: 'f2', title: 'Female 2', desc: 'Женский голос 2' },
                { id: 'mix', title: '🔀 Mix', desc: 'Случайный каждый раз' }
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => onUpdateSettings({ voiceMode: v.id as VoiceMode })}
                  className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                    settings.voiceMode === v.id
                      ? 'bg-indigo-600/30 border-indigo-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  <div className="font-bold text-xs">{v.title}</div>
                  <div className="text-[10px] text-slate-400">{v.desc}</div>
                </button>
              ))}
            </div>

            {/* Play word too toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Также озвучивать проверочное слово
                </div>
                <div className="text-[11px] text-slate-400">
                  После фонемы система сразу произнесет пример слова (tea, peep и т.д.)
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.playWordToo}
                  onChange={(e) => onUpdateSettings({ playWordToo: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Shuffle toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
              <div>
                <div className="text-xs font-semibold text-slate-200">Перемешивать порядок фонем</div>
                <div className="text-[11px] text-slate-400">
                  Случайный порядок вместо последовательного списка
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.shuffle}
                  onChange={(e) => onUpdateSettings({ shuffle: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
