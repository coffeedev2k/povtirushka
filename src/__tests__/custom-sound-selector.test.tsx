import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { CustomSoundSelectorModal } from '../components/CustomSoundSelectorModal';

describe('CustomSoundSelectorModal', () => {
  it('starts with no sounds selected when the saved custom list is empty', () => {
    const html = renderToStaticMarkup(
      <CustomSoundSelectorModal
        isOpen
        onClose={vi.fn()}
        selectedSoundIds={[]}
        onChangeSelectedSoundIds={vi.fn()}
      />
    );

    expect(html).toContain('Выбрано 0 из 44 фонем');
  });

  it('shows only the explicitly selected sounds as selected', () => {
    const html = renderToStaticMarkup(
      <CustomSoundSelectorModal
        isOpen
        onClose={vi.fn()}
        selectedSoundIds={['sheep', 'tea']}
        onChangeSelectedSoundIds={vi.fn()}
      />
    );

    expect(html).toContain('Выбрано 2 из 44 фонем');
  });
});
