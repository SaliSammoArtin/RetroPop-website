import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import ProductCard from "./pages/ProductCard.jsx"
import ProductDescription from "./pages/ProductDescription.jsx";
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
        path: "/Products",
        element: <Products />
      } ,
        {
        path: "/ProductCard",
        element: <ProductCard />
        },
      {
        path: "/productDescription",
        element: <ProductDescription />
      }
    ]
  },
]);

export default router