// export för att andra filer ska kunna använda discount
export default class Discount {
  //constructorn som visar vad underklasser måste ärva
  constructor(name, description, campaignCode) {
    this.name = name;
    this.description = description;
    this.campaignCode = campaignCode;
  }
  //funktion som påtalar att den måste användas o skapas av en underklass
  calculate(cart) {
    throw new Error("Calculate must be implemented by a subclass");
  }
}