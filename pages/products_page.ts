import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly all_department_menu: Locator;
  readonly electronic_components_link: Locator;
  readonly list_icon: Locator;
  readonly grid_icon: Locator;
  readonly cart_icon: Locator;
  readonly products_grid: Locator;
  readonly products_list: Locator;
  readonly product_added_text: Locator;

  constructor(page: Page) {
    this.page = page;
    this.all_department_menu = page.getByText('All departments');
    this.electronic_components_link = page.getByRole('link', { name: ' Electronic Components &' });
    this.grid_icon = page.locator('.switch-grid');
    this.list_icon = page.locator('.switch-list');
    this.products_grid = page.locator('.products-loop.products-grid');
    this.products_list = page.locator('.products-loop.products-list');
    this.cart_icon =  page.getByRole('link', { name:  /\$/ });
    this.product_added_text = page.getByText('Product added.');
  }

  async selectElectronicComponents(){
    await this.all_department_menu.hover();
    await this.electronic_components_link.click();
  }

  async clickGridView(){
    await this.grid_icon.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyProductsGridVisible(){
    await expect(this.products_grid).toBeVisible();
  }

  async clickListView(){
    await this.list_icon.click();
    await this.page.waitForLoadState('networkidle');
  }
  async verifyProductsListVisible(){
    await expect(this.products_list).toBeVisible();
  }

  async addProduct(productName: string){
    await (this.page.getByRole('link', {
      name: `Add “${productName}` 
      }).nth(1)
    ).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyProductAddedSuccessfully(){
    await expect(this.product_added_text).toBeVisible();
  }
  
  async clickCart(){
    await this.cart_icon.click();
  }
}