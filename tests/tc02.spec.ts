import { test } from "../fixture/page_objects";
import Constant from "../data/constants"; 
import { BillingDetails, PaymentMethod } from "../models/billing_details"; 


test('TC02 - Verify users can buy multiple item successfully', async ({ basePage, loginPage, productsPage, shoppingCartPage, checkoutPage, orderPage }) => {
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
  const paymentMethod = PaymentMethod.Cash;
  //navigate to the application
  await basePage.navigate();
  //login to the application
  await basePage.gotoLoginPage();
  await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
  await productsPage.clearCart();
  //navigate to products page and perform actions
  await productsPage.selectElectronicComponents();
  await productsPage.clickListView();
  await productsPage.verifyProductsListVisible();
  const productList = await productsPage.addRandomProducts(3);  
  await productsPage.clickCart();
  await shoppingCartPage.verifyProductsAdded(productList);
  //proceed to checkout
  await shoppingCartPage.proceedToCheckout();
  //verify checkout page and product in checkout page
  await checkoutPage.verifyCheckoutPage();
  await checkoutPage.verifyProductsInCheckout(productList);
  //fill billing details
  await checkoutPage.fillBillingDetails(billingDetails, paymentMethod);
  //place order
  await checkoutPage.placeOrder();
  //verify order page and product in order page
  await orderPage.verifyOrderPageDisplayed();
  await orderPage.verifyProductsInOrderPage(productList);
});