import {expect,  type Locator, type Page } from '@playwright/test';

export class OrderPage {
  readonly page: Page;  
  readonly order_page_title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.order_page_title =  page.getByText('Thank you. Your order has been received.');
  }

  async verifyOrderPageDisplayed(){
    await expect(this.order_page_title).toBeVisible({timeout: 10000});
  }
  async verifyProductAddedInOrderPage(productName: string){  
    await expect(this.page.getByRole('link', { 
          name: `${productName}`
        })).toBeVisible();
  }
  async verifyPaymentMethodAndEmailInOrderPage(paymentMethod: string, email: string){  
    await expect(this.page.getByRole('strong').filter({ hasText: paymentMethod })).toBeVisible({timeout: 5000});
    await expect(this.page.getByRole('strong').filter({ hasText: email })).toBeVisible({timeout: 5000});
  }
}