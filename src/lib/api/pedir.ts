import { criarCliente } from './cliente';

/**
 * O cliente compartilhado no navegador.
 *
 * Módulo e não hook: duas telas que montam o mesmo clienteadiesiriam dois
 * estados de sessão, e o botão de sair de uma não deslogaria a outra. O
 * `QueryClientProvider` fica no layout, e este é o mesmo objeto de fetch.
 */
export const cliente = criarCliente();

/**
 * Faz uma chamada e devolve `dados`, ou o erro da API já desembrulhado.
 *
 * ## O 401 vira exceção, e isso é deliberado
 *
 * `chamar` em `cliente.ts` lança `NaoAutenticado` no 401, para que o
 * `interceptador` decida renovar e repetir. Devolver `{ ok: false }` aqui
 * transformaria "expirou" em "erro" e a tela mostraria um erro em vez de tentar
 * de novo — que é o que a pessoa espera.
 */
export type Resultado<T> =
  | { ok: true; dados: T }
  | { ok: false; erro: { codigo: string; mensagem: string; campos?: Record<string, string> }; status: number };

export async function pedir<T>(
  fazer: () => Promise<{ data?: unknown; error?: unknown; response: Response }>,
): Promise<Resultado<T>> {
  const bruto = await fazer();
  const resposta = bruto.response;

  if (resposta.status === 401) {
    // A exceção sobe; quem chama decide renovar e repetir.
    const { NaoAutenticado } = await import('./cliente');
    throw new NaoAutenticado(resposta);
  }

  const envelope = bruto.data as
    | { dados?: T; erro?: { codigo: string; mensagem: string; campos?: Record<string, string> } }
    | undefined;

  if (envelope?.erro !== undefined && envelope.erro !== null) {
    return { ok: false, erro: envelope.erro, status: resposta.status };
  }
  return { ok: true, dados: envelope?.dados as T };
}
