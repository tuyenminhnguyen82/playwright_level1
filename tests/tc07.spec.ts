import { test } from "../fixture/page_objects";
import { BillingDetails, PaymentMethod, ErrorRequiredField } from "../models/billing_details"; 


test('TC07 - Ensure proper error handling when mandatory fields are blank', async ({ basePage, productsPage, shoppingCartPage, checkoutPage }) => {
  test.setTimeout(5 * 60 * 1000); //set timeout to 5 minutes
  const billingDetails = new BillingDetails('', '', '', '', '', '', '');
  const paymentMethod = PaymentMethod.Check;
  //navigate to the application
  await basePage.navigate();
  //navigate to products page and perform actions
  await productsPage.selectElectronicComponents();
  //verify list view
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
  await checkoutPage.verifyErrorRequiredFieldDisplayed(ErrorRequiredField.firstName);
  await checkoutPage.verifyErrorRequiredFieldDisplayed(ErrorRequiredField.lastName);
  await checkoutPage.verifyErrorRequiredFieldDisplayed(ErrorRequiredField.streetAddress);
  await checkoutPage.verifyErrorRequiredFieldDisplayed(ErrorRequiredField.city);
  await checkoutPage.verifyErrorRequiredFieldDisplayed(ErrorRequiredField.postalCode);
  await checkoutPage.verifyErrorRequiredFieldDisplayed(ErrorRequiredField.phone);
  await checkoutPage.verifyErrorRequiredFieldDisplayed(ErrorRequiredField.email);
});