import PercentageDiscount from "./services/PercentageDiscount";
import ThresholdDiscount from "./services/ThresholdDiscount";
import BuyXForYDiscount from "./services/BuyXForYDiscount";

export default class CampaignModule {
  // Statisk beskrivning av modulen, läsbar utan att skapa ett objekt.
  // Används av gruppens generiska formulärkomponent för att veta
  // vilken indata modulen behöver och vad den ger tillbaka.
  static descriptor = {
    name: "CampaignModule",
    methodsAndInputs: [
      {
        method: "run",
        input: [
          "campaignCode - the campaign code the customer entered",
          "cart - the contents of the shopping cart",
        ],
        output: "price specification with discount and total price",
      },
    ],
  };

  // Körs en gång när modulen skapas (new CampaignModule()).
  // Förbereder en cache-plats som finns kvar mellan varje run()-anrop.
  // null = "inget hämtat än" (en tom array skulle räknas som "sant").
  constructor() {
    this.cachedCampaigns = null;
  }

  // Modulens "startknapp" - anropas av React med kundens indata.
  // async eftersom den innehåller ett nätverksanrop (fetch).
  async run(values, context) {
    // Plockar ut det vi behöver ur values-objektet
    const campaignCode = values.campaignCode;
    const cart = values.cart;

    let campaigns;
    // Om cachen redan har data, använd den - annars hämta från servern
    if (this.cachedCampaigns) {
      campaigns = this.cachedCampaigns;
    } else {
      const response = await fetch("/api/campaigns");
      campaigns = await response.json();
      this.cachedCampaigns = campaigns;
    }
    // Letar upp kampanjen som matchar kundens kod
    const matchedCampaign = campaigns.find(
      (campaign) => campaign.code === campaignCode,
    );
    if (!matchedCampaign) {
      throw new Error("Couldn't find the campaign code, try again!");
    }
    // Tom variabel - vilken Discount-typ det blir avgörs av switchen nedan.
    let discount;

    // Väljer rätt klass baserat på matchedCampaign.type
    //(en textsträng från databasen som säger vilken sorts kampanj det är).
    switch (matchedCampaign.type) {
      case "percentage":
        discount = new PercentageDiscount(
          matchedCampaign.name,
          matchedCampaign.description,
          matchedCampaign.campaignCode,
          matchedCampaign.percentage,
        );
        break;

      case "threshold":
        discount = new ThresholdDiscount(
          matchedCampaign.name,
          matchedCampaign.description,
          matchedCampaign.campaignCode,
          matchedCampaign.percentage,
          matchedCampaign.threshold,
        );
        break;

      case "buyXForY":
        discount = new BuyXForYDiscount(
          matchedCampaign.name,
          matchedCampaign.description,
          matchedCampaign.campaignCode,
          matchedCampaign.x,
          matchedCampaign.y,
          matchedCampaign.productId,
        );
        break;
      // Säkerhetsspärr: om type inte matchar något känt fall,
      // kasta ett tydligt fel istället för att krascha konstigt senare.
      default:
        throw new Error("Unknown campaign type");
    }
    // Kör den specifika uträkningen för vald kampanjtyp -> rabatt i kronor
    const discountAmount = discount.calculate(cart);

    
    const totalPrice = cart.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    
    // Vad kunden faktiskt ska betala: totalpris minus rabatt
    const finalPrice = totalPrice - discountAmount;

    // Skickar tillbaka resultatet till den som anropade run()
    return {
      totalPrice: Math.round(totalPrice * 100) / 100,
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
    };
  }
}