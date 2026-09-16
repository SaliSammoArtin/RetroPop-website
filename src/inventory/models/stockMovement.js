export default class StockMovement {
  constructor(productId, type, quantity, timestamp = new Date()) {
    if (type !== "IN" && type !== "OUT") {
      throw new Error("Type must be IN or OUT");
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a number greater than zero");
    }

    this.productId = productId;
    this.type = type;
    this.quantity = quantity;
    this.timestamp = timestamp;
  }
}