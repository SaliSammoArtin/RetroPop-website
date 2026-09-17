export default class StockItem {
  constructor(id, name, stock, reorderPoint = 5) {
    if (!Number.isFinite(stock) || stock < 0) {
      throw new Error("Stock must be a number equal to or greater than zero");
    }
    if (!Number.isFinite(reorderPoint) || reorderPoint < 0) {
      throw new Error(
        "Reorder point must be a number equal to or greater than zero",
      );
    }

    this.id = id;
    this.name = name;
    this.stock = stock;
    this.reorderPoint = reorderPoint;
  }
}