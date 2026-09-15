import React from "react";
import { useCurrency } from "../context/CurrencyContext";

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="relative flex items-center">
      <label htmlFor="currency-select" className="sr-only">
        Choose currency
      </label>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-5 absolute left-3 pointer-events-none opacity-80">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          className="text-retro-cream-bg"
        />
      </svg>
      <select
        id="currency-select"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className=" bg-retro-orange-bg hover:bg-retro-orange-bg/80 border border-retro-cream-bg/50 text-retro-cream-bg rounded-lg pl-10 pr-2 py-1.5 text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-retro-cream-bg transition-all duration-200">
        <option value="SEK">SEK</option>
        <option value="EUR">EUR</option>
        <option value="NOK">NOK</option>
        <option value="DKK">DKK</option>
      </select>
    </div>
  );
}
