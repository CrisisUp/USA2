// eslint.config.js — Configuração ESLint Flat Config (ESLint 9+)
import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Ignora arquivos gerados e dependências
  { ignores: ['node_modules/', 'dist/', 'build/', '*.log', '.DS_Store'] },

  // Configuração base recomendada para ES2022 + Browser
  js.configs.recommended,

  {
    files: ['usa/js/**/*.js', 'tests/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
        // Globais do Vitest
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      // Qualidade de código
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',

      // Boas práticas modernas
      'no-duplicate-imports': 'error',
      'no-useless-return': 'error',
    },
  },

  // Prettier: desativa regras de estilo que conflitam com Prettier
  prettierConfig,
];