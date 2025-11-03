import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base_page';
import { stringify } from 'querystring';

export class ShoppingCartPage extends BasePage {
  readonly proceedToCheckoutLink: Locator;
  readonly cartEmptyMessage: Locator;
  readonly clearCartButton: Locator;
  readonly minusProduct: Locator;
  readonly plusProduct: Locator;
  readonly quantityTxt: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.proceedToCheckoutLink = page.getByRole('link', { name: 'Proceed to checkout' });
    this.cartEmptyMessage = page.getByRole('heading', { name: 'YOUR SHOPPING CART IS EMPTY' });   
    this.clearCartButton = page.getByText('Clear shopping cart');
    this.minusProduct = page.locator('.minus');
    this.plusProduct = page.locator('.plus');
    this.quantityTxt = page.getByRole('spinbutton', { name: /quantity/i });
  }

  async verifyProductsAdded(productNames: string | string[]) {
    await this.waitForPageLoaded();
    const names = Array.isArray(productNames) ? productNames: [productNames];
    for (const name of names){
      console.log("Verifying product in cart: ", name);
      if (await this.page.getByRole('link', { name: name }).count() === 0) {
        this.cartIcon.click();
        await this.waitForPageLoaded();
        await this.page.getByRole('link', { name: name }).waitFor({ state: 'visible', timeout: 10000 });
      }
      expect(
      this.page.getByRole('link', { name: name })
      ).toBeVisible({ timeout: 10000 });
    }
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutLink.waitFor({state: 'visible'});
    await this.proceedToCheckoutLink.click();
    await this.waitForPageLoaded();
  } 

  async clickCart(){
    await this.waitForPageLoaded();
    await this.cartIcon.click();
     await this.page.waitForURL("**/cart/", { timeout: 10000 });
  }

  async clearCart(){
    await this.cartIcon.click();
    await this.waitForPageLoaded();
    const remove_button = this.page.getByTitle('Remove this item');
    let remove_button_count = await remove_button.count();
    for (let i = 0; i < remove_button_count; i++) {
      await remove_button.nth(0).click(); // Always click the first button
      await this.waitForPageLoaded();
    }
  }  

  async verifyCartIsEmpty() {
    expect(this.cartEmptyMessage).toBeVisible({ timeout: 10000 });
  }   

  async clickClearCartButton() {
    await this.clearCartButton.click();
    await this.waitForPageLoaded();
  }

  async verifyQuantityAndTotalPrice(quantity: number, price: string) {
    // Verify quantity
    const quantityLocator = this.page.locator('div.quantity input.input-text');
    await expect.soft(quantityLocator).toHaveValue(quantity.toString());

    // Verify subtotal price
    const subtotalLocator = this.page.locator('td.product-subtotal');

    // Calculate expected total
    const priceValue = parseFloat(price.replace(/[^0-9.]/g, ''));
    const expectedTotalPrice = priceValue * quantity;

    // Build regex to match the subtotal text (with optional $ sign)
    const regex = new RegExp(`\\$?${expectedTotalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);

    // Assert subtotal matches expected price
    await expect.soft(subtotalLocator).toHaveText(regex, { timeout: 15000 });
  }

  async enterNumberOfProducts(quantity: Number) {
    await this.quantityTxt.fill(quantity.toString());
    await this.page.keyboard.press('Enter');
    await this.waitForLoadingIconAappear();
    await this.waitForLoadingIconDisappear();
  }

  async clickPlusIconNumOfTimes(n: Number) {
    const count = Number(n);
    for (let i = 0; i < count; i++) 
      await this.plusProduct.click();
      await this.waitForLoadingIconAappear();
      await this.waitForLoadingIconDisappear();
  }

  async clickMinusIconNumOfTimes(n: Number) {
    const count = Number(n);
    for (let i = 0; i < count; i++) 
      await this.minusProduct.click();
      await this.waitForLoadingIconAappear();
      await this.waitForLoadingIconDisappear(); 
  }  
}