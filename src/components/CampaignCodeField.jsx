import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Modules from '../modules/moduleMaker.js';

// Tar emot onDiscountApplied som prop, en funktion FÖRÄLDERN (Cart.jsx)
// skickar in, så den kan få veta om resultatet, inte bara denna komponent.
export default function CampaignCodeField({ onDiscountApplied }) {

  // Hämtar den RIKTIGA varukorgen, delad via CartContext
  const { cartItems } = useCart();

  // Håller koll på vad kunden skriver i fältet
  const [campaignCode, setCampaignCode] = useState('');

  // Håller resultatet EFTER att modulen räknat ut rabatten
  const [discountResult, setDiscountResult] = useState(null);

  // Körs automatiskt VARJE gång cartItems ändras (produkt läggs till/tas bort).
  // Nollställer rabatten och fältet, kunden måste skriva in koden på nytt
  // om varukorgen ändrats, så gammal/felaktig rabatt inte "hänger kvar".
  useEffect(() => {
    if (cartItems.length === 0) {
      setDiscountResult(null);
      setCampaignCode('');
      onDiscountApplied(null)
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
  <div className="flex flex-col gap-2">
    <input
      value={campaignCode}
      onChange={(e) => setCampaignCode(e.target.value)}
      placeholder="Kampanjkod"
      className="bg-slate-800/40 border border-white/10 rounded px-3 py-2 text-white placeholder-white/40 w-64"
    />
    <div className="flex gap-2">
      <button
        onClick={applyCampaignCode}
        className="bg-white/10 hover:bg-white/20 border border-white/10 rounded px-4 py-2 transition-colors">
        Använd kod
      </button>
      <button
        onClick={() => { setDiscountResult(null); setCampaignCode(''); onDiscountApplied(null); }}
        className="hover:text-red-400 border border-white/10 rounded px-4 py-2 transition-colors">
        Ta bort kod
      </button>
    </div>
    {discountResult && <p className="text-green-400">Rabatt: {discountResult.discountAmount} kr</p>}
  </div>
);
}