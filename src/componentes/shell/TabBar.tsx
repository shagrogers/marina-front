'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { cx } from '../ui/classe';

type Item = {
  rotulo: string;
  href: string;
  /** Ícone em glifo. Desenhado em texto para não carregar biblioteca de ícones
   * por um menu de cinco entradas — e glifo é legível por leitor de tela
   * quando o `aria-hidden` está no SVG. */
  icone: string;
};

/**
 * A tab bar do mobile web: Início, Explorar, Reservas, Marina, Perfil.
 *
 * ## Por que os mesmos cinco para toda persona
 *
 * A doc 1 §2 é explícita: a personalização acontece no CONTEÚDO da Home, não na
 * estrutura de navegação. Uma barra que muda de tamanho conforme o papel obriga
 * quem tem dois papéis a procurar o mesmo destino em lugares diferentes — e a
 * pessoa que acabou de ganhar o papel de marina não sabe onde a aba nova
 * apareceu.
 */
const ITENS: Item[] = [
  { rotulo: 'Início', href: '/', icone: '⌂' },
  { rotulo: 'Explorar', href: '/explorar', icone: '◈' },
  { rotulo: 'Reservas', href: '/reservas', icone: '☰' },
  { rotulo: 'Marina', href: '/marina', icone: '⚓' },
  { rotulo: 'Perfil', href: '/perfil', icone: '◍' },
];

export function TabBar() {
  const caminho = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--superficie-alta)] bg-[var(--fundo-elevado)]/95 backdrop-blur-md md:hidden"
    >
      <ul
        className={cx(
          'grid grid-cols-5',
          'pb-[env(safe-area-inset-bottom)]',
        )}
      >
        {ITENS.map((item) => {
          const ativo =
            item.href === '/' ? caminho === '/' : (caminho ?? '').startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={ativo ? 'page' : undefined}
                className={cx(
                  'flex flex-col items-center gap-0.5 py-2.5',
                  'text-[var(--tamanho-micro)] uppercase tracking-[var(--tracking-rotulo)]',
                  ativo ? 'text-[var(--dourado)]' : 'text-[var(--texto-terciario)]',
                )}
              >
                <span aria-hidden="true" className="text-[var(--tamanho-media)] leading-none">
                  {item.icone}
                </span>
                {item.rotulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type PropsFlutuante = {
  children: ReactNode;
  /** Desloca o botão para cima da tab bar. `false` em telas sem navegação. */
  acimaDaTabBar?: boolean;
};

/**
 * Botão flutuante: o container que o botão de Socorro flutua dentro.
 *
 * Fica separado do botão porque o botão é do eixo SOS e este é genérico — e
 * misturar os dois faria o `z-index` do botão de navegação competir com o de
 * uma emergência.
 */
export function Flutuante({ children, acimaDaTabBar = true }: PropsFlutuante) {
  return (
    <div
      className={cx(
        'pointer-events-none fixed inset-x-0 z-40 flex justify-center',
        acimaDaTabBar ? 'bottom-[calc(72px+env(safe-area-inset-bottom))]' : 'bottom-6',
        'md:bottom-8',
      )}
    >
      <div className="pointer-events-auto">{children}</div>
    </div>
  );
}
