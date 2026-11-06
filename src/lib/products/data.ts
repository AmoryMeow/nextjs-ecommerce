import type { Product } from "./types";

const IMAGE_BASE_URL = "https://cdn.dummyjson.com/product-images";

// Temporary mock data. Will be replaced by a database later.
// Photos come from DummyJSON (https://dummyjson.com), a free API with demo data.
export const products: Product[] = [
  {
    id: "1",
    slug: "aurora-wireless-headphones",
    name: "Aurora Wireless Headphones",
    description:
      "Over-ear headphones with active noise cancellation and 20 hours of battery life.",
    priceCents: 54900,
    image: `${IMAGE_BASE_URL}/mobile-accessories/apple-airpods-max-silver/1.webp`,
    category: "audio",
    inStock: true,
  },
  {
    id: "2",
    slug: "pulse-earbuds",
    name: "Pulse Earbuds",
    description:
      "Compact true wireless earbuds with a charging case and automatic pairing.",
    priceCents: 12900,
    image: `${IMAGE_BASE_URL}/mobile-accessories/apple-airpods/1.webp`,
    category: "audio",
    inStock: true,
  },
  {
    id: "3",
    slug: "echo-smart-speaker",
    name: "Echo Smart Speaker",
    description:
      "Voice-controlled speaker with 360° sound and a built-in smart home hub.",
    priceCents: 14900,
    image: `${IMAGE_BASE_URL}/mobile-accessories/amazon-echo-plus/1.webp`,
    category: "audio",
    inStock: false,
  },
  {
    id: "4",
    slug: "flex-wireless-earphones",
    name: "Flex Wireless Earphones",
    description:
      "Lightweight neckband earphones with magnetic earbuds and 12 hours of playback.",
    priceCents: 6900,
    image: `${IMAGE_BASE_URL}/mobile-accessories/beats-flex-wireless-earphones/1.webp`,
    category: "audio",
    inStock: true,
  },
  {
    id: "5",
    slug: "orbit-smartwatch",
    name: "Orbit Smartwatch",
    description:
      "Smartwatch with heart rate tracking, GPS and an always-on display.",
    priceCents: 39900,
    image: `${IMAGE_BASE_URL}/mobile-accessories/apple-watch-series-4-gold/1.webp`,
    category: "wearables",
    inStock: true,
  },
  {
    id: "6",
    slug: "heritage-leather-watch",
    name: "Heritage Leather Watch",
    description:
      "Classic analog watch with a brown leather strap and a sapphire glass face.",
    priceCents: 18900,
    image: `${IMAGE_BASE_URL}/mens-watches/brown-leather-belt-watch/1.webp`,
    category: "wearables",
    inStock: true,
  },
  {
    id: "7",
    slug: "lunar-moonphase-watch",
    name: "Lunar Moonphase Watch",
    description:
      "Elegant automatic watch with a moon phase complication and a steel case.",
    priceCents: 89900,
    image: `${IMAGE_BASE_URL}/womens-watches/rolex-cellini-moonphase/1.webp`,
    category: "wearables",
    inStock: false,
  },
  {
    id: "8",
    slug: "volt-magnetic-battery-pack",
    name: "Volt Magnetic Battery Pack",
    description:
      "Magnetic battery pack that snaps onto your phone for charging on the go.",
    priceCents: 9900,
    image: `${IMAGE_BASE_URL}/mobile-accessories/apple-magsafe-battery-pack/1.webp`,
    category: "accessories",
    inStock: true,
  },
  {
    id: "9",
    slug: "loop-usb-c-charger",
    name: "Loop USB-C Charger",
    description: "Compact 20 W wall charger with a braided USB-C cable.",
    priceCents: 2900,
    image: `${IMAGE_BASE_URL}/mobile-accessories/apple-iphone-charger/1.webp`,
    category: "accessories",
    inStock: true,
  },
  {
    id: "10",
    slug: "nomad-silicone-case",
    name: "Nomad Silicone Case",
    description:
      "Soft-touch silicone phone case with a microfiber lining and magnetic mount.",
    priceCents: 4900,
    image: `${IMAGE_BASE_URL}/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/1.webp`,
    category: "accessories",
    inStock: true,
  },
  {
    id: "11",
    slug: "lumen-table-lamp",
    name: "Lumen Table Lamp",
    description:
      "Table lamp with a fabric shade and warm, dimmable light for any room.",
    priceCents: 7900,
    image: `${IMAGE_BASE_URL}/home-decoration/table-lamp/1.webp`,
    category: "home",
    inStock: true,
  },
  {
    id: "12",
    slug: "nest-wireless-charging-pad",
    name: "Nest Wireless Charging Pad",
    description:
      "Charging pad for your phone, watch and earbuds at the same time.",
    priceCents: 12900,
    image: `${IMAGE_BASE_URL}/mobile-accessories/apple-airpower-wireless-charger/1.webp`,
    category: "home",
    inStock: true,
  },
];
