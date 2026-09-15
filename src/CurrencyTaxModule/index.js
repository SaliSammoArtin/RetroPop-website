import ExchangeRateClient from "./exchangeRateClient.js";
import TaxTable from "./taxTable.js";
import Money from "./money.js";

export default class TaxAndCurrencyCalc {
  static descriptor = {
    name: "TaxAndCurrencyCalc",
    methodsAndInputs: [
      {
        method: "calculatePrice",
        input: [
          "amount: number",
          "category: string",
          "targetCurrency?: string",
        ],
        output: "{ originalPrice, taxRate, finalPrice, finalMoney }",
      },
      {
        method: "getTaxRate",
        input: ["category: string"],
        output: "number (tax rate)",
      },
      {
        method: "applyTax",
        input: ["money: Money", "category: string"],
        output: "Money (amount incl. tax)",
      },
      {
        method: "convertCurrency",
        input: ["money: Money", "targetCurrency: string"],
        output: "Money (converted amount)",
      },
      {
        method: "addPrices",
        input: ["firstMoney: Money", "secondMoney: Money"],
        output: "Money (sum, same currency)",
      },
    ],
    priceForm: {
      amount: {
        label: "Pris (SEK)",
        type: "number",
        initialValue: "",
        required: true,
      },
      category: {
        label: "Kategori",
        type: "select",
        options: ["STANDARD", "LIVSMEDEL", "BOCKER"],
        initialValue: "STANDARD",
        required: true,
      },
      targetCurrency: {
        label: "Valuta",
        type: "select",
        options: ["SEK", "EUR", "NOK", "DKK"],
        initialValue: "SEK",
        required: true,
      },
    },
  };

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
