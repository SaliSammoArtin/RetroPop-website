import { useCart } from "../context/CartContext"

export default function CartItems({ items }) {
  const { addToCart, removeFromCart } = useCart();
  return (
    <div>
      <h3>{items.title}</h3>
      <p>{items.name}</p>
      <p>{items.price}</p>
      <p>{items.quantity}</p>
      <button onClick={() => addToCart(items)}>+</button>
      <button onClick={() => removeFromCart(items.id)}>-</button>
    </div>
  );
}
    