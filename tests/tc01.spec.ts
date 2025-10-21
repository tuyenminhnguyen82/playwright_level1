import { test } from "../page_objects/page_objects";
import Constant from "../data/constants"; 


test('TC01 - Verify users can buy an item successfully', async ({ basePage, loginPage, productsPage, shoppingCartPage, checkoutPage, orderPage }) => {
  test.setTimeout(120_000);
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
  //add first product to cart and verify in shopping cart page
  await productsPage.addProduct(Constant.FIRST_PRODUCT_NAME);
  console.log(`✅ Added product: ${Constant.FIRST_PRODUCT_NAME}`);
  await productsPage.clickCart();
  await shoppingCartPage.verify_product_added(Constant.FIRST_PRODUCT_NAME);
  //proceed to checkout
  await shoppingCartPage.proceedToCheckout();
  //verify checkout page and product in checkout page
  await checkoutPage.verifyCheckoutPage();
  await checkoutPage.verifyProductInCheckout(Constant.FIRST_PRODUCT_NAME);
  //fill billing details
  await checkoutPage.fillBillingDetails(Constant.FIRST_NAME, Constant.LAST_NAME, Constant.STREET_ADDRESS, Constant.TOWN_CITY, Constant.ZIP_CODE, Constant.PHONE, Constant.EMAIL_ADDRESS, Constant.CHECK_PAYMENT_METHOD);
  //place order
  await checkoutPage.placeOrder();
  console.log(`✅ Order placed successfully`);
  //verify order page and product in order page
  await orderPage.verifyOrderPage();
  await orderPage.verifyProductAddedInOrderPage(Constant.FIRST_PRODUCT_NAME);
  await orderPage.verifyPaymentMethodAndEmailInOrderPage(Constant.CHECK_PAYMENT_METHOD, Constant.EMAIL_ADDRESS);
});