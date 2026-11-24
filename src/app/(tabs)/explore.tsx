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
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "@/constants/balora-theme";
import { DestinationImage } from "@/components/destination-image";
import { CATEGORIES, DESTINATIONS, Destination } from "@/data/destinations";
type SortBy = "rating" | "name";
type ViewMode = "grid" | "list";

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState<SortBy>("rating");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { favorites, toggleFavorite } = useFavorites();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = DESTINATIONS.filter((d) => {
      const matchCategory = category === "Semua" || d.category === category;
      const matchQuery =
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
    return [...filtered].sort((a, b) =>
      sortBy === "rating" ? b.rating - a.rating : a.name.localeCompare(b.name),
    );
  }, [query, category, sortBy]);

  if (!fontsLoaded) return null;

  const openDetail = (id: string) => {
    router.push({ pathname: "/detail/[id]", params: { id } });
  };

  const cardWidth = (width - 40 - 14) / 2;

  // ---------- Kartu Grid ----------
  const renderGrid = (item: Destination) => (
    <Pressable
      style={[styles.gridCard, { width: cardWidth }]}
      onPress={() => openDetail(item.id)}
    >
      <View style={[styles.gridImage, { backgroundColor: item.tint }]}>
        <DestinationImage item={item} />
        <Pressable
          style={styles.heartButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons
            name={favorites.includes(item.id) ? "heart" : "heart-outline"}
            size={16}
            color={COLORS.accent}
          />
        </Pressable>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={13} color={COLORS.muted} />
          <Text style={styles.cardSub} numberOfLines={1}>
            {item.location}
          </Text>
          <View style={styles.spacer} />
          <Ionicons name="star" size={13} color={COLORS.accent} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
    </Pressable>
  );

  // ---------- Kartu List ----------
  const renderList = (item: Destination) => (
    <Pressable style={styles.listCard} onPress={() => openDetail(item.id)}>
      <View style={[styles.listImage, { backgroundColor: item.tint }]}>
        <DestinationImage item={item} />
      </View>
      <View style={styles.flex}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardSub} numberOfLines={1}>
          {item.location} · {item.category}
        </Text>
        <Text style={styles.listDesc} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={[styles.row, { marginTop: 4 }]}>
          <Ionicons name="star" size={13} color={COLORS.accent} />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={10}>
        <Ionicons
          name={favorites.includes(item.id) ? "heart" : "heart-outline"}
          size={22}
          color={COLORS.accent}
        />
      </Pressable>
    </Pressable>
  );

  // ---------- Bagian atas (judul, pencarian, filter) ----------
  const header = (
    <View>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.subtitle}>Temukan keindahan Bali</Text>
          <Text style={styles.title}>Jelajah</Text>
        </View>
        <View style={styles.toggleGroup}>
          <Pressable
            style={[
              styles.toggleBtn,
              viewMode === "grid" && styles.toggleBtnActive,
            ]}
            onPress={() => setViewMode("grid")}
          >
            <Ionicons
              name="grid-outline"
              size={18}
              color={viewMode === "grid" ? COLORS.white : COLORS.primary}
            />
          </Pressable>
          <Pressable
            style={[
              styles.toggleBtn,
              viewMode === "list" && styles.toggleBtnActive,
            ]}
            onPress={() => setViewMode("list")}
          >
            <Ionicons
              name="list-outline"
              size={18}
              color={viewMode === "list" ? COLORS.white : COLORS.primary}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={COLORS.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari nama atau lokasi..."
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

      <View style={styles.sortRow}>
        <Text style={styles.resultCount}>{results.length} destinasi</Text>
        <View style={styles.row}>
          <Text style={styles.sortLabel}>Urutkan:</Text>
          <Pressable
            onPress={() => setSortBy("rating")}
            style={[
              styles.sortChip,
              sortBy === "rating" && styles.sortChipActive,
            ]}
          >
            <Text
              style={[
                styles.sortText,
                sortBy === "rating" && styles.sortTextActive,
              ]}
            >
              Rating
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSortBy("name")}
            style={[
              styles.sortChip,
              sortBy === "name" && styles.sortChipActive,
            ]}
          >
            <Text
              style={[
                styles.sortText,
                sortBy === "name" && styles.sortTextActive,
              ]}
            >
              A–Z
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        // key berubah saat mode ganti, karena numColumns tidak boleh berubah dinamis
        key={viewMode}
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={viewMode === "grid" ? 2 : 1}
        columnWrapperStyle={viewMode === "grid" ? styles.gridRow : undefined}
        ListHeaderComponent={header}
        renderItem={({ item }) =>
          viewMode === "grid" ? renderGrid(item) : renderList(item)
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="compass-outline" size={48} color={COLORS.muted} />
            <Text style={styles.emptyText}>Destinasi tidak ditemukan.</Text>
          </View>
        }
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: 120,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  flex: { flex: 1 },
  row: { flexDirection: "row", alignItems: "center" },
  spacer: { flex: 1 },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: COLORS.muted,
  },
  title: { fontFamily: "Poppins_700Bold", fontSize: 28, color: COLORS.primary },
  toggleGroup: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  toggleBtn: {
    width: 38,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleBtnActive: { backgroundColor: COLORS.primary },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
    marginTop: 18,
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

  categoryList: { paddingHorizontal: 20, paddingVertical: 16, gap: 10 },
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

  sortRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  resultCount: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: COLORS.text,
  },
  sortLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: COLORS.muted,
    marginRight: 6,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    marginLeft: 6,
    backgroundColor: COLORS.white,
  },
  sortChipActive: { backgroundColor: COLORS.accent },
  sortText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.muted,
  },
  sortTextActive: { color: COLORS.white },

  gridRow: { paddingHorizontal: 20, gap: 14, marginBottom: 14 },
  gridCard: {
    borderRadius: 20,
    backgroundColor: COLORS.card,
    overflow: "hidden",
  },
  gridImage: { height: 120, overflow: "hidden" },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryBadge: {
    position: "absolute",
    left: 10,
    bottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: "rgba(45,90,61,0.85)",
  },
  categoryBadgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
    color: COLORS.white,
  },
  cardInfo: { padding: 12, gap: 4 },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
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

  listCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 18,
    backgroundColor: COLORS.card,
  },
  listImage: {
    width: 76,
    height: 76,
    borderRadius: 16,
    overflow: "hidden",
  },
  listDesc: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },

  emptyBox: { alignItems: "center", gap: 10, paddingVertical: 60 },
  emptyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: COLORS.muted,
  },
});
