# English Sounds Teacher & Drill Trainer (Повторюшка)

> **Интерактивный высокоинтенсивный тренажёр и симулятор для освоения 44 фонем английского языка.**
> Разработано на **Node.js, TypeScript, React и Vite**. Работает полностью в браузере как статический сайт и разворачивается через **GitHub Actions** на **GitHub Pages**.

[Русское описание](#russian) | [English Description](#english)

---

<a name="russian"></a>
## Русский

### ⚡ Тренажёр произношения фонем (Главный режим)

Специальный ультра-быстрый цикл для наработки чтения транскрипции и произношения фонем тысячами повторений:

1. **Показ символа фонемы**:
   - На экране отображается символ транслитерации (IPA или карточка).
   - **Отделение символа от слова**: в карточке чарта нижнее проверочное слово отрезано, чтобы не давать подсказку заранее.
2. **Пауза на произнесение пользователем**:
   - Настраиваемое время (в секундах или миллисекундах, например 1.5 сек).
   - Интерактивная анимированная шкала обратного отсчёта. В этот момент ученик произносит звук или базовое проверочное слово вслух.
3. **Эталонное произношение системой**:
   - Система автоматически воспроизводит чистый звук из выбранного голосового каталога.
   - Опционально: сразу после звука может произноситься проверочное слово (например, *tea*, *peep*).
   - При показе «Символ, затем слово» — проверочное слово плавно открывается после озвучки.
4. **Переход к следующей фонеме**:
   - Настраиваемая пауза после звука (по умолчанию 0.8 сек).
   - Автоматический переход или ручной режим по клику / клавише `Space`.
   - Настраиваемый лимит повторений за сессию (25, 50, 100, 250, 500, 1000 или **∞ без ограничений**).

### 🎛 Настройки групп фонем

- **Все фонемы** (все 44 звука языка по University of Sheffield / IPA)
- **Только гласные (не дифтонги)** (12 чистых монофтонгов: peep, pit, put, food, pet, about, bird, port, pat, cup, part, pot)
- **Только дифтонги** (8 двойных гласных: hear, bay, pure, boy, so, hair, buy, cow)
- **Только согласные** (24 согласных: pea, bee, tea, do, cat, get, chin, joke, fat, vet, thin, then, so, zoo, shoe, leisure, me, no, sing, hat, lip, red, wet, yet)
- **Все гласные** (20 монофтонгов и дифтонгов)
- **Выборочный набор** (любой список фонем, отмеченных галочками)

### 🎙 4 каталога голосов из артефактов

1. **Chart Voice** — стандартный голос из фонетического чарта
2. **Alex** — мужской диктор
3. **Female 1** — женский голос 1
4. **Female 2** — женский голос 2
5. **🔀 Mix** — случайный выбор одного из 4 дикторов на каждую карточку

### 🖼 Отделение символов от слов на картинках

- Скрипт `scripts/crop-symbols.js` автоматически обрабатывает картинки чарта и отрезает нижнюю полосу со словом, оставляя только закругленную карточку с чистым символом транскрипции.
- 4 режима отображения в настройках:
  1. *Только символ (картинка без слова)* — слово полностью скрыто.
  2. *Символ, затем слово после озвучки* — во время паузы скрыто, после произнесения открывается.
  3. *Крупный IPA шрифт* — чистая векторная типографика (`/t/`, `/iː/`).
  4. *Полная карточка со словом*.

### ⌨️ Горячие клавиши

- <kbd>Space</kbd>: Старт / Пауза тренировки
- <kbd>→</kbd> или <kbd>Enter</kbd>: Пропустить / перейти к следующей фонеме
- <kbd>←</kbd>: Предыдущая фонема
- <kbd>R</kbd>: Повторить эталонное произношение
- <kbd>A</kbd>: Открыть схему артикуляции рта и языка для текущего звука
- <kbd>Esc</kbd>: Настройки тренажёра

### 🛠 Тестирование и Сборка

```bash
# Установка зависимостей
npm install

# Запуск тестов Vitest (21 юнит-тест)
npm test

# Запуск локального сервера разработки
npm run dev

# Нарезка картинок (символы отдельно от слов)
npm run crop-images

# Сборка проекта
npm run build
```

### 🚀 Непрерывная интеграция (CI / CD)

В репозитории настроен GitHub Actions workflow (`.github/workflows/ci.yml`), который:
- Запускается на все push и pull request;
- Устанавливает зависимости (`npm ci`);
- Запускает тесты (`npm test`);
- Проверяет TypeScript и собирает бандл (`npm run build`);
- Автоматически разворачивает сборку на **GitHub Pages** при пуше в ветку `main`.

---

<a name="english"></a>
## English

### ⚡ Phoneme Pronunciation Drill Trainer

Fast, high-cadence pronunciation trainer designed for thousands of repetitions:

1. **Phoneme Symbol Presentation**:
   - Shows transcription IPA symbol or card.
   - **Symbol / Word Separation**: the word hint is cleanly cropped out so learners practice pure symbol recognition.
2. **User Pronunciation Pause**:
   - Configurable delay (in seconds / milliseconds, e.g. 1.5s).
   - Animated progress countdown bar for the user to speak aloud.
3. **Reference Pronunciation**:
   - System plays native audio pronunciation from the selected voice catalog.
   - Optional example word playback (e.g. *tea*, *peep*).
   - Word can be revealed after audio for self-check.
4. **Auto-Advance & Repetition Limits**:
   - Configurable post-delay before next card (e.g. 0.8s).
   - Configurable target repetitions (25, 50, 100, 250, 500, 1000 or **∞ infinite**).

### 🎛 Phoneme Groups

- **All Phonemes** (all 44 sounds)
- **Monophthongs (Pure Vowels)** (12 sounds)
- **Diphthongs** (8 sounds)
- **Consonants** (24 sounds)
- **All Vowels** (20 sounds)
- **Custom Selection** (any chosen phonemes)

### 🎙 4 Speaker Voice Sets

- Chart Voice
- Alex (Male)
- Female 1
- Female 2
- Random Mix
