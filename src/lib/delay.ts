/**
 * Waits for the given number of milliseconds.
 * Used to simulate a slow data source (network, database) during development.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
