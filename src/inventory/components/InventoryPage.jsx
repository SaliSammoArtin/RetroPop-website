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
    const response = await fetch("http://localhost:3000/products");
    const result = await response.json();

    if (response.ok) {
      const stockItems = result.map((product) => {
        return new StockItem(
          product.id,
          product.name,
          product.stock,
          product.reorderPoint,
        );
      });
      setProducts(stockItems);
    } else {
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
      setMovements(stockMovements);
    } else {
      throw new Error("Could not get movements!");
    }
  }

  useEffect(() => {
    async function loadInventory() {
      try {
        await Promise.all([getProducts(), getMovements()]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  if (loading) {
    return <p>Hämtar lagerinformation...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const inventoryReport = InventoryService.buildReport(
    products, movements
  );

  return (
    <section>
      <h1>Inventory</h1>

      {inventoryReport.map((product) => (
        //En div skapas för varje product
        <div key={product.id}>
          <p className="name">{product.name}</p>
          <p className="stock">{product.balance}</p>
          <p>
            {product.lowStock ? "Low stock" : "In stock"}
          </p>
        </div>
      ))}

    </section>
  );
}

export default InventoryPage;