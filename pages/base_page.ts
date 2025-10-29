import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly firstPopupCloseButton: Locator;
  readonly loginSignupLink: Locator;
  readonly cartIcon: Locator;
  readonly shopLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstPopupCloseButton = page.getByRole('button', { name: 'Close' });
    this.loginSignupLink = page.getByRole('link', { name: 'Log in / Sign up' });
    this.cartIcon =  page.getByRole('link', { name:  /\$/ });
    this.shopLink = page.locator('#menu-main-menu-1').getByRole('link', { name: 'Shop' });
  }

  async waitForPageLoaded(timeout: number = 10000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }
  async navigate() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.firstPopupCloseButton.click();
  }

  async gotoLoginPage() {
    await this.loginSignupLink.click();
  }

  async gotoShopPage() {
    await this.shopLink.click();
    await this.waitForPageLoaded();
  }
}