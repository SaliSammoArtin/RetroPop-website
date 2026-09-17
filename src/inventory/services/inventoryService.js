import StockMovement from "../models/stockMovement.js";

export default class InventoryService {

  //Kontrollerarar om saldot är lågt
  isLowStock(stock, reorderPoint = 5) {
    return stock <= reorderPoint;
  }

  // Börjar med produktens startsaldo och räknar in produktens IN- och OUT-händelser.
  calculateBalance(startingStock, movements, productId) {
    const productMovements = movements.filter(
      //filtrerar listan movement med Id
      (movement) => movement.productId === productId,
    );
    //Reduce räknar fram startsaldo + saldo på händelser som filter matchade med id
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

  //skapar en ny lista med lagerinformation
  buildReport(items, movements) {
    return items.map((item) => {
      //resultatet/aktuellt saldo skickas till balance
      const balance = this.calculateBalance(
        //skickar dessa till calculateBalance
        item.stock,
        movements,
        item.id,
      );
      //skickar tillbaka
      return {
        //producten +
        ...item,
        //aktuelt saldo +
        balance,
        // true/false mot reorderPoint
        lowStock: this.isLowStock(balance, item.reorderPoint,
    )};
    });
  }

  //Skapar en lagerhändelse och skickar till API
  //async, vänta på svar från API
  async createMovement(productId, type, quantity) {
    // variabel      //objekt
    const movement = new StockMovement(productId, type, quantity);
    //svaret från API sparas i response
    //fetch skickar förfrågan
    const response = await fetch("/api/stockMovements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movement),
    });

    if (!response.ok) {
      throw new Error("Could not save stock movement");
    }
    // läser svaret och omvandlar till js-objekt
    return await response.json();
  }
}
