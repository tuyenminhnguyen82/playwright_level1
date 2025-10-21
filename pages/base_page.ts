import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly first_popup_close_button: Locator;
  readonly login_signup_link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.first_popup_close_button = page.getByRole('button', { name: 'Close' });
    this.login_signup_link = page.getByRole('link', { name: 'Log in / Sign up' });
  }

  async navigate() {
    await this.page.goto('https://demo.testarchitect.com/', { waitUntil: 'domcontentloaded' });
    await this.first_popup_close_button.click();
  }

  async gotoLoginPage() {
    await this.login_signup_link.click();
  }
}