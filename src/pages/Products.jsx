import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useFetch } from "../hooks/useFetch.js";

export default function Products() {
  // Skapar en state-variabel som håller listan med produkter.
  // Startvärdet är en tom array då vi inte hämtat data än.
  // setProducts är funktionen för att ändra värdet i products.
  const { data: products, loading, error } = useFetch("/api/products");

  if (loading) {
    return <p className="text-center p-6"> Loading products...</p>;
  }

  if (error) {
    return <p className="text-center p-6"> Could not get products: ${error}</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center p-6">No products available!</p>;
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl m-auto p-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
