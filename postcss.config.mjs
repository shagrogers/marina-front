/**
 * PostCSS, para o Tailwind 4.
 *
 * ## Por que a forma de STRING, e não uma função
 *
 * O Turbopack (o bundler padrão do Next 16) avalia este arquivo num ambiente
 * onde `import.meta.createRequire` não existe, e falha com
 * "TypeError: mod.createRequire is not a function". Importar `@tailwindcss/postcss`
 * por nome resolve essa limitação e é a forma documentada do Tailwind 4.
 *
 * A alternativa seria desativar o Turbopack (`next build --webpack`), o que
 * custaria o bundler moderno por causa de um arquivo de 3 linhas.
 */
// eslint-disable-next-line import/no-anonymous-default-export -- o Next
// carrega este arquivo pelo caminho, e atribuir a uma constante não muda nada
// aqui; a regra existe para projetos que reexportam configuração.
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
