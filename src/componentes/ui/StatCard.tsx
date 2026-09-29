import type { ReactNode } from 'react';

import { cx } from './classe';

type Props = {
  /** O número grande. String quando a API já mandou formatado ("62,5%"). */
  valor: string | number;
  /** A legenda pequena embaixo — é ela que diz o que o número é. */
  legenda: string;
  /** Contexto opcional, à direita da legenda. */
  detalhe?: string;
  /** Destaque em dourado, para o número que a doc 1 destaca. */
  destaque?: boolean;
  tom?: 'neutro' | 'sos';
  className?: string;
  children?: ReactNode;
};

/**
 * StatCard: número grande de métrica com legenda pequena de contexto embaixo.
 *
 * ## Por que a legenda é obrigatória
 *
 * "127" não quer dizer nada. "127 vagas" quer. A doc 1 §4.7 usa o número grande
 * com a legenda pequena embaixo porque o número é escaneado e a legenda é lida
 * — e a legenda é o que impede a ambiguidade. Por isso `legenda` não tem valor
 * padrão: um StatCard sem legenda não compila.
 *
 * ## Por que o valor é tabular
 *
 * `font-variant-numeric: tabular-nums`: em uma fileira de cartões, números com
 * largura variável fazem a coluna dançar quando um valor muda de 9 para 10. A
 * grade de painel administrativo é feita para comparar, e comparar exige
 * alinhamento.
 */
export function StatCard({
  valor,
  legenda,
  detalhe,
  destaque = false,
  tom = 'neutro',
  className,
  children,
}: Props) {
  return (
    <div
      className={cx(
        'rounded-[var(--raio-lg)] p-5',
        'bg-[var(--superficie)] shadow-[var(--sombra-card)]',
        tom === 'sos' && 'border border-[var(--sos-contorno)]',
        className,
      )}
    >
      <p
        className={cx(
          'metrica',
          destaque
            ? 'text-[var(--dourado)]'
            : tom === 'sos'
              ? 'text-[var(--sos)]'
              : 'text-[var(--texto)]',
        )}
      >
        {valor}
      </p>
      <p className="metrica-legenda mt-2">{legenda}</p>
      {detalhe !== undefined ? (
        <p className="mt-1 text-[var(--tamanho-rotulo)] text-[var(--texto-terciario)]">{detalhe}</p>
      ) : null}
      {children}
    </div>
  );
}
