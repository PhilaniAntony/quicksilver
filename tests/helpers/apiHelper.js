const { request } = require('@playwright/test');

async function apiLogin(baseURL, username, password) {
    const requestContext = await request.newContext({ baseURL });

    const response = await requestContext.post('/auth', {
        data: {
            username,
            password,
        },
    });

    if (response.ok()) {
        const body = await response.json();
        return body;
    } else {
        return null;
    }
}

module.exports = { apiLogin };