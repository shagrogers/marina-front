'use client';

import type { ReactNode } from 'react';

import { cx } from './classe';

type Props = {
  children: ReactNode;
  /** Rótulo acessível do agrupamento. */
  rotulo: string;
  className?: string;
};

/**
 * RodapeFixo: a barra que fica no rodapé da tela.
 *
 * ## Por que `env(safe-area-inset-bottom)` no padding
 *
 * No iPhone, a barra de gestos do sistema fica por cima do rodapé. Sem o
 * inset, o botão "Socorro" fica parcialmente sob o gesto de "voltar ao início" —
 * e o botão mais importante da aplicação fica inacessível justamente no
 * aparelho em que a pessoa mais precisa dele.
 */
export function RodapeFixo({ children, rotulo, className }: Props) {
  return (
    <footer
      aria-label={rotulo}
      className={cx(
        'sticky bottom-0 z-30 border-t border-[var(--superficie-alta)]',
        'bg-[var(--fundo-elevado)]/95 backdrop-blur-md',
        'px-4 pb-[max(var(--espaco-3),env(safe-area-inset-bottom))] pt-3',
        className,
      )}
    >
      {children}
    </footer>
  );
}
