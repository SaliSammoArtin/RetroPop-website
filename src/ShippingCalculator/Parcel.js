// Create a Parcel class that takes a cart as an argument and has methods to calculate the total weight 
// and total volume of the items in the cart.

export default class Parcel {
  constructor(cart) {
    this.cart = cart;
  }


  getTotalWeight() {
    return this.cart.reduce((totalWeight, item) => {
      return totalWeight + item.weight * item.quantity;
    }, 0);
  }


  getTotalVolume() {
    return this.cart.reduce((totalVolume, item) => {
      return totalVolume + item.width * item.height * item.length * item.quantity;
    }, 0);
  }


}
