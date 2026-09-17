import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Modules from '../modules/moduleMaker.js';
import { useCurrency } from '../context/CurrencyContext.jsx';


// Hämtar den RIKTIGA varukorgen och den DELADE rabatt-statusen via
// CartContext. Eftersom discountResult kommer från Context istället
// för lokal state, ser BÅDE sidopanelen och checkout-sidan samma
// resultat automatiskt.
export default function CampaignCodeField( {total} ) {

 
  const { cartItems, discountResult, setDiscountResult } = useCart();
  const { currency } = useCurrency();

  // Håller koll på vad kunden skriver i fältet
  const [campaignCode, setCampaignCode] = useState("");

  // Körs automatiskt VARJE gång cartItems ändras (produkt läggs till/tas bort).
  // Nollställer rabatten och fältet, kunden måste skriva in koden på nytt
  // om varukorgen ändrats, så gammal/felaktig rabatt inte "hänger kvar".
  useEffect(() => {
    if (cartItems.length === 0) {
      setDiscountResult(null);
      setCampaignCode("");
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
  }

  const discountFraction = discountResult
  ? discountResult.discountAmount / discountResult.totalPrice
  : 0;
  const displayedDiscount = total ? total * discountFraction : 0;

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
          }}
          className="border-4 bg-retro-green-text text-retro-cream-bg border-retro-dark-text hover:bg-red-600 rounded px-4 py-2 font-black tracking-wide transition-colors">
          Ta bort kod
        </button>
      </div>
      {discountResult && (
        <p className="font-black tracking-wide text-retro-green-text">
          Rabatt: {displayedDiscount.toFixed(2)} {currency}
        </p>
      )}
    </div>
  );
}
