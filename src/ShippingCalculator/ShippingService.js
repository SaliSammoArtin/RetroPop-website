import Carrier from "./Carrier.js";
import Parcel from "./Parcel.js";

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
    const response = await fetch("/api/carriers");

    if (!response.ok) {
      throw new Error("Kunde inte hämta transportörer");
    }


    const data = await response.json();

    return data.map(carrierData => new Carrier(carrierData));
  }

  async getQuotes(parcel, destination) {
    const carriers = await this.getCarriers();

    const quotes = carriers.map(carrier => {
      return {
        carrier: carrier.name,
        destination,
        price: carrier.calculatePrice(parcel)
      }
    });

    return quotes.sort((a, b) => a.price - b.price);

  }
  async run(values, context) {

    if (!values.destination) {
      throw new Error("Välj en destination");
    }
    if (!context.cart || context.cart.length === 0) {
      throw new Error("Kundvagnen är tom");
    }

    const parcel = new Parcel(context.cart);

    return await this.getQuotes(parcel, values.destination);
  }
} 
