const { test, expect } = require('../../src/fixtures/test');

test('visitor can open the quote journey', async ({ homePage, quotePage }) => {
  test.skip(process.env.RUN_QUOTE_FLOW !== 'true', 'Enable after configuring the staging CTA in .env.');

  await homePage.openHome();
  await expect(quotePage.startQuoteAction).toBeVisible();
  await quotePage.beginQuote();
  await expect(quotePage.mainHeading).toBeVisible();
});