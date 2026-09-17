import Discount from "./Discount";

export default class BuyXForYDiscount extends Discount {
  constructor(name, description, campaignCode, x, y, productId) {
    super(name, description, campaignCode);
    this.x = x;
    this.y = y;
    this.productId = productId;
  }

  // Hittar den specifika varan kampanjen gäller för (find, eftersom
  // varje vara bara finns EN gång i cart, med ett quantity-fält).
  // Räknar ut hur många hela "set" av X kunden har råd med rabatt på,
  // och ger rabatt motsvarande värdet av de gratis varorna i varje set.
  calculate(cart) {
    const matchingItem = cart.find((item) => item.id === this.productId);
    const quantity = matchingItem ? matchingItem.quantity : 0;
    const price = matchingItem ? matchingItem.price : 0;

    const fullStacks = Math.floor(quantity / this.x);
    const freeItems = fullStacks * (this.x - this.y);
    const discount = freeItems * price;

    return discount;
  }
}