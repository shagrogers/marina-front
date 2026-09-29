/**
 * O destino do proxy, resolvido NO SERVIDOR.
 *
 * `API_INTERNA` é o que o container usa (`http://api:8080`) e o que o
 * `npm run dev` na máquina usa (`http://localhost:8080`).
 *
 * ## Por que não existe NEXT_PUBLIC_API_URL
 *
 * Uma URL com `NEXT_PUBLIC_` é embutida no bundle do navegador: qualquer pessoa
 * lê a topologia interna na aba Network. O resultado seria precisar de CORS
 * liberado para o domínio de produção, e o cookie httpOnly deixaria de ser
 * same-origin — que é justamente o que impede o CSRF.
 *
 * Mantendo a URL no servidor, o navegador conhece apenas `/api/v1`, o cookie é
 * same-origin e a API não precisa de CORS para a web.
 */

/** Base da API vista pelo servidor. Sem barra final. */
export function baseInterna(): string {
  const bruto = process.env.API_INTERNA ?? 'http://localhost:8080';
  return bruto.replace(/\/+$/, '');
}

/** Caminho do proxy, o mesmo que o navegador usa. */
export const CAMINHO_PROXY = '/api/v1';

/** Monta a URL absoluta do proxy para uma requisição vinda do navegador. */
export function urlDoProxy(pedido: Request, caminho: string[]): URL {
  const base = new URL(pedido.url);
  const consultavel = base.search;
  return new URL(`${CAMINHO_PROXY}/${caminho.join('/')}${consultavel}`, base.origin);
}
