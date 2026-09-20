ShippingCalculator är en fristående fraktmodul i webshoppen RetroPop. Den tar in 
varukorgen och användarens postnummer för att ge tre fraktofferter användaren kan välja mellan.

Modulen är byggd för att vara oberoende av resten av appen och lätt att ersätta. 

Vid checkout anger användaren sitt postnummer som valideras. Fem siffor anges, inga andra tecken tillåts.
ShippingQuotes.jsx anropar moduleMaker.Shipping.run(). Transportörer och priser hämtas ur databasen
och resturneras som tre prisalternativ. Användaren väljer ett alternativ som sparas i CartContext. 
Cart.jsx lägger till fraktkostnaden i totalsumman för ordern. Användaren tillåts inte checka ut utan ha valt fraktalternativ. 

Filer som enbart behandlar modulen:
/ShippingCalculator/Carrier.js
/ShippingCalculator/index.js
/ShippingCalculator/Parcel.js
/ShippingCalculator/Shipping.js
/ShippingCalculator/ShippingService.js
/Components/ShippingQuotes.jsx

Övriga filer som modulen ingår i:
/Modules/moduleMaker.js
/Context/CartContext.jsx
/Pages/Cart.jsx
