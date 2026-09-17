import { useState } from "react";
import ShippingService from "../ShippingCalculator/ShippingService.js";
import { useCart } from "../context/CartContext";

export default function ShippingQuotes() {
  const { cartItems } = useCart();

  const [areaCode, setAreaCode] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [selectedCarrier, setSelectedCarrier] = useState("");

  async function calculateShipping() {
    try {
      const service = new ShippingService();

      const result = await service.run(
        { destination: areaCode },
        { cart: cartItems },
      );

      setQuotes(result);
      setSelectedCarrier(""); // nollställ tidigare val
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-retro-cream-bg border-2 border-retro-yellow-highlight rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-black tracking-wide text-retro-green-text mb-4">
        Shipping
      </h2>

      <label className="block font-black tracking-wide text-retro-dark-text mb-1">
        Area code
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={areaCode}
          onChange={(e) => setAreaCode(e.target.value)}
          placeholder="211 34"
          className="bg-retro-cream-bg border-4 border-retro-green-text text-retro-dark-text rounded px-3 py-2 placeholder-retro-dark-text/60 flex-1"
        />
        <button
          onClick={calculateShipping}
          className="bg-retro-yellow-highlight hover:bg-retro-orange-bg border-4 border-retro-green-text rounded px-4 py-2 font-black tracking-wide transition-colors">
          Calculate shipping
        </button>
      </div>

      {quotes.length > 0 && (
        <div className="mt-4">
          <h3 className="font-black tracking-wide text-retro-green-text mb-2">
            Choose shipping
          </h3>

          <div className="flex flex-col gap-2">
            {quotes.map((quote) => (
              <label
                key={quote.carrier}
                className="flex items-center gap-2 text-retro-dark-text">
                <input
                  type="radio"
                  name="shipping"
                  value={quote.carrier}
                  checked={selectedCarrier === quote.carrier}
                  onChange={(e) => setSelectedCarrier(e.target.value)}
                  className="accent-retro-orange-bg"
                />
                {quote.carrier} – {quote.price} kr
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
