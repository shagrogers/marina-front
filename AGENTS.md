# AGENTS.md — boats-web

Regras deste módulo. Vale o que está no `AGENTS.md` da raiz quando existir; aqui
estão as específicas do front.

## Verdade do contrato

- O OpenAPI é o contrato: `../boats-api/docs/swagger.json`.
- **Nenhum tipo de resposta escrito à mão.** Tudo vem de
  `src/lib/api/esquema.ts`, gerado por `npm run api:gerar`.
- `npm run api:verificar` falha se o gerado divergir do OpenAPI. Ele roda no
  `npm run verificar` e no CI.
- Faltou campo no contrato? **Anota como lacuna no README** e segue sem o
  recurso. Não invente resposta, não contorne com mock, não edite o
  `boats-api`.
- Dado de exibição vem da API sempre. Mock em produção é proibido; teste pode
  usar mock **no teste**, nunca no caminho de código.

## Erro

- **Sem catch amplo.** Sem `catch {}` que engole, sem `.catch(() => null)`.
- **Sem fallback que esconda erro de API.** Se a chamada falhou, a tela mostra
  a falha. 409 e 422 trazem mensagem que diz o que conflitou — mostre-a, não
  traduza para "algo deu errado".
- Erro de formulário é **outro token** que vermelho de SOS. Vermelho é eixo SOS
  e nada mais.

## Autenticação

- Access e refresh em **cookie httpOnly**. Nunca `localStorage`, nunca
  `sessionStorage`, nunca variável de módulo.
- **Single-flight de refresh é obrigatório.** Duas requisições que tomam 401
  juntas e chamam o refresh cada uma: a segunda reapresenta um refresh já
  rotacionado, a API revoga a FAMÍLIA inteira e desloga o usuário. Existe
  teste que dispara N concorrentes e prova 1 refresh e 0 logouts.
- O navegador **nunca** fala direto com a API. Tudo passa pelo proxy
  same-origin `/api/v1/*`.
- Server Component não grava cookie. Renovação acontece no middleware ou em
  route handler.

## Tokens

- **Nenhum hex solto em componente.** Cor, raio, espaçamento, sombra e tipografia
  saem das CSS variables em `src/app/globals.css`.
- Token novo entra no `globals.css` **e** no README. Token sem documentar é
  token que ninguém sabe quando mudar.

## SOS

- **Risco de vida não existe no contrato e não entra no front.** A etapa 3 do
  wizard redireciona para o 190 e **nada** é enviado à API nem persistido — nem
  em `localStorage`, nem em estado salvo, nem em cookie. Existe teste que
  dispara o fluxo inteiro e prova zero requisições a `/sos`.
- Rascunho do wizard vive **só em memória do client**.

## Antes de dizer que terminou

```
npm run api:verificar && npm run typecheck && npm run lint && npm run teste && npm run build
```

Tudo verde. Um commit por etapa, sem `amend`. Não reverta mudança que não é
sua.
