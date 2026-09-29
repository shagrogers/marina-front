import Link from 'next/link';

import { Chip } from '@/componentes/ui/Chip';
import { Tag } from '@/componentes/ui/Tag';

/**
 * Raiz pública.
 *
 * ## Por que esta tela é mínima, e não uma landing page
 *
 * A doc 1 §2 tem o site institucional como Fase 5, e o enunciado deste turno é
 * "as telas cujo backend já está completo". Uma home com texto de marketing
 * seria dado de exibição que não vem da API — exatamente o que o AGENTS.md
 * proíbe.
 *
 * O que esta tela faz é o mínimo honesto: dizer o que existe hoje e linkar para
 * o catálogo de componentes, que é a ferramenta de revisão do design system.
 */
export default function Inicio() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-8 px-6 py-16">
      <header className="flex flex-col gap-3">
        <p className="rotulo">Plataforma náutica</p>
        <h1 className="text-[var(--tamanho-display)] font-[var(--peso-forte)] tracking-[var(--tracking-apertado)]">
          BOATS
        </h1>
        <p className="text-[var(--tamanho-media)] text-[var(--texto-secundario)]">
          Fundação do front. O contrato é o OpenAPI da API, e nada aqui é dado
          escrito à mão.
        </p>
      </header>

      <section className="flex flex-col gap-3" aria-labelledby="o-que-existe">
        <h2 id="o-que-existe" className="rotulo">
          O que existe
        </h2>
        <ul className="flex flex-col gap-2">
          <li className="rounded-[var(--raio)] bg-[var(--superficie)] px-4 py-3">
            Cliente de API tipado, gerado do contrato
          </li>
          <li className="rounded-[var(--raio)] bg-[var(--superficie)] px-4 py-3">
            Tokens do design system da doc 1 §3
          </li>
          <li className="rounded-[var(--raio)] bg-[var(--superficie)] px-4 py-3">
            Componentes base com foco visível
          </li>
          <li className="rounded-[var(--raio)] bg-[var(--superficie)] px-4 py-3">
            Proxy same-origin: o navegador não fala com a API
          </li>
        </ul>
      </section>

      <section className="flex flex-wrap items-center gap-3" aria-labelledby="cores">
        <h2 id="cores" className="rotulo w-full">
          As três cores com significado
        </h2>
        <Chip ativo>Dourado: ação primária</Chip>
        <Tag tom="verificada">Lilás: verificado</Tag>
        <Tag tom="sos">Vermelho: só SOS</Tag>
        <Tag tom="neutro">Erro tem cor própria</Tag>
      </section>

      <nav aria-label="Ferramentas de desenvolvimento" className="flex flex-wrap gap-3">
        <Link
          href="/dev/componentes"
          className="rounded-[var(--raio)] bg-[var(--dourado)] px-4 py-2.5 text-[var(--tamanho-corpo)] text-[var(--dourado-texto)]"
        >
          Ver o catálogo de componentes
        </Link>
        <Link
          href="/dev/componentes"
          className="rounded-[var(--raio)] bg-[var(--superficie)] px-4 py-2.5 text-[var(--tamanho-corpo)] text-[var(--texto-secundario)]"
        >
          Design system
        </Link>
      </nav>
    </main>
  );
}
