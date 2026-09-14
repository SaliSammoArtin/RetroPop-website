export class CurrencyError extends Error {
  constructor(firstCurrency, secondCurrency) {
    super(
      `Can't combine two different currencies: ${firstCurrency} and ${secondCurrency}.`,
    );
    this.name = "CurrencyError";
  }
}

export default class Money {
  #amount;
  #currency;

  constructor(amount, currency) {
    if (typeof amount !== "number" || Number.isNaN(amount)) {
      throw new Error("Money: Price must be a real number");
    }
    this.#amount = amount;
    this.#currency = currency;
  }
  get amount() {
    return this.#amount;
  }
  get currency() {
    return this.#currency;
  }

  add(other) {
    if (other.currency !== this.#currency) {
      throw new CurrencyError(this.#currency, other.currency);
    }
    return new Money(this.#amount + other.amount, this.#currency);
  }

  addTax(rate) {
    return new Money(this.#amount * (1 + rate), this.#currency);
  }
  convert(rate, targetCurrency) {
    return new Money(this.#amount * rate, targetCurrency);
  }

  priceWithTax() {
    return `${this.#amount.toFixed(2)} ${this.#currency}`;
  }
}
