// hämtar in hooks från React
import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard.jsx";

export default function Products() {
  // Skapar en state-variabel som håller listan med produkter.
  // Startvärdet är en tom array då vi inte hämtat data än.
  // setProducts är funktionen för att ändra värdet i products.
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
    const result = await response.json();

    if (response.ok) {
      setProducts(result);
    } else {
      console.log("Fetching products failed!");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl m-auto p-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}