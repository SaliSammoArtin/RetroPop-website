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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl sm:text-4xl font-black tracking-wide text-retro-green-text ">
        Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 flex flex-col gap-4 ">
          {cartItems.length === 0 ?
            <p className="bg-retro-cream-bg text-retro-green-text border-2 border-retro-yellow-highlight rounded-xl shadow-lg p-8 font-black tracking-wide text-center">
              Your cart is empty.
            </p>
          : cartItems.map((item) => <CartItems key={item.id} items={item} />)}

          {cartItems.length > 0 && (
            <div className="fixed bottom-4 right-4 sm:right-6 z-50 bg-retro-green-text text-retro-cream-bg rounded-xl border-3 border-retro-yellow-highlight p-3 sm:p-4 flex flex-col items-end shadow-2xl">
              {discountResult && (
                <p className="text-sm font-medium text-retro-cream-bg">
                  Discount: -{discountResult.discountAmount.toFixed(2)}{" "}
                  {currency}
                </p>
              )}
              <p className="text-2xl font-black tracking-wide text-retro-orange-bg">
                {loading ? "..." : `${finalTotal.toFixed(2)} ${currency}`}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6  rounded-2xl">
          <ShippingQuotes />

          <CampaignCodeField onDiscountApplied={setDiscountResult} />

          <CustomerInfoForm
            onSubmit={handleOrderSubmit}
            sendButtonLabel="Confirm purchase!"
          />
        </div>
      </div>
    </div>
  );
}
