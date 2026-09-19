import Discount from "./Discount";

export default class ThresholdDiscount extends Discount {
  constructor(name, description, campaignCode, percentage, threshold) {
    super(name, description, campaignCode);
    this.percentage = percentage;
    this.threshold = threshold;
  }

  calculate(cart) {
    // reduce går igenom varje produkt i cart, en i taget, och bygger
    // ihop en totalsumma. item.price * item.quantity räknar med att
    // kunden kan ha flera av samma vara.
    const totalPrice = cart.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    // reduce summerar en lista till ett enda tal, genom att lägga ihop värdena ett i taget.

    // Ger bara rabatt om totalpriset är minst lika stort som threshold
    // (tex minst 500 kr). Annars ingen rabatt alls.
    if (totalPrice >= this.threshold) {
      const discount = totalPrice * (this.percentage / 100);
      return discount;
    } else {
      return 0;
    }
  }
}