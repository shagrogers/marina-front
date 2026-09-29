/** Junta classes condicionalmente, sem bring de dependência. */
export function cx(...partes: Array<string | false | null | undefined>): string {
  return partes.filter((parte) => typeof parte === 'string' && parte !== '').join(' ');
}
