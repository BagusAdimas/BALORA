import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type FavoritesContextType = {
  favorites: string[]; // daftar id destinasi
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
};

const STORAGE_KEY = "balora_favorites";

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Baca data tersimpan saat aplikasi dibuka
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setFavorites(parsed);
        }
      } catch {
        // abaikan, mulai dari daftar kosong
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Simpan setiap kali daftar berubah (setelah data awal selesai dibaca)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(
      () => {},
    );
  }, [favorites, loaded]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite, clearFavorites }),
    [favorites, toggleFavorite, isFavorite, clearFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites harus dipakai di dalam FavoritesProvider");
  }
  return ctx;
}
