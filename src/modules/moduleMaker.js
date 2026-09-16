import ShippingService from "../ShippingCalculator/ShippingService";
import TaxAndCurrencyCalc from "../CurrencyTaxModule";

export default {
  Shipping: new ShippingService(),
  ShippingDescriptor: ShippingService.descriptor,
  //CampaignModule: new CampaignModule(),
  //CampaignModuleDescriptor: CampaignModule.descriptor,
  //Inventory: new Inventory(),
  //InventoryDescriptor: Inventory.descriptor,
  TaxAndCurrencyCalc: new TaxAndCurrencyCalc(),
  TaxAndCurrencyCalcDescriptor: TaxAndCurrencyCalc.descriptor,
};
