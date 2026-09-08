import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import ProductDescription from "./pages/Productdescription.jsx"
import Products from "./pages/Products.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Products",
        element: <Products />,
      },
      {
        path: "/products/:product_id",
        element: <ProductDescription />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
      
    ],
  },
]);

export default router;
