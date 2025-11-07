import { test } from "../fixture/page_objects";
import Constant from "../data/constants"; 
import { BillingDetails } from "../models/billing_details"; 

test('TC10 - Verify users can post a review', async ({ basePage, loginPage, productsPage, productDetailsPage }) => {
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
  let now = new Date();
  let myReview = "My comments on datetime " + now.toISOString();
  //navigate to the application
  await basePage.navigate();
  //login to the application
  await basePage.gotoLoginPage();
  await loginPage.login(Constant.USERNAME, Constant.PASSWORD);
  //navigate to products page and perform actions
  await basePage.gotoShopPage();
  await productsPage.clickRandomProductImage();
  await productDetailsPage.clickReviewTab();
  const numOfReviews = await productDetailsPage.getCurrentNumOfReviews();
  await productDetailsPage.addReviewInfoForLoginedUser(3, myReview);
  await productDetailsPage.clickReviewTab();
  await productDetailsPage.verifyReviewData(3, myReview);
  await productDetailsPage.verifyNumberOfReviews(Number(numOfReviews) + 1);
});