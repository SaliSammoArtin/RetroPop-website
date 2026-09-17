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
  const [campaignCode, setCampaignCode] = useState('');

  // Körs automatiskt VARJE gång cartItems ändras (produkt läggs till/tas bort).
  // Nollställer rabatten och fältet, kunden måste skriva in koden på nytt
  // om varukorgen ändrats, så gammal/felaktig rabatt inte "hänger kvar".
  useEffect(() => {
    if (cartItems.length === 0) {
      setDiscountResult(null);
      setCampaignCode('');
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
        onClick={() => { setDiscountResult(null); setCampaignCode(''); }}
        className="hover:text-red-400 border border-white/10 rounded px-4 py-2 transition-colors">
        Ta bort kod
      </button>
    </div>
    {discountResult && <p className="text-green-400">Rabatt: {displayedDiscount.toFixed(2)} {currency}</p>}
  </div>
);
}