import { useEffect, useState } from "react";
import StockItem from "../models/stockItem.js";
import StockMovement from "../models/stockMovement.js";
import InventoryService from "../services/inventoryService.js";

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getProducts() {
    // Sparar svar från API (2) // Skickar förfrågan om info om produkter (1)
    const response = await fetch("http://localhost:3000/products");
    // Sparar lista (4)  // Läser innehållet i svaret (3)
    const result = await response.json();

    if (response.ok) {
      // Går igenom en produkt i taget och skapar en ny lista
      const stockItems = result.map((product) => {
        // Skapar ett StockItem-objekt av produktens information
        return new StockItem(
          product.id,
          product.name,
          product.stock,
          product.reorderPoint,
        );
      });
      // Sparar listan med StockItem-objekt i products
      setProducts(stockItems);
    } else {
      //annars kasta ett fel
      throw new Error("Could not get products!");
    }
  }

  async function getMovements() {
    const response = await fetch("http://localhost:3000/stockMovements");
    const result = await response.json();

    if (response.ok) {
      const stockMovements = result.map((movement) => {
        return new StockMovement(
          movement.productId,
          movement.type,
          movement.quantity,
          new Date(movement.timestamp),
        );
      });
      // Sparar listan med StockMovement-objekt i movements
      setMovements(stockMovements);
    } else {
      throw new Error("Could not get movements!");
    }
  }
  // Startar hämtningarna när sidan öppnas
  useEffect(() => {
    // Funktionen väntar in svar från API
    async function loadInventory() {
      try {
        // Produkter och lagerhändelser hämtas
        await Promise.all([getProducts(), getMovements()]);
      } catch (error) {
        // Om det misslyckas, fånga och spara fel
        setError(error.message);
      } finally {
        // Avslutar laddningen
        setLoading(false);
      }
    }

    // Anropa och kör funktionen
    loadInventory();
    // Avslutar useEffect
  }, []);
  // Om true
  if (loading) {
    return <p>Hämtar lagerinformation...</p>;
  }
  // Om false
  if (error) {
    return <p>{error}</p>;
  }
  // Skapar rapport (2) & skickar 2 listor till .buildReport (1)
  const inventoryService = new InventoryService();
  const inventoryReport = inventoryService.buildReport(
    products, movements
  );
  // Visar rapporten på hemsidan (3)
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Går igenom rapporten en produkt i taget */}
        {inventoryReport.map((product) => (
          // En div skapas för varje product
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <p className="font-bold text-lg">{product.name}</p>
            <p>Saldo: {product.balance}</p>

            <p
              className={
                product.balance === 0
                  ? "inline-block rounded px-2 py-1 font-bold text-[#4A433C] bg-[#D8D0C5]"
                  : product.lowStock
                    ? "inline-block rounded px-2 py-1 font-bold text-[#7D3021] bg-[#E8C1A8]"
                    : "inline-block rounded px-2 py-1 font-bold text-[#46512F] bg-[#CED3B4]"
              }
            >

              {/* Om true, low stock annars in stock*/}
              {product.balance === 0
                ? "Out of stock"
                : product.lowStock
                  ? "Low stock"
                  : "In stock"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Exporterar kompnenten
export default InventoryPage;