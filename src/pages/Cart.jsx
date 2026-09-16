import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCartTotal } from "../hooks/useCartTotal";
import CartItems from "../components/CheckoutItems";

export default function Cart() {
  const { cartItems } = useContext(CartContext);
  const { currency } = useCurrency();
  const { total, loading } = useCartTotal(cartItems, currency);

  return (
    <div>
      <h1>Cart</h1>

      {cartItems.map((item) => (
        <CartItems key={item.id} items={item} />
      ))}

      <h2>Total: {loading ? "..." : `${total.toFixed(2)} ${currency}`}</h2>
    </div>
  );
}
