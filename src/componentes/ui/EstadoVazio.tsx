'use client';

import type { ReactNode } from 'react';

import { Botao } from './Botao';
import { cx } from './classe';

type Props = {
  titulo: string;
  descricao: string;
  children?: ReactNode;
  className?: string;
};

/**
 * EstadoVazio.
 *
 * ## Por que sempre tem ação
 *
 * Tela vazia sem saída é beco sem saída. A doc 1 §3.4 pede microcopy que ajude:
 * "você ainda não tem embarcações" com um botão "Cadastrar a primeira" é
 * diferente de "nenhum resultado", que não diz de quem é a falta.
 *
 * E o `title` importa: um estado vazio sem título é lido pelo leitor de tela
 * como "vazio", sem contexto.
 */
export function EstadoVazio({ titulo, descricao, children, className }: Props) {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center gap-3 rounded-[var(--raio-lg)]',
        'border border-dashed border-[var(--superficie-alta)] bg-[var(--superficie)]',
        'px-6 py-12 text-center',
        className,
      )}
    >
      <p className="text-[var(--tamanho-media)] font-[var(--peso-medio)] text-[var(--texto)]">
        {titulo}
      </p>
      <p className="max-w-md text-[var(--tamanho-corpo)] text-[var(--texto-secundario)]">
        {descricao}
      </p>
      {children !== undefined ? <div className="mt-2">{children}</div> : null}
    </div>
  );
}

type PropsAcao = {
  titulo: string;
  descricao: string;
  rotuloAcao?: string;
  aoClicar?: () => void;
  href?: string;
};

/** Estado vazio com uma ação, que é o caso comum. */
export function EstadoVazioComAcao({
  titulo,
  descricao,
  rotuloAcao,
  aoClicar,
  href,
}: PropsAcao) {
  if (rotuloAcao === undefined) {
    return <EstadoVazio titulo={titulo} descricao={descricao} />;
  }
  if (href !== undefined) {
    return (
      <EstadoVazio titulo={titulo} descricao={descricao}>
        <a href={href}>
          <Botao variante="primario">{rotuloAcao}</Botao>
        </a>
      </EstadoVazio>
    );
  }
  return (
    <EstadoVazio titulo={titulo} descricao={descricao}>
      <Botao variante="primario" onClick={aoClicar}>
        {rotuloAcao}
      </Botao>
    </EstadoVazio>
  );
}
