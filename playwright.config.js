import { devices } from '@playwright/test';

export default {
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,
    baseURL: 'http://localhost:5173',
    browserName: 'chromium',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};
