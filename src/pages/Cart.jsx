import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCartTotal } from "../hooks/useCartTotal";
import CartItems from "../components/CheckoutItems";
import CustomerInfoForm from '../components/CustomerInfoForm';
import { useNavigate } from "react-router";

export default function Cart() {
  const { cartItems } = useContext(CartContext);
  const { currency } = useCurrency();
  const { total, loading } = useCartTotal(cartItems, currency);
  const { cartItems, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  async function handleOrderSubmit(customerData) {
    const order = {
      name: customerData.name,
      email: customerData.email,
      items: cartItems,
      total: totalPrice
    };

    await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    }
    );
    navigate('/');
  }


  return (
    <div>
      <h1>Cart</h1>

      {cartItems.map((item) => (
        <CartItems key={item.id} items={item} />
      ))}

      <h2>Total: {loading ? "..." : `${total.toFixed(2)} ${currency}`}</h2>
      <h2>Total: {totalPrice.toFixed(2)}kr</h2>

      <CustomerInfoForm
        onSubmit={handleOrderSubmit}
        sendButtonLabel="Confirm purchase!"
      />
    </div>
  );
}
