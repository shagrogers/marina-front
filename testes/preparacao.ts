import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/**
 * `jsdom` não implementa `matchMedia`, e o TanStack Query e os componentes de
 * tema consultam `prefers-reduced-motion`. Sem o stub, qualquer render que passe
 * por esses caminhos estoura com "matchMedia is not a function" — um erro que
 * não tem nada a ver com o que se está testando.
 */
if (typeof window !== 'undefined' && window.matchMedia === undefined) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (consulta: string): MediaQueryList =>
      ({
        matches: false,
        media: consulta,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  });
}

afterEach(() => {
  cleanup();
});
