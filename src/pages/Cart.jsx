import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItems from "../components/CheckoutItems";

export default function Cart() {
  const { cartItems, totalPrice } = useContext(CartContext);

  return (
    <div>
      <h1>Cart</h1>

      {cartItems.map((item) => (
        <CartItems key={item.id} items={item} />
      ))}

      <h2>Total: {totalPrice.toFixed(2)}kr</h2>
    </div>
  );
}
