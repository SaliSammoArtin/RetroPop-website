import { useCart } from "../context/CartContext";

export default function CartItems({ items }) {
  const { addToCart, removeFromCart } = useCart();
  return (
    <div>
      <h3>{items.title}</h3>
      <p>{items.name}</p>
      <p>{items.price}</p>
      <p>{items.quantity}</p>
      <p>Subtotal: {(items.price * items.quantity).toFixed(2)} kr</p>
      <button onClick={() => addToCart(items)}>+</button>
      <button onClick={() => removeFromCart(items.id)}>-</button>
      <p></p>
    </div>
  );
}
