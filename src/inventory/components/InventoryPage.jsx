import { useEffect, useState } from "react";
import StockItem from "../models/stockItem.js";
import StockMovement from "../models/stockMovement.js";
import InventoryService from "../services/inventoryService.js";

const inventoryService = new InventoryService();

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [deliveryQuantity, setDeliveryQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

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

  async function handleDelivery(event) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      await inventoryService.createMovement(
        selectedProductId,
        "IN",
        Number(deliveryQuantity),
      );

      await getMovements();

      setSuccessMessage("Inleveransen har registrerats.");
      setDeliveryQuantity(1);
    } catch (error) {
      setError(error.message);
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
  const inventoryReport = inventoryService.buildReport(
    products, movements
  );
  // Visar rapporten på hemsidan (3)
  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory</h1>

      <form
        onSubmit={handleDelivery}
        className="mb-6 flex flex-wrap items-end gap-3 rounded-lg bg-retro-green-text p-4 text-retro-cream-bg"
      >
        <label className="flex flex-col gap-1">
          <span className="font-bold">Produkt</span>

          <select
            value={selectedProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
            required
            className="rounded border p-2"
          >
            <option value="">Välj produkt</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Antal</span>

          <input
            type="number"
            min="1"
            value={deliveryQuantity}
            onChange={(event) => setDeliveryQuantity(event.target.value)}
            required
            className="w-24 rounded border p-2"
          />
        </label>

        <button
          type="submit"
          className="rounded bg-retro-orange-bg px-4 py-2 font-bold text-retro-dark-text"
        >
          Registrera inleverans
        </button>
      </form>

      {successMessage && (
        <p className="mb-4 font-bold text-[#46512F]">{successMessage}</p>
      )}

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
                product.balance <= 0
                  ? "inline-block rounded px-2 py-1 font-bold text-[#4A433C] bg-[#D8D0C5]"
                  : product.lowStock
                    ? "inline-block rounded px-2 py-1 font-bold text-[#7D3021] bg-[#E8C1A8]"
                    : "inline-block rounded px-2 py-1 font-bold text-[#46512F] bg-[#CED3B4]"
              }
            >

              {/* Om true, low stock annars in stock*/}
              {product.balance <= 0
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