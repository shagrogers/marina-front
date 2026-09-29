import { defineConfig, globalIgnores } from 'eslint/config';
import next from 'eslint-config-next';

/**
 * ESLint plano (config em `eslint.config.mjs`), com o preset do Next.
 *
 * As regras de `@next/next/no-html-link-for-pages` e companhia vêm do preset;
 * o que acrescento é o que o preset não cobre e este projeto considera
 * inegociável — principalmente a proibição de `any` e de `catch` vazio, que são
 * as duas portas por onde a regra "sem catch amplo" e a regra "sem tipo escrito à
 * mão" se escapariam.
 *
 * ## Sem `FlatCompat`
 *
 * A primeira versão usava `FlatCompat` do `@eslint/eslintrc` para puxar o
 * preset em formato antigo, e o próprio ESLint estourava com "Converting
 * circular structure to JSON" ao formatar o erro — um erro de configuração que
 * escondia o erro de lint real. `eslint-config-next` 16 exporta o preset já no
 * formato plano, e usá-lo direto elimina uma dependência e essa classe de
 * problema.
 */
const configuracao = defineConfig([
  ...next,
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'coverage/**',
    'test-results/**',
    'playwright-report/**',
    'next-env.d.ts',
  ]),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // O tipo das respostas vem do OpenAPI gerado. `any` aqui significa "o
      // contrato não cobriu isso" e precisa virar lacuna no README, não um
      // `any` que silencia o compilador.
      '@typescript-eslint/no-explicit-any': 'error',
      // `catch` sem parâmetro é o catch amplo: não dá para registrar a causa, e
      // a regra do AGENTS.md é não engolir erro de API.
      'no-empty': ['error', { allowEmptyCatch: false }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Os scripts .mjs de geração rodam fora do bundle e usam JSON cru.
    files: ['scripts/**/*.mjs', '*.config.mjs', '*.config.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);

export default configuracao;
