import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly first_popup_close_button: Locator;
  readonly login_signup_link: Locator;
  readonly cart_icon: Locator;
  readonly shop_link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.first_popup_close_button = page.getByRole('button', { name: 'Close' });
    this.login_signup_link = page.getByRole('link', { name: 'Log in / Sign up' });
    this.cart_icon =  page.getByRole('link', { name:  /\$/ });
    this.shop_link = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Shop' });
  }

  async waitForPageLoaded(timeout: number = 10000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }
  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.first_popup_close_button.click();
  }

  async gotoLoginPage() {
    await this.login_signup_link.click();
  }

  async gotoShopPage() {
    await this.shop_link.click();
    await this.waitForPageLoaded();
  }
}