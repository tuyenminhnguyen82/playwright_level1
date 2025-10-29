import { expect, type Locator, type Page } from '@playwright/test';
import {BillingDetails, PaymentMethod} from '../../models/billing_details';
import { BasePage } from '../base_page';

export class CheckoutPage extends BasePage {
  readonly placeOrderButton: Locator;
  readonly firstNameTxt: Locator;
  readonly lastNameTxt: Locator;
  readonly streetAddressTxt: Locator;
  readonly townCityTxt: Locator;
  readonly zipCodeTxt: Locator;
  readonly phoneTxt: Locator;
  readonly emailAddressTxt: Locator;  
  readonly paymentMethodDirectBank: Locator;
  readonly paymentMethodCheck: Locator;
  readonly paymentMethodCash: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.firstNameTxt = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameTxt = page.getByRole('textbox', { name: 'Last name *' });
    this.streetAddressTxt = page.getByRole('textbox', { name: 'Street address *' });
    this.townCityTxt = page.getByRole('textbox', { name: 'Town / City *' });
    this.zipCodeTxt = page.getByRole('textbox', { name: 'ZIP Code *' });
    this.phoneTxt = page.getByRole('textbox', { name: 'Phone *' });
    this.emailAddressTxt = page.getByRole('textbox', { name: 'Email address *' });
    this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
    this.paymentMethodDirectBank = page.getByRole('radio', { name: 'Direct bank transfer' });
    this.paymentMethodCheck = page.getByRole('radio', { name: 'Check payments' });
    this.paymentMethodCash = page.getByRole('radio', { name: 'Cash on delivery' });
  }

  private getPaymentMethodLocator(paymentMethod: PaymentMethod): Locator {
    const locatorMap: Record<PaymentMethod, Locator> = {
      [PaymentMethod.Bank]: this.paymentMethodDirectBank,
      [PaymentMethod.Check]: this.paymentMethodCheck,
      [PaymentMethod.Cash]: this.paymentMethodCash
    };
    return locatorMap[paymentMethod];
  }

  async verifyCheckoutPage() {
    expect(this.page).toHaveURL('https://demo.testarchitect.com/checkout/');
  }

  async verifyProductsInCheckout(productNames: string | string[]) {
    await this.waitForPageLoaded();
    const names = Array.isArray(productNames) ? productNames: [productNames];
    for (const name of names){
      expect(this.page.getByRole('cell', { 
          name: name
        })).toBeVisible();
    }
  }  

  async fillBillingDetails(billingDetails: BillingDetails, paymentMethod: PaymentMethod) {
    await this.firstNameTxt.fill(billingDetails.firstName);
    await this.lastNameTxt.fill(billingDetails.lastName);
    await this.streetAddressTxt.fill(billingDetails.streetAddress);
    await this.townCityTxt.fill(billingDetails.city);
    await this.zipCodeTxt.fill(billingDetails.postalCode);
    await this.phoneTxt.fill(billingDetails.phone);
    await this.emailAddressTxt.fill(billingDetails.email);
    const paymentMethodLocator = this.getPaymentMethodLocator(paymentMethod);
      await paymentMethodLocator.check();
    }

  async placeOrder() {
    await this.placeOrderButton.click();
    await this.page.waitForURL('**/order-received/**', { timeout: 20000 });
  }
}