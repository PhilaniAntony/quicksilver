// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'], // console output
    ['monocart-reporter', {
      outputFile: './reports/monocart-report.html', // where to save report
      inlineAssets: true, // bundle css/js inside html
      name: 'Playwright API + UI Test Framework',
      project: 'Assessment Task',
      outputDir: './reports',
      attachments: true
    }]
  ],
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    // UI Tests (SauceDemo)
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://www.saucedemo.com',
      },
    },
    {
      name: 'ui-webkit',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://www.saucedemo.com',
      },
    },

    // API Tests (Restful-Booker)
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },
  ],
});
