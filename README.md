# 🌄 Pemandangan Alam Animasi - Live Weather & Time

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.0-EF008F?logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Animasi pemandangan alam interaktif yang mengikuti jam dan cuaca real-time.** Nikmati keindahan Gunung, Pantai, Pedesaan, dan Hutan yang berubah sesuai waktu dan kondisi cuaca di lokasimu.

![Preview](https://delta-polder-indonesia.github.io/create-professional-nature-animation/🌐-Live_Demo-brightgreen)

---

## ✨ Fitur

### 🕐 Real-Time Integration
- **Jam Real-time** — Menampilkan waktu lokal dengan label (Fajar, Pagi, Siang, Sore, Senja, Malam)
- **Cuaca Real-time** — Data cuaca dari [Open-Meteo API](https://open-meteo.com/) berdasarkan lokasi GPS pengguna
- **Fase Bulan Astronomis** — Menghitung fase bulan (Bulan Baru, Sabit, Purnama, dll) berdasarkan tanggal

### 🎨 4 Pemandangan yang Berbeda
| Scene | Deskripsi |
|-------|-----------|
| 🏔️ **Gunung** | Pegunungan berlapis dengan salju, danau, pohon-pohon, dan burung terbang |
| 🏖️ **Pantai** | Lautan dengan ombak, pasir, pohon kelapa, dan payung pantai |
| 🏡 **Pedesaan** | Sawah bertingkat, rumah tradisional, asap dari cerobong, dan pagar kayu |
| 🌲 **Hutan** | Pohon-pohon besar, sinar matahari menembus dedaunan, kupu-kupu, dan jamur |

### 🌦️ Efek Cuaca Dinamis
- ☀️ **Cerah** — Langit biru, matahari bersinar terang
- ☁️ **Berawan** — Awan lebih tebal, warna langit lebih redup
- 🌧️ **Hujan** — Animasi hujan dengan percikan air
- ⛈️ **Badai** — Hujan lebat + petir + kilatan cahaya
- 🌫️ **Kabut** — Kabut/embun di pagi dan sore hari
- ❄️ **Salju** — Dukungan visual untuk salju

### 🌅 Siklus Siang-Malam Realistis
- **Matahari** terbit di Timur (kiri), mencapai zenit, lalu tenggelam di Barat (kanan)
- **Bulan** mengikuti lintasan terbalik dengan **fase bulan real** (Bulan Baru, Sabit, Purnama, dll)
- **Bintang** muncul di malam hari dengan efek berkelap-kelip
- **Bintang jatuh** muncul secara acak di malam cerah
- **Kunang-kunang** di malam hari
- **Kabut** di pagi dan sore hari

### 🎮 Kontrol Interaktif
- **Pilih Scene** — Beralih antara Gunung, Pantai, Pedesaan, Hutan
- **Pilih Waktu** — Fajar, Pagi, Siang, Sore, Senja, Malam (atau Real-time)
- **Demo Mode** — Putar otomatis siklus 24 jam
- **Auto-hide Controls** — Kontrol bawah otomatis sembunyi setelah 5 detik

---

## 🚀 Demo Langsung

### GitHub Pages
```bash
# Deploy otomatis ke GitHub Pages
npm run deploy
```

Atau kunjungi: (https://delta-polder-indonesia.github.io/create-professional-nature-animation/)

---

## 📦 Instalasi

### Prasyarat
- [Node.js](https://nodejs.org/) >= 18.0.0
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

### Clone & Install

```bash
# Clone repository
git clone https://github.com/username/pemandangan-alam-animasi.git
cd pemandangan-alam-animasi

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka browser dan akses `http://localhost:5173`

### Build untuk Production

```bash
# Build project
npm run build

# Preview build lokal
npm run preview
```

---

## 🏗️ Struktur Proyek

```
pemandangan-alam-animasi/
├── 📁 public/                          # Aset statis
│   └── (images, fonts, dll)
│
├── 📁 src/
│   ├── 📁 components/                  # Komponen React
│   │   ├── Scene.tsx                   # Komponen utama scene manager
│   │   ├── Sky.tsx                     # Langit dengan gradient dinamis
│   │   ├── Stars.tsx                   # Bintang berkelap-kelip
│   │   ├── SunMoon.tsx                 # Matahari & Bulan dengan fase
│   │   ├── Clouds.tsx                  # Awan bergerak
│   │   ├── Birds.tsx                   # Burung terbang (SVG animasi)
│   │   ├── Mountains.tsx               # Layer pegunungan (parallax)
│   │   ├── Trees.tsx                   # Pohon-pohon (SVG animasi)
│   │   ├── Water.tsx                   # Air/danau dengan gelombang
│   │   ├── Foreground.tsx              # Tanaman, bunga, rumput
│   │   ├── Rain.tsx                    # Animasi hujan & petir
│   │   ├── Fog.tsx                     # Efek kabut/embun
│   │   ├── BeachScene.tsx              # Scene Pantai
│   │   ├── VillageScene.tsx            # Scene Pedesaan
│   │   └── ForestScene.tsx             # Scene Hutan
│   │
│   ├── 📁 hooks/                       # Custom React Hooks
│   │   ├── useWeather.ts               # Hook cuaca real-time (Open-Meteo)
│   │   └── useMoonPhase.ts             # Hook fase bulan astronomis
│   │
│   ├── 📁 utils/                       # Utilitas
│   │   └── cn.ts                       # Utility className merger
│   │
│   ├── App.tsx                         # Entry point aplikasi
│   ├── main.tsx                        # React DOM render
│   └── index.css                       # Global styles & Tailwind
│
├── 📄 index.html                       # HTML entry point
├── 📄 vite.config.ts                   # Konfigurasi Vite
├── 📄 tailwind.config.ts               # Konfigurasi Tailwind CSS
├── 📄 tsconfig.json                    # Konfigurasi TypeScript
├── 📄 package.json                     # Dependencies & scripts
├── 📄 LICENSE                          # Lisensi MIT
└── 📄 README.md                        # Dokumentasi ini
```

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| [React](https://react.dev/) | ^18.2.0 | UI Library |
| [Vite](https://vitejs.dev/) | ^5.0.0 | Build Tool |
| [TypeScript](https://www.typescriptlang.org/) | ^5.3.0 | Type Safety |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4.0 | Utility CSS |
| [Framer Motion](https://www.framer.com/motion/) | ^11.0.0 | Animasi |
| [Lucide React](https://lucide.dev/) | ^0.400.0 | Ikon |
| [Open-Meteo API](https://open-meteo.com/) | — | Data Cuaca |

---

## 🌐 API yang Digunakan

### Open-Meteo (Cuaca)
```
https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=weather_code,temperature_2m
```
- **Gratis** — Tidak memerlukan API key
- **Real-time** — Data cuaca terkini
- **Global** — Mendukung seluruh dunia

### Reverse Geocoding (Lokasi)
```
https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}
```
- Mengubah koordinat GPS menjadi nama kota

---

## 🎨 Palet Warna & Tema

### Siklus Waktu

| Waktu | Waktu (Jam) | Warna Langit |
|-------|-------------|--------------|
| 🌅 Fajar | 05:00 - 07:00 | Oranye → Pink → Biru muda |
| 🌄 Pagi | 07:00 - 11:00 | Biru cerah → Cyan |
| ☀️ Siang | 11:00 - 15:00 | Biru tua → Biru langit |
| 🌇 Sore | 15:00 - 17:00 | Biru → Jingga |
| 🌆 Senja | 17:00 - 19:00 | Ungu → Merah → Oranye |
| 🌙 Malam | 19:00 - 05:00 | Hitam → Navy → Indigo |

### Efek Cuaca

| Cuaca | Modifikasi Visual |
|-------|-------------------|
| Cerah | Langit normal, matahari terang |
| Berawan | Awan tebal, warna lebih redup |
| Hujan | Hujan jatuh, gelombang air lebih cepat |
| Badai | Hujan deras + kilatan petir |
| Kabut | Lapisan kabut di permukaan |

---

## 📝 Skrip NPM

```bash
npm run dev      # Jalankan development server (localhost:5173)
npm run build    # Build untuk production (folder dist/)
npm run preview  # Preview build production secara lokal
npm run deploy   # Deploy ke GitHub Pages
```

---

## 🚀 Deploy ke GitHub Pages

### 1. Install gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Tambahkan ke `package.json`

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://username.github.io/pemandangan-alam-animasi"
}
```

### 3. Update `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pemandangan-alam-animasi/', // Nama repository
})
```

### 4. Deploy

```bash
npm run deploy
```

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut cara berkontribusi:

### 1. Fork Repository

Klik tombol **Fork** di pojok kanan atas halaman repository.

### 2. Clone Fork

```bash
git clone https://github.com/username-kamu/pemandangan-alam-animasi.git
cd pemandangan-alam-animasi
```

### 3. Buat Branch Baru

```bash
git checkout -b fitur/nama-fitur-baru
# atau
git checkout -b fix/perbaikan-bug
```

### 4. Buat Perubahan

Lakukan perubahan pada kode, lalu commit:

```bash
git add .
git commit -m "feat: tambah scene gurun pasir"
```

### 5. Push dan Buat Pull Request

```bash
git push origin fitur/nama-fitur-baru
```

Lalu buat **Pull Request** di GitHub.

### Panduan Kontribusi

- ✅ Gunakan **TypeScript** untuk type safety
- ✅ Gunakan **Tailwind CSS** untuk styling
- ✅ Gunakan **Framer Motion** untuk animasi
- ✅ Pastikan build berhasil sebelum commit
- ✅ Jelaskan perubahan di deskripsi PR
- ✅ Screenshots untuk perubahan visual

### Ide Kontribusi

- [ ] Scene baru: Gurun, Kota, Danau, Pegunungan Salju
- [ ] Efek cuaca baru: Pelangi, Aurora, Gerhana
- [ ] Suara ambient (burung, ombak, hujan)
- [ ] Mode screensaver otomatis
- [ ] Widget cuaca detail (kelembaban, angin, UV)
- [ ] Tema warna custom
- [ ] Dukungan bahasa lain

---

## 📸 Screenshot

### Scene Gunung
```
┌────────────────────────────────────────┐
│  ⭐⭐⭐  ☁️  ☁️          ☀️            │
│        🏔️🏔️🏔️🏔️🏔️                      │
│      🌲🌲🌲🌲🌲🌲🌲🌊🌊🌊              │
│    🌸🌿🌸🌿🌸🌿🌸🌿🌸🌿🌸🌿            │
│                                        │
│  🕐 14:30  Siang  ☀️ Cerah  32°C     │
└────────────────────────────────────────┘
```

### Scene Pantai
```
┌────────────────────────────────────────┐
│  ☁️  ☁️        🌅                       │
│      🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊🌊         │
│    🌴    🏖️  🏖️  🏖️    🌴             │
│  🌴    🏖️  ⛱️  🏖️    🌴               │
│                                        │
│  🕐 18:00  Senja  🌅 Cerah  28°C      │
└────────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Build Gagal
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Cuaca Tidak Muncul
- Pastikan browser mengizinkan **akses lokasi GPS**
- Jika ditolak, akan fallback ke **Jakarta, Indonesia**
- Cek koneksi internet

### Animasi Lag
- Kurangi jumlah partikel di komponen `Rain.tsx` dan `Stars.tsx`
- Nonaktifkan `prefers-reduced-motion` di sistem operasi

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 Pemandangan Alam Animasi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Kredit & Terima Kasih

- 🌤️ [Open-Meteo](https://open-meteo.com/) — Data cuaca gratis
- 🎨 [Tailwind CSS](https://tailwindcss.com/) — Framework CSS
- ⚡ [Vite](https://vitejs.dev/) — Build tool super cepat
- 🎬 [Framer Motion](https://www.framer.com/motion/) — Animasi React
- 🌙 Algoritma fase bulan berdasarkan [NASA/JPL](https://ssd.jpl.nasa.gov/)

---

## 📬 Kontak

Jika ada pertanyaan atau saran, silakan buat [Issue](https://github.com/Delta-Polder-Indonesia/create-professional-nature-animation/issues) baru.

⭐ **Jangan lupa beri star jika suka dengan proyek ini!**

---

<p align="center">
  Dibuat dengan ❤️ dan ☕ di Indonesia
</p>
