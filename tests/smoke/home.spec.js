const { test, expect } = require('../../src/fixtures/test');

test('home page loads with a title and main heading', async ({ page, homePage }) => {
  await homePage.openHome();

  await expect(page).toHaveTitle(/InsureSandbox/i);
  await expect(homePage.mainHeading).toHaveText('Bernalo Labs');
  await expect(homePage.swaggerLink).toBeVisible();
});