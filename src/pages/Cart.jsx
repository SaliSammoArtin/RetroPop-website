import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCartTotal } from "../hooks/useCartTotal";
import CartItems from "../components/CheckoutItems";
import CustomerInfoForm from "../components/CustomerInfoForm";
import CampaignCodeField from "../components/CampaignCodeField";
import { useNavigate } from "react-router";
import moduleMaker from "../modules/moduleMaker";
import ShippingQuotes from "../components/ShippingQuotes.jsx";

export default function Cart() {
  const { currency } = useCurrency();
  const { cartItems } = useContext(CartContext);
  const { total, loading } = useCartTotal(cartItems, currency);
  const [discountResult, setDiscountResult] = useState(null);
  const finalTotal =
    total - (discountResult ? discountResult.discountAmount : 0);

  const navigate = useNavigate();

  async function handleOrderSubmit(customerData) {
    const order = {
      name: customerData.name,
      email: customerData.email,
      items: cartItems,
      total: finalTotal,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Kunde inte spara beställningen");
    }

    await Promise.all(
      order.items.map((item) =>
        moduleMaker.Inventory.createMovement(item.id, "OUT", item.quantity),
      ),
    );

    navigate("/");
  }

  return (
    <div>
      <h1>Cart</h1>

      {cartItems.map((item) => (
        <CartItems key={item.id} items={item} />
      ))}
      <CampaignCodeField onDiscountApplied={setDiscountResult} />
      <h2>Total: {loading ? "..." : `${finalTotal.toFixed(2)} ${currency}`}</h2>

      <ShippingQuotes />

      <div className="md:col-start-8 md:col-span-5 md:ml-8">
        <CustomerInfoForm
          onSubmit={handleOrderSubmit}
          sendButtonLabel="Confirm purchase!"
        />
      </div>
    </div>
  );
}
