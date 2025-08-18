import { expect, test } from '@playwright/test';
import bookingData from '../../data/bookingData.json';
import users from '../../data/testUsers.json';

let bookingId;
let token;

test.describe.serial('Restful-Booker API - Delete Booking', () => {
  test.beforeAll(async ({ request, baseURL }) => {
    const createResponse = await request.post(`${baseURL}/booking`, { data: bookingData.newBooking });
    bookingId = (await createResponse.json()).bookingid;

    const authResponse = await request.post(`${baseURL}/auth`, { data: users.validUser });
    token = (await authResponse.json()).token;
  });

  test('As a user, I should be able to delete my booking', async ({ request, baseURL }) => {
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status()).toBe(201);
  });

  test('As a user, I should receive a 405 error when deleting a non-existent booking', async ({ request, baseURL }) => {
    const response = await request.delete(`${baseURL}/booking/999999`, {
      headers: { Cookie: `token=${token}` },
    });

    expect(response.status()).toBe(405);
  });

  test('As a user, I should receive a 403 error when trying to delete without authentication', async ({ request, baseURL }) => {
    const response = await request.delete(`${baseURL}/booking/${bookingId}`);
    expect(response.status()).toBe(403);
  });
});