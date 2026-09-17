import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCartTotal } from "../hooks/useCartTotal";
import moduleMaker from "../modules/moduleMaker";

const service = moduleMaker.Shipping;

export default function ShippingQuotes() {
  const {
    cartItems,
    shippingQuote,
    setShippingQuote,
    postalCode,
    setPostalCode,
  } = useCart();

  const { currency } = useCurrency();
  const { total } = useCartTotal(cartItems, currency);

  const [quotes, setQuotes] = useState([]);
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [error, setError] = useState("");
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

  function validatePostalCode() {
    if (postalCode.trim() === "") {
      return "Please enter a postal code";
    }

    if (!/^\d+$/.test(postalCode)) {
      return "Postal code may only contain numbers";
    }

    if (postalCode.length !== 5) {
      return "Postal code must contain exactly 5 digits";
    }

    return "";
  }

  async function calculateShipping() {
    const validationError = validatePostalCode();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      const result = await service.run(
        { destination: postalCode },
        { cart: cartItems }
      );

      setQuotes(result);
      setSelectedCarrier("");
      setSelectedQuote(null);
      setShippingQuote(null);
    } catch (error) {
      console.error(error);
    }
  }

  const orderTotal = selectedQuote
    ? total + selectedQuote.price
    : total;

  return (
    <div className="bg-retro-cream-bg border-2 border-retro-yellow-highlight rounded-xl shadow-lg p-6 flex flex-col gap-3">
      <h2 className="text-xl font-black tracking-wide text-retro-green-text">
        Shipping
      </h2>

      <label className="font-medium text-retro-green-text">
        Postal code
      </label>

      <input
        type="text"
        maxLength={5}
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="21145"
        className="bg-retro-cream-bg border-4 border-retro-green-text rounded px-3 py-2 placeholder-retro-dark-text/60 w-full sm:w-64"
      />

      {error && (
        <p className="text-red-600 font-semibold text-sm">
          {error}
        </p>
      )}

      <button
        onClick={calculateShipping}
        className="bg-retro-yellow-highlight hover:bg-retro-orange-bg border-4 border-retro-green-text rounded px-4 py-2 font-black tracking-wide transition-colors w-fit"
      >
        Calculate shipping
      </button>

      {quotes.length > 0 && (
        <>
          <h3 className="font-black tracking-wide text-retro-green-text mt-2">
            Choose carrier
          </h3>

          {quotes.map((quote) => (
            <label
              key={quote.carrier}
              className={`border-4 rounded-lg p-3 cursor-pointer transition-colors ${selectedCarrier === quote.carrier
                ? "border-retro-green-text bg-retro-yellow-highlight/30"
                : "border-retro-green-text bg-retro-cream-bg hover:bg-retro-yellow-highlight/10"
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={selectedCarrier === quote.carrier}
                    onChange={() => {
                      setSelectedCarrier(quote.carrier);
                      setSelectedQuote(quote);
                      setShippingQuote(quote);
                    }}
                  />

                  <span className="font-black text-retro-green-text">
                    {quote.carrier}
                  </span>
                </div>

                <span className="font-black text-retro-green-text">
                  {(quote.price * shippingRate).toFixed(2)} {currency}
                </span>
              </div>
            </label>
          ))}

          {selectedQuote && (
            <p className="font-black tracking-wide text-retro-green-text pt-2 border-t-2 border-retro-yellow-highlight">
              Shipping: {(selectedQuote.price * shippingRate).toFixed(2)}{" "}
              {currency}
            </p>
          )}
        </>
      )}
    </div>
  );
}
