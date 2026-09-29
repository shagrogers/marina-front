import { describe, expect, it } from 'vitest';

import {
  dataCurta,
  dataHora,
  deInputDateTime,
  diaMes,
  distancia,
  hora,
  moedaDeCentavos,
  moedaDeReais,
  numero,
  paraInputDateTime,
  percentual,
} from '@/lib/formatadores';

/**
 * Os formatadores concentram três decisões que, espalhadas, seriam três bugs
 * diferentes:
 *
 *  1. `null` NÃO é zero. A API devolve `gmv_centavos: null` quando o mês não
 *     teve receita, e mostrar "R$ 0,00" seria afirmar que o faturamento foi
 *     zero. São frases diferentes.
 *  2. O fuso é America/Sao_Paulo, SEMPRE. Uma reserva de amanhã vira "hoje" para
 *     quem está a oeste se o fuso vier do ambiente.
 *  3. Dinheiro entra em CENTAVOS. 199,90 em float, vezes 100, dá
 *     19989,999999999996 — e o valor exibido seria R$ 199,89.
 */
describe('formatadores', () => {
  describe('moeda', () => {
    it('formata centavos em reais com separador brasileiro', () => {
      expect(moedaDeCentavos(4620000)).toBe('R$ 46.200,00');
      expect(moedaDeCentavos(98000)).toBe('R$ 980,00');
      expect(moedaDeCentavos(0)).toBe('R$ 0,00');
    });

    it('distingue "sem dado" de "zero" — são afirmações diferentes', () => {
      // A doc 1 §3.4: o painel não pode mentir sobre uma das duas.
      expect(moedaDeCentavos(null)).toBe('—');
      expect(moedaDeCentavos(undefined)).toBe('—');
      expect(moedaDeCentavos(0)).toBe('R$ 0,00');
    });

    it('formata um valor que já vem em reais, sem multiplicar por 100', () => {
      // `valor_diaria` e `valor` da embarcação são `number` no contrato, em REAIS.
      // Passá-los por moedaDeCentavos daria 100x.
      expect(moedaDeReais(189000)).toBe('R$ 189.000,00');
      expect(moedaDeReais(null)).toBe('—');
    });
  });

  describe('número e percentual', () => {
    it('usa separador de milhar brasileiro', () => {
      expect(numero(4620000)).toBe('4.620.000');
      expect(numero(4.2, 1)).toBe('4,2');
      expect(numero(null)).toBe('—');
    });

    it('formata percentual com uma casa por padrão', () => {
      expect(percentual(62.5)).toBe('62,5%');
      expect(percentual(100)).toBe('100,0%');
      expect(percentual(null)).toBe('—');
    });
  });

  describe('data', () => {
    // 2026-10-05T02:30:00Z é 2026-10-04 às 23:30 em São Paulo: a data muda
    // quando o fuso não é fixo, e é exatamente esse o teste.
    it('usa America/Sao_Paulo, e não o fuso do ambiente', () => {
      expect(dataCurta('2026-10-05T02:30:00Z')).toBe('04/10/2026');
      expect(hora('2026-10-05T02:30:00Z')).toBe('23:30');
      expect(diaMes('2026-10-05T02:30:00Z')).toBe('04 de out');
    });

    it('junta data e hora', () => {
      const texto = dataHora('2026-10-05T14:30:00Z');
      expect(texto).toContain('05/10/2026');
      expect(texto).toContain('11:30');
    });

    it('devolve o traço para data ausente, em vez de "Invalid Date"', () => {
      // "Invalid Date" na tela é o pior resultado possível: parece bug.
      expect(dataCurta(null)).toBe('—');
      expect(dataCurta(undefined)).toBe('—');
      expect(hora(null)).toBe('—');
      expect(diaMes(null)).toBe('—');
    });
  });

  describe('distância', () => {
    it('aceita string já formatada pela API e número', () => {
      // A doc 1 §4.6: alguns DTOs entregam km formatado, outros entregam
      // número. Este é o ponto onde a divergência aparece.
      expect(distancia('4,2')).toBe('4,2');
      expect(distancia(4.2)).toBe('4,2 km');
      expect(distancia(null)).toBe('—');
    });
  });

  describe('ida e volta do formulário de data', () => {
    it('converte ISO em valor de input datetime-local', () => {
      // O `datetime-local` não aceita ISO com Z: o navegador ignora o sufixo e
      // mostra o horário errado.
      const valor = paraInputDateTime('2026-10-05T14:30:00Z');
      expect(valor).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
    });

    it('volta para ISO com deslocamento, que é o que o Go espera', () => {
      const volta = deInputDateTime('2026-10-05T14:30');
      expect(volta).toMatch(/Z$/);
      expect(new Date(volta).toISOString()).toBe(volta);
    });
  });
});
