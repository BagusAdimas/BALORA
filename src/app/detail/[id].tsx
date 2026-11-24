import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";                     
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";                       
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,                                   
  type NativeScrollEvent,                                
  type NativeSyntheticEvent,                             
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "@/constants/balora-theme";
import { useFavorites } from "@/context/favorites-context";
import { DESTINATIONS } from "@/data/destinations";

const TIPS: Record<string, string[]> = {
  Pantai: [
    "Bawa tabir surya dan topi",
    "Datang pagi atau sore agar tidak terlalu panas",
    "Jaga kebersihan pantai",
  ],
  Pura: [
    "Gunakan pakaian sopan dan kain/selendang",
    "Ikuti aturan dan adat setempat",
    "Jangan memasuki area yang disakralkan",
  ],
  Alam: [
    "Gunakan alas kaki yang nyaman",
    "Bawa air minum secukupnya",
    "Datang pagi untuk udara yang lebih sejuk",
  ],
  Budaya: [
    "Tanyakan izin sebelum memotret orang",
    "Tawar dengan sopan di pasar",
    "Pelajari sedikit etika setempat",
  ],
  Kuliner: [
    "Datang di luar jam makan siang agar tidak antre",
    "Coba menu khas yang direkomendasikan",
    "Siapkan uang tunai sebagai cadangan",
  ],
};

export default function DetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  const item = DESTINATIONS.find((d) => d.id === id);

  if (!item) {
    return (
      <View style={[styles.container, styles.center]}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.muted} />
        <Text style={styles.notFound}>Destinasi tidak ditemukan.</Text>
        <Pressable style={styles.mapButton} onPress={() => router.back()}>
          <Text style={styles.mapButtonText}>Kembali</Text>
        </Pressable>
      </View>
    );
  }

  const photos =
  item.gallery && item.gallery.length > 0 ? item.gallery : [item.image];

  const onPageScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const liked = isFavorite(item.id);
  const tips = TIPS[item.category] ?? [];

  const openMap = () => {
    const q = encodeURIComponent(`${item.name} ${item.location} Bali`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${q}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {/* Hero */}
          <View style={[styles.hero, { backgroundColor: item.tint }]}>
            {/* Carousel Foto */}
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onPageScroll}
              scrollEventThrottle={16}
              style={StyleSheet.absoluteFill}
            >
              {photos.map((photo, i) => (
                <Image
                  key={i}
                  source={photo}
                  style={{ width, height: 300 }}
                  contentFit="cover"
                  transition={200}
                  accessibilityLabel={`Foto ${item.name} ${i + 1} dari ${photos.length}`}
                />
              ))}
            </ScrollView>

            {/* Indikator Foto */}
            {photos.length > 1 && (
              <View style={styles.dots} pointerEvents="none">
                {photos.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.dot, i === page && styles.dotActive]}
                  />
                ))}
              </View>
            )}

            {/* Tombol Kembali */}
            <Pressable
              style={[styles.roundButton, { top: insets.top + 8, left: 20 }]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
            </Pressable>

            {/* Tombol Favorit */}
            <Pressable
              style={[styles.roundButton, { top: insets.top + 8, right: 20 }]}
              onPress={() => toggleFavorite(item.id)}
            >
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={22}
                color={COLORS.accent}
              />
            </Pressable>
          </View>

        {/* Konten */}
        <View style={styles.sheet}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
          <Text style={styles.title}>{item.name}</Text>

          <View style={[styles.row, { marginTop: 6 }]}>
            <Ionicons name="location-outline" size={16} color={COLORS.muted} />
            <Text style={styles.location}>{item.location}, Bali</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Ionicons name="star" size={20} color={COLORS.accent} />
              <Text style={styles.infoValue}>{item.rating}</Text>
              <Text style={styles.infoLabel}>Rating</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons
                name="pricetag-outline"
                size={20}
                color={COLORS.accent}
              />
              <Text style={styles.infoValue}>{item.category}</Text>
              <Text style={styles.infoLabel}>Kategori</Text>
            </View>
            <View style={styles.infoBox}>
              <Ionicons name="map-outline" size={20} color={COLORS.accent} />
              <Text style={styles.infoValue}>{item.location}</Text>
              <Text style={styles.infoLabel}>Wilayah</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Tentang</Text>
          <Text style={styles.paragraph}>{item.description}</Text>

          {tips.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Tips Berkunjung</Text>
              {tips.map((tip) => (
                <View key={tip} style={styles.tipRow}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>

      {/* Tombol bawah */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <Pressable style={styles.mapButton} onPress={openMap}>
          <Ionicons name="navigate-outline" size={18} color={COLORS.white} />
          <Text style={styles.mapButtonText}>Lihat di Peta</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  center: { alignItems: "center", justifyContent: "center", gap: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 4 },
  notFound: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: COLORS.muted,
  },

  hero: {
  height: 300,
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
},

dots: {
  position: "absolute",
  bottom: 15,
  alignSelf: "center",
  flexDirection: "row",
  gap: 8,
},

dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "rgba(255,255,255,0.5)",
},

dotActive: {
  backgroundColor: "#FFFFFF",
  width: 20,
},
  roundButton: {
    position: "absolute",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  sheet: {
    marginTop: -28,
    padding: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: COLORS.secondary,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
  },
  badgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: COLORS.white,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
    color: COLORS.text,
    marginTop: 10,
  },
  location: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: COLORS.muted,
  },

  infoRow: { flexDirection: "row", gap: 10, marginTop: 20 },
  infoBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    gap: 2,
  },
  infoValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: COLORS.text,
  },
  infoLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: COLORS.muted,
  },

  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    color: COLORS.text,
    marginTop: 24,
    marginBottom: 8,
  },
  paragraph: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.muted,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  tipText: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: COLORS.text,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: COLORS.card,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 26,
    backgroundColor: COLORS.accent,
  },
  mapButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: COLORS.white,
  },
});
