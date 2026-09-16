import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Modules from '../modules/moduleMaker.js';

export default function CampaignCodeField() {
  const { cartItems } = useCart();
  const [campaignCode, setCampaignCode] = useState('');
  const [discountResult, setDiscountResult] = useState(null);

  useEffect(() => {
    if (cartItems.length === 0)
 {
      setDiscountResult(null);
      setCampaignCode('');
 }  
}, [cartItems]);

  async function applyCampaignCode() {
    const result = await Modules.CampaignModule.run({
      campaignCode: campaignCode,
      cart: cartItems,
    });
    setDiscountResult(result);
  }

  return (
    <div>
      <input value={campaignCode} onChange={(e) => setCampaignCode(e.target.value)} placeholder="Kampanjkod" />
      <button onClick={applyCampaignCode}>Använd kod</button>
      {discountResult && <p>Rabatt: {discountResult.discountAmount} kr</p>}
    </div>
  );
}