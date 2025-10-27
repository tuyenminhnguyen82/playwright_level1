import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class ProductsPage extends BasePage {
  readonly page: Page;
  readonly all_department_menu: Locator;
  readonly electronic_components_link: Locator;
  readonly list_icon: Locator;
  readonly grid_icon: Locator;
  readonly products_grid: Locator;
  readonly products_list: Locator;
  readonly product_added_text: Locator;
  readonly first_remove_bt: Locator;
  readonly only_remove_bt: Locator;
  readonly clear_cart_bt: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.page = page;
    this.all_department_menu = page.getByText('All departments');
    this.electronic_components_link = page.getByRole('link', { name: ' Electronic Components &' });
    this.grid_icon = page.locator('.switch-grid');
    this.list_icon = page.locator('.switch-list');
    this.products_grid = page.locator('.products-loop.products-grid');
    this.products_list = page.locator('.products-loop.products-list');
    this.product_added_text = page.getByText('Product added.');
    this.only_remove_bt = page.getByRole('link', { name: 'Remove' });    
    this.first_remove_bt = page.getByRole('link', { name: 'Remove' }).first();    
    this.clear_cart_bt = page.getByText('Clear shopping cart');

  }

  async selectElectronicComponents(){
    await this.waitForPageLoaded();
    await this.all_department_menu.hover();
    await this.electronic_components_link.click();
  }

  async clickGridView(){
    await this.grid_icon.click();
    await this.waitForPageLoaded();
  }

  async verifyProductsGridVisible(){
    await expect(this.products_grid).toBeVisible();
  }

  async clickListView(){
    await this.list_icon.click();
    await this.waitForPageLoaded();
  }
  async verifyProductsListVisible(){
    await expect(this.products_list).toBeVisible();
  }

  async clearCart(){
    await this.cart_icon.click();
    await this.waitForPageLoaded();
    var clear_cart_bt_exist = await this.clear_cart_bt.count() > 0;
    while (clear_cart_bt_exist){
      const first_remove_bt_exist = await this.first_remove_bt.count() > 0;
      if (first_remove_bt_exist) {
        await this.first_remove_bt.click();
        await this.waitForPageLoaded();
      }
      else {
        await this.only_remove_bt.click();
        await this.waitForPageLoaded();
      }
      var clear_cart_bt_exist = await this.clear_cart_bt.count() > 0;
    }
  }

  async addProducts(productNames: string | string[]): Promise<void> {
    const names = Array.isArray(productNames) ? productNames : [productNames];
    for (const name of names) {
      const addButton = this.page.getByRole('link', {
        name: `Add “${name}` 
        }).nth(1); 
      await addButton.click();
      await expect(this.product_added_text).toBeVisible({ timeout: 5000 });
      await expect(addButton).toBeVisible();
    }
  }

  async addRandomProducts(numberOfProducts: number): Promise<string[]> {
    // Find all visible "Add to cart" buttons
    const addButtons = this.page.locator('a.add_to_cart_button');
    const count = await addButtons.count();

    if (count === 0) {
      throw new Error("❌ No 'Add to cart' buttons found on the page.");
    }

    // Determine how many products to add
    const productsToAdd = Math.min(numberOfProducts, count);

    // Pick unique random indexes
    const selectedIndexes = new Set<number>();
    while (selectedIndexes.size < productsToAdd) {
      selectedIndexes.add(Math.floor(Math.random() * count));
    }

    const addedProducts: string[] = [];

    for (const index of selectedIndexes) {
      const addButton = addButtons.nth(index);

      // Extract product name from the 'data-product_name' attribute
      const productName = (await addButton.getAttribute('data-product_name'))?.trim() || `Product ${index + 1}`;

      // Scroll to the element and click it
      await addButton.scrollIntoViewIfNeeded();
      await addButton.click();

      // Wait for product-added confirmation (custom locator from your page object)
      await expect(this.product_added_text).toBeVisible({ timeout: 5000 });

      addedProducts.push(productName);
    }

    return addedProducts;
  }
  
  async clickCart(){
    await this.waitForPageLoaded();
    await this.cart_icon.click();
    await this.waitForPageLoaded();
  }
}