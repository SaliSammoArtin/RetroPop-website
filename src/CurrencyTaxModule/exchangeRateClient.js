export class UnknownCurrencyError extends Error {
  constructor(currency) {
    super(
      `Currency ${currency} is not supported. Supported currencies are: ${Array.from(
        SUPPORTED_CURRENCIES,
      )
        .map((curr) => `"${curr}"`)
        .join(", ")} `,
    );
    this.name = "UnknownCurrencyError";
  }
}

export class ExchangeRateFetchError extends Error {
  constructor(message) {
    super(`Could not get the exchangeRate: ${message}`);
    this.name = "ExchangeRateFetchError";
  }
}

const CACHE_TTL_MS = 60 * 60 * 1000;
const SUPPORTED_CURRENCIES = new Set(["SEK", "NOK", "EUR", "DKK"]);
export default class ExchangeRateClient {
  #cache = new Map();
  #pendingRequest = new Map();

  async getRate(from, to) {
    const fromUpper = String(from || "").toUpperCase();
    const toUpper = String(to || "").toUpperCase();

    if (!SUPPORTED_CURRENCIES.has(fromUpper)) {
      throw new UnknownCurrencyError(fromUpper);
    }

    if (!SUPPORTED_CURRENCIES.has(toUpper)) {
      throw new UnknownCurrencyError(toUpper);
    }

    if (fromUpper === toUpper) return 1;

    const key = `${fromUpper}-${toUpper}`;

    const cached = this.#cache.get(key);

    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      return cached.rate;
    }

    if (this.#pendingRequest.has(key)) {
      return await this.#pendingRequest.get(key);
    }

    const fetchPromise = (async () => {
      try {
        const result = await fetch(
          `http://localhost:3000/rates?from=${fromUpper}&to=${toUpper}`,
        );
        if (!result.ok) {
          throw new ExchangeRateFetchError(`Server response: ${result.status}`);
        }

        const [data] = await result.json();

        if (typeof data?.rate !== "number") {
          throw new ExchangeRateFetchError("Not allowed answer from the API. ");
        }

        this.#cache.set(key, { rate: data.rate, fetchedAt: Date.now() });
        return data.rate;
      } catch (err) {
        if (
          err instanceof UnknownCurrencyError ||
          err instanceof ExchangeRateFetchError
        ) {
          throw err;
        }
        throw new ExchangeRateFetchError(err.message || "NetworkError");
      } finally {
        this.#pendingRequest.delete(key);
      }
    })();
    this.#pendingRequest.set(key, fetchPromise);
    return await fetchPromise;
  }
}
