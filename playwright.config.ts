import { defineConfig, devices } from '@playwright/test';

/**
 * E2E contra o COMPOSE real, não contra `next dev`.
 *
 * O motivo é o ponto todo: a parte que quebra num front é a integração — o
 * cookie httpOnly, o proxy same-origin, o refresh rotacionado. Testar contra um
 * servidor de desenvolvimento com API de mentira não exercita nada disso, e dá
 * verde numa aplicação que não funciona contra a API de verdade.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
