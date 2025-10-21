import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkout_header: Locator;
  readonly place_order_button: Locator;
  readonly first_name_txt: Locator;
  readonly last_name_txt: Locator;
  readonly street_address_txt: Locator;
  readonly town_city_txt: Locator;
  readonly zip_code_txt: Locator;
  readonly phone_txt: Locator;
  readonly email_address_txt: Locator;  
  readonly payment_method_direct_bank: Locator;
  readonly payment_method_check: Locator;
  readonly payment_method_cash: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkout_header = page.getByText('Shopping cart Checkout Order')
    this.first_name_txt = page.getByRole('textbox', { name: 'First name *' });
    this.last_name_txt = page.getByRole('textbox', { name: 'Last name *' });
    this.street_address_txt = page.getByRole('textbox', { name: 'Street address *' });
    this.town_city_txt = page.getByRole('textbox', { name: 'Town / City *' });
    this.zip_code_txt = page.getByRole('textbox', { name: 'ZIP Code *' });
    this.phone_txt = page.getByRole('textbox', { name: 'Phone *' });
    this.email_address_txt = page.getByRole('textbox', { name: 'Email address *' });
    this.place_order_button = page.getByRole('button', { name: 'Place order' });
    this.payment_method_direct_bank = page.getByRole('radio', { name: 'Direct bank transfer' });
    this.payment_method_check = page.getByRole('radio', { name: 'Check payments' });
    this.payment_method_cash = page.getByRole('radio', { name: 'Cash on delivery' });
  }

  async verifyCheckoutPage() {
    await expect(this.page).toHaveURL('https://demo.testarchitect.com/checkout/');
  }

  async verifyProductInCheckout(productName: string) {
    await expect(this.page.getByRole('cell', { 
      name: `${productName}`
    })).toBeVisible();
  }

  async fillBillingDetails(firstName: string, lastName: string, streetAddress: string, townCity: string, zipCode: string, phone: string, emailAddress: string, paymentMethod: string) {
    await this.first_name_txt.fill(firstName);
    await this.last_name_txt.fill(lastName);
    await this.street_address_txt.fill(streetAddress);
    await this.town_city_txt.fill(townCity);
    await this.zip_code_txt.fill(zipCode);
    await this.phone_txt.fill(phone);
    await this.email_address_txt.fill(emailAddress);
    if (paymentMethod === 'Direct bank transfer') {
      await this.payment_method_direct_bank.check();
    } else if (paymentMethod === 'Check payments') {
      await this.payment_method_check.check();
    } else if (paymentMethod === 'Cash on delivery') {
      await this.payment_method_cash.check();
    } 
  }

  async placeOrder() {
    await this.place_order_button.click();
  }
}