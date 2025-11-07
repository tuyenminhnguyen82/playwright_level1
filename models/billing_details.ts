export class BillingDetails {
  constructor(
    public firstName: string,
    public lastName: string,
    public streetAddress: string,
    public city: string,
    public postalCode: string,
    public phone: string,
    public email: string
  ) {}
}

export enum PaymentMethod {
  Check = 'Check payments',
  Bank = 'Direct bank transfer',
  Cash = 'Cash on delivery',
}

export enum SortOption {
  default = 'menu_order',
  popularity = 'popularity',
  rating = 'rating',
  date = 'date',
  price = 'price',
  price_desc = 'price-desc',
}

export enum ErrorRequiredField {
  firstName = 'Billing First name is a required field.',
  lastName = 'Billing Last name is a required field.',
  streetAddress = 'Billing Street address is a required field.',
  city = 'Billing Town / City is a required field.',
  postalCode = 'Billing ZIP Code is a required field.',
  phone = 'Billing Phone is a required field.',
  email = 'Billing Email address is a required field.',
}