import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "@/constants/balora-theme";
import { useFavorites } from "@/context/favorites-context";
import { CATEGORIES, DESTINATIONS } from "@/data/destinations";

// Ubah sesuai datamu
const NAMA = "Nama Kamu";
const NIM = "NIM Kamu";
const KAMPUS = "Nama Kampus";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

export default function ProfilScreen() {
  const insets = useSafeAreaInsets();
  const { favorites } = useFavorites();
  const [notifOn, setNotifOn] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  const stats = [
    { label: "Favorit", value: favorites.length },
    { label: "Destinasi", value: DESTINATIONS.length },
    { label: "Kategori", value: CATEGORIES.length - 1 },
  ];

  const MenuItem = ({
    icon,
    label,
    onPress,
  }: {
    icon: IconName;
    label: string;
    onPress: () => void;
  }) => (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={20} color={COLORS.primary} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + 12,
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Profil</Text>

      {/* Kartu profil */}
      <View style={styles.profileCard}>
        <View style={styles.circleLarge} />
        <View style={styles.avatar}>
          <Ionicons name="person" size={38} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>{NAMA}</Text>
        <Text style={styles.sub}>
          {NIM} · {KAMPUS}
        </Text>
      </View>

      {/* Statistik */}
      <View style={styles.statsRow}>
        {stats.map((s) => (
          <View key={s.label} style={styles.statBox}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Pengaturan */}
      <Text style={styles.sectionTitle}>Pengaturan</Text>
      <View style={styles.menuCard}>
        <View style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={COLORS.primary}
            />
          </View>
          <Text style={styles.menuLabel}>Notifikasi</Text>
          <Switch
            value={notifOn}
            onValueChange={setNotifOn}
            trackColor={{ false: "#D5D0C2", true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>
        <MenuItem
          icon="information-circle-outline"
          label="Tentang BALORA"
          onPress={() =>
            Alert.alert(
              "BALORA",
              "Exploring the Island of God.\nAplikasi panduan wisata Bali.\nVersi 1.0.0",
            )
          }
        />
        <MenuItem
          icon="help-circle-outline"
          label="Bantuan"
          onPress={() =>
            Alert.alert(
              "Bantuan",
              "Ketuk ikon love pada destinasi untuk menyimpannya ke Favorit.",
            )
          }
        />
      </View>

      <Text style={styles.footer}>BALORA · Exploring the Island of God</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: COLORS.primary,
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  profileCard: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    overflow: "hidden",
  },
  circleLarge: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: COLORS.accent,
  },
  name: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: COLORS.white,
    marginTop: 12,
  },
  sub: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#CFE0D4",
    marginTop: 2,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
  statValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: COLORS.accent,
  },
  statLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: COLORS.muted,
  },

  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: COLORS.text,
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 10,
  },
  menuCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    paddingHorizontal: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: COLORS.text,
  },

  footer: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 28,
  },
});
