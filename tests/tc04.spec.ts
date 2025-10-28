import { test } from "../fixture/page_objects";
import Constant from "../data/constants"; 
import { BillingDetails, PaymentMethod, SortType } from "../models/billing_details"; 


test('TC04 - Verify users can sort items by price', async ({ basePage, loginPage, productsPage, shoppingCartPage, checkoutPage, orderPage }) => {
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
  //login to the application
  await basePage.gotoLoginPage();
  await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
  //navigate to products page and perform actions
  await basePage.gotoShopPage();
  await productsPage.clickListView();
  await productsPage.sortItemsBy("price");
  await productsPage.verifyProductsSortedByPrice('Low to High');
  await productsPage.sortItemsBy("price-desc");
  await productsPage.verifyProductsSortedByPrice('High to Low');
});