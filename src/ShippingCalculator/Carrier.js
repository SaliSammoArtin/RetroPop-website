//creates a Carrier class that takes in carrier data and calculates the price of shipping based on 
// the weight of the parcel and the carrier's pricing model

export default class Carrier {
  constructor(carrierData) {
    this.name = carrierData.name;
    this.pricingModel = carrierData.pricingModel;
    this.basePrice = carrierData.basePrice;
    this.pricePerKg = carrierData.pricePerKg;
  }

  calculatePrice(parcel, destination) {
    const weight = parcel.getTotalWeight();

    const weightPrice = weight * this.pricePerKg;
    const zoneFee = this.getZoneFee(destination);

    return this.basePrice + weightPrice + zoneFee;
  }

  getZoneFee(destination) {
    const firstDigit = Number(destination[0]);

    if (firstDigit === 2) return 0;
    if (firstDigit >= 3 && firstDigit <= 7) return 25;
    return 50;
  }

}