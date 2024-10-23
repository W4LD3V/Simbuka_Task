import { test, expect } from '@playwright/test';

test('should search and display correct results', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('input[type="text"]', process.env.VITE_ADMIN_USERNAME);
  await page.fill('input[type="password"]', process.env.VITE_ADMIN_PASSWORD);
  await page.click('button[type="submit"]');
  
  await page.waitForSelector('#search-input');
  
  await page.fill('#search-input', 'Agnes');
  
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1);

  const firstNameCell = rows.first().locator('td').first();
  await expect(firstNameCell).toContainText('Agnes');
});
