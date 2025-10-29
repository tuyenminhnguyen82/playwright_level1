import { test } from "../fixture/page_objects";
import Constant from "../data/constants"; 
import { BillingDetails, PaymentMethod } from "../models/billing_details"; 


test('TC06 - Verify users try to buy an item without logging in (As a guest)', async ({ basePage, loginPage, productsPage, shoppingCartPage, checkoutPage, orderPage }) => {
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
  const paymentMethod = PaymentMethod.Check;
  //navigate to the application
  await basePage.navigate();
  //navigate to products page and perform actions
  await productsPage.selectElectronicComponents();
  //verify list view
  await productsPage.clickListView();
  await productsPage.verifyProductsListVisible();
  //add first product to cart and verify in shopping cart page
  const productName = await productsPage.addRandomProducts(1);
  await productsPage.clickCart();
  await shoppingCartPage.verifyProductsAdded(productName);
  //proceed to checkout
  await shoppingCartPage.proceedToCheckout();
  //verify checkout page and product in checkout page
  await checkoutPage.verifyCheckoutPage();
  await checkoutPage.verifyProductsInCheckout(productName);
  //fill billing details
  await checkoutPage.fillBillingDetails(billingDetails, paymentMethod);
  //place order
  await checkoutPage.placeOrder();
  //verify order page and product in order page
  await orderPage.verifyOrderPageDisplayed();
  await orderPage.verifyProductsInOrderPage(productName);
});