'use client';

import { cx } from './classe';

export type Aba = {
  id: string;
  rotulo: string;
  /** Quantidade mostrada à direita — "Aguardando 2". */
  contagem?: number;
};

type Props = {
  abas: Aba[];
  ativa: string;
  aoMudar: (id: string) => void;
  className?: string;
  /** Rótulo do grupo, lido pelo leitor de tela antes da lista de abas. */
  rotuloGrupo: string;
};

/**
 * Abas da tela 4.5 (Próximas / Aguardando / Histórico) e da marina.
 *
 * ## `role="tablist"` e não uma fileira de botões
 *
 * O leitor de tela anuncia "aba 2 de 3" com `role="tablist"`, e a pessoa navega
 * entre abas com as setas. Com botões soltos, o que é anunciado é "botão", e a
 * relação entre eles fica por conta de quem implementou.
 *
 * ## Por que a aba ativa é dourada e as outras cinza
 *
 * A doc 1 §3 usa dourado para o que está selecionado AGORA. A distinção é de
 * brilho, não de borda — ver `globals.css`.
 */
export function Abas({ abas, ativa, aoMudar, className, rotuloGrupo }: Props) {
  return (
    <div
      role="tablist"
      aria-label={rotuloGrupo}
      className={cx(
        'flex gap-1 overflow-x-auto rounded-[var(--raio)] bg-[var(--superficie)] p-1',
        className,
      )}
    >
      {abas.map((aba) => {
        const selecionada = aba.id === ativa;
        return (
          <button
            key={aba.id}
            type="button"
            role="tab"
            id={`aba-${aba.id}`}
            aria-selected={selecionada}
            aria-controls={`painel-${aba.id}`}
            onClick={() => aoMudar(aba.id)}
            className={cx(
              'flex-1 whitespace-nowrap rounded-[var(--raio-sm)] px-4 py-2.5',
              'text-[var(--tamanho-corpo)] transition-colors duration-[var(--duracao)]',
              selecionada
                ? 'bg-[var(--dourado-sutil)] text-[var(--dourado)] font-[var(--peso-medio)]'
                : 'text-[var(--texto-secundario)] hover:bg-[var(--superficie-alta)]',
            )}
          >
            {aba.rotulo}
            {aba.contagem !== undefined ? (
              <span className="ml-2 text-[var(--tamanho-rotulo)] opacity-70">
                {aba.contagem}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
