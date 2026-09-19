import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Modules from '../modules/moduleMaker.js';
import { useCurrency } from '../context/CurrencyContext.jsx';


// Hämtar den RIKTIGA varukorgen och LISTAN av applicerade koder via
// CartContext. Kunden kan lägga till flera koder, som sedan kombineras
// enligt modulens egen combineDiscounts regel.
export default function CampaignCodeField( {total} ) {
 
  const { cartItems, appliedCodes, setAppliedCodes } = useCart();
  const { currency } = useCurrency();

  // Håller koll på vad kunden skriver i fältet
  const [campaignCode, setCampaignCode] = useState("");

  // Om varukorgen ändras (produkt läggs till/tas bort), nollställ ALLA
  // applicerade koder - kunden får skriva in dem på nytt. Enklare än att
  // räkna om varje kod automatiskt, och undviker att en ogiltig rabatt
  // "hänger kvar" efter en ändring.
    useEffect(() => {
    setAppliedCodes([]);
  }, [cartItems]);

  // Lägger till en ny kod i listan om den inte finns redan
  async function applyCampaignCode() {
    const alreadyApplied = appliedCodes.some((entry) => entry.code === campaignCode);
    if (alreadyApplied) return;

    const result = await Modules.CampaignModule.run({
      campaignCode: campaignCode,
      cart: cartItems,
    });
  

      setAppliedCodes([...appliedCodes, { code: campaignCode, result }]);
    setCampaignCode("");
  }

  // Tar bort en specifik kod ur listan.
  function removeCode(codeToRemove) {
    setAppliedCodes(appliedCodes.filter((entry) => entry.code !== codeToRemove));
  }

  // Om minst en kod är tillagd: kombinera ALLA deras resultat till
  // en enda slutsumma, via modulens combineDiscounts-metod.
  const combined =
    appliedCodes.length > 0
      ? Modules.CampaignModule.combineDiscounts(appliedCodes.map((entry) => entry.result))
      : null;

  const discountFraction = combined
  ? combined.discountAmount / combined.totalPrice
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
      </div>
      {appliedCodes.length > 0 && (
  <div className="flex flex-col gap-1">
    {appliedCodes.map((entry) => (
      <div key={entry.code} className="flex items-center justify-between gap-2">
        <span className="text-retro-green-text font-bold">{entry.code}</span>
        <button
          onClick={() => removeCode(entry.code)}
          className="border-2 bg-retro-green-text text-retro-cream-bg border-retro-dark-text hover:bg-red-600 rounded px-2 py-1 text-sm transition-colors">
          Ta bort
        </button>
      </div>
    ))}
  </div>
)}
      {combined && (
        <p className="font-black tracking-wide text-retro-green-text">
          Rabatt: {displayedDiscount.toFixed(2)} {currency}
        </p>
      )}
    </div>
  );
}
