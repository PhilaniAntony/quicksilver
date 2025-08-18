import { expect, test } from '@playwright/test';
import users from '../../data/testUsers.json';

test.describe('Restful-Booker API - Auth', () => {
  test('Login with valid credentials', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/auth`, {
      data: users.validUser,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
  });
});
