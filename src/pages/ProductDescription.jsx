import { useParams, Link } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCalculatedPrice } from "../hooks/useCalculatedPrice";

export default function ProductDescription() {
  const { product_id } = useParams();
  const {
    data: product,
    loading: fetchLoading,
    error,
  } = useFetch(product_id ? `/api/products/${product_id}` : null);

  const { addToCart, showToast } = useCart();
  const { currency } = useCurrency();
  const { finalPrice, loading: priceLoading } = useCalculatedPrice(
    product,
    currency,
  );

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center ">
        <p className="text-xl font-semibold text-retro-cream-bg">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto p-8 border-4 border-retro-yellow-highlight bg-retro-green-text text-retro-cream-bg rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl font-bold">Product could not be found!</h2>
        <Link
          to="/"
          className="inline-block mt-2 px-6 rounded-2xl bg-retro-orange-bg text-retro-cream-bg ">
          Back to store
        </Link>
      </div>
    );
  }

  const stockCount = product.stock;
  const isOutOfStock = stockCount <= 0;

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-xl italic text-retro-green-text  hover:text-retro-yellow-highlight mb-6 transition">
        ← Back to products
      </Link>

      <div className="border-4 border-retro-yellow-highlight bg-retro-green-text text-retro-cream-bg rounded-2xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 h-72 md:h-96 rounded-xl bg-retro-yellow-highlight flex items-center justify-center">
          <span className="text-retro-dark-text opacity-40 font-bold italic text-lg"></span>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-black tracking-wide border-b border-retro-cream-bg/20 pb-3">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-retro-orange-bg">
              {priceLoading ? "..." : `${finalPrice?.toFixed(2)} ${currency}`}
            </p>

            <p className="text-sm italic opacity-70">
              {isOutOfStock ? "Out of stock" : `Only ${stockCount} left!`}
            </p>
          </div>

          <button
            disabled={isOutOfStock}
            className={
              isOutOfStock ?
                "w-full rounded-xl bg-retro-dark-text text-retro-cream-bg font-semibold py-3 cursor-not-allowed opacity-70"
              : "w-full rounded-xl bg-retro-orange-bg text-retro-cream-bg font-bold py-3 shadow-md transition-all duration-200 hover:bg-retro-yellow-highlight hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-retro-yellow-highlight/50"
            }
            onClick={() => {
              addToCart(product);
              showToast(`${product.name} added to cart`);
            }}>
            {isOutOfStock ? "Out of stock" : "Add to cart!"}
          </button>
        </div>
      </div>
    </div>
  );
}
