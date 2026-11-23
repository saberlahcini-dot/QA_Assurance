function readClickDelay() {
  const value = Number(process.env.PACED_CLICK_DELAY_MS ?? 100);
  if (!Number.isInteger(value) || value < 0 || value > 2_000) {
    throw new Error('PACED_CLICK_DELAY_MS must be an integer from 0 to 2000.');
  }
  return value;
}

module.exports = {
  pacedClickDelayMs: readClickDelay(),
  quoteCtaName: process.env.QUOTE_CTA_NAME || 'Get a quote'
};