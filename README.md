# Assurance Site QA

A small, extensible UI automation framework using JavaScript, Playwright, and the Page Object Model. CI runs against a configured staging site; Telegram summaries are optional.

## Requirements

- Node.js 20 or newer
- An authorized assurance/insurance test environment

## Run locally

1. Install packages: `npm install`
2. Copy `.env.example` to `.env`. It targets the public [InsureSandbox demo](https://www.insuresandbox.com); HTTPS is required except for localhost. For CI, prefer a staging environment you control.
3. Install Chromium: `npx playwright install chromium`
4. Run smoke tests: `npm run test:smoke`
5. View the HTML report: `npm run report`

The initial smoke check verifies the InsureSandbox title, brand heading, and visible Swagger UI link. Update its page object or assertions when switching to another site.

## Add a test

Create a spec under `tests/smoke/` or `tests/flows/`, use the fixtures from `src/fixtures/test.js`, and place reusable page behavior under `src/pages/`. Prefer role-, label-, and test-id-based locators. Keep tests isolated and avoid submitting real policies, payments, or customer data.

The quote-journey example is skipped by default. Configure `QUOTE_CTA_NAME` in `.env`, verify it targets a safe staging flow, and set `RUN_QUOTE_FLOW=true` to enable it. Extend the page object with the site's actual form labels before testing later steps.

`clickAtPace()` adds a small fixed delay to a Playwright click for deliberate UI interaction. Playwright still handles locator readiness and actionability; this is not stealth automation and must not be used to bypass bot protections or site controls.

## GitHub Actions

Push this project to GitHub and add the repository variable `BASE_URL` with the HTTPS staging URL. The workflow runs on pushes and pull requests to `main`, and can also be started manually. It uploads the HTML/JSON reports as a workflow artifact.

For Telegram notifications, add repository secrets `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Notifications are skipped when either is missing. Never commit `.env`, bot tokens, customer data, or production credentials.

## Useful commands

- `npm test`: run all tests
- `npm run test:smoke`: run homepage smoke tests
- `npm run test:headed`: run with a visible browser
- `npm run test:ui`: open Playwright's test UI
- `npm run report`: open the latest HTML report