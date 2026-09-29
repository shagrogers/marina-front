import type { NextConfig } from 'next';

/**
 * A API NUNCA é chamada pelo navegador diretamente.
 *
 * Duas camadas, e as duas importam:
 *
 *  1. `NEXT_PUBLIC_API_URL` não existe. A URL da API é variável de ambiente
 *     **do servidor**, lida em runtime. Se ela fosse pública, qualquer pessoa
 *     veria a topologia interna pela aba Network, e o CORS da API viraria
 *     necessário à toa.
 *
 *  2. O proxy same-origin em `/api/v1/*` (ver `src/app/api/[...caminho]`)
 *     é o único caminho. No container, o destino é `http://api:8080`; fora
 *     dele, `http://localhost:8080`.
 *
 * `output: 'standalone'` reduz a imagem do Docker: o servidor do Next
 * carrega só o que as rotas realmente usam, em vez do node_modules inteiro.
 */
const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  // O proxy de /api/v1 é um route handler e NÃO pode ser cacheado: uma
  // resposta 401 ou um saldo em dia que fica em cache é pior do que não cachear.
  async headers() {
    return [
      {
        source: '/api/v1/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ];
  },
};

export default nextConfig;
