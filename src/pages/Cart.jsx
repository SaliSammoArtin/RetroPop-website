import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItems from "../components/CartItems";


function Cart() {
  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <h1>Cart</h1>

      {cartItems.map(item => (
        <CartItems key={item.id} items={item} />

      ))}
    </div>
  )
}

export default Cart;