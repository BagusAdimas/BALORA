import { Ionicons } from "@expo/vector-icons";

export type IconName = React.ComponentProps<typeof Ionicons>["name"];

export type Destination = {
  id: string;
  name: string;
  location: string;
  category: string;
  rating: number;
  icon: IconName;
  tint: string;
  description: string;
};

export const CATEGORIES: { label: string; icon: IconName }[] = [
  { label: "Semua", icon: "apps-outline" },
  { label: "Pantai", icon: "water-outline" },
  { label: "Pura", icon: "business-outline" },
  { label: "Alam", icon: "leaf-outline" },
  { label: "Budaya", icon: "color-palette-outline" },
  { label: "Kuliner", icon: "restaurant-outline" },
];

export const DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Tanah Lot",
    location: "Tabanan",
    category: "Pura",
    rating: 4.7,
    icon: "business-outline",
    tint: "#D9C9A8",
    description:
      "Pura laut di atas batu karang yang terkenal dengan pemandangan matahari terbenam.",
  },
  {
    id: "2",
    name: "Pantai Kuta",
    location: "Badung",
    category: "Pantai",
    rating: 4.5,
    icon: "water-outline",
    tint: "#BFD8D2",
    description:
      "Pantai berpasir luas yang populer untuk berselancar dan menikmati senja.",
  },
  {
    id: "3",
    name: "Tegallalang",
    location: "Gianyar",
    category: "Alam",
    rating: 4.8,
    icon: "leaf-outline",
    tint: "#C5D8B8",
    description:
      "Hamparan sawah berundak khas Bali dengan suasana hijau yang menenangkan.",
  },
  {
    id: "4",
    name: "Uluwatu",
    location: "Badung",
    category: "Pura",
    rating: 4.8,
    icon: "business-outline",
    tint: "#E3C3AE",
    description:
      "Pura di tebing tinggi menghadap Samudra Hindia, dikenal juga dengan pertunjukan Tari Kecak.",
  },
  {
    id: "5",
    name: "Ubud Art Market",
    location: "Gianyar",
    category: "Budaya",
    rating: 4.4,
    icon: "color-palette-outline",
    tint: "#E8D3B0",
    description:
      "Pasar seni tempat membeli kerajinan tangan, kain, dan suvenir khas Bali.",
  },
  {
    id: "6",
    name: "Babi Guling Ibu Oka",
    location: "Ubud",
    category: "Kuliner",
    rating: 4.6,
    icon: "restaurant-outline",
    tint: "#EBC9B8",
    description:
      "Warung babi guling legendaris yang menjadi salah satu ikon kuliner Ubud.",
  },
  {
    id: "7",
    name: "Nusa Penida",
    location: "Klungkung",
    category: "Pantai",
    rating: 4.9,
    icon: "water-outline",
    tint: "#B5D3CC",
    description: "Pulau dengan tebing dramatis dan pantai berair biru jernih.",
  },
  {
    id: "8",
    name: "Air Terjun Sekumpul",
    location: "Buleleng",
    category: "Alam",
    rating: 4.8,
    icon: "leaf-outline",
    tint: "#BCD4B2",
    description: "Kumpulan air terjun tinggi di tengah hutan hijau Bali Utara.",
  },
  {
    id: "9",
    name: "Jatiluwih",
    location: "Tabanan",
    category: "Alam",
    rating: 4.7,
    icon: "leaf-outline",
    tint: "#C9DBBA",
    description:
      "Sawah terasering luas dengan sistem irigasi subak yang diakui UNESCO.",
  },
  {
    id: "10",
    name: "Pura Besakih",
    location: "Karangasem",
    category: "Pura",
    rating: 4.6,
    icon: "business-outline",
    tint: "#DDCDB0",
    description: "Kompleks pura terbesar di Bali di lereng Gunung Agung.",
  },
  {
    id: "11",
    name: "Pantai Sanur",
    location: "Denpasar",
    category: "Pantai",
    rating: 4.5,
    icon: "water-outline",
    tint: "#C2DAD4",
    description:
      "Pantai yang tenang dengan jalur pejalan kaki, cocok untuk menikmati matahari terbit.",
  },
  {
    id: "12",
    name: "Ulun Danu Beratan",
    location: "Tabanan",
    category: "Budaya",
    rating: 4.7,
    icon: "color-palette-outline",
    tint: "#E5D0AF",
    description: "Pura di tepi Danau Beratan yang berlatar pegunungan sejuk.",
  },
];
