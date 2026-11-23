const fs = require('node:fs/promises');

async function main() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.log('Telegram report skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.');
    return;
  }

  const reportPath = process.env.PLAYWRIGHT_JSON_REPORT || 'test-results/results.json';
  const report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
  const stats = report.stats || {};
  const failed = Number(stats.unexpected || 0);
  const passed = Number(stats.expected || 0);
  const skipped = Number(stats.skipped || 0);
  const flaky = Number(stats.flaky || 0);
  const runUrl = process.env.GITHUB_RUN_URL || 'Local run';
  const text = [
    `Playwright ${failed === 0 ? 'PASSED' : 'FAILED'}`,
    `Passed: ${passed} | Failed: ${failed} | Skipped: ${skipped} | Flaky: ${flaky}`,
    `Run: ${runUrl}`
  ].join('\n');

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text })
  });
  if (!response.ok) {
    throw new Error(`Telegram report request failed with HTTP ${response.status}.`);
  }
  console.log('Telegram test summary sent.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});