import { expect, test } from '@playwright/test';
import bookingData from '../../data/bookingData.json';

test.describe('Restful-Booker API - Create Booking', () => {
  test('As a user, I should be able to successfully create a booking', async ({ request, baseURL }) => {
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData.newBooking,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.bookingid).toBeTruthy();
    expect(body.booking).toEqual(bookingData.newBooking);
  });

  test('As a user, I should receive an error when required fields are missing', async ({ request, baseURL }) => {
    const invalidPayload = { lastname: "Doe" };
    const response = await request.post(`${baseURL}/booking`, { data: invalidPayload });

    expect(response.status()).toBe(500);
  });
});