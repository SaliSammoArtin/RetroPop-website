import { useEffect, useState } from "react";
import Modules from "../modules/moduleMaker.js";

export function useCalculatedPrice(product, currency) {
  const [finalPrice, setFinalPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    Modules.TaxAndCurrencyCalc.calculatePrice(
      product.price,
      product.taxCategory,
      currency,
    )
      .then((result) => {
        if (!cancelled) setFinalPrice(result.finalPrice);
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
  }, [product?.price, product?.taxCategory, currency]);

  return { finalPrice, loading, error };
}
