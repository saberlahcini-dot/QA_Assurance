const { BasePage } = require('./base.page');
const { quoteCtaName } = require('../config');

class QuotePage extends BasePage {
  constructor(page) {
    super(page);
    this.startQuoteAction = page
      .getByRole('link', { name: quoteCtaName, exact: true })
      .or(page.getByRole('button', { name: quoteCtaName, exact: true }));
    this.mainHeading = page.getByRole('heading', { level: 1 }).first();
  }

  async beginQuote() {
    await this.clickAtPace(this.startQuoteAction);
  }
}

module.exports = { QuotePage };