import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;  
  readonly username_txt: Locator;
  readonly password_txt: Locator;
  readonly login_bt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username_txt = page.getByRole('textbox', { name: 'Username or email address *' });
    this.password_txt = page.getByRole('textbox', { name: 'Password *' });
    this.login_bt = page.getByRole('button', { name: 'Log in' });
  }

  async login(username: string, password: string) {
    await this.username_txt.fill(username);
    await this.password_txt.fill(password);
    await this.login_bt.click();
  }
}