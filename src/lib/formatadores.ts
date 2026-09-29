/**
 * Formatadores de exibição.
 *
 * ## Por que pt-BR e America/Sao_Paulo são fixos
 *
 * O app é brasileiro e a doc 1 §3 fala em "R$ 1.960" e "12 de out". Deixar o
 * fuso e o locale do ambiente significaria que a mesma reserva aparece como
 * "R$ 1,960.00" na máquina de quem entrou em inglês, e a doc 1 vira ficção.
 *
 * ## O erro clássico de data
 *
 * `new Date('2026-10-05T12:00:00Z').toLocaleDateString('pt-BR')` mostra a data
 * do fuso do NAVEGADOR, não a do evento. Uma reserva de amanhã vira "hoje" para
 * quem está a oeste e "depois de amanhã" para quem está a leste. Por isso
 * `timeZone` é explícito em TODA formatação de data.
 */

const LOCALES = 'pt-BR';
const FUSO = 'America/Sao_Paulo';

const fuso = { timeZone: FUSO } as const;

/**
 * Moeda em reais a partir de CENTAVOS.
 *
 * A API devolve centavos (`valor_total_centavos`, `gmv_centavos`) e reais
 * (`valor`, `valor_diaria`) — e a doc 1 §4.6 já avisa que `NUMERIC` do
 * PostgreSQL em ponto flutuante perde precisão. Trabalhar com centavos evita a
 * perda: 199,90 em float, vezes 100, dá 19989,999999999996.
 *
 * Quando o valor vem em reais (vindo do `valor_diaria` da embarcação, que é
 * `number` no contrato), chame `deReais` e não `deCentavos`.
 */
export function moedaDeCentavos(centavos: number | null | undefined): string {
  if (centavos === null || centavos === undefined) {
    // NULL e "R$ 0,00" são afirmações diferentes: a primeira é "não houve
    // receita", a segunda é "a receita foi zero".
    return '—';
  }
  return normalizar(
    new Intl.NumberFormat(LOCALES, {
      style: 'currency',
      currency: 'BRL',
    }).format(centavos / 100),
  );
}

/** Moeda em reais a partir de um valor que JÁ vem em reais. */
export function moedaDeReais(reais: number | null | undefined): string {
  if (reais === null || reais === undefined) {
    return '—';
  }
  return normalizar(
    new Intl.NumberFormat(LOCALES, {
      style: 'currency',
      currency: 'BRL',
    }).format(reais),
  );
}

/** Separador que o `Intl` usa entre o símbolo e o número. */
const ESPACO_NAO_SEPARAVEL = ' ';

/**
 * Normaliza o espaço do `Intl`.
 *
 * ## O que acontece aqui
 *
 * `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })` escreve
 * "R$" seguido de **U+00A0** (espaço não separável), e não de U+0020. É o
 * comportamento certo do `Intl` — o espaço existe para o símbolo e o valor nunca
 * quebrarem de linha em separado.
 *
 * A API, por outro lado, devolve `"R$ 1.960,00"` com espaço normal, e a
 * doc 1 §4.14 escreve "R$ 1.960". Deixar os dois como vêm significaria a MESMA
 * reserva aparecendo com dois espaços diferentes conforme a origem do número — o
 * que, num painel que compara valores, parece defeito.
 *
 * Então só o espaço é trocado. O `Intl` continua fazendo o trabalho difícil
 * (separador de milhar, vírgula decimal, símbolo), e a normalização não mexe em
 * nada disso.
 */
function normalizar(texto: string): string {
  return texto.replaceAll(ESPACO_NAO_SEPARAVEL, ' ');
}

/** Número simples, com separador de milhar brasileiro. */
export function numero(valor: number | null | undefined, casas = 0): string {
  if (valor === null || valor === undefined) {
    return '—';
  }
  return new Intl.NumberFormat(LOCALES, {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  }).format(valor);
}

/** Data curta: "05/10/2026". */
export function dataCurta(iso: string | null | undefined): string {
  if (!iso) {
    return '—';
  }
  return new Intl.DateTimeFormat(LOCALES, { dateStyle: 'short', ...fuso }).format(new Date(iso));
}

/** Data e hora: "05/10/2026 às 14:30". */
export function dataHora(iso: string | null | undefined): string {
  if (!iso) {
    return '—';
  }
  return new Intl.DateTimeFormat(LOCALES, {
    dateStyle: 'short',
    timeStyle: 'short',
    ...fuso,
  }).format(new Date(iso));
}

/** Só a hora: "14:30". É o que o bloco AGORA da tela 4.7 mostra. */
export function hora(iso: string | null | undefined): string {
  if (!iso) {
    return '—';
  }
  return new Intl.DateTimeFormat(LOCALES, { timeStyle: 'short', ...fuso }).format(new Date(iso));
}

/** Dia e mês: "05 de out". É o rótulo dos cartões de reserva. */
export function diaMes(iso: string | null | undefined): string {
  if (!iso) {
    return '—';
  }
  return new Intl.DateTimeFormat(LOCALES, { day: '2-digit', month: 'short', ...fuso })
    .format(new Date(iso))
    .replace('.', '');
}

/**
 * Distância. A doc 1 escreve "4,2 km", e o valor chega como string já formatada
 * pela API em alguns DTOs e como número em outros — daí as duas entradas.
 */
export function distancia(valor: string | number | null | undefined): string {
  if (valor === null || valor === undefined) {
    return '—';
  }
  return typeof valor === 'number' ? `${numero(valor, 1)} km` : valor;
}

/** Percentual: "62,5%". */
export function percentual(valor: number | null | undefined, casas = 1): string {
  if (valor === null || valor === undefined) {
    return '—';
  }
  return `${numero(valor, casas)}%`;
}

/** Data-hora local para o `datetime-local` do formulário. */
export function paraInputDateTime(iso: string): string {
  const data = new Date(iso);
  const deslocamento = data.getTimezoneOffset() * 60_000;
  return new Date(data.getTime() - deslocamento).toISOString().slice(0, 16);
}

/** ISO com deslocamento, para o que a API espera (`time.Time` do Go). */
export function deInputDateTime(valor: string): string {
  return new Date(valor).toISOString();
}
