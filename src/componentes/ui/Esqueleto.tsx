import type { ReactNode } from 'react';

/**
 * Esqueleto de carregamento.
 *
 * ## Por que um retângulo cinza e não um spinner
 *
 * Spinner diz "algo está carregando". Esqueleto diz "a lista está carregando" e
 * reserva o espaço que o conteúdo vai ocupar — o que evita o salto de layout
 * quando os dados chegam, e o salto é o que faz a tela parecer lenta mesmo
 * carregando rápido.
 *
 * A animação de opacidade respeita `prefers-reduced-motion`: quem pediu menos
 * movimento vê um retângulo estático, e continua sabendo que carrega.
 */
type Props = {
  linhas?: number;
  className?: string;
  /** Altura de cada linha. */
  altura?: string;
};

export function Esqueleto({ linhas = 3, className, altura = 'h-14' }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={className ?? 'flex flex-col gap-2'}
    >
      <span className="sr-only">Carregando…</span>
      {Array.from({ length: linhas }, (_, indice) => (
        <div
          key={indice}
          className={`esqueleto w-full ${altura}`}
          style={{ animationDelay: `${indice * 120}ms` }}
        />
      ))}
    </div>
  );
}

/** Esqueleto de uma métrica: quadrado menor, com a legenda já no lugar. */
export function EsqueletoMetrica() {
  return (
    <div className="rounded-[var(--raio-lg)] bg-[var(--superficie)] p-5" role="status" aria-busy="true">
      <span className="sr-only">Carregando…</span>
      <div className="esqueleto h-9 w-24" />
      <div className="esqueleto mt-3 h-3 w-28" />
    </div>
  );
}

/**
 * Esqueleto de página inteira.
 *
 * Existe porque a Home do proprietário e o painel da marina carregam a estrutura
 * antes dos números, e mostrar "carregando" no lugar do layout faz a página
 * parecer quebrada antes de parecer rápida.
 */
export function EsqueletoPagina({ children }: { children?: ReactNode }) {
  return <div className="flex flex-col gap-6">{children ?? <Esqueleto linhas={4} />}</div>;
}
