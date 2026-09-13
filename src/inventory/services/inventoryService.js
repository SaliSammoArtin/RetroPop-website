import StockMovement from "../models/stockMovement.js";

export default class InventoryService {
  static isLowStock(stock, reorderPoint = 5) {
    return stock <= reorderPoint;
  }

  static calculateBalance(startingStock, movements, productId) {
    const productMovements = movements.filter(
      (movement) => movement.productId === productId,
    );

    return productMovements.reduce((balance, movement) => {
      if (movement.type === "IN") {
        return balance + movement.quantity;
      }

      if (movement.type === "OUT") {
        return balance - movement.quantity;
      }

      return balance;
    }, startingStock);
  }

  static buildReport(items, movements) {
    return items.map((item) => {
      const balance = this.calculateBalance(
        item.stock,
        movements,
        item.id,
      );

      return {
        ...item,
        balance,
        lowStock: this.isLowStock(balance, item.reorderPoint)
      };
    });
  }

  static async createMovement(productId, type, quantity) {
    const movement = new StockMovement(productId, type, quantity);
    const response = await fetch("http://localhost:3000/stockMovements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movement),
    });

    if (!response.ok) {
      throw new Error("Could not save stock movement");
    }

    return await response.json();
  }
}
