import Link from 'next/link';
import type { ReactNode } from 'react';

import { cx } from './classe';

type Props = {
  titulo: string;
  /** Linha de especificação: "2022 · 6,40 m · Mercruiser 200 hp". */
  subtitulo?: string;
  /** Distância, preço, tempo — o que a doc 1 põe à direita. */
  metadado?: ReactNode;
  /** `true` quando o item está selecionado; dourado marca a linha. */
  ativo?: boolean;
  href?: string;
  className?: string;
};

/**
 * ItemDeLista: a linha de resultado.
 *
 * ## `href` decide se é link ou não
 *
 * Com `href`, vira `<Link>` e é focável, navegável e aparece no histórico do
 * teclado. Sem, vira `<div>` e NÃO é focável — porque um `<div role="button">`
 * sem `onKeyDown` é um botão que o teclado não alcança, e a doc 1 §3.4 pede que
 * a tela funcione para quem navega por teclado.
 */
export function ItemDeLista({
  titulo,
  subtitulo,
  metadado,
  ativo = false,
  href,
  className,
}: Props) {
  const conteudo = (
    <>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[var(--tamanho-media)] font-[var(--peso-medio)] text-[var(--texto)]">
          {titulo}
        </p>
        {subtitulo !== undefined ? (
          <p className="mt-0.5 truncate text-[var(--tamanho-rotulo)] text-[var(--texto-terciario)]">
            {subtitulo}
          </p>
        ) : null}
      </div>
      {metadado !== undefined ? (
        <div className="shrink-0 text-right text-[var(--tamanho-corpo)] text-[var(--texto-secundario)]">
          {metadado}
        </div>
      ) : null}
    </>
  );

  const aparencia = cx(
    'flex items-center gap-4 rounded-[var(--raio)] p-4',
    'transition-colors duration-[var(--duracao)]',
    ativo ? 'bg-[var(--dourado-sutil)]' : 'bg-[var(--superficie)]',
    'hover:bg-[var(--superficie-alta)]',
    className,
  );

  if (href !== undefined) {
    return (
      <Link href={href} className={aparencia}>
        {conteudo}
      </Link>
    );
  }

  return <div className={aparencia}>{conteudo}</div>;
}
