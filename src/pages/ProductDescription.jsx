import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";

export default function ProductDescription() {
  const { product_id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetch(product_id ? `/api/products/${product_id}` : null);

  if (loading) {
    return <p className="text-center p-6">Loading product...</p>;
  }

  if (error || !product) {
    return <h2>Product could not be found!</h2>;
  }

  return (
    <div>
      {!product ?
        <h2>Product could not be found!</h2>
      : <>
          <h3>{product.name}</h3>
          <p> Price: {product.price}kr</p>
          <p> Stock: {product.stock}</p>
        </>
      }
    </div>
  );
}
