import { expect, test } from '@playwright/test';
import users from '../../data/testUsers.json';
import { uiLogin } from '../helpers/uiHelper';

test.describe('SauceDemo - Cart', () => {
  test.beforeEach(async ({ page }) => {
    const isLoggedIn = await uiLogin(page, users.uiStandardUser.username, users.uiStandardUser.password);
    expect(isLoggedIn).toBe(true);
  });

  test('As a user, I should be able to add a product to the cart', async ({ page }) => {
    await page.click('.inventory_item:nth-child(1) .btn_inventory');
    await page.click('.shopping_cart_link');

    expect(page.url()).toContain('/cart.html');
    const cartItems = await page.$$('.cart_item');
    const cartQuantity = await page.$eval('.cart_quantity', el => el.textContent);
    expect(cartQuantity).toBe('1');
    expect(cartItems.length).toBe(1);
  });

  test('As a user, I should be able to remove a product from the cart on the cart page', async ({ page }) => {
    await page.click('.inventory_item:nth-child(1) .btn_inventory');
    await page.click('.shopping_cart_link');

    await expect(page.url()).toContain('/cart.html');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    const cartItems = await page.$$('.cart_item');
    expect(cartItems.length).toBe(0);
  });

  test('As a user, I should be able to remove a product from the cart on the inventory page', async ({ page }) => {
    await page.click('.inventory_item:nth-child(1) .btn_inventory');
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('1');

    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await expect(cartBadge).toHaveCount(0);
  });
});
