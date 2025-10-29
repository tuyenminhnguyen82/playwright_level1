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