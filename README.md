# Kelompok
Nama :
1. Nyoman Bagus Adimas Pranata (240040027)
2. I Nyoman Pande Guna Darma (240040156)

# BALORA

BALORA merupakan aplikasi mobile panduan wisata Bali yang dirancang untuk membantu pengguna menemukan destinasi wisata, memperoleh informasi tempat wisata, dan merencanakan kunjungan dengan lebih mudah.

Aplikasi ini menyediakan informasi destinasi berdasarkan kategori, pencarian tempat wisata, rekomendasi destinasi, fitur favorit, serta informasi detail mengenai destinasi yang dipilih.

## Fitur Aplikasi

- **Home** – Menampilkan halaman utama, destinasi populer, dan rekomendasi wisata.
- **Search Destinations** – Mencari destinasi wisata berdasarkan nama.
- **Category Filter** – Memfilter destinasi berdasarkan kategori wisata.
- **Explore** – Menjelajahi daftar destinasi wisata di Bali.
- **Favorites** – Menyimpan destinasi wisata yang disukai.
- **Destination Details** – Menampilkan informasi detail destinasi, lokasi, rating, deskripsi, dan tips berkunjung.
- **Photo Gallery** – Melihat foto destinasi
- **Google Maps** – Membuka lokasi destinasi melalui Google Maps.

## Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| React Native | Pengembangan aplikasi mobile |
| Expo | Development dan build aplikasi |
| TypeScript | Penulisan kode dengan tipe data |
| Expo Router | Navigasi antarhalaman |
| Expo Image | Menampilkan gambar destinasi |
| Ionicons | Icon aplikasi |
| AsyncStorage | Penyimpanan data lokal |
| Google Fonts – Poppins | Tipografi aplikasi |

## Instalasi dan Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/BagusAdimas/BALORA.git
```

### 2. Masuk ke Folder Project

```bash
cd BALORA
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Jalankan Aplikasi

```bash
npx expo start
```

### 5. Buka Aplikasi

Setelah development server berjalan:

- Scan QR Code menggunakan Expo Go yang kompatibel dengan SDK project.
- Jalankan melalui Android Emulator.
- Gunakan opsi web jika ingin menjalankan versi web.

## Struktur Project

```text
BALORA/
│   
├───app
│   │   _layout.tsx
│   │   
│   ├───(tabs)
│   │       explore.tsx
│   │       favorit.tsx
│   │       index.tsx
│   │       profil.tsx
│   │       _layout.tsx
│   │       
│   └───detail
│           [id].tsx
│           
├───components
│   │   animated-icon.module.css
│   │   animated-icon.tsx
│   │   animated-icon.web.tsx
│   │   app-tabs.tsx
│   │   app-tabs.web.tsx
│   │   destination-image.tsx
│   │   external-link.tsx
│   │   hint-row.tsx
│   │   themed-text.tsx
│   │   themed-view.tsx
│   │   web-badge.tsx
│   │   
│   └───ui
│      collapsible.tsx
│           
├───constants
│       balora-theme.ts
│       theme.ts
│       
├───context
│       favorites-context.tsx
│       
├───data
│       destinations.ts
│       
└───hooks
        use-color-scheme.ts
        use-color-scheme.web.ts
        use-theme.ts
```

## Tujuan Aplikasi

BALORA dikembangkan sebagai aplikasi panduan wisata digital yang dapat membantu wisatawan memperoleh informasi mengenai destinasi wisata di Bali. Dengan fitur pencarian, kategori, rekomendasi, favorit, dan informasi detail, pengguna diharapkan dapat menemukan destinasi wisata sesuai kebutuhan dan minat mereka.

## Pengembangan

Project ini dikembangkan menggunakan React Native dan Expo dengan TypeScript. Pengembangan dilakukan secara kolaboratif menggunakan Git dan GitHub sebagai version control dan repository project.

## Developer

**BALORA – Bali Destination Tourist Application**

Dikembangkan sebagai project aplikasi mobile.
