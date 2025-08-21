const { test, expect } = require('@playwright/test');
const { uiLogin } = require('../helpers/uiHelper');
require('dotenv').config();

test.describe('SauceDemo - Authentication', () => {
  test('As a user, I should be able to log in as a standard user', async ({ page }) => {
    const isLoggedIn = await uiLogin(
      page,
      process.env.WEB_STANDARD_USER_USERNAME,
      process.env.WEB_USER_PASSWORD
    );

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('As a user, I should see an error message for locked out user', async ({ page }) => {
    const isLoggedIn = await uiLogin(page,
      process.env.WEB_LOCKEDOUT_USER_USERNAME,
      process.env.WEB_USER_PASSWORD
    );

    expect(isLoggedIn).toBe(false);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('As a user, I should not be able to log in with invalid credentials', async ({ page }) => {
    const isLoggedIn = await uiLogin(page,
      process.env.API_USER_USERNAME,
      process.env.API_USER_PASSWORD
    );

    expect(isLoggedIn).toBe(false);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('As a user, I should not be able to log without a username', async ({ page }) => {
    const isLoggedIn = await uiLogin(
      page,
      process.env.INVALID_USER_USERNAME,
      process.env.WEB_USER_PASSWORD
    );

    expect(isLoggedIn).toBe(false);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username is required'
    );
  }); 

  test('As a user, I should not be able to log without a password', async ({ page }) => {
    const isLoggedIn = await uiLogin(page,
      process.env.WEB_STANDARD_USER_USERNAME,
      process.env.INVALID_USER_PASSWORD
    );

    expect(isLoggedIn).toBe(false);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Password is required'
    );
  });
});