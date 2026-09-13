import { useCart } from "../context/CartContext";
import { Link } from "react-router";
import CheckoutItems from "./CheckoutItems";

export default function ShoppingCart() {
  const { isCartOpen, closeCart, cartItems, totalPrice } = useCart();

  if (!isCartOpen) return null;
  return (
    <aside className=" fixed inset-y-0 right-0  w-full max-w-md flex-col z-50 flex rounded-l-2xl bg-slate-950/40 backdrop-blur-2xl border border-white/10">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold tracking-wide">Your cart!</h2>
        <button
          onClick={closeCart}
          className="  hover:animate-spin hover:scale-125 hover:text-red-500 hover:cursor-pointer transition-colors p-1">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ?
          <p className="p-4">Your cart is empty.</p>
        : cartItems.map((item) => <CheckoutItems key={item.id} items={item} />)}
      </div>
      <div className="p-4 border-t border-white/10">
        <h2 className="font-semibold">Total: {totalPrice.toFixed(2)} kr</h2>
        <Link to={"/cart"} className="text-2xl hover:text-white/30">
          Checkout
        </Link>
      </div>
    </aside>
  );
}
