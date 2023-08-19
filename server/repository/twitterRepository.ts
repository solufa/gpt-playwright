import type { TrendModel } from '$/commonTypesWithClient/models';
import { TWITTER_PASSWORD, TWITTER_USERNAME } from '$/service/envValues';
import type { Browser, BrowserContext, Page } from 'playwright';
import { chromium } from 'playwright';

const origin = 'https://twitter.com';

let browser: Browser | null = null;
let context: BrowserContext | null = null;
let page: Page | null = null;

const getLoggedInPage = async () => {
  if (page?.isClosed() === false) return page;

  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({ locale: 'ja-JP' });
  page = await context.newPage();

  await page.goto(origin);
  await page.getByTestId('loginButton').click();
  await page.locator('input[autocomplete="username"]').fill(TWITTER_USERNAME);
  await page.getByText('次へ').click();
  await page.locator('input[name="password"]').fill(TWITTER_PASSWORD);
  await page.getByTestId('LoginForm_Login_Button').click();
  await page.getByTestId('SideNav_NewTweet_Button').waitFor();

  return page;
};

export const twitterRepository = {
  fetchTrends: async (): Promise<TrendModel[]> => {
    const page = await getLoggedInPage();

    await page.goto(`${origin}/explore/tabs/trending`);

    const selector = '[data-testid="trend"] > div > div:nth-child(2)';
    await page.waitForSelector(selector);

    return page
      .locator(selector)
      .allInnerTexts()
      .then((trends) =>
        trends.map((t): TrendModel => ({ isHashtag: t.startsWith('#'), word: t.replace('#', '') }))
      );
  },
};
