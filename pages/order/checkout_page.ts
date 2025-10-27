import { expect, type Locator, type Page } from '@playwright/test';
import {BillingDetails, PaymentMethod} from '../../models/billing_details';
import { BasePage } from '../base_page';

export class CheckoutPage extends BasePage {
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
    super(page); // Call the constructor of BasePage
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

  private getPaymentMethodLocator(paymentMethod: PaymentMethod): Locator {
    const locatorMap: Record<PaymentMethod, Locator> = {
      [PaymentMethod.Bank]: this.payment_method_direct_bank,
      [PaymentMethod.Check]: this.payment_method_check,
      [PaymentMethod.Cash]: this.payment_method_cash
    };
    return locatorMap[paymentMethod];
  }

  async verifyCheckoutPage() {
    await expect(this.page).toHaveURL('https://demo.testarchitect.com/checkout/');
  }

  async verifyProductsInCheckout(productNames: string | string[]) {
    await this.waitForPageLoaded();
    const names = Array.isArray(productNames) ? productNames: [productNames];
    for (const name of names){
      await expect(this.page.getByRole('cell', { 
          name: name
        })).toBeVisible();
    }
  }  

  async fillBillingDetails(billingDetails: BillingDetails, paymentMethod: PaymentMethod) {
    await this.first_name_txt.fill(billingDetails.firstName);
    await this.last_name_txt.fill(billingDetails.lastName);
    await this.street_address_txt.fill(billingDetails.streetAddress);
    await this.town_city_txt.fill(billingDetails.city);
    await this.zip_code_txt.fill(billingDetails.postalCode);
    await this.phone_txt.fill(billingDetails.phone);
    await this.email_address_txt.fill(billingDetails.email);
    const paymentMethodLocator = this.getPaymentMethodLocator(paymentMethod);
      await paymentMethodLocator.check();
    }

  async placeOrder() {
    await this.place_order_button.click();
    await this.waitForPageLoaded();
  }
}