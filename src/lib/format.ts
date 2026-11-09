const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100);
}

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

/** Formats a timestamp like "Nov 9, 2026, 2:05 PM" (UTC, so server and client agree). */
export function formatDateTime(date: Date): string {
  return `${dateTimeFormatter.format(date)} UTC`;
}
