// Importerar CampaignModule-klassen från din modulmapp.
// Denna fil samlar ALLA gruppmedlemmars moduler på ett ställe,
// så React kan komma åt dem alla via samma gemensamma fil.
import CampaignModule from "../CampaignModule.jsx";


// Exporterar ett objekt som fungerar som en "katalog" över alla moduler.
// Detta är kopplingen mellan din modul (och andras) och resten av
// React-projektet - React importerar detta objekt istället för att
// importera varje enskild modul separat.
export default {
  // "new CampaignModule()" skapar EN instans av din modul - detta görs
  // BARA HÄR, en enda gång, så att hela appen delar SAMMA instans
  // (viktigt för att din cache ska fungera - om flera instanser skapades
  // separat, skulle varje instans ha sin egen tomma cache).
  CampaignModule: new CampaignModule(),

  // Descriptorn hämtas direkt från KLASSEN (inte instansen), eftersom
  // den är "static" - den beskriver modulen utan att behöva köra den.
  // React (t.ex. formulärkomponenten) läser denna för att veta vilka
  // fält som behövs och vad modulen returnerar.
  CampaignModuleDescriptor: CampaignModule.descriptor,
};
