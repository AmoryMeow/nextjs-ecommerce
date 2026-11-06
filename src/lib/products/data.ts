import type { Product } from "./types";

// Temporary mock data. Will be replaced by a database later.
export const products: Product[] = [
  {
    id: "1",
    slug: "aurora-wireless-headphones",
    name: "Aurora Wireless Headphones",
    description:
      "Over-ear headphones with active noise cancellation and 40 hours of battery life.",
    priceCents: 19900,
    category: "audio",
    inStock: true,
  },
  {
    id: "2",
    slug: "pulse-earbuds",
    name: "Pulse Earbuds",
    description:
      "Compact true wireless earbuds with a charging case and water resistance.",
    priceCents: 8900,
    category: "audio",
    inStock: true,
  },
  {
    id: "3",
    slug: "echo-bluetooth-speaker",
    name: "Echo Bluetooth Speaker",
    description:
      "Portable speaker with 360° sound and a rugged, waterproof body.",
    priceCents: 12900,
    category: "audio",
    inStock: false,
  },
  {
    id: "4",
    slug: "orbit-smartwatch",
    name: "Orbit Smartwatch",
    description:
      "Smartwatch with heart rate tracking, GPS and an always-on display.",
    priceCents: 24900,
    category: "wearables",
    inStock: true,
  },
  {
    id: "5",
    slug: "stride-fitness-band",
    name: "Stride Fitness Band",
    description:
      "Lightweight fitness band that tracks steps, sleep and workouts.",
    priceCents: 5900,
    category: "wearables",
    inStock: true,
  },
  {
    id: "6",
    slug: "halo-smart-ring",
    name: "Halo Smart Ring",
    description:
      "Titanium ring that monitors sleep and recovery without a screen.",
    priceCents: 29900,
    category: "wearables",
    inStock: false,
  },
  {
    id: "7",
    slug: "volt-power-bank",
    name: "Volt Power Bank",
    description:
      "10,000 mAh power bank with fast charging for phones and earbuds.",
    priceCents: 4900,
    category: "accessories",
    inStock: true,
  },
  {
    id: "8",
    slug: "loop-usb-c-cable",
    name: "Loop USB-C Cable",
    description: "Braided 2-meter USB-C cable that supports 100 W charging.",
    priceCents: 1900,
    category: "accessories",
    inStock: true,
  },
  {
    id: "9",
    slug: "nomad-laptop-sleeve",
    name: "Nomad Laptop Sleeve",
    description:
      "Padded sleeve made from recycled materials for 13- and 14-inch laptops.",
    priceCents: 3900,
    category: "accessories",
    inStock: true,
  },
  {
    id: "10",
    slug: "lumen-desk-lamp",
    name: "Lumen Desk Lamp",
    description:
      "LED desk lamp with adjustable color temperature and a wireless charger.",
    priceCents: 7900,
    category: "home",
    inStock: true,
  },
  {
    id: "11",
    slug: "breeze-smart-plug",
    name: "Breeze Smart Plug",
    description:
      "Wi-Fi smart plug that lets you schedule and control devices remotely.",
    priceCents: 2400,
    category: "home",
    inStock: true,
  },
  {
    id: "12",
    slug: "nest-wireless-charger",
    name: "Nest Wireless Charger",
    description: "Minimal wireless charging pad with a soft-touch finish.",
    priceCents: 3400,
    category: "home",
    inStock: true,
  },
];
