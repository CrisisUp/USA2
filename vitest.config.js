// vitest.config.js — Configuração do Vitest
// Exclui testes de integração (Playwright) e o teste de a11y do `npm test`.
// - testes de integração exigem servidor + navegadores reais (npx playwright test);
// - o teste de a11y roda separado via `npm run test:a11y` (config dedicada).

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Mantém os padrões do Vitest e adiciona exclusões para testes que não
    // fazem parte da suíte unitária executada por `npm test`.
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      'tests/integration/**',
      'tests/a11y.test.mjs',
    ],
  },
});
