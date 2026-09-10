import { useEffect, useState } from "react";

//Skapar komponenten
function InventoryPage() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
    const result = await response.json();

    if (response.ok) {
      //sparar produkterna i state
      setProducts(result);
    } else {
      console.log("Error!");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section>
      <h1>Inventory</h1>
    </section>
  );
}

//Exporterar komponenten
export default InventoryPage;