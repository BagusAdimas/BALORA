import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DestinationImage } from "@/components/destination-image";
import { COLORS } from "@/constants/balora-theme";
import { useFavorites } from "@/context/favorites-context";
import { DESTINATIONS, Destination } from "@/data/destinations";

export default function FavoritScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  // Urutan: yang terakhir di-love tampil paling atas
  const items = [...favorites]
    .reverse()
    .map((id) => DESTINATIONS.find((d) => d.id === id))
    .filter((d): d is Destination => d !== undefined);

  const confirmClear = () => {
    Alert.alert(
      "Hapus semua favorit?",
      "Semua destinasi akan dihapus dari daftar favorit.",
      [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", style: "destructive", onPress: clearFavorites },
      ],
    );
  };

  const header = (
    <View style={styles.header}>
      <View>
        <Text style={styles.subtitle}>Tempat yang kamu simpan</Text>
        <Text style={styles.title}>Favorit</Text>
      </View>
      {items.length > 0 && (
        <Pressable style={styles.clearButton} onPress={confirmClear}>
          <Ionicons name="trash-outline" size={16} color={COLORS.accent} />
          <Text style={styles.clearText}>Hapus semua</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={header}
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <View style={styles.emptyCircle}>
              <Ionicons name="heart-outline" size={44} color={COLORS.accent} />
            </View>
            <Text style={styles.emptyTitle}>Belum ada favorit</Text>
            <Text style={styles.emptyText}>
              Ketuk ikon love pada destinasi untuk menyimpannya di sini.
            </Text>
            <Pressable
              style={styles.emptyButton}
              onPress={() => router.push("/explore")}
            >
              <Text style={styles.emptyButtonText}>Jelajahi Destinasi</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({ pathname: "/detail/[id]", params: { id: item.id } })
            }
          >
            <View style={[styles.cardImage, { backgroundColor: item.tint }]}>
                <DestinationImage item={item} />
              </View>
            <View style={styles.flex}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.cardSub} numberOfLines={1}>
                {item.location} · {item.category}
              </Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={[styles.row, { marginTop: 4 }]}>
                <Ionicons name="star" size={13} color={COLORS.accent} />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
            <Pressable onPress={() => toggleFavorite(item.id)} hitSlop={10}>
              <Ionicons name="heart" size={24} color={COLORS.accent} />
            </Pressable>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  flex: { flex: 1 },
  row: { flexDirection: "row", alignItems: "center" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: COLORS.muted,
  },
  title: { fontFamily: "Poppins_700Bold", fontSize: 28, color: COLORS.primary },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: COLORS.white,
  },
  clearText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.accent,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 18,
    backgroundColor: COLORS.card,
  },
  cardImage: {
    width: 76,
    height: 76,
    borderRadius: 16,
    overflow: "hidden",
  },  
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: COLORS.text,
  },
  cardSub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: COLORS.muted,
  },
  cardDesc: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },
  rating: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 3,
  },

  emptyBox: { alignItems: "center", paddingHorizontal: 40, paddingTop: 50 },
  emptyCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  emptyTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: COLORS.text,
  },
  emptyText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 6,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  emptyButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: COLORS.white,
  },
});
