import { useFavorites } from "@/context/favorites-context";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ---------- Tema ----------
const COLORS = {
  primary: "#2D5A3D", // Forest Green
  secondary: "#F5EFE0", // Cream / Beige
  accent: "#C8643C", // Terracotta
  text: "#1F2A24",
  muted: "#7A8580",
  white: "#FFFFFF",
  card: "#FBF8F0",
};

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Destination = {
  id: string;
  name: string;
  location: string;
  category: string;
  rating: number;
  icon: IconName;
  tint: string;
};

// ---------- Data dummy ----------
const CATEGORIES: { label: string; icon: IconName }[] = [
  { label: "Semua", icon: "apps-outline" },
  { label: "Pantai", icon: "water-outline" },
  { label: "Pura", icon: "business-outline" },
  { label: "Alam", icon: "leaf-outline" },
  { label: "Budaya", icon: "color-palette-outline" },
  { label: "Kuliner", icon: "restaurant-outline" },
];

const DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Tanah Lot",
    location: "Tabanan",
    category: "Pura",
    rating: 4.7,
    icon: "business-outline",
    tint: "#D9C9A8",
  },
  {
    id: "2",
    name: "Pantai Kuta",
    location: "Badung",
    category: "Pantai",
    rating: 4.5,
    icon: "water-outline",
    tint: "#BFD8D2",
  },
  {
    id: "3",
    name: "Tegallalang",
    location: "Gianyar",
    category: "Alam",
    rating: 4.8,
    icon: "leaf-outline",
    tint: "#C5D8B8",
  },
  {
    id: "4",
    name: "Uluwatu",
    location: "Badung",
    category: "Pura",
    rating: 4.8,
    icon: "business-outline",
    tint: "#E3C3AE",
  },
  {
    id: "5",
    name: "Ubud Art Market",
    location: "Gianyar",
    category: "Budaya",
    rating: 4.4,
    icon: "color-palette-outline",
    tint: "#E8D3B0",
  },
  {
    id: "6",
    name: "Babi Guling Ibu Oka",
    location: "Ubud",
    category: "Kuliner",
    rating: 4.6,
    icon: "restaurant-outline",
    tint: "#EBC9B8",
  },
  {
    id: "7",
    name: "Nusa Penida",
    location: "Klungkung",
    category: "Pantai",
    rating: 4.9,
    icon: "water-outline",
    tint: "#B5D3CC",
  },
  {
    id: "8",
    name: "Air Terjun Sekumpul",
    location: "Buleleng",
    category: "Alam",
    rating: 4.8,
    icon: "leaf-outline",
    tint: "#BCD4B2",
  },
];

// ---------- Halaman Beranda ----------
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const { favorites, toggleFavorite } = useFavorites();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  const filtered = DESTINATIONS.filter((d) => {
    const matchCategory = category === "Semua" || d.category === category;
    const matchQuery = d.name.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  });

  const popular = filtered.slice(0, 5);
  const recommended = filtered.slice(5);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome to Bali!</Text>
          <Text style={styles.brand}>BALORA</Text>
        </View>
        <Pressable
          style={styles.iconButton}
          onPress={() =>
            Alert.alert("Notifikasi", "Belum ada notifikasi baru.")
          }
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={COLORS.primary}
          />
        </Pressable>
      </View>

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroCircleLarge} />
        <View style={styles.heroCircleSmall} />
        <Text style={styles.heroLabel}>TOURISM GUIDE</Text>
        <Text style={styles.heroTitle}>Exploring the{"\n"}Island of God</Text>
        <Pressable
          style={styles.heroButton}
          onPress={() => router.push("/explore")}
        >
          <Text style={styles.heroButtonText}>Mulai Jelajah</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
        </Pressable>
      </View>

      {/* Pencarian */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={COLORS.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari destinasi di Bali..."
          placeholderTextColor={COLORS.muted}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={20} color={COLORS.muted} />
          </Pressable>
        )}
      </View>

      {/* Kategori */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item.label}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const active = category === item.label;
          return (
            <Pressable
              onPress={() => setCategory(item.label)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Ionicons
                name={item.icon}
                size={16}
                color={active ? COLORS.white : COLORS.primary}
              />
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* Destinasi Populer */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Destinasi Populer</Text>
        <Pressable onPress={() => router.push("/explore")}>
          <Text style={styles.sectionLink}>Lihat semua</Text>
        </Pressable>
      </View>

      {popular.length === 0 ? (
        <Text style={styles.empty}>Destinasi tidak ditemukan.</Text>
      ) : (
        <FlatList
          horizontal
          data={popular}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularList}
          renderItem={({ item }) => (
            <Pressable
              style={styles.popularCard}
              onPress={() =>
                router.push({
                  pathname: "/detail/[id]",
                  params: { id: item.id },
                })
              }
            >
              {/* Ganti View ini dengan <ImageBackground> jika sudah punya foto */}
              <View
                style={[styles.popularImage, { backgroundColor: item.tint }]}
              >
                <Ionicons name={item.icon} size={56} color={COLORS.primary} />
                <Pressable
                  style={styles.heartButton}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Ionicons
                    name={
                      favorites.includes(item.id) ? "heart" : "heart-outline"
                    }
                    size={18}
                    color={COLORS.accent}
                  />
                </Pressable>
              </View>
              <View style={styles.popularInfo}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <View style={styles.row}>
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={COLORS.muted}
                  />
                  <Text style={styles.cardSub}>{item.location}</Text>
                  <View style={styles.spacer} />
                  <Ionicons name="star" size={14} color={COLORS.accent} />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      )}

      {/* Rekomendasi */}
      {recommended.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rekomendasi Untukmu</Text>
          </View>
          <View style={styles.recommendList}>
            {recommended.map((item) => (
              <Pressable
                key={item.id}
                style={styles.recommendCard}
                onPress={() =>
                  router.push({
                    pathname: "/detail/[id]",
                    params: { id: item.id },
                  })
                }
              >
                <View
                  style={[styles.recommendIcon, { backgroundColor: item.tint }]}
                >
                  <Ionicons name={item.icon} size={28} color={COLORS.primary} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardSub}>
                    {item.location} · {item.category}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Ionicons name="star" size={14} color={COLORS.accent} />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

// ---------- Style ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  flex: { flex: 1 },
  row: { flexDirection: "row", alignItems: "center" },
  spacer: { flex: 1 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  greeting: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: COLORS.muted,
  },
  brand: {
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
    color: COLORS.primary,
    letterSpacing: 3,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  hero: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 22,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    overflow: "hidden",
  },
  heroCircleLarge: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  heroCircleSmall: {
    position: "absolute",
    right: 40,
    bottom: -30,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(200,100,60,0.35)",
  },
  heroLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    letterSpacing: 2,
    color: "#CFE0D4",
  },
  heroTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 26,
    lineHeight: 34,
    color: COLORS.white,
    marginTop: 6,
  },
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
  },
  heroButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: COLORS.white,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 16,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: COLORS.text,
  },

  categoryList: { paddingHorizontal: 20, paddingVertical: 18, gap: 10 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  chipActive: { backgroundColor: COLORS.primary },
  chipText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: COLORS.primary,
  },
  chipTextActive: { color: COLORS.white },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: COLORS.text,
  },
  sectionLink: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: COLORS.accent,
  },
  empty: {
    fontFamily: "Poppins_400Regular",
    color: COLORS.muted,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  popularList: { paddingHorizontal: 20, gap: 16, paddingBottom: 24 },
  popularCard: {
    width: 220,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    overflow: "hidden",
  },
  popularImage: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  popularInfo: { padding: 14, gap: 4 },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: COLORS.text,
  },
  cardSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: COLORS.muted,
    marginLeft: 2,
  },
  rating: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 3,
  },

  recommendList: { paddingHorizontal: 20, gap: 12 },
  recommendCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 12,
    borderRadius: 18,
    backgroundColor: COLORS.card,
  },
  recommendIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
