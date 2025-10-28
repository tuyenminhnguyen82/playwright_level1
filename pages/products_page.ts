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
  readonly products: Locator;
  readonly sortComboBox: Locator;

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
    this.products = page.locator(`.content-product`);
    this.sortComboBox = page.getByLabel('Shop order');
  }

  async sortItemsBy(sortBy: "popularity" | "rating" | "date" | "price" | "price-desc") {
    await this.sortComboBox.click();
    await this.sortComboBox.selectOption(`${sortBy}`);
    await this.page.waitForURL(`**=${sortBy}`);
  }

  async verifyProductsSortedByPrice(order: "Low to High" | "High to Low"){
    await this.waitForPageLoaded();
    const priceLocators = this.products.locator(`.price`);
    const count = await priceLocators.count();
    console.log(`Number of items: ${count}`);
    const prices: number[] = [];
    
    for (let i = 0; i < count; i++) {
       const priceText = (await priceLocators.nth(i).locator(`//bdi`).last().textContent())?.trim() || '';
      console.log(`Price: ${priceText}`);
      const priceNumber =  parseFloat(priceText.replace(/[^0-9.]/g, ''));
      prices.push(priceNumber);
    }
    console.log("prices: \n", prices);
    const sortedPrices = [...prices].sort((a, b) => order === 'Low to High' ? a - b : b - a);
    console.log("sorted: \n", sortedPrices);
    expect(prices).toEqual(sortedPrices);
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
    expect(this.products_grid).toBeVisible();
  }

  async clickListView(){
    await this.list_icon.click();
    await this.page.waitForURL('**=list');
  }
  async verifyProductsListVisible(){
    expect(this.products_list).toBeVisible();
  }

  async clearCart(){
    await this.cart_icon.click();
    await this.waitForPageLoaded();
    const remove_button = this.page.getByTitle('Remove this item');
    let remove_button_count = await remove_button.count();
    for (let i = 0; i < remove_button_count; i++) {
      await remove_button.nth(0).click(); // Always click the first button
      await this.waitForPageLoaded();
    }
  }

  async addProducts(productNames: string | string[]): Promise<void> {
    const names = Array.isArray(productNames) ? productNames : [productNames];
    for (const name of names) {
      const addButton = this.page.getByRole('link', {
        name: `Add “${name}` 
        }).nth(1); 
      await addButton.click();
      await this.product_added_text.waitFor({ state: 'visible', timeout: 5000 });
      await addButton.waitFor({ state: 'visible', timeout: 5000 })
    }
  }

  async addRandomProducts(numberOfProducts: number): Promise<string[]> {
    // Find all visible "Add to cart" buttons
    const addButtons = this.page.locator('a.add_to_cart_button');
    const count = await addButtons.count();

    if (count === 0) {
      throw new Error("No 'Add to cart' buttons found on the page.");
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
      await this.product_added_text.waitFor({ state: 'visible', timeout: 5000 })  ;

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