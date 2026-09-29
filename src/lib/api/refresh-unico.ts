/**
 * O refresh single-flight.
 *
 * ## A armadilha, e ela é SÉRIA
 *
 * A API emite um refresh token **opaco com rotação e detecção de reuso por
 * família**. Se duas requisições tomam 401 no mesmo instante e cada uma chama
 * `POST /auth/renovar`, acontece isto:
 *
 *   1. a chamada A usa o refresh `R1` e recebe o `R2`. `R1` está agora
 *      revogado.
 *   2. a chamada B usa o MESMO `R1` — porque o navegador ainda tem o cookie
 *      antigo, a resposta de A ainda não chegou.
 *   3. a API reconhece `R1` como reuso e **revoga a família inteira**: `R2`
 *      morre junto. A pessoa está deslogada.
 *
 * E o pior: não é um caso raro. Uma tela que carrega cinco dados em paralelo
 * com o token prestes a expirar dispara cinco renovações no mesmo tique do
 * event loop.
 *
 * ## A solução
 *
 * Uma Promessa em módulo. A primeira chamada cria; as demais esperam a MESMA
 * Promessa e recebem o mesmo resultado. Uma renovação por vez, sempre.
 *
 * ## Por que em memória de módulo, e não no servidor
 *
 * No cliente é memória de módulo: as requisições concorrentes vivem no mesmo
 * processo do browser, e o `finally` limpa a promessa quando ela termina. No
 * servidor é o mesmo padrão por request, com a promessa presa ao `Request` — e
 * é por isso que o servidor NÃO usa este arquivo: cada requisição tem o seu
 * `singleFlight`. Ver `renovar-token.ts`.
 */

/** O que a renovação devolve, no formato que o chamador precisa. */
export type Renovado = {
  ok: boolean;
  /** Valor do cookie de access. Vazio quando a renovação falhou. */
  access: string;
  /** Valor do cookie de refresh. Vazio quando a renovação falhou. */
  refresh: string;
  /** Verdadeiro quando não há mais sessão: o chamador redireciona para o login. */
  semSessao: boolean;
};

/** O que faz a renovação de verdade. Injetado, e por isso testável. */
export type Renovador = () => Promise<Renovado>;

/** O resultado de "não há sessão para renovar". */
export const SEM_SESSAO: Renovado = { ok: false, access: '', refresh: '', semSessao: true };

/**
 * Estado do single-flight.
 *
 * Exportado para que o teste possa verificar que a promessa foi LIBERADA depois
 * de terminar — uma promessa que nunca é limpa transformaria a renovação em
 * "só na vida toda", que é um bug pior e mais silencioso.
 */
let emVoo: Promise<Renovado> | null = null;

/** Quantas renovações estão em voo agora. Só para teste. */
export function renovacoesEmVoo(): number {
  return emVoo === null ? 0 : 1;
}

/** Zera o estado. Só para teste — produção não deve precisar disso. */
export function resetarParaTeste(): void {
  emVoo = null;
}

/**
 * Renova UMA vez, e faz as chamadas concorrentes esperarem o mesmo resultado.
 *
 * A implementação é o padrão de "memoizar uma Promessa": a primeira chamada
 * guarda a Promessa; as seguintes recebem a que já está em voo. O `finally`
 * apaga, para que a próxima renovação (com o token novo) possa acontecer.
 */
export function renovarUnico(renovar: Renovador): Promise<Renovado> {
  if (emVoo !== null) {
    return emVoo;
  }

  const promessa = renovar().finally(() => {
    // Só apaga a SUA promessa. Se, no `finally`, outra tivesse começado (o que
    // é impossível no JS de uma thread, mas fica explícito), apagar a
    // errada deixaria a nova em voo invisível e o próximo 401 iniciaria uma
    // terceira renovação.
    if (emVoo === promessa) {
      emVoo = null;
    }
  });

  emVoo = promessa;
  return promessa;
}
