import { type Locator, type Page } from '@playwright/test';

export class OrderPage {
  readonly page: Page;  
  readonly order_page_header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.order_page_header =  page.getByText('Thank you. Your order has been received.');
  }

  async verifyOrderPage(){
    await this.order_page_header.isVisible();
  }
  async verifyProductAddedInOrderPage(productName: string){  
    await this.page.getByRole('link', { 
        name: '$productName' 
    }).isVisible();
  }
  async verifyPaymentMethodAndEmailInOrderPage(paymentMethod: string, email: string){  
    await this.page.getByRole('listitem').filter({ hasText: 'Payment method: $paymentMethod' }).isVisible();
    await this.page.getByRole('strong').filter({ hasText: '$email' }).isVisible();
  }
}