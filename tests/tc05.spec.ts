import { test } from "../fixture/page_objects";
import Constant from "../data/constants"; 
import { BillingDetails, PaymentMethod } from "../models/billing_details"; 


test('TC05 - Verify orders appear in order history', async ({ basePage, loginPage, productsPage, shoppingCartPage, checkoutPage, orderPage, myAccountPage }) => {
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
  const orderIdList: string[] = [];
  //navigate to the application
  await basePage.navigate();
  //login to the application
  await basePage.gotoLoginPage();
  await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
  await shoppingCartPage.clearCart();
  for (let i = 0; i < 2; i++) {
    //navigate to products page and perform actions
    await productsPage.selectElectronicComponents();
    await productsPage.clickListView();
    await productsPage.verifyProductsListVisible();
    //add first product to cart and verify in shopping cart page
    const productList = await productsPage.addRandomProducts(1);
    const productNames = productList.map(p => p.name);
    await shoppingCartPage.clickCart();
    await shoppingCartPage.verifyProductsAdded(productNames);
    //proceed to checkout
    await shoppingCartPage.proceedToCheckout();
    //verify checkout page and product in checkout page
    await checkoutPage.verifyCheckoutPage();
    await checkoutPage.verifyProductsInCheckout(productNames);
    //fill billing details
    await checkoutPage.fillBillingDetails(billingDetails, paymentMethod);
    //place order
    await checkoutPage.placeOrder();
    //verify order page and product in order page
    await orderPage.verifyOrderPageDisplayed();
    let orderId = await orderPage.getOrderId();
    orderIdList.push(orderId);
  }
  //verify orders in my account page
  await basePage.goToMyAccountPage();
  await myAccountPage.goToOrdersSection();
  await myAccountPage.verifyOrdersInOrderHistory(orderIdList);
});