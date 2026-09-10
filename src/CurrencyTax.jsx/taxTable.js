export default class TaxTable {
  #rates = {
    STANDARD: 0.25,
    LIVSMEDEL: 0.12,
    BOCKER: 0.06,
  };

  getRate(category) {
    const rate = this.#rates[category];
    return rate;
  }
}
