export class UnknownCategoryError extends Error {
  constructor(taxCategory) {
    super(`Unknown category: ${taxCategory}.`);
    this.name = "UnknownCategoryError";
  }
}

export default class TaxTable {
  #rates = {
    STANDARD: 0.25,
    LIVSMEDEL: 0.12,
    BOCKER: 0.06,
  };

  getRate(taxCategory) {
    const rate = this.#rates[taxCategory];
    if (rate === undefined) {
      throw new UnknownCategoryError(taxCategory);
    }
    return rate;
  }

  applyTax(money, taxCategory) {
    return money.addTax(this.getRate(taxCategory));
  }
}
