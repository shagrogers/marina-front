'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Botao } from './Botao';
import { cx } from './classe';

type Props = {
  aberto: boolean;
  aoFechar: () => void;
  titulo: string;
  descricao?: string;
  children: ReactNode;
  /** `tela` ocupa a janela inteira — é o que o wizard de SOS usa. */
  tamanho?: 'janela' | 'tela';
  rodape?: ReactNode;
  /** Quando verdadeiro, fechar é bloqueado (enviando, por exemplo). */
  travado?: boolean;
};

/**
 * Modal.
 *
 * ## Foco preso e `Escape`, porque um modal que não prende o foco é pior que
 * nenhum
 *
 * Sem o foco preso, o Tab leva a pessoa para o conteúdo que está ATRÁS do
 * modal, que continua visível e clicável. O resultado é "a tela está bugada" —
 * e o conserto (Fechar) está a dois cliques, atrás do que não deveria estar
 * clicável.
 *
 * ## `aria-modal` e não só `role="dialog"`
 *
 * `role="dialog"` sozinho não diz ao leitor de tela que o resto da página está
 * inacessível. `aria-modal="true"` é o que faz o leitor anunciar o diálogo
 * como modal e navegar só o que está dentro.
 */
export function Modal({
  aberto,
  aoFechar,
  titulo,
  descricao,
  children,
  tamanho = 'janela',
  rodape,
  travado = false,
}: Props) {
  const caixa = useRef<HTMLDivElement>(null);
  const anterior = useRef<Element | null>(null);

  // Guarda o foco antes de abrir e devolve depois de fechar: quem abriu o modal
  // é quem deve receber o foco de volta, e não o primeiro elemento da página.
  useEffect(() => {
    if (!aberto) {
      return;
    }
    anterior.current = document.activeElement;
    const primeiro = caixa.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    primeiro?.focus();
    return () => {
      if (anterior.current instanceof HTMLElement) {
        anterior.current.focus();
      }
    };
  }, [aberto]);

  useEffect(() => {
    if (!aberto) {
      return;
    }
    const tecla = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape' && !travado) {
        evento.preventDefault();
        aoFechar();
        return;
      }
      if (evento.key !== 'Tab') {
        return;
      }
      const focaveis = caixa.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focaveis === undefined || focaveis.length === 0) {
        return;
      }
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo?.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro?.focus();
      }
    };
    document.addEventListener('keydown', tecla);
    return () => document.removeEventListener('keydown', tecla);
  }, [aberto, aoFechar, travado]);

  // `overflow: hidden` no body: sem isso, o conteúdo atrás rola junto com o
  // modal, e a pessoa perde a noção de onde está.
  useEffect(() => {
    if (!aberto) {
      return;
    }
    const anteriorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = anteriorOverflow;
    };
  }, [aberto]);

  if (!aberto || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fechar"
        onClick={aoFechar}
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
      />
      <div
        ref={caixa}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
        className={cx(
          'relative flex max-h-[92vh] w-full flex-col overflow-hidden',
          'rounded-[var(--raio-xl)] bg-[var(--fundo-elevado)] shadow-[var(--sombra-flutuante)]',
          tamanho === 'tela' ? 'max-w-2xl' : 'max-w-lg',
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-[var(--superficie-alta)] px-6 py-5">
          <div>
            <h2 id="titulo-modal" className="text-[var(--tamanho-titulo)] font-[var(--peso-forte)]">
              {titulo}
            </h2>
            {descricao !== undefined ? (
              <p className="mt-1 text-[var(--tamanho-corpo)] text-[var(--texto-secundario)]">
                {descricao}
              </p>
            ) : null}
          </div>
          <Botao variante="fantasma" tamanho="sm" onClick={aoFechar} disabled={travado} aria-label="Fechar">
            ✕
          </Botao>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {rodape !== undefined ? (
          <footer className="border-t border-[var(--superficie-alta)] px-6 py-4">{rodape}</footer>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
