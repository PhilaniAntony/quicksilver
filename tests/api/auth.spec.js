import { expect, test } from '@playwright/test';
import { apiLogin } from '../helpers/apiHelper';  
import users from '../../data/testUsers.json';

test.describe('Restful-Booker API - Auth', () => {
  test('As a user, I should be able to log in with valid credentials', async ({ request, baseURL }) => {
    const body = await apiLogin(baseURL, users.validUser.username, users.validUser.password);

    expect(body).not.toBeNull();
    expect(typeof body).toBe('object');
    expect(body).toHaveProperty('token');
  });

  test('As a user, I should receive an error when logging in without credentials', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: users.invalidUser.username,
        password: users.invalidUser.password,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('reason', 'Bad credentials');
  });
});
