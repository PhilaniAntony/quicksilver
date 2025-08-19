import { expect, test } from '@playwright/test';
import { uiLogin } from '../helpers/uiHelper';
import users from '../../data/testUsers.json';

test.describe('SauceDemo - Inventory', () => {
  test.beforeEach(async ({ page }) => {
    const isLoggedIn = await uiLogin(page, users.uiStandardUser.username, users.uiStandardUser.password);
    expect(isLoggedIn).toBe(true);
  });

  test('As a user, I should see a list of products upon logging in', async ({ page }) => {
    await expect(page).toHaveURL(/inventory.html/)
    await expect(page.locator('.inventory_list')).toBeVisible();

    const products = await page.$$('.inventory_item');
    expect(products.length).toBeGreaterThan(0);
  });

  test('As a user, I should see the products sorted by name in ascending order by default', async ({ page }) => {
    await expect(page).toHaveURL(/inventory.html/)
    await expect(page.locator('.inventory_list')).toBeVisible();

    const products = await page.$$('.inventory_item');
    const productNames = await Promise.all(products.map(product => product.$eval('.inventory_item_name', el => el.textContent)));
    expect(productNames).toEqual(productNames.sort());
  });

  test('As a user, I should be able to sort products name in descending order when I select "za" from the sort dropdown', async ({ page }) => {
    await expect(page).toHaveURL(/inventory.html/)
    await expect(page.locator('.inventory_list')).toBeVisible();

    await page.selectOption('[data-test="product-sort-container"]', 'za');

    const products = await page.$$('.inventory_item');
    const productNames = await Promise.all(products.map(product => product.$eval('.inventory_item_name', el => el.textContent)));
    expect(productNames).toEqual(productNames.sort().reverse());
  });

  test('As a user, I should be able to sort products by price from the least expensive to the most expensive', async ({ page }) => {
    await expect(page).toHaveURL(/inventory.html/)
    await expect(page.locator('.inventory_list')).toBeVisible();

    await page.selectOption('[data-test="product-sort-container"]', 'lohi');

    const products = await page.$$('.inventory_item');
    const productPrices = await Promise.all(products.map(product => product.$eval('.inventory_item_price', el => parseFloat(el.textContent.replace('$', '')))));
    const expected = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(expected);
  });

  test('As a user, I should be able to sort products by price from the most expensive to the least expensive', async ({ page }) => {
    await expect(page).toHaveURL(/inventory.html/)
    await expect(page.locator('.inventory_list')).toBeVisible();

    await page.selectOption('[data-test="product-sort-container"]', 'hilo');

    const products = await page.$$('.inventory_item');
    const productPrices = await Promise.all(products.map(product => product.$eval('.inventory_item_price', el => parseFloat(el.textContent.replace('$', '')))));
    const expected = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(expected);
  });

});
