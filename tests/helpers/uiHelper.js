async function uiLogin(page, username, password) {
    await page.goto('/');

    await page.fill('#user-name', username);
    await page.fill('#password', password);
    await page.click('#login-button');

    if (await page.locator('.inventory_list').isVisible()) {
        return true;
    }

    return false;
}

module.exports = {
    uiLogin,
};