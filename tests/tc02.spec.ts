import { test } from "../fixture/page_objects";
import Constant from "../data/constants"; 
import { BillingDetails, PaymentMethod } from "../models/billing_details"; 


test('TC02 - Verify users can buy multiple item successfully', async ({ basePage, loginPage, productsPage, shoppingCartPage, checkoutPage, orderPage }) => {
  test.setTimeout(5 * 60 * 1000); //set timeout to 5 minutes
  const firstProductName = "Canon i-SENSYS LBP6030W";
  const secondProductName = "DJI Mavic Pro Camera";
  const thirdProductName = "DJI Phantom 4 Camera";
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
  //login to the application
  await basePage.gotoLoginPage();
  await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
  //navigate to products page and perform actions
  await productsPage.selectElectronicComponents();
  //verify grid and list view
  await productsPage.clickGridView();
  await productsPage.verifyProductsGridVisible();
  await productsPage.clickListView();
  await productsPage.verifyProductsListVisible();
  //add products to cart and verify in shopping cart page
  await productsPage.addProduct(firstProductName);
  await productsPage.verifyProductAddedSuccessfully();
  await productsPage.addProduct(secondProductName);
  await productsPage.verifyProductAddedSuccessfully();
  await productsPage.addProduct(thirdProductName);
  await productsPage.verifyProductAddedSuccessfully();
  await productsPage.clickCart();
  await shoppingCartPage.verifyProductAdded(firstProductName);
  await shoppingCartPage.verifyProductAdded(secondProductName);
  await shoppingCartPage.verifyProductAdded(thirdProductName);
  //proceed to checkout
  await shoppingCartPage.proceedToCheckout();
  //verify checkout page and product in checkout page
  await checkoutPage.verifyCheckoutPage();
  await checkoutPage.verifyProductInCheckout(firstProductName);
  await checkoutPage.verifyProductInCheckout(secondProductName);
  await checkoutPage.verifyProductInCheckout(thirdProductName);
  //fill billing details
  await checkoutPage.fillBillingDetails(billingDetails, paymentMethod);
  //place order
  await checkoutPage.placeOrder();
  //verify order page and product in order page
  await orderPage.verifyOrderPageDisplayed();
  await orderPage.verifyProductAddedInOrderPage(firstProductName);
  await orderPage.verifyProductAddedInOrderPage(secondProductName);
  await orderPage.verifyProductAddedInOrderPage(thirdProductName);
});