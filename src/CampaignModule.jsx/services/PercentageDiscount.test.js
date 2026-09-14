import PercentageDiscount from "./PercentageDiscount";

const testCart = [
  { price: 100 },
  { price: 250 },
  { price: 50},
];

const discount = new PercentageDiscount("Summer", "10% discount", "SUMMER26", 10);
console.log(discount.calculate(testCart));



// Tillfällig testimport - lägg till i main.jsx
import './CampaignModule.jsx/services/PercentageDiscount.test.js'