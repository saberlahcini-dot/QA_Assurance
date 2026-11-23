const { pacedClickDelayMs } = require('../config');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    await this.page.goto(path);
  }

  async clickAtPace(locator) {
    await locator.click({ delay: pacedClickDelayMs });
  }
}

module.exports = { BasePage };