const { test, expect } = require('@playwright/test');
const { apiLogin } = require('../helpers/apiHelper');
require('dotenv').config();


test.describe('Restful-Booker API - Auth', () => {
  test('As a user, I should be able to log in with valid credentials', async ({ request, baseURL }) => {
    const body = await apiLogin(
      baseURL,
      process.env.API_USER_USERNAME,
      process.env.API_USER_PASSWORD
    );

    expect(body).not.toBeNull();
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('token');
  });

  test('As a user, I should receive an error when logging in without credentials', async ({ request, baseURL }) => {
    const body = await apiLogin(
      baseURL,
      process.env.INVALID_USER_USERNAME,
      process.env.INVALID_USER_PASSWORD
    );

    expect(body).not.toBeNull();
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('reason', 'Bad credentials');
  });
});
