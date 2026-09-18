import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import CurrencySelector from "./CurrencySelector";

export default function NavBar() {
  const { openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Homepage" },
    { to: "/products", label: "Products" },
    { to: "/products", label: "Categories" },
  ];

  return (
    <nav>
      <div className="mb-6 flex w-full flex-wrap items-center bg-retro-green-text border-b-4 border-retro-yellow-highlight text-retro-cream-bg font-black tracking-wide">
        <div className="hidden md:flex m-3 ml-4 p-3 text-xl">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="p-3 hover:text-retro-yellow-highlight">
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          className="md:hidden m-3 ml-4 p-3 hover:text-retro-yellow-highlight">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            )}
          </svg>
        </button>

        <div className="flex items-center gap-4 md:gap-8 ml-auto text-xl mr-4 md:mr-8">
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

        {isMenuOpen && (
          <div className="md:hidden flex flex-col w-full px-4 pb-3 text-xl">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="py-2 hover:text-retro-yellow-highlight">
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
