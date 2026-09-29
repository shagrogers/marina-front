import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { Abas } from '@/componentes/ui/Abas';
import { Botao } from '@/componentes/ui/Botao';
import { Campo, CampoTexto, Selecao } from '@/componentes/ui/Campo';
import { Chip } from '@/componentes/ui/Chip';
import { EstadoVazio, EstadoVazioComAcao } from '@/componentes/ui/EstadoVazio';
import { Erro } from '@/componentes/ui/Erro';
import { Esqueleto, EsqueletoMetrica } from '@/componentes/ui/Esqueleto';
import { ItemDeLista } from '@/componentes/ui/ItemDeLista';
import { RodapeFixo } from '@/componentes/ui/RodapeFixo';
import { StatCard } from '@/componentes/ui/StatCard';
import { Tag } from '@/componentes/ui/Tag';
import { distancia, moedaDeCentavos, percentual } from '@/lib/formatadores';

export const metadata: Metadata = { title: 'Componentes' };

/**
 * Rota de DESENVOLVIMENTO: some em produção.
 *
 * O caminho é `/dev/componentes` e não `/_dev/componentes` porque o App Router
 * ignora pastas com prefixo `_` — a rota simplesmente não existiria, e o
 * catálogo ficaria inalcançável justamente por ter o nome que parecia o certo.
 *
 * A guarda em produção é o que torna isto realmente interna: a tela de
 * componentes é ferramenta de revisão de design, e publicá-la seria uma página
 * com todos os estados e tons da interface, sem função para quem chegou lá.
 */
function naoEhProducao(): boolean {
  return process.env.NODE_ENV !== 'production';
}

/** Bloco de exemplo, com título e a razão de existir. */
function Bloco({
  titulo,
  razao,
  children,
}: {
  titulo: string;
  razao: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3" aria-labelledby={`bloco-${titulo}`}>
      <div>
        <h2 id={`bloco-${titulo}`} className="text-[var(--tamanho-media)] font-[var(--peso-forte)]">
          {titulo}
        </h2>
        <p className="mt-0.5 text-[var(--tamanho-rotulo)] text-[var(--texto-terciario)]">{razao}</p>
      </div>
      {children}
    </section>
  );
}

export default function CatalogoDeComponentes() {
  if (!naoEhProducao()) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-2">
        <p className="rotulo">Rota interna de desenvolvimento</p>
        <h1 className="text-[var(--tamanho-display)] font-[var(--peso-forte)]">
          Catálogo de componentes
        </h1>
        <p className="text-[var(--tamanho-corpo)] text-[var(--texto-secundario)]">
          Revisão do design system da doc 1 §3. Navegue com Tab para conferir o
          foco visível em cada um.
        </p>
      </header>

      <Bloco titulo="Botão" razao="Dourado é a ação primária. Vermelho é só o SOS.">
        <div className="flex flex-wrap items-center gap-3">
          <Botao variante="primario">Cadastrar embarcação</Botao>
          <Botao variante="secundario">Editar</Botao>
          <Botao variante="fantasma">Cancelar</Botao>
          <Botao variante="perigo">Excluir</Botao>
          <Botao variante="sos" tamanho="lg">
            <span aria-hidden="true">⚑</span> Socorro
          </Botao>
          <Botao variante="primario" carregando>
            Salvando
          </Botao>
          <Botao variante="primario" disabled>
            Indisponível
          </Botao>
        </div>
      </Bloco>

      <Bloco titulo="Chip e Tag" razao="Chip é filtro; Tag é estado. A cor carrega o significado.">
        <div className="flex flex-wrap items-center gap-2">
          <Chip ativo>Próximas</Chip>
          <Chip>Aguardando</Chip>
          <Chip>Histórico</Chip>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tag tom="sucesso">Concluída</Tag>
          <Tag tom="alerta">Aguardando marina</Tag>
          <Tag tom="verificada">Verificada</Tag>
          <Tag tom="aceito">Aceito</Tag>
          <Tag tom="sos">SOS em risco</Tag>
          <Tag tom="neutro">Recusada</Tag>
        </div>
      </Bloco>

      <Bloco titulo="StatCard" razao="Número grande com legenda pequena. A legenda é obrigatória.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard valor="127" legenda="Vagas livres" />
          <StatCard valor="46%" legenda="Ocupação" destaque />
          <StatCard valor={percentual(62.5)} legenda="Ocupação média" />
          <StatCard valor="3" legenda="Pedidos aguardando" tom="sos" detalhe="o mais antigo há 2h14" />
        </div>
      </Bloco>

      <Bloco titulo="ItemDeLista" razao="Com href vira link e é alcançável pelo teclado.">
        <div className="flex flex-col gap-2">
          <ItemDeLista
            titulo="Marina da Barra"
            subtitulo="Vila Velha · ES"
            metadado={distancia(4.2)}
            href="/explorar"
          />
          <ItemDeLista
            titulo="Finesse 212"
            subtitulo="2022 · 6,40 m · Mercruiser 200 hp"
            metadado={moedaDeCentavos(98000)}
            ativo
          />
        </div>
      </Bloco>

      <Bloco titulo="Abas" razao="A doc 1 §4.5 usa Próximas, Aguardando e Histórico.">
        <Abas
          rotuloGrupo="Reservas"
          ativa="proximas"
          aoMudar={() => undefined}
          abas={[
            { id: 'proximas', rotulo: 'Próximas', contagem: 2 },
            { id: 'aguardando', rotulo: 'Aguardando', contagem: 1 },
            { id: 'historico', rotulo: 'Histórico' },
          ]}
        />
      </Bloco>

      <Bloco titulo="Campo" razao="Erro usa o token de erro, nunca o vermelho do SOS.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo rotulo="Nome" obrigatorio placeholder="Finesse 212" dica="Como a pessoa chama a lancha" />
          <Campo rotulo="Ano" erro="Ano tem que ser a partir de 1900" defaultValue="1899" />
          <Campo rotulo="E-mail" type="email" defaultValue="marina@exemplo.com" />
          <Selecao rotulo="Tipo" defaultValue="lancha">
            <option value="lancha">Lancha</option>
            <option value="jetski">Jet ski</option>
            <option value="iate">Iate</option>
          </Selecao>
          <CampoTexto
            rotulo="Descrição"
            className="sm:col-span-2"
            placeholder="O que a pessoa precisa saber antes de alugar"
          />
        </div>
      </Bloco>

      <Bloco titulo="Esqueleto" razao="Reserva o espaço do conteúdo, sem salto de layout.">
        <div className="grid gap-4 sm:grid-cols-3">
          <EsqueletoMetrica />
          <EsqueletoMetrica />
          <div className="rounded-[var(--raio-lg)] bg-[var(--superficie)] p-5">
            <Esqueleto linhas={2} altura="h-5" />
          </div>
        </div>
      </Bloco>

      <Bloco titulo="Vazio e erro" razao="Vazio sempre tem saída. Erro mostra a mensagem da API.">
        <EstadoVazio
          titulo="Nenhuma embarcação ainda"
          descricao="Cadastre a primeira para pedir vaga de marina e alugar por diária."
        />
        <EstadoVazioComAcao
          titulo="Sem chamados"
          descricao="Você ainda não foi avisado de nenhum chamado na sua área."
          rotuloAcao="Ver minha área"
        />
        <Erro
          status={409}
          erro={{
            codigo: 'conflito',
            mensagem: 'Esta lancha já está reservada em parte desse período.',
          }}
        />
      </Bloco>

      <Bloco titulo="Rodapé fixo" razao="Reserva a área da barra de gestos no iPhone.">
        <div className="rounded-[var(--raio-lg)] border border-[var(--superficie-alta)]">
          <RodapeFixo rotulo="Ações da tela">
            <div className="flex gap-3">
              <Botao variante="primario" larguraTotal>
                Confirmar
              </Botao>
            </div>
          </RodapeFixo>
        </div>
      </Bloco>
    </main>
  );
}
