import type { NextRequest } from 'next/server';

/**
 * Nomes dos cookies de sessão.
 *
 * `httpOnly`: o JavaScript da página não lê. É o que fecha o XSS — um script
 * injetado na página não consegue ler o token.
 *
 * `sameSite: 'lax'`: o suficiente para o cookie ir em navegação de primeiro
 * nível e none em POST de terceiro. `strict` quebraria o retorno por link
 * externo depois do login, que é o fluxo mais comum do produto.
 *
 * `secure`: ligado em produção. Em `http://localhost` o navegador ignora
 * cookie secure, e a sessão local deixaria de funcionar — então o valor é
 * calculado, não fixo.
 */
export const COOKIE_ACCESS = 'boats_access';
export const COOKIE_REFRESH = 'boats_refresh';

/** true quando o processo roda sobre TLS. */
export function ehProducao(secure: boolean | undefined): boolean {
  return secure === true;
}

export type OpcoesCookie = {
  httpOnly: true;
  sameSite: 'lax';
  secure: boolean;
  path: string;
  maxAge: number;
};

/** Opções do cookie de access: 15 min, o prazo que a API dá. */
export function opcoesAccess(secure: boolean): OpcoesCookie {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    // Espelha o expira_em da API. Cookie mais longo que o token só faria o
    // navegador guardar um valor que a API já rejeitou.
    maxAge: 15 * 60,
  };
}

/**
 * Opções do cookie de refresh.
 *
 * `manterConectado` decide o prazo: 30 dias quando a pessoa pediu para ser
 * lembrada, e uma sessão curta (8 h) quando não. A API é quem decide o prazo de
 * verdade; aqui o cookie só precisa sobreviver o mesmo tempo, nem mais nem
 * menos.
 */
export function opcoesRefresh(secure: boolean, manterConectado: boolean): OpcoesCookie {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/',
    maxAge: manterConectado ? 30 * 24 * 60 * 60 : 8 * 60 * 60,
  };
}

/** Lê um cookie do pedido. */
export function lerCookie(pedido: NextRequest, nome: string): string | undefined {
  return pedido.cookies.get(nome)?.value;
}

/** O par de cookies está completo? */
export function temSessao(pedido: NextRequest): boolean {
  return (
    lerCookie(pedido, COOKIE_ACCESS) !== undefined &&
    lerCookie(pedido, COOKIE_REFRESH) !== undefined
  );
}
