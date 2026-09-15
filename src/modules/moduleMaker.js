import TaxAndCurrencyCalc from "../CurrencyTaxModule/index.js";

export default {
  TaxAndCurrencyCalc: new TaxAndCurrencyCalc(),
  TaxAndCurrencyCalcDescriptor: TaxAndCurrencyCalc.descriptor, // statiska descriptorn – för att läsa struktur
};
