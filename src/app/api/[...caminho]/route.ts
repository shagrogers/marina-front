import { NextResponse } from 'next/server';

import { baseInterna } from '@/lib/api/destino';

export const dynamic = 'force-dynamic';

/**
 * Proxy same-origin: `/api/v1/*` -> API.
 *
 * ## Por que route handler e não `rewrites`
 *
 * `rewrites` reescreve o caminho e deixa o Next responder, o que funciona para
 * GET e falha para POST com corpo — o corpo chega ao handler de rewrite já
 * consumido, e a API recebe requisição vazia. Com route handler eu tenho o
 * `Request` cru, o corpo intacto, e controlo o que volta (ver `renovar-token.ts`).
 *
 * ## Por que o corpo NÃO é reescrito
 *
 * O envelope da API é `{ dados, erro, meta }` e o runtime também é. A única
 * exceção, documentada no README, é o prefixo `data` que o `swag` escreve no
 * OpenAPI — o runtime não tem esse campo. Reescrever o envelope aqui esconderia
 * uma lacuna de contrato em vez de apontá-la.
 */
export async function proxy(
  pedido: Request,
  contexto: { params: Promise<{ caminho: string[] }> },
): Promise<Response> {
  const { caminho } = await contexto.params;
  const url = new URL(pedido.url);

  // `caminho` JÁ vem com o `v1`: a rota é `/api/[...caminho]`, então uma
  // chamada a `/api/v1/auth/eu` entrega `['v1', 'auth', 'eu']`.
  //
  // O destino então é `/api` + o caminho, e NÃO `/api/v1` + o caminho: este
  // último produz `/api/v1/v1/auth/eu`, que a API responde 404, e o sintoma
  // aparece como "o front não acha nenhuma rota".
  const destino = `${baseInterna()}/api/${caminho.join('/')}${url.search}`;

  // Os cookies de sessão vão no CABEÇALHO, porque é assim que a API os lê.
  // Encaminhar tudo indiscriminado (authorization, host, cookies) seria mandar
  // credenciais de terceiros que o proxy não deveria ver.
  const cabecalhos = new Headers();
  for (const nome of ['authorization', 'cookie', 'content-type', 'accept']) {
    const valor = pedido.headers.get(nome);
    if (valor !== null) {
      cabecalhos.set(nome, valor);
    }
  }

  const metodo = pedido.method;
  const semCorpo = metodo === 'GET' || metodo === 'HEAD';

  let resposta: Response;
  try {
    resposta = await fetch(destino, {
      method: metodo,
      headers: cabecalhos,
      body: semCorpo ? undefined : await pedido.text(),
      // O token vive em cookie httpOnly, e `forward: 'manual'` impede o Next de
      // resolver o cookie no servidor. Ele precisa chegar CRU para a API, que é
      // quem valida assinatura e expiração.
      redirect: 'manual',
      cache: 'no-store',
    });
  } catch (erro) {
    // A API fora do ar é um caso que a tela precisa distinguir de "a API
    // respondeu 500": uma é transitória, a outra é bug. O envelope de erro aqui
    // segue o MESMO formato da API, para o mesmo formatador da tela consumir
    // os dois sem saber de onde veio.
    //
    // A causa vai para o log do servidor: um 503 sem registro de por quê vira
    // uma fila de "não funciona" sem causa, que é o tipo de chamado de suporte
    // que ninguém consegue resolver.
    console.error(
      `[proxy] falha ao falar com a API em ${destino}: ${erro instanceof Error ? erro.message : String(erro)}`,
    );
    return NextResponse.json(
      {
        dados: null,
        erro: {
          codigo: 'servico_indisponivel',
          mensagem: 'Não conseguimos falar com a plataforma agora. Tente de novo em instantes.',
        },
      },
      { status: 503 },
    );
  }

  const saida = new Headers();
  for (const nome of ['content-type', 'x-request-id']) {
    const valor = resposta.headers.get(nome);
    if (valor !== null) {
      saida.set(nome, valor);
    }
  }
  // `Set-Cookie` da API (login, renovar, sair) precisa atravessar o proxy, senão
  // o cookie nunca chega ao navegador.
  const cookie = resposta.headers.get('set-cookie');
  if (cookie !== null) {
    saida.set('set-cookie', cookie);
  }
  saida.set('Cache-Control', 'no-store');

  return new NextResponse(resposta.body, {
    status: resposta.status,
    statusText: resposta.statusText,
    headers: saida,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
