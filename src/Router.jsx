import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Productdescription from "./pages/ProductDescription.jsx";
import Products from "./pages/Products.jsx";
import Home from "./pages/Home.jsx";


const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/productdescription",
        element: <Productdescription />
      }
    ]
  },
]);

export default router