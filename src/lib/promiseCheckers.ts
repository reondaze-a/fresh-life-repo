// CHANGED: converted to TypeScript and made functions async-friendly.
// CHANGED: added a safer fallback message (HTTP status) if body isn't JSON.

export async function checkResponse<T = unknown>(res: Response): Promise<T> {
  if (res.ok) {
    // CHANGED: typed return; still parses JSON
    return (await res.json()) as T;
  }
  // CHANGED: robust parse of error payload; fallback to status text
  let data: any;
  try {
    data = await res.json();
  } catch {
    /* ignore parse error */
  }
  throw new Error(
    data?.message || `Request failed (HTTP ${res.status}) — please try again later.`
  );
}

export function normalizeFetchError(err: unknown): never {
  // CHANGED: preserved your "Failed to fetch" mapping; typed safely
  if (err instanceof Error && err.message === "Failed to fetch") {
    throw new Error("Network error, please try again later.");
  }
  throw err as Error;
}
