# 🐍 Snake.js — Retro Modern Canvas Game

<div align="center">

  [![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-emerald?style=for-the-badge&logo=vercel&logoColor=white)](https://mysnake.pyforgedev.web.id/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg?style=for-the-badge)](http://makeapullrequest.com)

  <p align="center">
    Game Snake klasik berpenampilan modern dengan gaya <i>neon-dark</i>. Dibangun murni menggunakan HTML5 Canvas, CSS3, dan Vanilla JavaScript tanpa external bundler atau runtime library.
  </p>

</div>

---

## 🛠️ Tech Stack & Perkakas

| Kategori | Teknologi | Badges |
|---|---|---|
| **Markup** | HTML5 | ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat-square&logo=html5&logoColor=white) |
| **Styling** | CSS3 | ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat-square&logo=css3&logoColor=white) |
| **Logic** | Vanilla JS | ![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=flat-square&logo=javascript&logoColor=black) |
| **Fonts** | Google Fonts | ![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=flat-square&logo=google&logoColor=white) |

---

## ✨ Fitur Utama

*   **🎨 UI Gelap Modern (Neon-Dark)**: Tampilan visual berbasis *glassmorphism* dengan kombinasi warna gelap redup (`#0f172a`) dan aksen hijau emerald (`#10b981`).
*   **🎮 Kontrol Responsif**: Mendukung penuh kontrol ganda via **WASD** dan **Arrow Keys** (tombol arah).
*   **🍎 Desain Aset Dinamis**: Makanan berbentuk buah apel dengan bayangan, kilau cahaya, dan daun kecil. Ular memiliki warna gradasi dinamis dari kepala ke ekor.
*   **⏱️ Mekanisme Timer Pintar**: Timer 60 detik hanya berjalan ketika ular mulai bergerak, mencegah kekalahan instan saat pertama kali bermain.
*   **🛡️ Algoritma Bebas Tabrakan Makanan**: Menjamin buah apel baru tidak akan pernah bertelur di atas koordinat tubuh ular.
*   **⚡ Overlay Game Over Asli**: Menghapus `alert()` bawaan browser yang mengganggu alur bermain, digantikan dengan modal popup UI interaktif.

---

## 🎮 Kontrol Permainan

Gunakan tombol berikut di keyboard Anda untuk mengarahkan ular:

| Aksi | Keyboard Utama | Keyboard Alternatif |
|---|---|---|
| **Atas** | <kbd>W</kbd> | <kbd>↑</kbd> |
| **Bawah** | <kbd>S</kbd> | <kbd>↓</kbd> |
| **Kiri** | <kbd>A</kbd> | <kbd>←</kbd> |
| **Kanan** | <kbd>D</kbd> | <kbd>→</kbd> |

---

## 📂 Struktur Proyek

```text
📁 game-snake-javascript-master/
├── 📁 docs/                 # Audit otomatis proyek
├── 📄 .gitignore            # Konfigurasi pengecualian Git
├── 📄 AGENTS.md             # Panduan khusus untuk OpenCode AI agent
├── 📄 index.html            # File HTML utama (struktur UI)
├── 📄 LICENSE               # Lisensi proyek (MIT)
├── 📄 README.md             # Dokumentasi utama proyek
├── 📄 snake.js              # Game engine dan rendering loop
└── 📄 style.css             # Tata letak & styling tema neon-dark
```

---

## 🚀 Cara Menjalankan Secara Lokal

Proyek ini tidak memerlukan instalasi dependensi pihak ketiga atau proses build (*zero configuration*).

1. Clone repositori ini ke komputer lokal Anda:
   ```bash
   git clone https://github.com/pyforgedev/game-snake-javascript.git
   ```
2. Jalankan server lokal untuk menghindari masalah keamanan CORS pada browser:
   *   **Python**:
       ```bash
       python3 -m http.server 8000
       ```
   *   **Node.js (serve)**:
       ```bash
       npx serve .
       ```
3. Buka alamat `http://localhost:8000` (atau port yang tertera) di browser kesayangan Anda.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **Lisensi MIT** - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

