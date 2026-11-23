const { BasePage } = require('./base.page');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.mainHeading = page.getByRole('heading', { level: 1 }).first();
    this.swaggerLink = page.getByRole('link', { name: 'Launch Swagger UI' });
  }

  async openHome() {
    await this.open('/');
  }
}

module.exports = { HomePage };