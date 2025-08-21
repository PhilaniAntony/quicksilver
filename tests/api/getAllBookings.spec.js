const { test, expect } = require('@playwright/test');


test.describe('Restful-Booker API - Get All Bookings', () => {
  test('As a user, I should be able to retrieve all bookings', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('As a user, I should be able to filter bookings by first/last name', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking?firstname=John&lastname=Doe`);
    expect(response.status()).toBe(200);
  });

  test('As a user, I should be able to filter bookings by checkin date', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking?checkin=2025-08-18`);
    expect(response.status()).toBe(200);
  });

  test('As a user, I should be able to filter bookings by checkout date', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking?checkout=2025-08-21`);
    expect(response.status()).toBe(200);
  });

  test('As a user, I should be able to filter bookings by date range', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/booking?checkin=2025-08-18&checkout=2025-08-21`);
    expect(response.status()).toBe(200);
  });
});