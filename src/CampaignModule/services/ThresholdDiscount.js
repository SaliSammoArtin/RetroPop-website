import Discount from "./Discount";

export default class ThresholdDiscount extends Discount {
  constructor(name, description, campaignCode, percentage, threshold) {
    super(name, description, campaignCode);
    this.percentage = percentage;
    this.threshold = threshold;
  }

  calculate(cart) {
    const totalPrice = cart.reduce((accumulator, item) => {
      return accumulator + item.price;
    }, 0);

    if (totalPrice >= this.threshold) {
      const discount = totalPrice * (this.percentage / 100);
      return discount;
    } else {
      return 0;
    }
  }
}