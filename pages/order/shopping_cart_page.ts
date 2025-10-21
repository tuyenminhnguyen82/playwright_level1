import { type Locator, type Page } from '@playwright/test';

export class ShoppingCartPage {
  readonly page: Page;
  readonly proceed_to_checkout_link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceed_to_checkout_link = page.getByRole('link', { name: 'Proceed to checkout' });
  }

  async verify_product_added(productName: string) {
    await this.page.getByRole('link', { 
          name: `Add “${productName}`
        }).isVisible();
  }

  async proceedToCheckout() {
    await this.proceed_to_checkout_link.isVisible();
    await this.proceed_to_checkout_link.click();
  }
}