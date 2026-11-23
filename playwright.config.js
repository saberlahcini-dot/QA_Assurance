require('dotenv').config();

const { defineConfig, devices } = require('@playwright/test');

function getBaseURL() {
  const value = process.env.BASE_URL;
  if (!value) {
    throw new Error('BASE_URL is required. Copy .env.example to .env and set your authorized staging URL.');
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('BASE_URL must be a valid absolute URL.');
  }

  const isLocalHTTP = url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname);
  if (url.protocol !== 'https:' && !isLocalHTTP) {
    throw new Error('BASE_URL must use HTTPS (HTTP is allowed only for localhost).');
  }
  if (url.username || url.password) {
    throw new Error('Do not put credentials in BASE_URL.');
  }

  return url.toString().replace(/\/$/, '');
}

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: getBaseURL(),
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});