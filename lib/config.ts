const DEFAULT_URL = "https://yotamharel.com";
const PLACEHOLDER_HOSTS = new Set(["example.com", "www.example.com", "localhost"]);

function normalizeUrl(value: string | undefined, fallback = DEFAULT_URL): string {
  const candidate = value?.trim() || fallback;
  try {
    const url = new URL(candidate);
    return PLACEHOLDER_HOSTS.has(url.hostname) ? fallback : url.origin;
  } catch {
    return fallback;
  }
}

function normalizeCreator(value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed) return "@yotamha1";
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Yotam Harel",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION?.trim() ||
    "I help people understand products, see their value, and become their biggest advocates.",
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL),
  ogImage: "/opengraph-image",
  creator: normalizeCreator(process.env.NEXT_PUBLIC_SITE_CREATOR),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "yotam.harel@gmail.com",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || "https://www.linkedin.com/in/yotam-harel/",
  xUrl: process.env.NEXT_PUBLIC_X_URL?.trim() || "https://x.com/yotamha1",
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL?.trim() || "https://github.com/everyoya",
  location: process.env.NEXT_PUBLIC_LOCATION?.trim() || "Tel Aviv / Brussels",
  keywords: [
    "product education",
    "go-to-market",
    "community",
    "marketing",
    "storytelling",
    "portfolio",
  ],
} as const;

export const features = {
  smoothScroll: false,
};

export function shouldAllowIndexing(): boolean {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "true") {
    return false;
  }

  try {
    const hostname = new URL(siteConfig.url).hostname;
    return !PLACEHOLDER_HOSTS.has(hostname);
  } catch {
    return false;
  }
}
