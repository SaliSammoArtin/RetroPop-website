import Carrier from "./Carrier.js";

export default class ShippingService {

  static descriptor = {
    name: "Shipping",
    methodsAndInputs: [
      {
        method: "run",
        input: ["destination-area code"],
        output: ["sorted array of carriers with their shipping prices "]
      }
    ]
  }

  constructor() {
    this.carriers = [];
  }

  async getCarriers() {
    const response = await fetch("api/carriers");
    const data = await response.json();

    return data.map(carrierData => new Carrier(carrierData));
  }
} 
