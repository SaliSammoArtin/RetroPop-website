const CACHE_TTL_MS = 60 * 60 * 1000;
const CURRECNIES = new Set(["SEK", "NOK", "EUR", "DKK"]);
export default class ExhangeRate {
  #cache = new Map();
  #pendingRequest = new Map();

  async getRate(from, to) {
    const from = String(from || "").toUpperCase();
    const to = String(to || "").toUpperCase();
    if (from === to) return 1;

    const key = `${from}-${to}`;

    const cached = this.#cache.get(key);

    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      return cached.rate;
    }

    if (this.#pendingRequest.has(key)) {
      return await this.#pendingRequest.get(key);
    }

    const fetchPromise = async () => {
      const result = await fetch(
        `http://localhost:3000/rates?from=${from}&to={to}`,
      );

      const data = await result.json();

      this.#cache.set(key, { rate: data.rate, fetchedAt: Date.now() });
      return data.rate;
    };
    this.#pendingRequest.set(key, fetchPromise);
    return await fetchPromise;
  }
}
