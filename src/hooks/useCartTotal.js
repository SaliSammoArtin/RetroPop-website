import { useEffect, useState } from "react";
import Modules from "../modules/moduleMaker.js";

export function useCartTotal(cartItems, currency) {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setTotal(0);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all(
      cartItems.map((item) =>
        Modules.TaxAndCurrencyCalc.calculatePrice(
          item.price,
          item.taxCategory,
          currency,
        ).then((result) => result.finalPrice * item.quantity),
      ),
    )
      .then((subtotals) => {
        if (!cancelled) setTotal(subtotals.reduce((sum, s) => sum + s, 0));
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cartItems, currency]);

  return { total, loading, error };
}
