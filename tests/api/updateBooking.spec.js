const { test, expect } = require('@playwright/test');
const { newBooking, updatedBooking } = require('../../data/bookingData.json');
const { apiLogin } = require('../helpers/apiHelper');
require('dotenv').config();

let bookingId;
let token;

test.describe.serial('Restful-Booker API - Update Booking', () => {
  test.beforeAll(async ({ request, baseURL }) => {
    const createResponse = await request.post(`${baseURL}/booking`, { data: newBooking });
    bookingId = (await createResponse.json()).bookingid;

    const body = await apiLogin(baseURL, process.env.API_USER_USERNAME, process.env.API_USER_PASSWORD);
    token = body.token;
  });

  test('As a user, I should be able to update my booking', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
      data: updatedBooking,
    });

    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.firstname).toBe(updatedBooking.firstname);
    expect(body.lastname).toBe(updatedBooking.lastname);
    expect(body.totalprice).toBe(updatedBooking.totalprice);
    expect(body.bookingdates).toEqual(updatedBooking.bookingdates);
  });

  test('As a user, I should receive a 405 error when updating a non-existent booking', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/booking/999999`, {
      headers: { Cookie: `token=${token}` },
      data: updatedBooking,
    });

    expect(response.status()).toBe(405);
  });

  test('As a user, I should receive a 403 error when trying to update without authentication', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      data: updatedBooking,
    });

    expect(response.status()).toBe(403);
  });
});