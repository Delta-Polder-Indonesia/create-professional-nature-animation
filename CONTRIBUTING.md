# 🤝 Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada proyek **Pemandangan Alam Animasi**! Kontribusi dari komunitas sangat kami hargai.

---

## 📋 Daftar Isi

- [Cara Berkontribusi](#cara-berkontribusi)
- [Setup Development](#setup-development)
- [Struktur Kode](#struktur-kode)
- [Standar Kode](#standar-kode)
- [Menambah Scene Baru](#menambah-scene-baru)
- [Menambah Efek Cuaca](#menambah-efek-cuaca)
- [Pull Request](#pull-request)

---

## 🚀 Cara Berkontribusi

### 1. Laporkan Bug

Jika menemukan bug, silakan buat [Issue baru](https://github.com/username/pemandangan-alam-animasi/issues) dengan format:

```markdown
**Deskripsi Bug**
Penjelasan singkat bug yang terjadi.

**Langkah Reproduksi**
1. Buka halaman...
2. Klik tombol...
3. Lihat error...

**Ekspektasi**
Seharusnya terjadi...

**Screenshots**
(Jika ada)

**Environment**
- Browser: Chrome 120
- OS: Windows 11
- Versi: 1.0.0
```

### 2. Request Fitur

Untuk mengusulkan fitur baru, buat Issue dengan label `enhancement`:

```markdown
**Fitur yang Diusulkan**
Nama fitur

**Motivasi**
Mengapa fitur ini diperlukan?

**Deskripsi Detail**
Penjelasan teknis/cara kerja fitur

**Mockup/Screenshots**
(Jika ada)
```

### 3. Kirim Kode (Pull Request)

Ikuti langkah-langkah berikut:

```bash
# 1. Fork repository di GitHub

# 2. Clone fork Anda
git clone https://github.com/username-kamu/pemandangan-alam-animasi.git
cd pemandangan-alam-animasi

# 3. Install dependencies
npm install

# 4. Buat branch baru
git checkout -b fitur/nama-fitur

# 5. Lakukan perubahan
# ... edit file ...

# 6. Commit dengan pesan yang jelas
git add .
git commit -m "feat: tambah scene gurun pasir"

# 7. Push ke fork
git push origin fitur/nama-fitur

# 8. Buat Pull Request di GitHub
```

---

## 🛠️ Setup Development

### Prasyarat

- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalasi

```bash
# Clone repository
git clone https://github.com/username-kamu/pemandangan-alam-animasi.git
cd pemandangan-alam-animasi

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka `http://localhost:5173` di browser.

### Build Production

```bash
npm run build
```

---

## 🏗️ Struktur Kode

```
src/
├── components/          # Komponen visual
│   ├── Scene.tsx        # Manager utama
│   ├── [NamaScene].tsx  # Scene individual
│   └── [Efek].tsx       # Efek cuaca/waktu
├── hooks/               # Custom hooks
│   ├── useWeather.ts    # Data cuaca
│   └── useMoonPhase.ts  # Fase bulan
└── utils/               # Utilitas
```

### Aturan Penamaan

- **Komponen**: PascalCase (`SunMoon.tsx`)
- **Hooks**: camelCase dengan prefix `use` (`useWeather.ts`)
- **Utilitas**: camelCase (`cn.ts`)
- **Branch**: `fitur/nama-fitur` atau `fix/nama-bug`

---

## 📝 Standar Kode

### TypeScript

```typescript
// ✅ Gunakan tipe yang spesifik
interface TreeProps {
  scale: number;
  isNight: boolean;
}

// ❌ Hindari any
interface BadProps {
  data: any;  // Jangan!
}
```

### React

```tsx
// ✅ Gunakan functional components
function MyComponent({ prop }: Props) {
  return <div>{prop}</div>;
}

// ✅ Gunakan hooks dengan benar
const [state, setState] = useState<StateType>(defaultValue);
```

### Tailwind CSS

```tsx
// ✅ Gunakan utility classes
<div className="flex items-center gap-2 bg-black/30 rounded-xl">

// ✅ Gunakan responsive prefix
<div className="text-sm md:text-base lg:text-lg">

// ❌ Hindari inline styles untuk styling umum
<div style={{ color: 'red' }}>  // Jangan!
```

### Animasi (Framer Motion)

```tsx
// ✅ Gunakan motion components
<motion.div
  animate={{ opacity: [0, 1, 0] }}
  transition={{ duration: 2, repeat: Infinity }}
/>

// ✅ Gunakan transition yang konsisten
const fadeTransition = { duration: 0.5, ease: "easeInOut" };
```

---

## 🎨 Menambah Scene Baru

### 1. Buat File Komponen

```bash
touch src/components/DesertScene.tsx
```

### 2. Struktur Dasar

```tsx
import { motion } from "framer-motion";
import type { WeatherCondition } from "../hooks/useWeather";

interface DesertSceneProps {
  timeOfDay: number;
  weather: WeatherCondition;
}

export default function DesertScene({ timeOfDay, weather }: DesertSceneProps) {
  const isNight = timeOfDay > 0.75;
  const isRainy = weather === "rain" || weather === "storm";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-200 to-orange-100" />

      {/* Sun/Moon */}
      {/* ... */}

      {/* Landscape */}
      {/* ... */}

      {/* Weather effects */}
      {isRainy && <Rain intensity="light" />}
    </div>
  );
}
```

### 3. Daftarkan di Scene Manager

Edit `src/components/Scene.tsx`:

```tsx
import DesertScene from "./DesertScene";

type SceneType = "mountain" | "beach" | "village" | "forest" | "desert";

const sceneConfig = {
  // ... scene lain
  desert: { label: "Gurun", icon: <Cactus className="w-4 h-4" /> },
};

// Di renderScene()
case "desert":
  return <DesertScene timeOfDay={effectiveTimeOfDay} weather={effectiveWeather} />;
```

### 4. Tambah Ikon

```bash
# Install ikon baru jika perlu
npm install lucide-react  # sudah terinstall
```

---

## 🌦️ Menambah Efek Cuaca

### 1. Buat Komponen Efek

```tsx
// src/components/Snow.tsx
import { motion } from "framer-motion";

interface SnowProps {
  intensity: "light" | "moderate" | "heavy";
}

export default function Snow({ intensity }: SnowProps) {
  const count = intensity === "light" ? 50 : intensity === "moderate" ? 100 : 200;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${Math.random() * 100}%` }}
          animate={{ top: ["-5%", "105%"], x: [0, Math.random() * 20 - 10] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
```

### 2. Integrasikan ke Scene

```tsx
// Di Scene.tsx atau komponen scene
{weather === "snow" && <Snow intensity="moderate" />}
```

---

## 🔀 Pull Request

### Checklist PR

Sebelum mengirim PR, pastikan:

- [ ] Kode berhasil di-build (`npm run build`)
- [ ] Tidak ada error TypeScript
- [ ] Tidak ada warning ESLint
- [ ] Komponen responsif (mobile & desktop)
- [ ] Animasi smooth (60fps)
- [ ] Sudah di-test di browser modern (Chrome, Firefox, Safari)

### Format Commit Message

Gunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: tambah scene gurun pasir
fix: perbaiki posisi matahari saat senja
docs: update README dengan panduan deploy
style: perbaiki indentasi di komponen pohon
refactor: pisahkan hook cuaca dan waktu
test: tambah test untuk kalkulasi fase bulan
chore: update dependency framer-motion
```

### Review Process

1. **Automated Checks** — GitHub Actions akan menjalankan build
2. **Code Review** — Maintainer akan review kode
3. **Approval** — Minimal 1 approval sebelum merge
4. **Merge** — PR akan di-merge ke branch `main`

---

## 💡 Tips & Trik

### Optimasi Performa

```tsx
// ✅ Gunakan useMemo untuk data statis
const stars = useMemo(() => generateStars(), []);

// ✅ Gunakan will-change untuk animasi berat
<motion.div style={{ willChange: "transform" }} />

// ✅ Batasi jumlah partikel
const PARTICLE_COUNT = window.innerWidth < 768 ? 50 : 100;
```

### Debugging Animasi

```tsx
// Tambahkan layoutId untuk debugging
<motion.div layoutId="debug" />

// Gunakan Framer Motion DevTools
// Install: npm install framer-motion@latest
```

---

## 📞 Butuh Bantuan?

Jika ada pertanyaan:

1. Baca [README.md](README.md)
2. Cari di [Issues](https://github.com/username/pemandangan-alam-animasi/issues)
3. Buat Issue baru dengan label `question`

---

Terima kasih telah berkontribusi! 🎉
