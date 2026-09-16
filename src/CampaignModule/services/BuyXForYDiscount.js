import Discount from "./Discount";

export default class BuyXForYDiscount extends Discount {
  constructor(name, description, campaignCode, x, y, productId) {
    super( name,description, campaignCode);
    this.x = x;
    this.y = y;
    this.productId= productId;
  }

  calculate(cart) {
    // Plockar ut BARA de produkter i cart som matchar kampanjens vara
    const matchingItems = cart.filter((item) => item.id === this.productId);

    // Hur många av just den varan kunden har i sin cart
    const quantity = matchingItems.length;

    // Priset på varan (samma för alla, så vi tar bara den första)
    const price = matchingItems[0]?.price || 0;

    // Hur många HELA "staplar" om X kunden har råd med rabatt på
    // T.ex. 7 varor, X=3 -> 2 hela staplar (1 blir över, får ingen rabatt)
    const fullStacks = Math.floor(quantity / this.x);

    // Antal GRATIS varor totalt: varje stapel ger (X - Y) gratis varor
    const freeItems = fullStacks * (this.x - this.y);

    // Rabatten i kronor: antal gratis varor * priset per styck
    const discount = freeItems * price;

    return discount;
  }

}

// calculate filtrerar fram bara den specifika varan kampanjen gäller,
// räknar ut hur många hela 'set' av X kunden har,
// och ger rabatt motsvarande de gratis varorna i varje set.