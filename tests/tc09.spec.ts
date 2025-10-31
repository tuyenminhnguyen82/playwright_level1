import { test } from "../fixture/page_objects";
import Constant from "../data/constants";
import { BillingDetails } from "../models/billing_details"; 


test('TC09 - Verify users can update quantity of product in cart', async ({ basePage, loginPage, productsPage, shoppingCartPage }) => {
   test.setTimeout(5 * 60 * 1000); //set timeout to 5 minutes
   const billingDetails = new BillingDetails(
       'Tuyen',
       'Nguyen',
       'Tran Quoc Toan',
       'Da Nang',
       '11111',
       '0123456789',
       'tuyen.minh.nguyen@agest.vn'
   );
   //navigate to the application
   await basePage.navigate();
  //  login to the application
   await basePage.gotoLoginPage();
   await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
   await shoppingCartPage.clearCart();
   //navigate to products page and perform actions
   await basePage.gotoShopPage();
   await productsPage.clickListView();
   const productList = await productsPage.addRandomProducts(1);
   const productNames = productList.map(p => p.name);
   const productPrices = productList.map(p => p.price);
   const productPrice = String(productPrices[0]);
   await shoppingCartPage.clickCart();
   await shoppingCartPage.verifyProductsAdded(productNames);
   await shoppingCartPage.verifyQuantityAndTotalPrice(1, productPrice);
   await shoppingCartPage.clickPlusIconNumOfTimes(1);
   await shoppingCartPage.verifyQuantityAndTotalPrice(2, productPrice);
   await shoppingCartPage.enterNumberOfProducts(4);
   await shoppingCartPage.verifyQuantityAndTotalPrice(4, productPrice);
   await shoppingCartPage.clickMinusIconNumOfTimes(1);
   await shoppingCartPage.verifyQuantityAndTotalPrice(3, productPrice);
});