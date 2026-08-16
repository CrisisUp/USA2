import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/mobile',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report-mobile' }]],
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Mobile Chrome (iPhone SE)',
      use: { ...devices['iPhone SE'] },
    },
    {
      name: 'Mobile Chrome (iPhone 14)',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'Mobile Chrome (Galaxy S21)',
      use: { ...devices['Galaxy S21'] },
    },
    {
      name: 'Tablet Chrome (iPad Mini)',
      use: { ...devices['iPad Mini'] },
    },
    // Desktop Chrome for accessibility regression only - skip mobile-specific tests
    {
      name: 'Desktop Chrome (Accessibility Regression)',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['**/accessibility.test.ts'],
    },
  ],
  webServer: {
    command: 'cd usa && python3 -m http.server 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
});