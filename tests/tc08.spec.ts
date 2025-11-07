import { test } from "../fixture/page_objects";
import Constant from "../data/constants";
import { BillingDetails, PaymentMethod } from "../models/billing_details"; 


test('TC08 - Verify users can clear the cart', async ({ basePage, loginPage, productsPage, shoppingCartPage }) => {
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
   await productsPage.selectElectronicComponents();
   await productsPage.clickListView();
   await productsPage.verifyProductsListVisible();
   const productList = await productsPage.addRandomProducts(2);
   const productNames = productList.map(p => p.name);
   await shoppingCartPage.clickCart();
   await shoppingCartPage.verifyProductsAdded(productNames);
  //clear the cart
  await shoppingCartPage.clickClearCartButton();
  await shoppingCartPage.verifyCartIsEmpty();
});