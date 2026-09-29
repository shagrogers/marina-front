'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import { TIPOS_USUARIO } from '@/lib/sessao/tipos';

/**
 * Estado da sessão, no cliente.
 *
 * ## Por que isto é contexto e NÃO uma query da API
 *
 * `/auth/eu` é dado de SERVIDOR: quem decide o que a pessoa pode ver é a API, e o
 * middleware já o consultou para proteger a rota. Trazer isso para o cliente
 * significa uma segunda requisição, um estado de carregamento na navegação, e
 * a chance de a tela piscar "não tem papel" antes de o dado chegar.
 *
 * O middleware injeta o que descobriu; o cliente consome. Uma fonte só.
 *
 * ## Por que o token NÃO está aqui
 *
 * Porque o token vive em cookie httpOnly e o JavaScript não o vê. O que está
 * aqui é o usuário e os papéis — que são público para a própria pessoa e não
 * dão nenhum poder sozinhos.
 */
export type SessaoUsuario = {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  papeis: Array<{ papel: TIPOS_USUARIO; status: 'ativo' | 'pendente' | 'rejeitado'; nome: string }>;
};

export type ContextoSessao = {
  /** Null = ninguém logado. */
  usuario: SessaoUsuario | null;
  carregando: boolean;
  atualizar: (usuario: SessaoUsuario | null) => void;
};

const Contexto = createContext<ContextoSessao>({
  usuario: null,
  carregando: false,
  atualizar: () => undefined,
});

export function useSessao(): ContextoSessao {
  return useContext(Contexto);
}

/**
 * Papel ativo?
 *
 * Papel PENDENTE não conta. O backend é quem barra, e a doc 2 §3.3 é explícita:
 * papel pendente não libera rota. Contar o pendente aqui faria a interface
 * oferecer um botão que devolve 403.
 */
export function temPapelAtivo(sessao: SessaoUsuario | null, papel: TIPOS_USUARIO): boolean {
  return sessao?.papeis.some((p) => p.papel === papel && p.status === 'ativo') ?? false;
}

/** Existe o papel, mas pendente? A tela mostra "aguardando verificação". */
export function temPapelPendente(sessao: SessaoUsuario | null, papel: TIPOS_USUARIO): boolean {
  return sessao?.papeis.some((p) => p.papel === papel && p.status === 'pendente') ?? false;
}

export function ProvedorSessao({
  usuarioInicial = null,
  children,
}: {
  usuarioInicial?: SessaoUsuario | null;
  children: ReactNode;
}) {
  const [usuario, setUsuario] = useState<SessaoUsuario | null>(usuarioInicial);
  // O client nasce aqui, e não no módulo: um `QueryClient` em memória de módulo
  // é compartilhado entre requisições no servidor, e o cache de uma pessoa
  // vaza para a seguinte. A doc 2 §9 pede que a validação de dono seja sempre
  // no servidor — o cache é a versão disso para o cliente.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // O token vive 15 min; aos 12 ainda é válido, e a renovação pode
            // esperar a próxima interação. O foco de janela é o que dispara
            // a renovação antes do token expirar de verdade.
            staleTime: 60_000,
            retry: (tentativas, erro) => {
              // 4xx é decisão da API, não falha transitória: repetir o mesmo
              // pedido com o mesmo corpo vai dar o mesmo 4xx.
              if ('status' in erro && typeof erro.status === 'number' && erro.status < 500) {
                return false;
              }
              return tentativas < 2;
            },
            refetchOnWindowFocus: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Contexto.Provider value={{ usuario, carregando: false, atualizar: setUsuario }}>
        {children}
      </Contexto.Provider>
    </QueryClientProvider>
  );
}
