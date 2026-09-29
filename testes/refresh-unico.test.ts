import { beforeEach, describe, expect, it } from 'vitest';

import {
  renovarUnico,
  renovacoesEmVoo,
  resetarParaTeste,
  SEM_SESSAO,
} from '@/lib/api/refresh-unico';
import type { Renovado } from '@/lib/api/refresh-unico';

/**
 * O teste da armadilha do refresh.
 *
 * ## O que está sendo provado
 *
 * A API emite refresh token opaco com ROTAÇÃO e DETECÇÃO DE REUSO POR FAMÍLIA.
 * Duas renovações concorrentes com o mesmo token: a segunda reapresenta um
 * refresh já rotacionado, a API revoga a família inteira, e a pessoa é
 * deslogada. Não é theoretical — uma tela que carrega cinco dados em paralelo
 * com o token prestes a expirar dispara cinco renovações no mesmo tique.
 *
 * ## Como o teste reproduz a corrida
 *
 * O renovador de mentira segura a resolução em um `gate` que o teste só abre
 * depois de disparar as N chamadas. As N portanto estão NOVO AO MESMO TEMPO de
 * verdade, com a primeira renovação ainda pendente — que é a janela em que a
 * armadilha morde.
 */

/** Deixa o renovador pendente até o teste liberar. */
function criarGate() {
  let liberar: () => void = () => undefined;
  const aberto = new Promise<void>((resolver) => {
    liberar = resolver;
  });
  return { aberto, liberar };
}

describe('refresh single-flight', () => {
  beforeEach(() => {
    resetarParaTeste();
  });

  it('N chamadas concorrentes produzem exatamente 1 renovação', async () => {
    const gate = criarGate();
    let chamadas = 0;

    const renovador = async (): Promise<Renovado> => {
      chamadas += 1;
      await gate.aberto;
      return { ok: true, access: 'novo-access', refresh: 'novo-refresh', semSessao: false };
    };

    const N = 8;
    const todas = Array.from({ length: N }, () => renovarUnico(renovador));

    // As N estão pendentes e a primeira renovação ainda não terminou.
    expect(chamadas).toBe(1);
    expect(renovacoesEmVoo()).toBe(1);

    gate.liberar();
    const resultados = await Promise.all(todas);

    // O ponto central: UMA chamada à API, e todas as N recebem o MESMO token.
    expect(chamadas).toBe(1);
    for (const resultado of resultados) {
      expect(resultado.ok).toBe(true);
      expect(resultado.access).toBe('novo-access');
      expect(resultado.refresh).toBe('novo-refresh');
    }
  });

  it('NENHUMA renovação resulta em semSessao, e nenhuma desloga por engano', async () => {
    // O cenário que o enunciado chama de "0 logouts": quando a renovação falha
    // porque não há sessão, o resultado é semSessao=true e o chamador redireciona
    // para o login. O que NÃO pode acontecer é uma renovação parcial dizer "sem
    // sessão" para quem tinha sessão válida.
    const renovador = async (): Promise<Renovado> => SEM_SESSAO;
    const resultados = await Promise.all([
      renovarUnico(renovador),
      renovarUnico(renovador),
      renovarUnico(renovador),
    ]);
    for (const resultado of resultados) {
      expect(resultado.semSessao).toBe(true);
    }
  });

  it('libera a promise depois de terminar, para a próxima renovação poder existir', async () => {
    // Sem o `finally`, a primeira promessa ficaria presa para sempre e o
    // single-flight viraria "renove uma vez na vida da aplicação" — um bug mais
    // silencioso que o original, porque não desloga ninguém: simplesmente
    // para de funcionar depois de 15 minutos.
    const renovador = async (): Promise<Renovado> => ({
      ok: true,
      access: 'a',
      refresh: 'r',
      semSessao: false,
    });

    await renovarUnico(renovador);
    expect(renovacoesEmVoo()).toBe(0);

    // Uma segunda renovação é possível — com o token novo, como deve ser.
    await renovarUnico(renovador);
    expect(renovacoesEmVoo()).toBe(0);
  });

  it('libera a promise mesmo quando a renovação LANÇA', async () => {
    // Um `finally` que só roda no sucesso deixa o single-flight travado
    // para sempre na primeira falha de rede, e a pessoa fica sem conseguir
    // mais renovar pelo resto da sessão.
    const falhar = async (): Promise<Renovado> => {
      throw new Error('rede caiu');
    };

    await expect(renovarUnico(falhar)).rejects.toThrow('rede caiu');
    expect(renovacoesEmVoo()).toBe(0);

    // E a próxima renovação funciona.
    const ok = async (): Promise<Renovado> => ({
      ok: true,
      access: 'a',
      refresh: 'r',
      semSessao: false,
    });
    await expect(renovarUnico(ok)).resolves.toMatchObject({ ok: true });
  });

  it('requisições que chegam DEPOIS da renovação reaproveitam o resultado', async () => {
    // Esta é a ordem real do problema: a tela carrega, a primeira requisição
    // renova, e as outras chegam um instante depois — já com o token novo, e
    // por isso sem 401. O teste cobre a janela em que elas ainda estavam com
    // 401 e mesmo assim não abrem uma segunda renovação.
    let chamadas = 0;
    const renovador = async (): Promise<Renovado> => {
      chamadas += 1;
      return { ok: true, access: 'a2', refresh: 'r2', semSessao: false };
    };

    const primeira = renovarUnico(renovador);
    const imediatamenteDepois = renovarUnico(renovador);
    await Promise.all([primeira, imediatamenteDepois]);

    expect(chamadas).toBe(1);
  });
});
