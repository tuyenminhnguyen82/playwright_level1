import { expect, type Locator, type Page } from '@playwright/test';

export class ShoppingCartPage {
  readonly page: Page;
  readonly proceed_to_checkout_link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceed_to_checkout_link = page.getByRole('link', { name: 'Proceed to checkout' });
  }

  async verify_product_added(productName: string) {
    await expect(this.page.getByRole('link', { 
          name: `${productName}`
        })).toBeVisible();
  }

  async proceedToCheckout() {
    await expect(this.proceed_to_checkout_link).toBeVisible();
    await this.proceed_to_checkout_link.click();
  }
}