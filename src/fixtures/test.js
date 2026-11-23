const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { QuotePage } = require('../pages/quote.page');

const test = base.extend({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  quotePage: async ({ page }, use) => use(new QuotePage(page))
});

module.exports = { test, expect };