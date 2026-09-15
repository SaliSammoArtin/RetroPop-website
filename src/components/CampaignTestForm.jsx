import { useState } from 'react';
import Modules from '../modules/moduleMaker.js';


// TILLFÄLLIG TESTKOMPONENT - byggs bort senare och ersätts av riktig
// kampanjkod-integration i kundvagnen. Syftet här är bara att verifiera
// att hela kedjan (React -> moduleMaker -> CampaignModule -> Discount-
// klasserna) fungerar korrekt end-to-end.
export default function CampaignTestForm() {

  // Håller koll på vad användaren skriver i textfältet
  const [code, setCode] = useState('');
  // Håller resultatet från modulen, för att kunna visa det på sidan
  const[result, setResult] = useState (null);

  async function handleSubmit(event) {

    // Förhindrar att sidan laddas om vid formulär-submit (standardbeteende)
    event.preventDefault();

     // Påhittad, hårdkodad varukorg - bara för test. I den riktiga
    // kundvagns-integrationen kommer denna komma från appens
    // faktiska cart-state istället.
    const testCart = [{price: 100}, {price: 250}];

    // Anropar CampaignModule (via moduleMaker) med kampanjkoden
    // användaren skrivit in och testkorgen. await väntar in svaret
    // eftersom run() är async (gör ett fetch-anrop internt).
    const res = await Modules.CampaignModule.run({ campaignCode: code, cart: testCart});

    // Sparar resultatet i state, så det kan visas i UI:t
    setResult(res);
  }


  // Visa ett formulär med ett textfält och en knapp. När användaren skriver,
  // spara texten. När de klickar 'Testa', kör handleSubmit.
  // Om det finns ett resultat sparat, visa det snyggt formaterat som text under formuläret.
  return (
    <form onSubmit={handleSubmit}>
      <input value={code}
       onChange={(e) => setCode (e.target.value)}
       placeholder ="Kampanjkod"
       />
      <button type ="submit">Testa</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
}