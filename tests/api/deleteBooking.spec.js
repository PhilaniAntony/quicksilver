const { test, expect } = require('@playwright/test');
const { apiLogin } = require('../helpers/apiHelper');
const { newBooking } = require('../../data/bookingData.json');
require('dotenv').config();

let bookingId;
let token;

test.describe.serial('Restful-Booker API - Delete Booking', () => {
  test.beforeAll(async ({ request, baseURL }) => {
    const createResponse = await request.post(`${baseURL}/booking`, { data: newBooking });
    bookingId = (await createResponse.json()).bookingid;

    const body = await apiLogin(baseURL, process.env.API_USER_USERNAME, process.env.API_USER_PASSWORD);
    token = body.token;
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