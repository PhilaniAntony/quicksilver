import { expect, test } from '@playwright/test';

test.describe('SauceDemo Authentication', () => {
  test('should login with valid user', async ({ page }) => {
    await page.goto('/'); // baseURL = https://www.saucedemo.com
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Assert user is redirected to inventory page
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('should show error for locked out user', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});