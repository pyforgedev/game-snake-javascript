# Snake.js - Retro Modern HTML5 Canvas Game

Game Snake klasik berpenampilan modern dengan gaya neon-dark, dibangun murni menggunakan HTML5 Canvas, CSS, dan JavaScript vanilla.

🚀 **[Demo Aplikasi](https://sfl.gl/ckOSRiL)**

---

## Fitur Baru & Peningkatan
- **UI Gelap Modern**: Desain bernuansa *dark mode* menggunakan variabel CSS, font Plus Jakarta Sans, dan efek *glassmorphism*.
- **Gameplay Halus**:
  - Kontrol ganda melalui keyboard (**WASD** dan **Arrow Keys**).
  - Mulai dinamis: Ular tetap diam saat *start* sampai Anda menentukan arah pertama (mencegah mati instan).
  - Makanan didesain mirip buah apel dengan bayangan, kilau, dan daun kecil.
  - Ular memiliki warna gradasi dinamis dari kepala hingga ekor.
- **Bebas Alert**: Penggunaan `alert()` bawaan browser diganti dengan overlay DOM terintegrasi yang interaktif.
- **Sistem Penguncian Makanan**: Logika baru memastikan makanan tidak akan pernah muncul di atas tubuh ular.

---

## Cara Menjalankan
Proyek ini statis murni tanpa bundler.

1. Clone repositori ini.
2. Jalankan server lokal untuk menghindari isu CORS (opsional tapi disarankan):
   ```bash
   python3 -m http.server 8000
   ```
3. Buka browser di `http://localhost:8000`.

---

## Struktur Berkas
- `index.html`: Struktur utama halaman game.
- `style.css`: Pengaturan gaya visual modern.
- `snake.js`: Logika mesin game, pergerakan ular, kolisi, dan sistem rendering canvas.
- `AGENTS.md`: Dokumentasi panduan khusus untuk agen AI.
