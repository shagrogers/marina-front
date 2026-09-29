import type { ReactNode } from 'react';

import { cx } from './classe';
import type { ErroApi } from '@/lib/api/cliente';

type Props = {
  /** O erro que veio da API. Se vier, a mensagem é a da API — a doc 1 §3.4
   * escreve a mensagem que diz o que aconteceu, e traduzi-la para "algo deu
   * errado" joga fora a única informação útil. */
  erro?: ErroApi;
  /** Mensagem para quando não há `erro` (falha de rede, por exemplo). */
  mensagem?: string;
  /** `403` de papel mostra o estado "aguardando verificação" em vez de erro. */
  status?: number;
  aoTentarNovamente?: () => void;
  className?: string;
  children?: ReactNode;
};

/**
 * Erro.
 *
 * ## A mensagem da API é mostrada como veio
 *
 * Um 409 da marina diz "Esta lancha já está reservada em parte desse período".
 * Trocar por "Não foi possível concluir" apaga a informação que existia
 * exatamente para a pessoa entender o que fazer. O AGENTS.md é explícito: 409 e
 * 422 trazem mensagem que diz o que conflitou, e ela é mostrada.
 *
 * ## `role="alert"` para o erro que exige ação
 *
 * O leitor de tela anuncia sem que a pessoa precise descobrir que algo mudou. E
 * `assertiva` só no erro: um "carregando" anunciado em assertive interrompe o
 * leitor a cada cinco linhas de esqueleto.
 */
export function Erro({ erro, mensagem, status, aoTentarNovamente, className, children }: Props) {
  const texto = erro?.mensagem ?? mensagem ?? 'Não foi possível carregar agora.';
  const campos = erro?.campos;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cx(
        'flex flex-col gap-3 rounded-[var(--raio)] border border-[var(--erro-contorno)]',
        'bg-[var(--erro-sutil)] px-4 py-3',
        className,
      )}
    >
      <p className="text-[var(--tamanho-corpo)] text-[var(--texto)]">{texto}</p>

      {campos !== undefined && Object.keys(campos).length > 0 ? (
        <ul className="flex flex-col gap-1">
          {Object.entries(campos).map(([campo, problema]) => (
            <li key={campo} className="text-[var(--tamanho-rotulo)] text-[var(--texto-secundario)]">
              <span className="text-[var(--erro)]">{campo}</span>: {problema}
            </li>
          ))}
        </ul>
      ) : null}

      {status !== undefined ? (
        <p className="text-[var(--tamanho-micro)] text-[var(--texto-terciario)]">
          Código {status}
          {erro?.codigo !== undefined ? ` · ${erro.codigo}` : ''}
        </p>
      ) : null}

      {children}

      {aoTentarNovamente !== undefined ? (
        <div>
          <button
            type="button"
            onClick={aoTentarNovamente}
            className="rounded-[var(--raio-sm)] bg-[var(--superficie-alta)] px-3 py-1.5 text-[var(--tamanho-rotulo)] text-[var(--texto)] hover:bg-[var(--superficie-focada)]"
          >
            Tentar de novo
          </button>
        </div>
      ) : null}
    </div>
  );
}
