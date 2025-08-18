import { expect, test } from '@playwright/test';
import bookingData from '../../data/bookingData.json';

let bookingId;

test.describe.serial('Restful-Booker API - Get Booking by ID', () => {
  test.beforeAll(async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/booking`, { data: bookingData.newBooking });
    bookingId = (await response.json()).bookingid;
  });

  test('As a user, I should be able to retrieve the created booking by ID without authentication', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe(bookingData.newBooking.firstname);
    expect(body.lastname).toBe(bookingData.newBooking.lastname);
    expect(body.totalprice).toBe(bookingData.newBooking.totalprice);
    expect(body.depositpaid).toBe(bookingData.newBooking.depositpaid);
    expect(body.bookingdates.checkin).toBe(bookingData.newBooking.bookingdates.checkin);
    expect(body.bookingdates.checkout).toBe(bookingData.newBooking.bookingdates.checkout);
    expect(body.additionalneeds).toBe(bookingData.newBooking.additionalneeds);
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