import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCartTotal } from "../hooks/useCartTotal";
import { Link } from "react-router";
import CheckoutItems from "./CheckoutItems";

export default function ShoppingCart() {
  const { isCartOpen, closeCart, cartItems, discountResult } = useCart();
  const { currency } = useCurrency();
  const { total, loading: totalLoading } = useCartTotal(cartItems, currency);
  const discountFraction = discountResult ? discountResult.discountAmount / discountResult.totalPrice : 0;
  const finalTotal = total - (total * discountFraction);

  if (!isCartOpen) return null;

  return (
    <>
      <div
        onClick={closeCart}
        className="fixed inset-0 z-40 bg-black/40"
        aria-hidden="true"
      />

      <aside className="fixed inset-y-0 right-0 w-full max-w-md flex-col z-50 flex rounded-l-2xl bg-retro-green-text/35 backdrop-blur-2xl border border-retro-dark-text text-retro-cream-bg">
        <div className="flex items-center justify-between p-4 border-b border-retro-cream-bg/20">
          <h2 className="text-xl font-semibold tracking-wide text-retro-orange-bg">
            Your cart!
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-retro-cream-bg text-2xl hover:scale-125 hover:text-retro-orange-bg hover:cursor-pointer transition-colors p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin [scrollbar-color:var(--color-retro-yellow-highlight)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-retro-yellow-highlight [&::-webkit-scrollbar-thumb]:rounded-full">
          {cartItems.length === 0 ? (
            <p className="p-4">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <CheckoutItems key={item.id} items={item} />
            ))
          )}
        </div>

        <div className="p-4 border-t border-retro-cream-bg/20">
          {discountResult && (
            <p className="text-retro-yellow-highlight mb-1">
              Rabatt: {(total * discountFraction).toFixed(2)} {currency}
            </p>
          )}
          <h2 className="font-semibold mb-2">
            Total: {totalLoading ? "..." : `${finalTotal.toFixed(2)} ${currency}`}
          </h2>
          <Link
            to={"/cart"}
            className="text-2xl hover:text-retro-yellow-highlight text-retro-orange-bg inline-block"
            onClick={closeCart}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}