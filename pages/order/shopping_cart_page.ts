import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base_page';

export class ShoppingCartPage extends BasePage {
  readonly page: Page;
  readonly proceed_to_checkout_link: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.page = page;
    this.proceed_to_checkout_link = page.getByRole('link', { name: 'Proceed to checkout' });
  }

  async verifyProductsAdded(productNames: string | string[]) {
    await this.waitForPageLoaded();
    const names = Array.isArray(productNames) ? productNames: [productNames];
    for (const name of names){
      if (await this.page.getByRole('link', { name: name }).count() === 0) {
        this.cart_icon.click();
        await this.waitForPageLoaded();
      }
      expect(
      this.page.getByRole('link', { name: name })
      ).toBeVisible({ timeout: 10000 });
    }
  }

  async proceedToCheckout() {
    await this.proceed_to_checkout_link.waitFor({state: 'visible'});
    await this.proceed_to_checkout_link.click();
    await this.waitForPageLoaded();
  }
}