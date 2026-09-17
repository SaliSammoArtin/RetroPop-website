import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCalculatedPrice } from "../hooks/useCalculatedPrice";
import Modules from "../modules/moduleMaker.js";
export default function CartItems({ items }) {
  const { addToCart, removeFromCart, deleteFromCart } = useCart();
  const { currency } = useCurrency();
  const { originalMoney, taxAmount, taxRate, finalMoney, loading } =
    useCalculatedPrice(items, currency);

  const subtotalMoney =
    finalMoney &&
    Modules.TaxAndCurrencyCalc.scaleMoney(finalMoney, items.quantity);
  return (
    <div className="bg-retro-cream-bg text-retro-green-text border-2 border-retro-yellow-highlight rounded-xl shadow-lg max-w-2xl flex flex-col sm:flex-row sm:justify-between p-4 sm:p-8 m-4 font-black tracking-wide">
      <div className=" flex-1 ">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-2xl">{items.name}</p>
          <span className="shrink-0 text-sm font-bold bg-retro-yellow-highlight text-retro-green-text rounded-full px-3 py-1">
            x{items.quantity}
          </span>
        </div>
        {loading ?
          <p className="text-sm">Price: ...</p>
        : <div className="text-sm space-y-1 border-t border-retro-green-text/20 pt-2">
            <div className="flex justify-between gap-4">
              <span className="text-retro-green-text/70 font-normal">
                Price (excl. tax)
              </span>
              <span className="tabular-nums">{originalMoney.format()}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-retro-green-text/70 font-normal">
                Tax ({(taxRate * 100).toFixed(0)}%)
              </span>
              <span className="tabular-nums">
                {Modules.TaxAndCurrencyCalc.createMoney(
                  taxAmount,
                  currency,
                ).format()}
              </span>
            </div>
            <div className="flex justify-between gap-4 border-t border-retro-green-text/20 pt-1 text-base">
              <span>Subtotal (incl. tax)</span>
              <span className="tabular-nums">{subtotalMoney.format()}</span>
            </div>
          </div>
        }
      </div>
      <div className="flex items-center p-2 sm:p-8 gap-4">
        <button
          className="hover:scale-125 hover:text-retro-yellow-highlight hover:cursor-pointer transition-colors p-1 text-2xl"
          onClick={() => addToCart(items)}
          aria-label="Increase quantity">
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <button
          className=" hover:scale-125 hover:text-retro-yellow-highlight hover:cursor-pointer transition-colors p-1 text-2xl "
          onClick={() => removeFromCart(items.id)}
          aria-label="Decrease quantity">
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
              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <button
          className="hover:scale-125 hover:text-red-500 hover:cursor-pointer transition-colors p-1"
          onClick={() => deleteFromCart(items.id)}
          aria-label="Remove item from cart">
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
