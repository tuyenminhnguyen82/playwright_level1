import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base_page';
import { assert } from 'console';

export class ProductDetailsPage extends BasePage {
  readonly reviewTab: Locator;
  readonly reviewTxt: Locator;
  readonly nameTxt: Locator;
  readonly emailTxt: Locator;
  readonly submitButton: Locator;
  readonly oneStar: Locator;
  readonly twoStar: Locator;
  readonly threeStar: Locator;
  readonly fourStar: Locator;
  readonly fiveStar: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.reviewTab = page.locator('#tab_reviews');
    this.oneStar = page.locator('.stars .star-1');
    this.twoStar = page.locator('.stars .star-2');
    this.threeStar = page.locator('.stars .star-3');
    this.fourStar = page.locator('.stars .star-4');
    this.fiveStar = page.locator('.stars .star-5');
    this.reviewTxt = page.getByRole('textbox', { name: /Your review/i });
    this.nameTxt = page.getByRole('textbox', { name: /Name/i });
    this.emailTxt = page.getByRole('textbox', { name: /Email/i });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async clickReviewTab() {
    await this.reviewTab.waitFor({state: 'visible', timeout: 10000});
    await this.reviewTab.click();
    await this.reviewTxt.waitFor({state: 'visible', timeout: 5000});
  }

  async getNumberOfStarsLocator(starNumber: number): Promise <Locator> {
    const locatorMap: Record<number, Locator> = {
          1: this.oneStar,
          2: this.twoStar,
          3: this.threeStar,
          4: this.fourStar,
          5: this.fiveStar
        };
    const locator = locatorMap[starNumber];
    if (!locator) {
      throw new Error(`Invalid star number: ${starNumber}`);
    }

    return locator;
  }
  async addReviewInfoForLoginedUser(numOfStarts: number, comment: string): Promise <string> {
    const selectedNumOfStars = await this.getNumberOfStarsLocator(numOfStarts);
    await selectedNumOfStars.click();
    let now = new Date();
    let review = comment + now.toISOString();
    await this.reviewTxt.fill(review);
    await this.submitButton.click();
    await this.waitForPageLoaded();
    return review;
  }

  async addReviewInfoForAgestUser(numOfStarts: number, comment: string, name: string, email: string) {
    const selectedNumOfStars = await this.getNumberOfStarsLocator(numOfStarts);
    await selectedNumOfStars.click();
    await this.reviewTxt.fill(comment);
    await this.nameTxt.fill(name);
    await this.emailTxt.fill(email);
    await this.submitButton.click();
    await this.waitForPageLoaded();
  }

  async verifyReviewData(numOfStars: number, comment: string) {
    const lastReview = this.page.locator('ol.commentlist > li').last();

    // Get the review content text
    const reviewContent = await lastReview.locator('.description p').innerText();

    // Get the number of stars 
    const starText = await lastReview.locator('.star-rating .rating').innerText();
    const numberOfStars = parseInt(starText, 10);

    console.log('Last review content:', reviewContent);
    console.log('Number of stars:', numberOfStars);

    expect(numberOfStars).toBe(numOfStars);
    expect(reviewContent).toBe(comment);
  }

  async verifynumberOfReviews(n: number) {
    const tabText = await this.reviewTab.locator('span').innerText(); // e.g., "Reviews (1)"
    // Extract the number using regex
    const match = tabText.match(/\d+/);
    const numberOfReviews = match ? parseInt(match[0], 10) : 0;
    console.log('Number of reviews:', numberOfReviews);
    expect(numberOfReviews).toBe(n);
  }

  async getCurrentNumOfReviews(): Promise <Number> {
    const tabText = await this.reviewTab.locator('span').innerText(); // e.g., "Reviews (1)"
    // Extract the number using regex
    const match = tabText.match(/\d+/);
    const numberOfReviews = match ? parseInt(match[0], 10) : 0;
    console.log('Current number of reviews:', numberOfReviews);
    return numberOfReviews;    
  }
}