import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.publicissapient.com/');
  await page.getByRole('button', { name: 'Sapient AI' }).click();
  await page.getByRole('menuitem', { name: 'Bodhi' }).click();
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.getByRole('button', { name: 'Sapient AI' }).click();
  await page.getByRole('menuitem', { name: 'Slingshot' }).click();
  await page.locator('iframe[title="Navattic demo"]').contentFrame().getByRole('button', { name: 'Get started' }).click();
  await page.locator('iframe[title="Navattic demo"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[title="Navattic demo"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[title="Navattic demo"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[title="Navattic demo"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[title="Navattic demo"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[title="Navattic demo"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('iframe[title="Navattic demo"]').contentFrame().getByRole('button', { name: 'Connect with us' }).click();
  const page1 = await page1Promise;
});