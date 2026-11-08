/** Absolute base URL of the site, without a trailing slash (e.g. "https://cartly.dev"). */
export function getSiteUrl(): string {
  const url = process.env.SITE_URL;
  if (!url) {
    throw new Error("SITE_URL is not set. See .env.example.");
  }
  return url.replace(/\/$/, "");
}
