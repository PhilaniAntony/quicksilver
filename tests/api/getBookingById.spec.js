const { test, expect } = require('@playwright/test');
const { newBooking, updatedBooking } = require('../../data/bookingData.json');

let bookingId;

test.describe.serial('Restful-Booker API - Get Booking by ID', () => {
  test.beforeAll(async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/booking`, { data: newBooking });
    bookingId = (await response.json()).bookingid;
  });

  test('As a user, I should be able to retrieve the created booking by ID without authentication', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe(newBooking.firstname);
    expect(body.lastname).toBe(newBooking.lastname);
    expect(body.totalprice).toBe(newBooking.totalprice);
    expect(body.depositpaid).toBe(newBooking.depositpaid);
    expect(body.bookingdates.checkin).toBe(newBooking.bookingdates.checkin);
    expect(body.bookingdates.checkout).toBe(newBooking.bookingdates.checkout);
    expect(body.additionalneeds).toBe(newBooking.additionalneeds);
  });

  test('As a user, I should receive a 404 error for a non-existent booking', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking/999999`);
    expect(response.status()).toBe(404);
  });

  test('As a user, I should receive a 404 error for an invalid booking ID value', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking/abc`);
    expect(response.status()).toBe(404);
  });
});