import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import ProductDescription from "./pages/ProductDescription.jsx";
import Products from "./pages/Products.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import OrderConfirm from "./pages/OrderConfirm.jsx";
import { InventoryPage } from "./inventory/index.js";

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
        element: <Cart />,
      },
      {
        path: "/inventory",
        element: <InventoryPage />,
      },
      {
        path: "/orderConfirm",
        element: <OrderConfirm />,
      },
    ],
  },
]);

export default router;
