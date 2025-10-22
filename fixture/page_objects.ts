import { test as base } from "@playwright/test";
import { LoginPage } from '../pages/login_page';
import { BasePage } from '../pages/base_page';
import { ProductsPage } from '../pages/products_page';
import { ShoppingCartPage } from '../pages/order/shopping_cart_page';
import { CheckoutPage } from '../pages/order/checkout_page';
import { OrderPage } from "../pages/order/order_page";    

export type PageObjects = {
    loginPage: LoginPage;
    basePage: BasePage;
    productsPage: ProductsPage;
    shoppingCartPage: ShoppingCartPage;
    checkoutPage: CheckoutPage;
    orderPage: OrderPage;
};

export const test = base.extend<PageObjects>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },    
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    orderPage: async ({ page }, use) => {
        await use(new OrderPage(page));
    }
});
