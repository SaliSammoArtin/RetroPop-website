import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import CurrencySelector from "./CurrencySelector";

export default function NavBar() {
  const { openCart } = useCart();
  return (
    <nav>
      <div className=" mb-6 flex w-full bg-retro-green-text border-b-4 border-retro-yellow-highlight text-retro-cream-bg font-black tracking-wide">
        <div className=" m-3 ml-4 p-3 text-xl">
          <Link to="/" className="p-3 hover:text-retro-yellow-highlight">
            Homepage
          </Link>
          <Link
            to="/products"
            className="p-3 hover:text-retro-yellow-highlight">
            Products
          </Link>
          <Link
            to="/products"
            className="p-3 hover:text-retro-yellow-highlight">
            Categories
          </Link>{" "}
        </div>
        <div className="flex items-center gap-8 ml-auto text-xl mr-8">
          <CurrencySelector />
          <button
            onClick={openCart}
            aria-label="Open cart"
            className=" transition-transform hover:text-retro-yellow-highlight hover:scale-110 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
