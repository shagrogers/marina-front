import criar from 'openapi-fetch';

import type { paths } from './esquema';
import { baseInterna } from './destino';

/**
 * O envelope da API, e o tipo de erro que ela devolve.
 *
 * ## A PROMISSÃO `dados` É CONDICIONAL, e isso é uma lacuna do contrato
 *
 * O `swag` escreve as respostas como `allOf: [Envelope, { properties: { data: ... } }]`
 * — com o prefixo `data`, em inglês. O runtime da API usa `dados`, em
 * português, em `resposta.Envelope`.
 *
 * A consequence prática: o tipo gerado diz `data`, e o runtime manda `dados`.
 * Sem este `Omit`, o TypeScript exigiria um `data` que nunca chega. Com ele, o
 * tipo gerado continua sendo a fonte, e a correção fica explícita e num lugar
 * só — em vez de o payload virar `any` espalhado por todas as telas.
 *
 * A lacuna está registrada no README. Corrigir exige mexer no `boats-api`, e este
 * turno não altera o back.
 */
export type Envelope<T> = Omit<Extract<T, { dados?: unknown }>, 'dados'> & {
  dados?: T;
};

export type ErroApi = {
  codigo: string;
  mensagem: string;
  campos?: Record<string, string>;
};

export type Meta = {
  total?: number;
  pagina?: number;
  por_pagina?: number;
  total_paginas?: number;
  request_id?: string;
};

type Cliente = ReturnType<typeof criar<paths>>;

/** Constrói o cliente, apontado para o proxy same-origin. */
export function criarCliente(): Cliente {
  // `baseUrl` relativo: o fetch do browser resolve contra a origem atual, e o
  // proxy do servidor reescreve para a API. Um fetch no servidor precisa de
  // baseUrl absoluta — ver `criarClienteServidor`.
  return criar<paths>({
    baseUrl: '/api/v1',
    credentials: 'include',
  });
}

/**
 * Cliente para uso NO SERVIDOR (Server Component, route handler).
 *
 * `baseUrl` é absoluto porque `fetch` no servidor não tem origem. E o cookie
 * precisa ser repassado à mão: o servidor não tem cookie da requisição, ele tem
 * o objeto `cookies()`, e quem decide o que vai para a API é quem chama.
 */
export function criarClienteServidor(cookie?: string): Cliente {
  const cabecalhos: Record<string, string> = {};
  if (cookie !== undefined && cookie !== '') {
    cabecalhos.cookie = cookie;
  }
  return criar<paths>({
    baseUrl: `${baseInterna()}/api/v1`,
    credentials: 'include',
    headers: cabecalhos,
  });
}

/**
 * A EXCEÇÃO que permite o refresh single-flight.
 *
 * `openapi-fetch` não sabe que 401 numa resposta significa "renove e repita".
 * Sem esta exceção ele entrega o erro e o chamador decide — e o chamador
 *könnte errar.
 *
 * A exceção carrega o `Response` original, não o corpo já lido: é o Response
 * que tem o `Set-Cookie` do token novo, e é ele que precisa atravessar o proxy.
 */
export class NaoAutenticado extends Error {
  readonly resposta: Response;

  constructor(resposta: Response) {
    super('A sessão expirou ou não há sessão.');
    this.name = 'NaoAutenticado';
    this.resposta = resposta;
  }
}

export type Resultado<T> =
  | { ok: true; dados: T; resposta: Response }
  | { ok: false; erro: ErroApi; status: number };

/**
 * Executa uma chamada e devolve `dados` já desembrulhado, ou o erro da API.
 *
 * ## Por que NÃO existe catch amplo aqui
 *
 * Se o `fetch` falhar, a exceção SOBE. Um `catch` que devolvesse `{ ok: false }`
 * com mensagem genérica transformaria "a rede caiu" e "a API respondeu 500" na
 * mesma coisa, e a tela mostraria "algo deu errado" para dois problemas que
 * pedem ações opostas — uma é transitório, a outra não é.
 */
export async function chamar<T>(
  fazer: () => Promise<{ data?: unknown; error?: unknown; response: Response }>,
  opcoes: { renovar?: boolean } = {},
): Promise<Resultado<T>> {
  const bruto = await fazer();
  const resposta = bruto.response;

  if (resposta.status === 401 && opcoes.renovar !== false) {
    throw new NaoAutenticado(resposta);
  }

  const envelope = bruto.data as { dados?: T; erro?: ErroApi } | undefined;

  if (envelope?.erro !== undefined && envelope.erro !== null) {
    return { ok: false, erro: envelope.erro, status: resposta.status };
  }

  return { ok: true, dados: envelope?.dados as T, resposta };
}
