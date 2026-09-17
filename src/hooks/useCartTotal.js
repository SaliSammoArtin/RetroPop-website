import { useEffect, useState } from "react";
import Modules from "../modules/moduleMaker.js";

export function useCartTotal(cartItems, currency) {
  const [total, setTotal] = useState(0);
  const [totalOriginal, setTotalOriginal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setTotal(0);
      setTotalOriginal(0);
      setTotalTax(0);
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
        ).then((result) => ({
          finalMoney: Modules.TaxAndCurrencyCalc.scaleMoney(
            result.finalMoney,
            item.quantity,
          ),
          originalMoney: Modules.TaxAndCurrencyCalc.scaleMoney(
            result.originalMoney,
            item.quantity,
          ),
          taxMoney: Modules.TaxAndCurrencyCalc.scaleMoney(
            Modules.TaxAndCurrencyCalc.createMoney(
              result.taxAmount,
              result.finalMoney.currency,
            ),
            item.quantity,
          ),
        })),
      ),
    )
      .then((subtotals) => {
        if (cancelled) return;

        const sumMoney = (key) =>
          subtotals.reduce(
            (sum, subtotal) =>
              Modules.TaxAndCurrencyCalc.addPrices(sum, subtotal[key]),
            Modules.TaxAndCurrencyCalc.createMoney(0, currency),
          );

        setTotal(sumMoney("finalMoney").amount);
        setTotalOriginal(sumMoney("originalMoney").amount);
        setTotalTax(sumMoney("taxMoney").amount);
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

  return { total, totalOriginal, totalTax, loading, error };
}
