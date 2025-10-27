import {expect,  type Locator, type Page } from '@playwright/test';
import { PaymentMethod } from '../../models/billing_details';
import { BasePage } from '../base_page';

export class OrderPage extends BasePage {
  readonly page: Page;  
  readonly order_page_title: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.page = page;
    this.order_page_title =  page.getByText('Thank you. Your order has');

  }

  async verifyOrderPageDisplayed(){
    await expect(this.order_page_title).toBeVisible({timeout: 10000});
  }

  async verifyProductsInOrderPage(productNames: string | string[]) {
    await this.waitForPageLoaded();
    const names = Array.isArray(productNames) ? productNames: [productNames];
    for (const name of names){
      await expect(this.page.getByRole('link', { name: name })).toBeVisible({ timeout: 10000 });
    }
  }

  async verifyPaymentMethodAndEmailInOrderPage(paymentMethod: PaymentMethod, email: string){  
    await expect(this.page.getByRole('strong').filter({ hasText: paymentMethod })).toBeVisible({timeout: 5000});
    await expect(this.page.getByRole('strong').filter({ hasText: email })).toBeVisible({timeout: 5000});
  }
}