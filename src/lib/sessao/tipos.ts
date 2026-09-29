/**
 * Os papéis do sistema, e os tipos que o contrato declara.
 *
 * ## Este arquivo NÃO é "tipo escrito à mão" no sentido proibido
 *
 * A regra do AGENTS.md é que o tipo das RESPOSTAS vem do OpenAPI gerado. Estes
 * são os valores de um ENUM, e o enum no contrato (`usuario.Papel`) é a fonte
 * deles. Este arquivo é a TRADUÇÃO do enum do TypeScript gerado para algo que o
 * `switch` consiga usar com narrowing, e uma checagem em runtime que garante
 * que nenhum valor fora da lista passa.
 *
 * Sem o narrowing, `papeis` do usuário viria como string e cada comparação
 * `p.papel === 'marina'` seria uma comparação de string que o compilador aceita
 * mesmo se o valor não existir no contrato.
 */

export const TIPOS_USUARIO = ['cliente', 'proprietario', 'marina', 'prestador', 'admin'] as const;
export type TIPOS_USUARIO = (typeof TIPOS_USUARIO)[number];

export const STATUS_PAPEL = ['ativo', 'pendente', 'rejeitado'] as const;
export type STATUS_PAPEL = (typeof STATUS_PAPEL)[number];

/** Papel que este front conhece e sabe oferecer uma tela. */
export function ehPapelConhecido(valor: string): valor is TIPOS_USUARIO {
  return (TIPOS_USUARIO as readonly string[]).includes(valor);
}

export function ehStatusConhecido(valor: string): valor is STATUS_PAPEL {
  return (STATUS_PAPEL as readonly string[]).includes(valor);
}

/** Nome de exibição do papel, como a doc 1 escreve na tela. */
const NOME_PAPEL: Record<TIPOS_USUARIO, string> = {
  cliente: 'Cliente',
  proprietario: 'Proprietário',
  marina: 'Marina',
  prestador: 'Prestador',
  admin: 'Administração',
};

export function nomeDoPapel(papel: TIPOS_USUARIO): string {
  return NOME_PAPEL[papel];
}
