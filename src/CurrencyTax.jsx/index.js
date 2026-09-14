import ExchangeRateClient from "./exchangeRateClient.js";
import TaxTable from "./taxTable.js";
import Money from "./money.js";

export default class TaxAndCurrencyCalc {
  #taxTable = new TaxTable();
  #rateClient = new ExchangeRateClient();

  async calculatePrice(amount, category, targetCurrency = "SEK") {
    const baseMoney = new Money(Number(amount), "SEK");

    const moneyWithTax = this.#taxTable.applyTax(baseMoney, category);

    const finalMoney = await this.convertCurrency(moneyWithTax, targetCurrency);

    return {
      originalPrice: baseMoney.priceWithTax(),
      taxRate: this.#taxTable.getRate(category),
      finalPrice: finalMoney.priceWithTax(),
      finalMoney: finalMoney,
    };
  }

  getTaxRate(category) {
    return this.#taxTable.getRate(category);
  }

  applyTax(money, category) {
    return this.#taxTable.applyTax(money, category);
  }

  async convertCurrency(money, targetCurrency) {
    const rate = await this.#rateClient.getRate(money.currency, targetCurrency);
    return money.convert(rate, targetCurrency);
  }

  addPrices(firstMoney, secondMoney) {
    return firstMoney.add(secondMoney);
  }
}
