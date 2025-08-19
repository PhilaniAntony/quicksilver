import { expect, test } from '@playwright/test';
import { uiLogin } from '../helpers/uiHelper';
import users from '../../data/testUsers.json';

test.describe('SauceDemo - Authentication', () => {
  test('As a user, I should be able to log in as a standard user', async ({ page }) => {
    const isLoggedIn = await uiLogin(page, users.uiStandardUser.username, users.uiStandardUser.password);

    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('As a user, I should see an error message for locked out user', async ({ page }) => {
    const isLoggedIn = await uiLogin(page, users.uiLockedOutUser.username, users.uiLockedOutUser.password);
    expect(isLoggedIn).toBe(false);

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('As a user, I should not be able to log in with invalid credentials', async ({ page }) => {
    const isLoggedIn = await uiLogin(page, users.validUser.username, users.validUser.password);
    expect(isLoggedIn).toBe(false);

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  test('As a user, I should not be able to log without a username', async ({ page }) => {
    const isLoggedIn = await uiLogin(page, users.invalidUser.username, users.uiStandardUser.password);
    expect(isLoggedIn).toBe(false);

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Username is required'
    );
  });

  test('As a user, I should not be able to log without a password', async ({ page }) => {
    const isLoggedIn = await uiLogin(page, users.uiStandardUser.username, users.invalidUser.password);
    expect(isLoggedIn).toBe(false);

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Password is required'
    );
  });
});