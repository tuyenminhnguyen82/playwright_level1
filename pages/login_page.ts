import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base_page';

export class LoginPage extends BasePage {
  readonly usernameTxt: Locator;
  readonly passwordTxt: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of BasePage
    this.usernameTxt = page.getByRole('textbox', { name: 'Username or email address *' });
    this.passwordTxt = page.getByRole('textbox', { name: 'Password *' });
    this.loginButton = page.getByRole('button', { name: 'Log in' });
  }

  async login(username: string, password: string) {
    await this.usernameTxt.fill(username);
    await this.passwordTxt.fill(password);
    await this.loginButton.click();
  }
}