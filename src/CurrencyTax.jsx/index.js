import ExchangeRateClient from "./exchangeRateClient.js";
import TaxTable from "./taxTable.js";
import Money from "./money.js";

export default class TaxAndCurrencyCalc {
  #taxTable = new TaxTable();
  #rateClient = new ExchangeRateClient();

  async calculatePrice(amount, category, targetCurrency = "SEK") {
    const baseMoney = new Money(Number(amount), "SEK");

    const taxRate = this.#taxTable.getRate(category);

    const moneyWithTax = baseMoney.addTax(taxRate);

    const rate = await this.#rateClient.getRate("SEK", targetCurrency);

    const convertedAmount = moneyWithTax.amount * rate;
    const finalMoney = new Money(convertedAmount, targetCurrency);

    return {
      originalPrice: baseMoney.priceWithTax(),
      taxRate: taxRate,
      finalPrice: finalMoney.priceWithTax(),
      finalMoney: finalMoney,
    };
  }
}
