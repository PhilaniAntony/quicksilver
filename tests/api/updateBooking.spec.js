import { expect, test } from '@playwright/test';
import bookingData from '../../data/bookingData.json';
import users from '../../data/testUsers.json';
import { apiLogin } from '../helpers/apiHelper';

let bookingId;
let token;

test.describe.serial('Restful-Booker API - Update Booking', () => {
  test.beforeAll(async ({ request, baseURL }) => {
    const createResponse = await request.post(`${baseURL}/booking`, { data: bookingData.newBooking });
    bookingId = (await createResponse.json()).bookingid;
    
    const body = await apiLogin(baseURL, users.validUser.username, users.validUser.password);
    token = body.token;
  });

  test('As a user, I should be able to update my booking', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
      data: bookingData.updatedBooking,
    });

    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.firstname).toBe(bookingData.updatedBooking.firstname);
    expect(body.lastname).toBe(bookingData.updatedBooking.lastname);
    expect(body.totalprice).toBe(bookingData.updatedBooking.totalprice);
    expect(body.bookingdates).toEqual(bookingData.updatedBooking.bookingdates);
  });

  test('As a user, I should receive a 405 error when updating a non-existent booking', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/booking/999999`, {
      headers: { Cookie: `token=${token}` },
      data: bookingData.updatedBooking,
    });

    expect(response.status()).toBe(405);
  });

  test('As a user, I should receive a 403 error when trying to update without authentication', async ({ request, baseURL }) => {
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      data: bookingData.updatedBooking,
    });

    expect(response.status()).toBe(403);
  });
});