# LingkarPintar — Media Belajar Lingkaran SMP

Aplikasi web edukasi matematika interaktif berbasis **React + TypeScript + Vite + Tailwind CSS** untuk materi **Lingkaran** tingkat SMP (Kelas 7, 8, dan 9). Aplikasi ini dirancang berdasarkan penelitian pengembangan model **ADDIE** (tahap *Analysis* dan *Design*) dengan menggali **Cognitive Load Theory** (*Intrinsic Load*, *Extraneous Load*, dan *Germane Load*) dari wawancara mendalam siswa di lapangan.

**Pengembang / Peneliti:** Siti Fitriani (Kelas 3B — Pendidikan Matematika)

---

## Latar Belakang & Pemetaan Hasil Wawancara (ADDIE)

Berdasarkan wawancara retrospektif dengan informan siswa SMP mengenai pengalaman belajar materi Lingkaran (khususnya hubungan diameter, jari-jari, nilai $\pi$, keliling, dan luas), ditemukan beberapa kesulitan utama yang diterjemahkan langsung menjadi fitur aplikasi:

| Dimensi Beban Kognitif | Temuan Kesulitan Siswa | Solusi Fitur di LingkarPintar |
| :--- | :--- | :--- |
| **Intrinsic Load (IL)** | Sering tertukar antara **diameter ($d$)** dan **jari-jari ($r$)**; langsung memasukkan nilai $d$ ke rumus luas tanpa dibagi $2$; bingung memilih $\pi = \frac{22}{7}$ vs $3{,}14$; tertukar rumus keliling dan luas. | **Lab Visual Interaktif** dengan pemisah $d$ menjadi $2 \times r$, mode fokus **Luas (Isi)** vs **Keliling (Tepi)**, serta indikator alasan pemilihan $\pi$ otomatis. |
| **Extraneous Load (EL)** | Soal cerita (roda sepeda, tutup botol, taman) terasa berputar-putar; penjelasan di kelas terlalu cepat dan siswa malu bertanya ulang. | **Fitur Sorot Kata Kunci** (`[Diketahui]`, `[Konteks]`, `[Ditanya]`) pada soal cerita dan **Materi Tempo Mandiri** dengan tombol *Sebelumnya*, *Ulangi Langkah*, dan *Langkah Selanjutnya*. |
| **Germane Load (GL)** | Membutuhkan gambar lingkaran yang jari-jarinya bisa digeser langsung, kalkulator langkah demi langkah, serta umpan balik spesifik saat salah menjawab. | **Slider Simulasi $r$ & $d$ real-time**, **Kalkulator Penuntun Step-by-Step**, dan **Latihan Adaptif 3 Level** dengan diagnosis letak kesalahan pada setiap opsi jawaban. |

---

## Fitur Utama Aplikasi

1. **Halaman Masuk Identitas Siswa (`LoginScreen`)**
   - Meminta **Nama Lengkap Siswa**, **Kelas**, dan **Asal Sekolah** sebelum mengakses materi.
   - Menyimpan identitas dan progres belajar secara lokal di browser (`localStorage`) serta menyediakan tombol **Ganti Siswa**.

2. **Beranda & Peta Belajar (`DashboardHome`)**
   - Sapaan personal untuk siswa, ringkasan progres (bab selesai, soal benar, mode lab yang dieksplorasi), alur belajar 4 tahap yang runtut, dan pemanasan cepat *Jebakan Diameter*.

3. **Lab Visual Lingkaran (`CircleLab`)**
   - **Simulasi Geser $r$ & $d$:** Mengubah jari-jari atau diameter menggunakan *slider* atau tombol angka cepat ($r=7$, $d=14$, $r=10$, $d=20$, $r=21$, $d=28$) dan mengamati perubahan luas serta keliling secara langsung.
   - **Kenali Unsur & Pemisah Diameter:** Diagram SVG interaktif untuk 7 unsur lingkaran (*Titik Pusat, Jari-jari, Diameter, Busur, Tali Busur, Juring, Tembereng*) lengkap dengan animasi **Belah Diameter Jadi 2 $r$**.

4. **Materi Tempo Mandiri (`SelfPacedLessons`)**
   - 4 bab terstruktur (Jari-jari vs Diameter, Memilih Nilai $\pi$, Keliling vs Luas, dan Trik Membaca Soal Cerita) dengan contoh soal bertahap yang dapat diulang kapan saja.

5. **Kalkulator Penuntun Step-by-Step (`StepByStepCalculator`)**
   - Menampilkan 5 langkah pengerjaan terperinci (konversi $d \to r$, pemilihan $\pi$, pemilihan rumus, substitusi/coret-coret kelipatan $7$, dan hasil beserta satuan $\text{cm}$ / $\text{cm}^2$) dengan kontrol **Putar Otomatis**, **+1 Langkah**, dan **Mulai Langkah 1**.

6. **Latihan & Detektif Soal Cerita (`PracticeArena`)**
   - Terdiri dari **Level 1 (Konsep $r, d, \pi$)**, **Level 2 (Hitung Luas & Keliling)**, dan **Level 3 (Soal Cerita Kontekstual)**.
   - Dilengkapi tombol **Sorot Kata Kunci**, petunjuk detektif, serta **Umpan Balik Diagnostik** yang menjelaskan secara spesifik miskonsepsi di balik jawaban yang keliru.

---

## Struktur Proyek

```text
├── index.html                          # Entry HTML & Google Fonts (Plus Jakarta Sans, DM Sans, IBM Plex Mono)
├── metadata.json                       # Metadata aplikasi
├── package.json                        # Konfigurasi dependensi & skrip Vite
├── vite.config.ts                      # Konfigurasi Vite & Tailwind CSS v4
└── src/
    ├── App.tsx                         # Root aplikasi, manajemen state siswa & progres (localStorage)
    ├── index.css                       # Konfigurasi Tailwind CSS v4 & custom slider
    ├── types.ts                        # Definisi tipe TypeScript
    ├── data/
    │   └── circleData.ts               # Data unsur lingkaran, materi 4 bab, & 12 soal diagnostik
    └── components/
        ├── LoginScreen.tsx             # Form login identitas siswa
        ├── TopNav.tsx                  # Bilah navigasi utama
        ├── DashboardHome.tsx           # Beranda & ringkasan progres
        ├── CircleLab.tsx               # Simulasi geser r/d & eksplorasi unsur lingkaran
        ├── SelfPacedLessons.tsx        # Materi belajar tempo mandiri
        ├── StepByStepCalculator.tsx    # Kalkulator penuntun bertahap
        └── PracticeArena.tsx           # Latihan bertingkat & detektif soal cerita
```

---

## Cara Menjalankan Secara Lokal

Pastikan **Node.js** sudah terpasang di perangkat Anda, lalu jalankan perintah berikut:

1. **Pasang dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan server pengembangan (port 3000):**
   ```bash
   npm run dev
   ```

3. **Cek tipe TypeScript & buat build produksi:**
   ```bash
   npm run lint
   npm run build
   ```
