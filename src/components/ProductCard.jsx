import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCalculatedPrice } from "../hooks/useCalculatedPrice";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { currency } = useCurrency();
  const { finalPrice, loading } = useCalculatedPrice(product, currency);

  return (
    <div className=" bg-retro-green-text text-retro-cream-bg border-4 border-retro-dark-text shadow-lg p-6 flex flex-col gap-2 min-h-96 transition hover:scale-105 hover:bg-retro-green-text/80 ">
      <div className="flex-1 rounded-xl bg-retro-yellow-highlight mb-2 " />

      <h3 className="text-xl font-semibold italic">{product.name}</h3>

      <p className="text-lg font-bold text-retro-orange-bg">
        {loading ? "..." : `${finalPrice.toFixed(2)} ${currency}`}
      </p>

      <p className="text-sm italic opacity-70">Only {product.balance} left!</p>

      <button
        onClick={() => addToCart(product)}
        disabled={product.balance <= 0}
        className={
          product.balance <= 0
            ? "mt-auto rounded-xl bg-[#625B52] text-[#D8D0C5] font-semibold py-2 cursor-not-allowed opacity-70"
            : "mt-auto rounded-xl bg-retro-orange-bg text-retro-dark-text font-semibold py-2 hover:bg-retro-yellow-highlight"
        }
      >
        {product.balance <= 0 ? "Out of stock" : "Add to cart"}
      </button>
      <Link
        to={`/products/${product.id}`}
        className="mt-auto rounded-xl border border-retro-cream-bg/40 text-retro-cream-bg py-2 hover:border-retro-yellow-highlight hover:text-retro-yellow-highlight justify-center flex">
        View details!
      </Link>
    </div>
  );
}
