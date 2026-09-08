import { useSearchParams } from "react-router";
import { useCart } from "../context/CartContext";
export default function ShoppingCart() {
  const { isCartOpen, closeCart } = useCart();
  
  if (!isCartOpen) return null;
  return (
    <aside className="z-50 flex justify-end rounded-2xl bg-white/30 backdrop-blur-2xl border border-white/10">
      <div>
        <button onClick={closeCart} className="text-white/30 hover:text-white/40"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 </button>
        <h2>Your cart!</h2>
      </div>
    </aside>

  )
}