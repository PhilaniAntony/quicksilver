import { expect, test } from '@playwright/test';
import users from '../../data/testUsers.json';
import { uiLogin } from '../helpers/uiHelper';

test.describe('SauceDemo - Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const isLoggedIn = await uiLogin(page, users.uiStandardUser.username, users.uiStandardUser.password);
    expect(isLoggedIn).toBe(true);

    await page.click('.inventory_item:nth-child(1) .btn_inventory');
    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('1');
  });

  test('As a user, I should be able to proceed to checkout from the cart page', async ({ page }) => {
    await page.click('.shopping_cart_link');
    await expect(page.url()).toContain('/cart.html');

    const cartItem = page.locator('.inventory_item_name');
    await expect(cartItem).toHaveText('Sauce Labs Backpack');

    const itemPrice = page.locator('.inventory_item_price');
    await expect(itemPrice).toHaveText('$29.99');

    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');

    await page.click('[data-test="continue"]');
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');

    await page.click('[data-test="finish"]');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toHaveText(/Your order has been dispatched/);
  });
});
