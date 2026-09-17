import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        //Signal gör att ett api-anrop avbryts om det av någon anledning skulle avbrytas innan svaret har kommit.
        //T.ex. om en användare trycker snabbare mellan sidorna än vad api-anropen hinner svara.
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
