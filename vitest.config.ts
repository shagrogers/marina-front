import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./testes/preparacao.ts'],
    include: ['testes/**/*.test.ts', 'testes/**/*.test.tsx'],
    // O e2e (Playwright) roda em outro runner, e o glob dele pegaria os arquivos
    // .spec.ts do Playwright se não fosse separado por diretório.
    exclude: ['e2e/**', 'node_modules/**', '.next/**'],
  },
});
