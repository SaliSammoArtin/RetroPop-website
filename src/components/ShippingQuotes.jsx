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
        { cart: cartItems }
      );

      setQuotes(result);
      setSelectedCarrier(""); // nollställ tidigare val
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Shipping</h2>

      <label>Area code</label>
      <input
        type="text"
        value={areaCode}
        onChange={(e) => setAreaCode(e.target.value)}
        placeholder="211 34"
      />

      <button onClick={calculateShipping}>
        Calculate shipping
      </button>

      {quotes.length > 0 && (
        <div>
          <h3>Choose shipping</h3>

          {quotes.map((quote) => (
            <label
              key={quote.carrier}
              style={{ display: "block", margin: "8px 0" }}
            >
              <input
                type="radio"
                name="shipping"
                value={quote.carrier}
                checked={selectedCarrier === quote.carrier}
                onChange={(e) => setSelectedCarrier(e.target.value)}
              />

              {" "}
              {quote.carrier} – {quote.price} kr
            </label>
          ))}
        </div>
      )}
    </div>
  );
}