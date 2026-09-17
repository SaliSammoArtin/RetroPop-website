import InventoryService from "./services/inventoryService.js";

export default class Inventory extends InventoryService {
  static descriptor = {
    name: "Inventory",
    methodsAndInputs: [
      {
        method: "run",
        input: [],
        output: ["inventory report"],
      },
    ],
  };

  async run() {
    const productsResponse = await fetch("/api/products");
    const movementsResponse = await fetch("/api/stockMovements");

    if (!productsResponse.ok || !movementsResponse.ok) {
      throw new Error("Kunde inte hämta lagerinformationen");
    }

    const items = await productsResponse.json();
    const movements = await movementsResponse.json();

    return this.buildReport(items, movements);
  }
}
