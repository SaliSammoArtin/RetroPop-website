import { useContext, useEffect, useState } from "react";
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
  const {
    cartItems,
    setCartItems,
    discountResult,
    setDiscountResult,
    shippingQuote,
    setShippingQuote,
    setPostalCode,
  } = useContext(CartContext);

  const { total, totalOriginal, totalTax, loading } = useCartTotal(
    cartItems,
    currency,
  );

  const [shippingRate, setShippingRate] = useState(1);

  useEffect(() => {
    let cancelled = false;

    moduleMaker.TaxAndCurrencyCalc.convertCurrency(
      moduleMaker.TaxAndCurrencyCalc.createMoney(1, "SEK"),
      currency,
    ).then((money) => {
      if (!cancelled) setShippingRate(money.amount);
    });

    return () => {
      cancelled = true;
    };
  }, [currency]);

  const shippingCost = (shippingQuote?.price || 0) * shippingRate;
  const discountFraction =
    discountResult ?
      discountResult.discountAmount / discountResult.totalPrice
      : 0;

  const discountedTotal = total - total * discountFraction;
  const finalTotal = discountedTotal + shippingCost;

  const navigate = useNavigate();

  const [shippingError, setShippingError] = useState("");


  async function handleOrderSubmit(customerData) {

    if (!shippingQuote) {
      setShippingError("Please select a shipping option before checkout.");
      return;
    }

    setShippingError("");


    const order = {
      name: customerData.name,
      email: customerData.email,
      items: cartItems,
      total: finalTotal,
      shipping: shippingQuote,
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

    setCartItems([]);
    setDiscountResult(null);
    setShippingQuote(null);
    setPostalCode("");

    navigate("/orderConfirm");
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
              {!loading && (
                <p className="text-xs text-retro-cream-bg/70">
                  {moduleMaker.TaxAndCurrencyCalc.createMoney(
                    totalOriginal,
                    currency,
                  ).format()}{" "}
                  +{" "}
                  {moduleMaker.TaxAndCurrencyCalc.createMoney(
                    totalTax,
                    currency,
                  ).format()}{" "}
                  moms
                </p>
              )}
              {discountResult && (
                <p className="text-sm font-medium text-retro-cream-bg">
                  Discount: -{(total * discountFraction).toFixed(2)} {currency}
                </p>
              )}

              {shippingQuote && (
                <p className="text-sm font-medium text-retro-cream-bg">
                  Shipping: {shippingCost.toFixed(2)} {currency}
                </p>
              )}

              <p className="text-2xl font-black tracking-wide text-retro-orange-bg">
                {loading ? "..." : `${finalTotal.toFixed(2)} ${currency}`}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6  rounded-2xl">
          <CampaignCodeField total={total} />

          <ShippingQuotes />

          {shippingError && (
            <p className="text-red-600 font-bold text-sm">
              {shippingError}
            </p>
          )}

          <CustomerInfoForm
            onSubmit={handleOrderSubmit}
            sendButtonLabel="Confirm purchase!"
          />
        </div>
      </div>
    </div>
  );
}
