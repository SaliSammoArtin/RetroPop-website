import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Modules from "../modules/moduleMaker.js";

// Tar emot onDiscountApplied som prop, en funktion FÖRÄLDERN (Cart.jsx)
// skickar in, så den kan få veta om resultatet, inte bara denna komponent.
export default function CampaignCodeField({ onDiscountApplied }) {
  // Hämtar den RIKTIGA varukorgen, delad via CartContext
  const { cartItems } = useCart();

  // Håller koll på vad kunden skriver i fältet
  const [campaignCode, setCampaignCode] = useState("");

  // Håller resultatet EFTER att modulen räknat ut rabatten
  const [discountResult, setDiscountResult] = useState(null);

  // Körs automatiskt VARJE gång cartItems ändras (produkt läggs till/tas bort).
  // Nollställer rabatten och fältet, kunden måste skriva in koden på nytt
  // om varukorgen ändrats, så gammal/felaktig rabatt inte "hänger kvar".
  useEffect(() => {
    if (cartItems.length === 0) {
      setDiscountResult(null);
      setCampaignCode("");
      onDiscountApplied(null);
    } else if (campaignCode) {
      applyCampaignCode();
    }
  }, [cartItems]);

  async function applyCampaignCode() {
    // Anropar modulen (via moduleMaker) med koden och den riktiga varukorgen
    const result = await Modules.CampaignModule.run({
      campaignCode: campaignCode,
      cart: cartItems,
    });
    setDiscountResult(result);
    onDiscountApplied(result);
  }

  return (
    <div className="bg-retro-cream-bg border-2 border-retro-yellow-highlight rounded-xl shadow-lg p-6 flex flex-col gap-3">
      <h2 className="text-xl font-black tracking-wide text-retro-green-text">
        Campaign code
      </h2>
      <input
        value={campaignCode}
        onChange={(e) => setCampaignCode(e.target.value)}
        placeholder="Kampanjkod"
        className="bg-retro-cream-bg border-4 border-retro-green-text rounded px-3 py-2 placeholder-retro-dark-text/60 w-full sm:w-64"
      />
      <div className="flex gap-2">
        <button
          onClick={applyCampaignCode}
          className="bg-retro-yellow-highlight hover:bg-retro-orange-bg border-4 border-retro-green-text rounded px-4 py-2 font-black tracking-wide transition-colors">
          Använd kod
        </button>
        <button
          onClick={() => {
            setDiscountResult(null);
            setCampaignCode("");
            onDiscountApplied(null);
          }}
          className="border-4 bg-retro-green-text text-retro-cream-bg border-retro-dark-text hover:bg-red-600 rounded px-4 py-2 font-black tracking-wide transition-colors">
          Ta bort kod
        </button>
      </div>
      {discountResult && (
        <p className="font-black tracking-wide text-retro-green-text">
          Rabatt: {discountResult.discountAmount} kr
        </p>
      )}
    </div>
  );
}
