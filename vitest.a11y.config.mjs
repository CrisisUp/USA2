// vitest.a11y.config.mjs — Configuração dedicada ao teste de acessibilidade
// Usado por `npm run test:a11y`, que exige um servidor rodando (ex.: porta 8080).
// Necessária porque o teste de a11y precisa rodar explicitamente, mas não deve
// fazer parte do `npm test` (a config base o exclui).

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Descobre apenas o teste de a11y (arquivo único).
    include: ['tests/a11y.test.mjs'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
