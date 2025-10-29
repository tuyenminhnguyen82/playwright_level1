import {expect,  type Locator, type Page } from '@playwright/test';
import { PaymentMethod } from '../../models/billing_details';
import { BasePage } from '../base_page';

export class OrderPage extends BasePage {
  readonly orderPageTitle: Locator;
  readonly orderIdLocator: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.orderPageTitle = page.getByText('Thank you. Your order has');
    this.orderIdLocator = page.locator('.woocommerce-order-overview__order.order strong');
  }

  async verifyOrderPageDisplayed(){
    expect(this.orderPageTitle).toBeVisible({timeout: 10000});
  }

  async verifyProductsInOrderPage(productNames: string | string[]) {
    await this.waitForPageLoaded();
    const names = Array.isArray(productNames) ? productNames: [productNames];
    for (const name of names){
      expect(this.page.getByRole('link', { name: name })).toBeVisible({ timeout: 10000 });
    }
  }

  async verifyPaymentMethodAndEmailInOrderPage(paymentMethod: PaymentMethod, email: string){  
    expect(this.page.getByRole('strong').filter({ hasText: paymentMethod })).toBeVisible({timeout: 5000});
    expect(this.page.getByRole('strong').filter({ hasText: email })).toBeVisible({timeout: 5000});
  }

  async getOrderId(){
    const orderIdText = await this.orderIdLocator.innerText();
    console.log(orderIdText);
    return orderIdText;
  }  
}