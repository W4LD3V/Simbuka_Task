import { test, expect } from '@playwright/test';

test('homepage has title and links', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Vite + React');
});
