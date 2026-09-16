import Discount from "./Discount";

// extends Discount betyder att PercentageDiscount är en "typ av" Discount,
// och automatiskt får tillgång till allt Discount har (fält och metoder),
// men kan lägga till egna saker och skriva över metoder som calculate.
class PercentageDiscount extends Discount {
  constructor(name, description, campaignCode, percentage) {
    super(name, description, campaignCode);
    this.percentage = percentage;
  }

  // reduce går igenom varje produkt (item) i cart, en i taget,
  // och bygger ihop en enda summa (accumulator).
  // accumulator börjar på 0, och för varje produkt läggs dess pris till.
  calculate(cart) {
    const totalPrice = cart.reduce((accumulator, item) => {
      return accumulator + item.price;
    }, 0);
    // Rabatten räknas ut som en procentandel av totalpriset.
    // Om percentage är 10, blir (10/100) = 0.1, alltså 10%.
    const discount = totalPrice * (this.percentage / 100);
    return discount;
  }
}

export default PercentageDiscount;