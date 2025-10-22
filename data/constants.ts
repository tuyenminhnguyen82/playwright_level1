import BillingDetails from "../models/billing_details";

export default class Constant {
    public static readonly USERNAME = "tuyen.minh.nguyen@agest.vn";
    public static readonly PASSWORD = "Password";
    public static readonly FIRST_PRODUCT_NAME = "Canon i-SENSYS LBP6030W";
    public static readonly DIRECT_BANK_PAYMENT_METHOD = "Direct bank transfer";
    public static readonly CHECK_PAYMENT_METHOD = "Check payments";
    public static readonly CASH_ON_DELIVERY_PAYMENT_METHOD = "Cash on delivery";
    public  static readonly BILLING_DETAILS = new BillingDetails(
    'Tuyen',
    'Nguyen',
    'Tran Quoc Toan',
    'Da Nang',
    '11111',
    '0123456789',
    'tuyen.minh.nguyen@agest.vn'
);
}