import { Link } from "react-router";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="rounded-2xl bg-white/30 backdrop-blur-2xl border border-white/10 shadow-lg p-6 flex flex-col gap-2 min-h-96 transition hover:scale-105 hover:bg-white/40">
      <div className="flex-1 rounded-xl bg-white/20 mb-2" />

      <h3 className="text-xl font-semibold italic">{product.name}</h3>

      <p className="text-lg font-bold">{product.price} kr</p>

      <p className="text-sm italic opacity-70">Only {product.stock} left!</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto rounded-xl bg-black text-white py-2 hover:bg-zinc-800">
        Add to cart
      </button>
      <Link
        to={`/products/${product.id}`}
        className="mt-auto rounded-xl bg-black text-white py-2 hover:bg-zinc-800 justify-center flex">
        View details!
      </Link>
    </div>
  );
}
