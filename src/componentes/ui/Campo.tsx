'use client';

import { useId } from 'react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

import { cx } from './classe';

type BaseProps = {
  rotulo: string;
  /** Dica abaixo do campo. some quando há erro, para não haver dois textos. */
  dica?: string;
  /** Mensagem de erro. Usa `--erro`, NUNCA `--sos`: erro de formulário não é
   * emergência, e pintar de vermelho de socorro faz a pessoa achar que a
   * plataforma está em risco. */
  erro?: string;
  obrigatorio?: boolean;
  className?: string;
};

const CONTROLE =
  'w-full rounded-[var(--raio)] bg-[var(--superficie)] px-4 py-3 ' +
  'text-[var(--tamanho-corpo)] text-[var(--texto)] placeholder:text-[var(--texto-terciario)] ' +
  'border transition-colors duration-[var(--duracao)]';

function Involucro({
  id,
  rotulo,
  dica,
  erro,
  obrigatorio,
  className,
  children,
  descritoPor,
}: BaseProps & { id: string; children: ReactNode; descritoPor?: string }) {
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="rotulo">
        {rotulo}
        {obrigatorio === true ? (
          <span aria-hidden="true" className="ml-1 text-[var(--erro)]">
            *
          </span>
        ) : null}
      </label>
      {children}
      {erro !== undefined ? (
        <p id={`${id}-erro`} className="text-[var(--tamanho-rotulo)] text-[var(--erro)]">
          {erro}
        </p>
      ) : dica !== undefined ? (
        <p id={descritoPor} className="text-[var(--tamanho-rotulo)] text-[var(--texto-terciario)]">
          {dica}
        </p>
      ) : null}
    </div>
  );
}

function borda(erro: string | undefined) {
  return erro !== undefined
    ? 'border-[var(--erro-contorno)] focus:border-[var(--erro)]'
    : 'border-[var(--superficie-alta)] focus:border-[var(--dourado)]';
}

type PropsCampo = BaseProps & InputHTMLAttributes<HTMLInputElement>;

export function Campo({ rotulo, dica, erro, obrigatorio, className, id: forcado, ...resto }: PropsCampo) {
  const gerado = useId();
  const id = forcado ?? gerado;
  const descritoPor = dica !== undefined && erro === undefined ? `${id}-dica` : undefined;
  const invalido = erro !== undefined;

  return (
    <Involucro
      id={id}
      rotulo={rotulo}
      dica={dica}
      erro={erro}
      obrigatorio={obrigatorio}
      className={className}
      descritoPor={descritoPor}
    >
      <input
        {...resto}
        id={id}
        required={obrigatorio === true}
        aria-invalid={invalido || undefined}
        aria-describedby={erro !== undefined ? `${id}-erro` : descritoPor}
        className={cx(CONTROLE, borda(erro))}
      />
    </Involucro>
  );
}

type PropsArea = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function CampoTexto({ rotulo, dica, erro, obrigatorio, className, id: forcado, ...resto }: PropsArea) {
  const gerado = useId();
  const id = forcado ?? gerado;

  return (
    <Involucro id={id} rotulo={rotulo} dica={dica} erro={erro} obrigatorio={obrigatorio} className={className}>
      <textarea
        {...resto}
        id={id}
        required={obrigatorio === true}
        aria-invalid={erro !== undefined || undefined}
        aria-describedby={erro !== undefined ? `${id}-erro` : undefined}
        className={cx(CONTROLE, borda(erro), 'min-h-24 resize-y')}
      />
    </Involucro>
  );
}

type PropsSelecao = BaseProps & SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Seleção.
 *
 * A seta do `<select>` nativo é cinza-claro no escuro do navegador e some em
 * parte dos sistemas. O `appearance-none` + seta em SVG é o que garante que o
 * campo continue legível em Windows, que é onde este projeto roda.
 */
export function Selecao({
  rotulo,
  dica,
  erro,
  obrigatorio,
  className,
  id: forcado,
  children,
  ...resto
}: PropsSelecao) {
  const gerado = useId();
  const id = forcado ?? gerado;

  return (
    <Involucro id={id} rotulo={rotulo} dica={dica} erro={erro} obrigatorio={obrigatorio} className={className}>
      <div className="relative">
        <select
          {...resto}
          id={id}
          required={obrigatorio === true}
          aria-invalid={erro !== undefined || undefined}
          aria-describedby={erro !== undefined ? `${id}-erro` : undefined}
          className={cx(CONTROLE, borda(erro), 'appearance-none pr-10')}
        >
          {children}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--texto-terciario)]"
        >
          <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </div>
    </Involucro>
  );
}
