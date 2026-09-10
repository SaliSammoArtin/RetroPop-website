//creates a Carrier class that takes in carrier data and calculates the price of shipping based on 
// the weight of the parcel and the carrier's pricing model

export default class Carrier {
  constructor(carrierData) {
    this.name = carrierData.name;
    this.pricingModel = carrierData.pricingModel;
    this.basePrice = carrierData.basePrice;
    this.pricePerKg = carrierData.pricePerKg;
  }

  calculatePrice(parcel) {
    const weight = parcel.getTotalWeight();
    return this.basePrice + (this.pricePerKg * weight);

  }

}