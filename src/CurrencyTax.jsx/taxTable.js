export class UnkwownCategoryError extends Error {
  constructor(category) {
    super(`Unknown category: ${category}.`);
    this.name = "UnkwownCategoryError";
  }
}

export default class TaxTable {
  #rates = {
    STANDARD: 0.25,
    LIVSMEDEL: 0.12,
    BOCKER: 0.06,
  };

  getRate(category) {
    const rate = this.#rates[category];
    if (rate === undefined) {
      throw new Error(`Unknown tax category: ${category}`);
    }
    return rate;
  }

  applyTax(money, category) {
    return money.addTax(this.getRate(category));
  }
}
