import { test, expect } from '@playwright/test';

test('This is my first automation case', async ({ page }) => {
  await page.goto('https://www.publicissapient.com/');
  await page.getByRole('button', { name: 'Accept All Cookies' }).click();
  await page.getByRole('link', { name: 'Lifetime Growth' }).click();
  
  await page.getByRole('button', { name: ' How do you increase' }).click();
  await page.getByRole('textbox', { name: 'First Name*' }).click();
  await page.getByRole('textbox', { name: 'First Name*' }).fill('test');
  await page.getByRole('textbox', { name: 'First Name*' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last Name*' }).fill('test');
  await page.getByRole('textbox', { name: 'Last Name*' }).press('Tab');
  await page.getByRole('textbox', { name: 'Company*' }).fill('test');
  await page.getByRole('textbox', { name: 'Company*' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email (name@company.com)*' }).fill('test@gmail.com');
  await page.getByLabel('Country', { exact: true }).selectOption('Canada');
  await page.getByRole('textbox', { name: 'Message' }).click();
  await page.getByRole('textbox', { name: 'Message' }).fill('test');
  await page.getByRole('checkbox', { name: 'Sign me up to receive future' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
});