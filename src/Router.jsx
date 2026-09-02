import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Productdescription from "./pages/Productdescription.jsx";
import Products from "./pages/Products.jsx";
import Home from "./pages/Home.jsx";

// createBrowserRouter skapar själva routern för applikationen.
// Här definierar vi vilka URL:er som finns och vilka komponenter
// som ska visas när användaren besöker dem.
const router = createBrowserRouter([
  {
    // "/" är vår huvud-route.
    // Den matchar startsidan för applikationen.
    path: "/",

    // element bestämmer vilken React-komponent som ska renderas
    // när denna route matchar.
    // App fungerar här som en gemensam layout för våra undersidor.
    element: <App />,

    // children används för att skapa routes som ligger under
    // den nuvarande routen.
    // Eftersom App är parent-route kommer dessa sidor att
    // renderas inuti App-komponenten.
    children: [
      {
        // index: true betyder att denna route ska visas
        // när användaren befinner sig exakt på parent-routens URL.
        // Eftersom parent-routen är "/" kommer Home visas på:
        // http://localhost:5173/
        index: true,
        element: <Home />
      },
      {
        // Den här routen visas när användaren går till:
        // http://localhost:5173/calculator
        // Eftersom routen ligger som child till "/" blir den
        // en undersida till vår huvud-route.
        path: "/Productdescription",
        element: <Productdescription />
      }
    ]
  },
]);

export default router