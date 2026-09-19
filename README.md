**Kampanjmotor**

**Modulens syfte**
Modulen låter kunden ta del av olika typer av kampanjer/rabatter i kassan

-Låta kunden fylla i en förutbestämd rabattkod för att ta del av rabatt
-Procentrabatt (20% på ett helt köp)
-Tröskelrabatt (handla för 500kr, få 10% rabatt)
-3 produkter, betala för 2 (kopplad till en specifik vara)

**Klassernas roller och relationer**

Basklassen Discount bestämmer vad underklasserna (kampanjtyperna) måste innehålla.
Bland annat en calculate(cart)-metod som varje underklass (PercentageDiscount, ThresholdDiscount, BuyXForYDiscount) ärver och implementerar på sitt eget sätt.
CampaignModule (index.js) samordnar: matchar kundens kod mot rätt kampanj i databasen, väljer/skapar rätt Discount-subklass utifrån kampanjens typ, och sätter sedan ihop det färdiga priset (totalpris, rabatt, slutpris).
ModuleMaker är en gemensam fil som skapar en instans av varje modul och gör både instans och descriptor tillgängliga för resten av projektet.


**Motivering av designval**

Det kändes smidigast att göra en basklass med underklasser som ärver, istället för att upprepa mycket likadan kod.
Varje subklass har sin egen calculate-metod, koden som anropar behöver bara skriva discount.calculate(cart).
Switchen i run() behövs för att översätta kampanjtypen (en textsträng från databasen) till rätt klass-instans, som körs en gång per anrop, inte varje gång calculate anropas.
Kampanjvärdena (procentsats, tröskel, produkt-id) kommer från databasen istället för att vara hårdkodade, så nya kampanjer av samma typ kan läggas till utan att koden behöver ändras. Det är bara helt nya sorters rabattlogik som kräver en ny klass.
