import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base_page';
import { SortOption } from '../models/billing_details';

export class ProductsPage extends BasePage {
  readonly allDepartmentMenu: Locator;
  readonly electronicComponentsLink: Locator;
  readonly listIcon: Locator;
  readonly gridIcon: Locator;
  readonly productsGrid: Locator;
  readonly productsList: Locator;
  readonly productAddedText: Locator;
  readonly products: Locator;
  readonly sortComboBox: Locator;
  readonly productContentImage: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.allDepartmentMenu = page.getByText('All departments');
    this.electronicComponentsLink = page.getByRole('link', { name: 'Electronic Components & Supplies' });
    this.gridIcon = page.locator('.switch-grid');
    this.listIcon = page.locator('.switch-list');
    this.productsGrid = page.locator('.products-loop.products-grid');
    this.productsList = page.locator('.products-loop.products-list');
    this.productAddedText = page.getByText('Product added.');  
    this.products = page.locator(`.content-product`);
    this.sortComboBox = page.getByLabel('Shop order');
    this.productContentImage = page.locator('.product-content-image');    
  }

  async sortItemsBy(sortBy: SortOption) {
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
    await this.allDepartmentMenu.hover();
    await this.electronicComponentsLink.click();
  }

  async clickGridView(){
    await this.gridIcon.click();
    await this.waitForPageLoaded();
  }

  async verifyProductsGridVisible(){
    await expect(this.productsGrid).toBeVisible();
  }

  async clickListView(){
    await this.listIcon.click();
    await this.page.waitForURL('**=list');
  }
  async verifyProductsListVisible(){
    await expect(this.productsList).toBeVisible();
  }

  async addProducts(productNames: string | string[]): Promise<void> {
    const names = Array.isArray(productNames) ? productNames : [productNames];
    for (const name of names) {
      const addButton = this.page.getByRole('link', {
        name: `Add “${name}` 
        }).nth(1); 
      await addButton.click();
      await this.productAddedText.waitFor({ state: 'visible', timeout: 5000 });
      await addButton.waitFor({ state: 'visible', timeout: 5000 })
    }
  }

  async addRandomProducts(numberOfProducts: number): Promise<{ name: string; price: string }[]> {
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

    // Store product info here
    const addedProducts: { name: string; price: string }[] = [];

    for (const index of selectedIndexes) {
      const addButton = addButtons.nth(index);

      // Get product name
      const productName =
        (await addButton.getAttribute('data-product_name'))?.trim() || `Product ${index + 1}`;

      // Get the price belonging to this button
      // Using CSS :has() to find the price in the same product container
      const priceLocator = this.page.locator(
        `.product-details:has(a[data-product_name="${productName}"]) .price`
      );

      const priceText = (await priceLocator.locator(`//bdi`).last().textContent())?.trim() || '';
      console.log("Product = " + productName);
      console.log("Price = " + priceText);
      // Scroll to and click the button
      await addButton.scrollIntoViewIfNeeded();
      await addButton.click();

      // Wait for "added" confirmation (your custom locator)
      await this.productAddedText.waitFor({ state: 'visible', timeout: 5000 });

      // Store both name + price
      addedProducts.push({ name: productName, price: priceText });
    }

    return addedProducts;
  }  

  async clickRandomProductImage(): Promise< string > {
    // Find all products
    const count = await this.productContentImage.count();

    if (count === 0) {
      throw new Error("No product found on the page.");
    }

    // Pick unique random index
    const selectedIndex = (Math.floor(Math.random() * count));

    // Identify the random product image
    const productImage = this.productContentImage.nth(selectedIndex);
    // From that image, locate the closest parent .content-product
    const productContainer = productImage.locator('xpath=ancestor::div[contains(@class, "content-product")]');

    // Get the title text within that container
    const productName = await productContainer.locator('.product-title a').innerText();
    console.log(`Product title for image ${selectedIndex}: ${productName}`);
    productImage.click();
    return productName;
  }    
}