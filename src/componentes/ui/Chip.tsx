import type { ReactNode } from 'react';

import { cx } from './classe';

/**
 * Chip: filtro, categoria, o que está selecionado agora.
 *
 * Diferente da Tag de status, que é informational. A distinção é o que evita a
 * tela encher de pílulas com a mesma aparência e ninguém saber o que é
 * clicável.
 */
export type Props = {
  children: ReactNode;
  ativo?: boolean;
  /** `nav` quando o chip é um item de abas — a semântica muda o que o leitor de
   * tela anuncia, e a doc 1 §3.4 pede microcopy que não engane. */
  papel?: 'filtro' | 'nav';
  className?: string;
};

export function Chip({ children, ativo = false, papel = 'filtro', className }: Props) {
  const conteudo = (
    <span
      className={cx(
        'inline-flex items-center rounded-[var(--raio-cheio)] px-3 py-1.5',
        'text-[var(--tamanho-rotulo)] uppercase tracking-[var(--tracking-rotulo)]',
        'transition-colors duration-[var(--duracao)]',
        ativo
          ? 'bg-[var(--dourado)] text-[var(--dourado-texto)] font-[var(--peso-medio)]'
          : 'bg-[var(--superficie-alta)] text-[var(--texto-secundario)]',
      )}
    >
      {children}
    </span>
  );

  if (papel === 'nav') {
    return (
      <span aria-current={ativo ? 'page' : undefined} className={className}>
        {conteudo}
      </span>
    );
  }
  return <span className={className}>{conteudo}</span>;
}
