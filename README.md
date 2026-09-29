# BOATS — web

Front-end da plataforma: site público e os quatro painéis autenticados
(proprietário, marina, prestador e administração).

**A base está pronta.** Tokens do design system, componentes base, cliente de API
tipado gerado do contrato, proxy same-origin e container. As telas autenticadas
entram nas etapas seguintes.

## Como rodar

### Com o Compose (recomendado)

```bash
docker compose up --build
```

Sobe api, worker, web, postgres e rabbitmq. O web fica em
<http://localhost:3000> e fala com a API pelo proxy interno — o navegador nunca
vê `http://api:8080`.

### Sem o Compose

```bash
cp .env.example .env.local
npm install
npm run dev
```

O `.env.local` aponta `API_INTERNA` para `http://localhost:8080`, e a API
precisa estar de pé em outra janela (`docker compose up api postgres rabbitmq`).

## Verificação

```bash
npm run verificar
```

Roda, em ordem: `api:verificar`, `typecheck`, `lint`, `teste` e `build`. Tudo
precisa estar verde.

| Script | O que faz |
|---|---|
| `npm run api:gerar` | Gera `src/lib/api/esquema.ts` a partir do OpenAPI da API |
| `npm run api:verificar` | Falha se o gerado divergir do contrato |
| `npm run teste` | Vitest (single-flight, formatadores) |
| `npm run e2e` | Playwright, contra o Compose real |
| `npm run lint` | ESLint, com `no-explicit-any` e `no-empty` como erro |

## O cliente de API é gerado, e o gerado é versionado

Nenhum tipo de resposta é escrito à mão. O caminho é:

```
../boats-api/docs/swagger.json   (a API publica; não se mexe)
        │
        │  swagger2openapi  (Swagger 2.0 -> OpenAPI 3)
        ▼
src/lib/api/contrato.openapi.json  (convertido, versionado)
        │
        │  openapi-typescript
        ▼
src/lib/api/esquema.ts             (os tipos, versionado)
        │
        │  openapi-fetch
        ▼
código das telas
```

`npm run api:verificar` regenera em memória e compara, **sem escrever**. Um
`verify` que altera o repositório é pior do que não verificar: o diff apareceria
junto da mensagem de erro, e a checagem seguinte "passaria" por ter escrito o
que deveria comparar.

## A API nunca é chamada pelo navegador

Tudo passa pelo proxy same-origin em `/api/v1/*`
(`src/app/api/[...caminho]/route.ts`).

Por que não `NEXT_PUBLIC_API_URL`: uma URL com `NEXT_PUBLIC_` é embutida no
bundle, qualquer pessoa lê a topologia interna na aba Network, e o cookie httpOnly
deixa de ser same-origin — que é justamente o que impede CSRF. Mantendo a URL no
servidor, a API não precisa de CORS para a web.

## O refresh single-flight

A API emite refresh token **opaco, com rotação e detecção de reuso por família**.
Duas requisições que tomam 401 juntas e chamam o refresh cada uma:

1. a primeira usa `R1` e recebe `R2`; `R1` fica revogado;
2. a segunda reapresenta o mesmo `R1`, porque o navegador ainda tem o cookie
   antigo;
3. a API reconhece reuso e **revoga a família inteira** — a pessoa é deslogada.

Não é caso raro: uma tela que carrega cinco dados em paralelo com o token
prestes a expirar dispara cinco renovações no mesmo tique. A solução está em
`src/lib/api/refresh-unico.ts` (uma promessa em memória de módulo) e
`testes/refresh-unico.test.ts` prova que 8 chamadas concorrentes viram **1**
renovação, que a promessa é liberada depois de terminar **e** depois de lançar,
e que quem chega depois reaproveita o resultado.

## Design system

Os tokens vivem em `src/app/globals.css` como CSS variables, e nenhum
componente tem hex solto. Os valores saíram por aproximação dos prints da doc 1 §3.

### As três cores com significado

| Cor | Token | Onde |
|---|---|---|
| Dourado / champagne | `--dourado` | Destaque, ação primária, chip ativo, item ativo |
| Lilás | `--lilas` | Verificação, badge "Verificada", tag "Aceito" |
| Vermelho | `--sos` | **Só o eixo SOS**: botão, item do menu, alerta de risco |

Erro de formulário tem cor própria (`--erro`, um vermelho frio e dessaturado).
Pintar "senha incorreta" com o vermelho de emergência faria a pessoa achar que a
plataforma está em risco — e treinaria o dedo a apertar o botão de Socorro onde
não há emergência.

### Superfícies e hierarquia

| Token | Valor | Papel |
|---|---|---|
| `--fundo` | `#0a0a0c` | Quase preto |
| `--fundo-elevado` | `#121216` | Rodapé, modal |
| `--superficie` | `#17171d` | Cartão |
| `--superficie-alta` | `#1f1f27` | Campo, chip inativo |
| `--superficie-focada` | `#26262f` | Hover |

A hierarquia é por **brilho**, não por borda: uma borda de 1px em tudo daria o
mesmo peso a tudo, e a tela viraria uma planilha.

### Tipografia

**Outfit**, via `next/font`. Não Inter, nem Roboto, nem Arial, nem `system`:
a doc 1 §3 é uma tela escura com números grandes e rótulos em caixa alta, o
registro é de instrumento de painel, e Inter/Roboto são fonte de dashboard
corporativo. `system` nunca entra como principal porque muda por SO — a mesma
tela ficaria diferente na máquina de quem projetou e na de quem usa.

- `.rotulo` — caixa alta, tracking `0.11em`: o tom de ficha técnica náutica.
- `.metrica` + `.metrica-legenda` — número grande com legenda pequena embaixo. A
  legenda é obrigatória no `StatCard` (não tem valor padrão): "127" não quer
  dizer nada, "127 vagas" quer.

## Divergências de versão

### Node 24, e não Node 20 como pede a doc 2 §4

A doc 2 pede `node:20-alpine`. O **Node 20 saiu de suporte** (EOL em abril de
2026) e não recebe mais correções de segurança. O front processa cookie de
sessão e resposta de API: rodar em uma runtime sem correção é o pior lugar
possível.

A 24 é a LTS ativa (outubro de 2025) e a primeira que o Next 16 suporta com
estabilidade. O desvio segue o mesmo formato usado quando o Go saiu de 1.23
(EOL) para 1.27.

### Versões

| Pacote | Versão |
|---|---|
| Next.js | 16.3.7 |
| React | 19.3.0 |
| Tailwind CSS | 4.3.3 |
| TypeScript | 5.9.3 |
| openapi-typescript | 7.13.0 |
| openapi-fetch | 0.17.0 |
| Vitest | 5.0.2 |
| Playwright | 1.63.0 |

## Lacunas de contrato

Apontadas agora, com a decisão tomada em cada caso. Corrigir exige mexer no
`boats-api`, e este módulo não altera o back.

### 1. A API publica Swagger 2.0, não OpenAPI 3

O `swag` gera Swagger 2.0, e o `openapi-typescript` só aceita OpenAPI 3
(`Unsupported Swagger version: 2.x`).

**Decisão:** converter com `swagger2openapi` e versionar o resultado em
`src/lib/api/contrato.openapi.json`. Converter preserva a verdade — o tipo
continua vindo do contrato — e mantém a verificação de divergência funcionando.
Escrever tipos à mão perderia a única garantia que importa: web e mobile
consumirem o mesmo contrato.

**Para fechar:** a API precisa passar a emitir OpenAPI 3 (o `swag` tem
`--v3.1`, ou a doc 2 §3.1 precisa ser revisada para dizer Swagger 2).

### 2. O envelope usa `dados`, e o OpenAPI diz `data`

O `swag` escreve as respostas como
`allOf: [Envelope, { properties: { data: ... } }]`, com o prefixo `data`. O
runtime da API devolve `dados`, em português.

**Consequência:** o tipo gerado diz `data` e o runtime manda `dados`. O tipo
`Envelope<T>` em `src/lib/api/cliente.ts` faz `Omit<..., 'dados'>` e declara
`dados?: T`, o que conserta a tipagem sem mexer no gerado e **mantém o tipo
gerado como fonte**.

**Para fechar:** os `@Success` do `swag` precisam de `data` → `dados`.

### 3. Não existe endpoint de sessões ativas

O enunciado diz para mostrar a tela de "sessões ativas" **só se o endpoint
existir** no OpenAPI. Não existe: há `POST /auth/sair-todos`, que revoga a
família, mas nenhuma listagem. A tela não foi construída, e nada foi inventado.

**Para fechar:** `GET /auth/sessoes` na API, com device, ip, criado_em e o que
foi a sessão atual.

### 4. `GET /embarcacoes` não devolve vaga atual nem próxima diária

A Home do proprietário (doc 1 §4.1) mostra a embarcação com a vaga em que está
e a próxima diária. Nenhum DTO tem os dois: `embarcacao.DTO` não tem vaga, e a
ocupação (`marina.DTOOcupacaoVaga`) não sabe a qual embarcação pertence nem vem
no mesmo payload.

**Decisão quando a tela entrar:** cruzar `GET /embarcacoes` com
`GET /marinas/{id}/vagas` + `GET /diarias/meus`, e mostrar só o que o backend
entregar. Nenhum campo inventado.

**Para fechar:** um `GET /embarcacoes/{id}/resumo` com `vaga_atual` e
`proxima_diaria`.

### 5. A tela 4.7 não tem faturamento, e isso é de propósito

O painel da marina omite faturamento e receita porque o módulo financeiro não
existe — a API documenta isso no próprio campo. O front **não** vai inventar
esses números nem mostrá-los como zero.

### 6. "Próxima manutenção" não tem backend

A doc 1 §4.1 mostra o bloco de próxima manutenção. Não há tabela, rota nem tipo
para isso. A tela vai **omitir** o bloco, e a lacuna fica registrada.

## Estrutura

```
src/
  app/
    layout.tsx              fonte, metadata, ProvedorSessao
    page.tsx                raiz pública
    globals.css             TOKENS do design system
    tailwind.css            Tailwind + utilitários compostos
    api/[...caminho]/       PROXY same-origin
    dev/componentes/        catálogo do design system (some em produção)
  componentes/
    ui/                     Botao, Chip, Tag, StatCard, ItemDeLista, Abas,
                            RodapeFixo, Modal, Campo, EstadoVazio, Esqueleto, Erro
    shell/                  TabBar, Flutuante, BotaoSocorro
  lib/
    api/                    cliente, cookies, destino, refresh-unico, pedir
    sessao/                 ProvedorSessao, tipos de papel
    formatadores.ts         moeda, data, número, distância
scripts/
  gerar-cliente.mjs         Swagger 2.0 -> OpenAPI 3 -> tipos
  verificar-cliente.mjs     falha se o gerado divergir
testes/                     Vitest
e2e/                        Playwright
```

## O botão de Socorro

Flutua em **todas** as telas autenticadas, e o ícone também fica no cabeçalho
(etapa 3). Tem **texto**, não só ícone: quem está com o motor pifado e o dedo
molhado precisa ler "SOCORRO" antes de tocar, e o ícone não garante isso.

A pulsação é a única animação do sistema, e existe porque o botão precisa ser
reconhecido em 200 ms numa tela cheia de informação. Ela respeita
`prefers-reduced-motion`.

## O que a próxima etapa faz

Auth: cadastro, login, logout, guarda de rota, sessão em cookie, renovação
single-flight ligada ao `fetch`, e a tela de sessões ativas **se** o endpoint
existir (hoje não existe — lacuna 3).
