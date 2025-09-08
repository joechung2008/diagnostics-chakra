import { useMemo } from "react";

interface CacheEntry {
  data: Diagnostics | undefined;
  error: Error | undefined;
  promise: Promise<Diagnostics> | undefined;
}

const cache = new Map<string, CacheEntry>();

async function fetchDiagnosticsData(environment: string): Promise<Diagnostics> {
  const response = await fetch(environment);
  if (!response.ok) {
    throw new Error(`Failed to fetch diagnostics: ${response.statusText}`);
  }

  return response.json();
}

export function clearCache(): void {
  cache.clear();
}

export function useDiagnostics(environment: string): Diagnostics {
  const cacheKey = environment;

  const entry = useMemo(() => {
    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, {
        promise: undefined,
        data: undefined,
        error: undefined,
      });
    }

    return cache.get(cacheKey)!;
  }, [cacheKey]);

  if (entry.error) {
    throw entry.error;
  }

  if (!entry.data) {
    if (!entry.promise) {
      entry.promise = fetchDiagnosticsData(environment);
      entry.promise
        .then((data) => {
          entry.data = data;
          entry.promise = undefined;
        })
        .catch((error) => {
          entry.error = error;
          entry.promise = undefined;
        });
    }

    throw entry.promise;
  }

  return entry.data;
}
