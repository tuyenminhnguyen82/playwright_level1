import { test } from "../fixture/page_objects";
import Constant from "../data/constants"; 
import { BillingDetails, PaymentMethod } from "../models/billing_details"; 


test('TC03 - Verify users can buy an item using different payment methods (all payment methods)', async ({ basePage, loginPage, productsPage, shoppingCartPage, checkoutPage, orderPage }) => {
  test.setTimeout(10 * 60 * 1000); //set timeout to 10 minutes
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
  await productsPage.clearCart();
  for (const paymentMethod of Object.values(PaymentMethod)) {
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
    await orderPage.verifyPaymentMethodAndEmailInOrderPage(paymentMethod, billingDetails.email);
  }
});