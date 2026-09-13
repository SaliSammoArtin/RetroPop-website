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
  const inventoryReport = InventoryService.buildReport(
    products, movements
  );
  // Visar rapporten på hemsidan (3)
  return (
    <section>
      <h1>Inventory</h1>
      {/* Går igenom rapporten en produkt i taget */}
      {inventoryReport.map((product) => (
        // En div skapas för varje product
        <div key={product.id}>
          <p className="name">{product.name}</p>
          <p className="stock">{product.balance}</p>
          <p> {/* Om true, low stock annars in stock*/}
            {product.lowStock ? "Low stock" : "In stock"}
          </p>
        </div>
      ))}

    </section>
  );
}
// Exporterar kompnenten
export default InventoryPage;