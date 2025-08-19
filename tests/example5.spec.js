import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.publicissapient.com/');
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.getByRole('textbox', { name: 'First name*' }).click();
});