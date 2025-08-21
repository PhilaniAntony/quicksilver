const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['monocart-reporter', {
      outputFile: './reports/monocart-report.html',
      inlineAssets: true,
      name: 'Quicksilver End-to-End Test Framework',
      project: 'Assessment Task',
      outputDir: './reports',
      attachments: true
    }]
  ],

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    // --- UI Tests ---
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      testMatch: /.*\.(spec|test)\.[jt]s/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.WEB_BASE_URL,
      },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      testMatch: /.*\.(spec|test)\.[jt]s/,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.WEB_BASE_URL,
      },
    },
    {
      name: 'ui-webkit',
      testDir: './tests/ui',
      testMatch: /.*\.(spec|test)\.[jt]s/,
      use: {
        ...devices['Desktop Safari'],
        baseURL: process.env.WEB_BASE_URL,
      },
    },

    // --- API Tests ---
    {
      name: 'api-tests',
      testDir: './tests/api',
      testMatch: /.*\.(spec|test)\.[jt]s/,
      use: {
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});