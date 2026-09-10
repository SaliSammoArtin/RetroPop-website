export default class Parcel {
  constructor(cart) {
    this.cart = cart;
  }
}

getTotalWeight(){
  return this.cart.reduce((totalWeight, item) => {
    return totalWeight + item.weight * item.quantity;
  }, 0);
}
