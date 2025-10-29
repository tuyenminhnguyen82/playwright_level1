import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class MyAccountPage extends BasePage {
  readonly ordersMenu: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.ordersMenu = page.getByRole('link', { name: ' Orders' });
  }

  async goToOrdersSection() {
    await this.ordersMenu.click();
    await this.page.waitForURL("**/my-account/orders/", { timeout: 10000 });
  }

  async verifyOrdersInOrderHistory(orderId: string | string[]) {
    const orderIds = Array.isArray(orderId) ? orderId : [orderId];
    console.log("Order IDs to verify: ", orderIds);
    for (const id of orderIds) {
      expect(this.page.getByRole('link', { name: `#${id}` })).toBeVisible({ timeout: 10000 });
    }
  }
}