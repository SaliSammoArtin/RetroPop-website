# CurrencyTaxModule

## Syfte

Modulen räknar ut produktpris med valuta och moms. Den ansvarar för två saker som webbshoppen behöver för US6 "priser inkl. moms, ev. i vald valuta" momsberäkning per varukategori och
valutaväxling mot kurser i databasen.

## Klasser och relationer

- **`Money`** är ett värde objekt som bär ett belopp och en valuta. Den har skydd för att blanda valutor.
  `add()` kastar `CurrencyError` om man försöker addera olika valutor.
  Konstruktorn kastar fel på ogiltiga belopp. `addTax()` och `convert()`
  returnerar nya `Money`-instanser istället för att mutera sig
  själv.
- **`TaxTable`** — håller uppslagstabellen för momssatser
  (`STANDARD` 25 %, `LIVSMEDEL` 12 %, `BOCKER` 6 %) och applicerar rätt sats på
  ett `Money`-objekt via `applyTax()`. Den kastar `UnknownCategoryError` för
  okända kategorier istället för att tyst anta 0 %.
- **`ExchangeRateClient`** — hämtar växelkurser asynkront från `/api/rates`
  och cachar dem (5 minuter TTL) så att samma kurs inte hämtas om och om
  igen under en session. Den tar även bort parallella anrop mot samma
  valutapar (`#pendingRequest`) så att två samtidiga förfrågningar inte
  triggar dubbla nätverksanrop. Kastar `UnknownCurrencyError` och
  `ExchangeRateFetchError` vid ogiltig valuta eller misslyckat API-anrop.
- **`TaxAndCurrencyCalc`** (default export, modulens publika ingång)
  orkestrerar de tre klasserna ovan bakom modulkontraktets metoder
  (`calculatePrice`, `convertCurrency`, `applyTax`, `addPrices` plus några till) och
  exponerar en statisk `descriptor` som React-formulärgeneratorn läser.

Relationen mellan klasserna är **komposition**, inte arv:
`TaxAndCurrencyCalc` äger en `TaxTable` och en `ExchangeRateClient` instans
och skickar `Money`-objekt mellan dem. Det finns ingen naturlig
"is-a" relation mellan klasserna. På grund av saknaden av en naturlig "is-a" hade arv skapat en konstgjord hirarki. Med komposition så får man en tydligare ansvarsfördelning och skapar mindre beroenden som gör det lättare att testa enskilda delar och att underhålla/byta ut kod.

## Motiverat tillstånd (instans)

Modulen instansieras en gång (`new TaxAndCurrencyCalc()` i
`moduleMaker.js`) och bär tillstånd mellan anrop i form av
`ExchangeRateClient` cache och pågående förfrågningar. Utan detta tillstånd
skulle varje prisberäkning i kundvagnen trigga ett nytt nätverksanrop mot
`/api/rates` även för samma valutapar inom samma session.

## Felhantering

Alla fel signaleras genom att kasta specifika `Error`-subklasser med meddelanden som: (`CurrencyError`, `UnknownCurrencyError`,
`UnknownCategoryError`, `ExchangeRateFetchError`) — modulen kraschar eller
sväljer aldrig fel tyst, utan React-skalet fångar och visar felet t.ex. i
`useCalculatedPrice.js`
