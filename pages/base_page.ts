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

  async waitForLoadingIconAappear(to: number = 10000): Promise<void> {
    await this.page.waitForSelector('.blockUI.blockOverlay', { state: 'visible', timeout: to });
  }

  async waitForLoadingIconDisappear(to: number = 10000): Promise<void> {
    const overlays = this.page.locator('.blockUI.blockOverlay');
    const count = await overlays.count();

    // If no overlays, return immediately
    if (count === 0) return;

    // Wait for each overlay to disappear (either hidden or detached)
    for (let i = 0; i < count; i++) {
      await overlays.nth(i).waitFor({
        state: 'hidden', // safer than 'detached'
        timeout: to
      });
    }
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

  async goToMyAccountPage() {
    await this.page.goto('https://demo.testarchitect.com/my-account/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForURL('**/my-account/**', { timeout: 10000 });
  }
}