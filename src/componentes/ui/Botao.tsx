'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cx } from './classe';

/**
 * Aparência do botão.
 *
 * `sos` é separado dos outros de propósito, e não é "vermelho": ele tem
 * halo, pulso e é o ÚNICO botão que usa o token `--sos`. Um `perigo` genérico
 * reusable acabaria sendo usado em "excluir embarcação", e o vermelho de
 * emergência deixaria de significar emergência.
 */
export type VarianteBotao = 'primario' | 'secundario' | 'fantasma' | 'perigo' | 'sos';

export type TamanhoBotao = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: VarianteBotao;
  tamanho?: TamanhoBotao;
  larguraTotal?: boolean;
  carregando?: boolean;
  children: ReactNode;
};

const VARIANTES: Record<VarianteBotao, string> = {
  // Dourado é a ação primária. Texto escuro sobre dourado: o dourado é claro
  // demais para texto branco, e branco sobre dourado falha contraste.
  primario:
    'bg-[var(--dourado)] text-[var(--dourado-texto)] hover:bg-[var(--dourado-forte)] active:translate-y-px',
  secundario:
    'bg-[var(--superficie-alta)] text-[var(--texto)] hover:bg-[var(--superficie-focada)] border border-[var(--dourado-contorno)]',
  fantasma:
    'bg-transparent text-[var(--texto-secundario)] hover:bg-[var(--superficie)] hover:text-[var(--texto)]',
  // Erro de formulário e ação destrutiva. Vermelho frio, o MESMO token que o
  // campo de erro usa: quem digitou algo errado e quem está apagando algo vêem a
  // mesma cor, e ela não é a do SOS.
  perigo: 'bg-[var(--erro-sutil)] text-[var(--erro)] border border-[var(--erro-contorno)] hover:bg-[var(--erro)] hover:text-[var(--texto-invertido)]',
  // O botão de Socorro. Texto, nunca só ícone: "Socorro" em vermelho é lido antes
  // de o dedo tocar, e é essa leitura que decide se a pessoa toca.
  sos: 'bg-[var(--sos)] text-[var(--sos-texto)] font-[var(--peso-forte)] hover:bg-[var(--sos-forte)]',
};

const TAMANHOS: Record<TamanhoBotao, string> = {
  sm: 'px-3 py-1.5 text-[var(--tamanho-rotulo)]',
  md: 'px-4 py-2.5 text-[var(--tamanho-corpo)]',
  lg: 'px-6 py-3.5 text-[var(--tamanho-media)]',
};

/**
 * Botão.
 *
 * ## `type="button"` como padrão
 *
 * Todo `<button>` sem `type` é `submit` dentro de um `<form>`. Um botão de
 * "Salvar" que também dispara "Cancelar" é o bug de formulário mais comum que
 * existe, e o tipo explícito elimina a classe inteira.
 */
export function Botao({
  variante = 'secundario',
  tamanho = 'md',
  larguraTotal = false,
  carregando = false,
  className,
  children,
  ...resto
}: Props) {
  return (
    <button
      {...resto}
      type={resto.type ?? 'button'}
      disabled={resto.disabled === true || carregando}
      aria-busy={carregando || undefined}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-[var(--raio)]',
        'transition-[background-color,transform] duration-[var(--duracao)] ease-[var(--curva)]',
        'disabled:cursor-not-allowed disabled:opacity-45',
        VARIANTES[variante],
        TAMANHOS[tamanho],
        larguraTotal && 'w-full',
        className,
      )}
    >
      {carregando ? <Carregando /> : null}
      {children}
    </button>
  );
}

/**
 * O indicador de carregamento é um texto "…" e não um spinner.
 *
 * Um spinner é animação pura: quem tem `prefers-reduced-motion` ligado não vê
 * nenhuma diferença entre carregando e carregado. O reticências é texto, e some
 * com o movimento.
 */
function Carregando() {
  return (
    <span aria-hidden="true" className="text-[var(--tamanho-media)] leading-none">
      …
    </span>
  );
}
