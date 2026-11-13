import { CirclePart, LessonChapter, PracticeQuestion } from '../types';

export const CIRCLE_PARTS: CirclePart[] = [
  {
    id: 'center',
    name: 'Titik Pusat',
    symbol: 'O',
    shortDesc: 'Titik yang terletak tepat di tengah-tengah lingkaran. Jaraknya selalu sama ke setiap titik di tepi lingkaran.',
    dailyAnalogy: 'Seperti poros tengah pada roda sepeda atau titik tengah jam dinding.',
    tip: 'Semua jari-jari selalu berawal dari titik pusat O ini.',
  },
  {
    id: 'radius',
    name: 'Jari-jari',
    symbol: 'r',
    shortDesc: 'Garis lurus dari titik pusat O menuju satu titik di tepi lingkaran. Panjangnya tepat setengah dari diameter.',
    dailyAnalogy: 'Seperti satu batang jeruji roda sepeda yang menghubungkan tengah roda ke pelek luar.',
    tip: 'Rumus luas (π × r²) selalu membutuhkan nilai r (bukan d).',
  },
  {
    id: 'diameter',
    name: 'Diameter',
    symbol: 'd',
    shortDesc: 'Garis lurus yang menghubungkan dua titik di tepi lingkaran dan WAJIB melewati titik pusat. Panjangnya 2 × r.',
    dailyAnalogy: 'Seperti garis tengah yang membelah pizza utuh tepat menjadi dua bagian sama besar.',
    tip: 'Jika soal memberi diameter (d), bagi 2 dulu (r = d : 2) sebelum menghitung luas!',
  },
  {
    id: 'arc',
    name: 'Busur',
    symbol: '⌢',
    shortDesc: 'Garis lengkung yang merupakan bagian dari keliling atau pinggiran lingkaran.',
    dailyAnalogy: 'Seperti pinggiran kulit roti pada satu potong pizza.',
    tip: 'Busur adalah garis lengkung di tepi, bagian dari keliling lingkaran.',
  },
  {
    id: 'chord',
    name: 'Tali Busur',
    symbol: 'AB',
    shortDesc: 'Garis lurus yang menghubungkan dua titik pada tepi lingkaran, tetapi tidak harus melewati titik pusat.',
    dailyAnalogy: 'Seperti tali pada busur panah yang menghubungkan dua ujung lengkungan.',
    tip: 'Diameter sebenarnya adalah tali busur paling panjang karena melewati titik pusat.',
  },
  {
    id: 'sector',
    name: 'Juring',
    symbol: 'AOB',
    shortDesc: 'Daerah di dalam lingkaran yang dibatasi oleh dua jari-jari dan satu busur.',
    dailyAnalogy: 'Persis seperti satu potong pizza yang ditarik dari tengah ke pinggir.',
    tip: 'Juring adalah sebuah daerah/luas bagian dalam, bukan sekadar garis.',
  },
  {
    id: 'segment',
    name: 'Tembereng',
    symbol: 'AB',
    shortDesc: 'Daerah di dalam lingkaran yang dibatasi oleh satu tali busur dan satu busur.',
    dailyAnalogy: 'Seperti potongan pinggiran semangka yang dipotong lurus tanpa mengenai titik tengah.',
    tip: 'Tembereng = luas daerah yang diapit garis lurus tali busur dan lengkungan busur.',
  },
];

export const LESSON_CHAPTERS: LessonChapter[] = [
  {
    id: 'chap-1',
    number: '01',
    title: 'Jari-Jari (r) vs Diameter (d)',
    subtitle: 'Mengatasi masalah paling sering: ketuker nilai d dan r saat masuk rumus.',
    targetIssue: 'Sering langsung memasukkan diameter ke rumus luas tanpa dibagi 2.',
    steps: [
      {
        id: 'c1-s1',
        title: 'Kenali bedanya dari bentuk garis',
        explanation:
          'Diameter (d) adalah garis penuh dari tepi ke tepi melewati titik pusat. Jari-jari (r) hanya setengahnya: dari titik pusat ke tepi.',
        visualFocus: 'd-vs-r',
        keyTakeaway: 'Ingat mantra cepat: d = penuh (2 × r), r = setengah (d : 2).',
        quickExample: {
          prompt: 'Diketahui diameter tutup botol d = 14 cm. Berapa jari-jarinya?',
          steps: [
            'Cek info soal: yang diketahui d = 14 cm (garis penuh).',
            'Karena butuh jari-jari (setengahnya), bagi dengan 2.',
            'r = 14 : 2 = 7 cm.',
          ],
          result: 'r = 7 cm',
        },
      },
      {
        id: 'c1-s2',
        title: 'Jebakan 2 langkah saat menghitung luas dari diameter',
        explanation:
          'Banyak siswa langsung memasukkan d = 14 ke rumus L = π × r², sehingga hasilnya membengkak 4 kali lipat! Selalu ubah d menjadi r terlebih dahulu sebelum mengkuadratkan.',
        visualFocus: 'd-vs-r',
        keyTakeaway: 'Langkah wajib bila diketahui diameter: (1) Hitung r = d : 2, (2) Baru masuk ke L = π × r².',
        quickExample: {
          prompt: 'Hitung luas lingkaran berdiameter 14 cm!',
          steps: [
            'Langkah 1 (Konversi): r = 14 : 2 = 7 cm.',
            'Langkah 2 (Masuk Rumus): L = 22/7 × 7 × 7.',
            'Langkah 3 (Sederhanakan): 7 dicoret dengan 7, sisa 22 × 7 = 154.',
          ],
          result: 'L = 154 cm²',
        },
      },
    ],
  },
  {
    id: 'chap-2',
    number: '02',
    title: 'Kapan Pakai π = 22/7 atau 3,14?',
    subtitle: 'Trik memilih nilai π supaya hitungan tidak ribet dan bebas salah koma.',
    targetIssue: 'Bingung memilih 22/7 vs 3,14 dan sering salah saat perkalian pecahan.',
    steps: [
      {
        id: 'c2-s1',
        title: 'Aturan kelipatan 7',
        explanation:
          'Nilai π sebenarnya sekitar 3,14159... Untuk memudahkan hitungan di SMP, gunakan π = 22/7 JIKA jari-jari (r) atau diameter (d) bisa habis dibagi 7 (7, 14, 21, 28, 35, dst).',
        visualFocus: 'pi-choice',
        keyTakeaway: 'Bisa dibagi 7 → pakai 22/7 agar penyebut 7 bisa langsung dicoret!',
        quickExample: {
          prompt: 'Pilih π yang tepat untuk r = 21 cm!',
          steps: [
            'Cek apakah 21 habis dibagi 7 → Ya, 21 : 7 = 3.',
            'Maka gunakan π = 22/7.',
            'Saat dihitung: 22/7 × 21 = 22 × 3 = 66 (tanpa desimal!).',
          ],
          result: 'Gunakan π = 22/7',
        },
      },
      {
        id: 'c2-s2',
        title: 'Jika bukan kelipatan 7, pakai 3,14',
        explanation:
          'Kalau jari-jari atau diameternya seperti 5, 10, 12, atau 20 (tidak habis dibagi 7), jauh lebih mudah memakai π = 3,14 daripada membagi pecahan yang hasilnya koma panjang.',
        visualFocus: 'pi-choice',
        keyTakeaway: 'Tidak habis dibagi 7 (misal 10, 20, 5) → pakai 3,14.',
        quickExample: {
          prompt: 'Hitung luas lingkaran dengan r = 10 cm!',
          steps: [
            '10 tidak habis dibagi 7 → pilih π = 3,14.',
            'L = 3,14 × 10 × 10 = 3,14 × 100.',
            'Mengalikan 100 cukup geser koma 2 langkah ke kanan!',
          ],
          result: 'L = 314 cm²',
        },
      },
    ],
  },
  {
    id: 'chap-3',
    number: '03',
    title: 'Keliling vs Luas (Anti-Ketukar)',
    subtitle: 'Membedakan konsep pinggiran vs isi dalam beserta rumus dan satuannya.',
    targetIssue: 'Hafal rumus tapi sering tertukar antara rumus keliling dan luas.',
    steps: [
      {
        id: 'c3-s1',
        title: 'Bayangkan pagar taman vs rumput taman',
        explanation:
          'Keliling (K) adalah panjang garis tepi/pinggiran luar lingkaran (satuannya cm atau m). Luas (L) adalah seluruh daerah di bagian dalam lingkaran (satuannya cm² atau m²).',
        visualFocus: 'perimeter-vs-area',
        keyTakeaway: 'Keliling = Pinggiran (K = 2 × π × r atau π × d). Luas = Isi Dalam (L = π × r²).',
        quickExample: {
          prompt: 'Bandingkan K dan L untuk r = 7 cm!',
          steps: [
            'Keliling (pinggiran): K = 2 × 22/7 × 7 = 44 cm.',
            'Luas (isi dalam): L = 22/7 × 7 × 7 = 154 cm².',
            'Perhatikan pangkat duanya: rumus Luas selalu mengkuadratkan r (r × r)!',
          ],
          result: 'K = 44 cm | L = 154 cm²',
        },
      },
    ],
  },
  {
    id: 'chap-4',
    number: '04',
    title: 'Trik Membaca Soal Cerita',
    subtitle: 'Mengubah cerita roda sepeda, tutup botol, atau taman menjadi informasi matematika yang jelas.',
    targetIssue: 'Bingung maksud soal cerita karena bahasanya terasa memutar.',
    steps: [
      {
        id: 'c4-s1',
        title: 'Cari 3 petunjuk wajib di setiap soal cerita',
        explanation:
          'Jangan pusing oleh cerita panjangnya. Cukup tandai 3 hal: (1) Angka yang diketahui apakah d atau r, (2) Bentuk bendanya, (3) Kata kunci yang ditanya apakah Keliling atau Luas.',
        visualFocus: 'story-clue',
        keyTakeaway: 'Kata kunci Keliling: mengelilingi, panjang pagar, pita tepi, roda berputar 1 kali. Kata kunci Luas: permukaan, dilapisi kain/kaca, menanam rumput, stiker penuh.',
        quickExample: {
          prompt: 'Roda sepeda berjari-jari 21 cm berputar 1 kali. Berapa jarak lintasannya?',
          steps: [
            '[Diketahui] jari-jari r = 21 cm.',
            '[Konteks] roda berputar 1 kali → bagian yang menyentuh jalan adalah tepi luar roda.',
            '[Ditanya] jarak lintasan = Keliling = 2 × 22/7 × 21 = 132 cm.',
          ],
          result: 'Jarak = 132 cm',
        },
      },
    ],
  },
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // LEVEL 1: Konsep d, r, dan pi
  {
    id: 'q1',
    level: 1,
    levelLabel: 'Level 1 · Konsep Dasar',
    topicTag: 'Konversi Diameter ke Jari-jari',
    questionText:
      'Sebuah tutup botol berbentuk lingkaran memiliki diameter 14 cm. Berapa panjang jari-jari (r) yang harus kamu pakai sebelum masuk ke rumus luas?',
    options: [
      {
        id: 'q1-a',
        label: '7 cm',
        isCorrect: true,
        diagnosticFeedback:
          'Tepat sekali! Diameter (14 cm) adalah garis penuh dari tepi ke tepi, sehingga jari-jarinya adalah setengahnya: 14 : 2 = 7 cm.',
      },
      {
        id: 'q1-b',
        label: '14 cm',
        isCorrect: false,
        misconceptionTag: 'Tertukar d dan r',
        diagnosticFeedback:
          'Hati-hati! 14 cm masih berupa diameter (garis penuh). Jika langsung dipakai di rumus luas, hasilnya bakal salah 4× lipat. Bagi 2 dulu menjadi r = 7 cm.',
      },
      {
        id: 'q1-c',
        label: '28 cm',
        isCorrect: false,
        misconceptionTag: 'Operasi terbalik',
        diagnosticFeedback:
          'Kebalik nih! Diameter itu lebih panjang dari jari-jari. Untuk mencari jari-jari dari diameter, kamu harus membagi 2 (14 : 2), bukan mengalikannya dengan 2.',
      },
      {
        id: 'q1-d',
        label: '3,5 cm',
        isCorrect: false,
        misconceptionTag: 'Salah pembagian',
        diagnosticFeedback:
          'Kamu membaginya dengan 4! Jari-jari adalah setengah diameter, jadi cukup bagi 2 saja: 14 : 2 = 7 cm.',
      },
    ],
    solutionSteps: [
      'Identifikasi yang diketahui: diameter (d) = 14 cm.',
      'Rumus hubungan: r = d ÷ 2.',
      'Hitung: r = 14 ÷ 2 = 7 cm.',
    ],
  },
  {
    id: 'q2',
    level: 1,
    levelLabel: 'Level 1 · Konsep Dasar',
    topicTag: 'Konversi Jari-jari ke Diameter',
    questionText:
      'Sebuah loyang pizza memiliki jari-jari r = 10 cm. Berapakah panjang diameternya (d)?',
    options: [
      {
        id: 'q2-a',
        label: '5 cm',
        isCorrect: false,
        misconceptionTag: 'Operasi terbalik',
        diagnosticFeedback:
          'Tertukar! Membagi 2 dilakukan jika diketahui diameter. Karena yang diketahui adalah jari-jari (setengah garis), diameter panjangnya dua kali lipat: 2 × 10 = 20 cm.',
      },
      {
        id: 'q2-b',
        label: '20 cm',
        isCorrect: true,
        diagnosticFeedback:
          'Benar! Diameter membentang dari tepi ke tepi melewati titik pusat, jadi panjangnya 2 × jari-jari = 2 × 10 = 20 cm.',
      },
      {
        id: 'q2-c',
        label: '10 cm',
        isCorrect: false,
        misconceptionTag: 'Menganggap d = r',
        diagnosticFeedback:
          '10 cm adalah jari-jari (setengah garis tengah). Diameter adalah garis penuhnya, jadi kalikan 2.',
      },
      {
        id: 'q2-d',
        label: '100 cm',
        isCorrect: false,
        misconceptionTag: 'Mengkuadratkan r',
        diagnosticFeedback:
          'Kamu menghitung 10 × 10 (r²). Kuadrat hanya dipakai di rumus Luas. Untuk diameter, cukup kalikan 2 × 10 = 20 cm.',
      },
    ],
    solutionSteps: [
      'Diketahui jari-jari (r) = 10 cm.',
      'Rumus diameter: d = 2 × r.',
      'Hitung: d = 2 × 10 = 20 cm.',
    ],
  },
  {
    id: 'q3',
    level: 1,
    levelLabel: 'Level 1 · Konsep Dasar',
    topicTag: 'Memilih Nilai π',
    questionText:
      'Kamu akan menghitung luas lingkaran dengan jari-jari r = 21 cm. Nilai π manakah yang paling tepat dan praktis digunakan?',
    options: [
      {
        id: 'q3-a',
        label: 'π = 22/7, karena 21 adalah kelipatan 7',
        isCorrect: true,
        diagnosticFeedback:
          'Cerdas! Karena 21 habis dibagi 7 (21 : 7 = 3), memakai π = 22/7 membuat angka 7 bisa langsung dicoret tanpa perlu menghitung koma.',
      },
      {
        id: 'q3-b',
        label: 'π = 3,14, karena angkanya tidak terlalu besar',
        isCorrect: false,
        misconceptionTag: 'Salah memilih π',
        diagnosticFeedback:
          'Sebenarnya 3,14 akan menyulitkanmu mengalikan desimal pada angka 21. Cek dulu: 21 bisa dibagi 7 (21 : 7 = 3), jadi gunakan 22/7!',
      },
      {
        id: 'q3-c',
        label: 'π = 22/7, karena semua soal lingkaran wajib memakai 22/7',
        isCorrect: false,
        misconceptionTag: 'Generalisasi π keliru',
        diagnosticFeedback:
          'Pilihan 22/7 benar untuk r = 21, tapi alasannya kurang tepat. Tidak semua soal pakai 22/7; jika r = 10 atau r = 5, sebaiknya pakai 3,14.',
      },
      {
        id: 'q3-d',
        label: 'π = 3,14, karena 21 adalah bilangan ganjil',
        isCorrect: false,
        misconceptionTag: 'Patokan ganjil-genap salah',
        diagnosticFeedback:
          'Patokan memilih π bukan ganjil/genap, melainkan kelipatan 7! Meski ganjil, 21 adalah kelipatan 7 (7 × 3), jadi gunakan 22/7.',
      },
    ],
    solutionSteps: [
      'Periksa jari-jari: r = 21 cm.',
      'Uji bagi 7: 21 ÷ 7 = 3 (habis dibagi 7).',
      'Kesimpulan: gunakan π = 22/7 agar perhitungan lebih mudah.',
    ],
  },
  {
    id: 'q4',
    level: 1,
    levelLabel: 'Level 1 · Konsep Dasar',
    topicTag: 'Konsep Keliling vs Luas',
    questionText:
      'Manakah pernyataan yang paling benar tentang perbedaan Keliling dan Luas lingkaran?',
    options: [
      {
        id: 'q4-a',
        label: 'Keliling mengukur panjang garis tepi luar, sedangkan Luas mengukur daerah di dalam',
        isCorrect: true,
        diagnosticFeedback:
          'Mantap! Ingat saja perumpamaan taman: Keliling = panjang pagar di tepi, Luas = area rumput di dalam.',
      },
      {
        id: 'q4-b',
        label: 'Keliling mengukur isi bagian dalam, sedangkan Luas mengukur tepi luar',
        isCorrect: false,
        misconceptionTag: 'Konsep terbalik',
        diagnosticFeedback:
          'Konsepnya terbalik! Garis pinggiran luar itu Keliling (satuan cm), sedangkan seluruh bidang dalam itu Luas (satuan cm²).',
      },
      {
        id: 'q4-c',
        label: 'Keliling memakai rumus π × r², sedangkan Luas memakai 2 × π × r',
        isCorrect: false,
        misconceptionTag: 'Rumus tertukar',
        diagnosticFeedback:
          'Hati-hati, rumusnya ketuker! Luas yang memakai r kuadrat (L = π × r²), sedangkan Keliling memakai K = 2 × π × r.',
      },
      {
        id: 'q4-d',
        label: 'Keliling dan Luas selalu menghasilkan angka yang sama',
        isCorrect: false,
        misconceptionTag: 'Menyamakan K dan L',
        diagnosticFeedback:
          'Keliling dan Luas berbeda baik cara hitung maupun satuannya (cm vs cm²).',
      },
    ],
    solutionSteps: [
      'Keliling (K) = panjang lintasan melingkar di pinggiran luar (satuan panjang, misal cm).',
      'Luas (L) = besar permukaan di dalam lingkaran (satuan persegi, misal cm²).',
    ],
  },

  // LEVEL 2: Hitungan Keliling & Luas
  {
    id: 'q5',
    level: 2,
    levelLabel: 'Level 2 · Hitung Tepat',
    topicTag: 'Luas dari Diameter (Kelipatan 7)',
    questionText:
      'Hitunglah luas lingkaran yang memiliki diameter d = 14 cm! (Gunakan π = 22/7)',
    options: [
      {
        id: 'q5-a',
        label: '616 cm²',
        isCorrect: false,
        misconceptionTag: 'Lupa bagi 2 diameter',
        diagnosticFeedback:
          'Jebakan diameter! Kamu langsung memasukkan d = 14 ke rumus π × r² (22/7 × 14 × 14 = 616). Ingat langkah wajib: bagi diameter dengan 2 dulu (r = 7 cm)!',
      },
      {
        id: 'q5-b',
        label: '154 cm²',
        isCorrect: true,
        diagnosticFeedback:
          'Keren! Kamu tidak terjebak diameter: r = 14 : 2 = 7 cm, lalu L = 22/7 × 7 × 7 = 154 cm².',
      },
      {
        id: 'q5-c',
        label: '44 cm²',
        isCorrect: false,
        misconceptionTag: 'Tertukar rumus Keliling',
        diagnosticFeedback:
          'Wah, 44 itu hasil rumus Keliling (22/7 × 14 = 44)! Padahal soal menanyakan Luas. Untuk Luas gunakan L = π × r² dengan r = 7 cm.',
      },
      {
        id: 'q5-d',
        label: '308 cm²',
        isCorrect: false,
        misconceptionTag: 'Salah faktor kali 2',
        diagnosticFeedback:
          'Hasilmu 2× lebih besar dari jawaban benar. Rumus luas tidak dikali 2 di depan (L = π × r × r, bukan 2 × π × r × r).',
      },
    ],
    solutionSteps: [
      'Langkah 1: Karena diketahui diameter d = 14 cm, cari jari-jari: r = 14 ÷ 2 = 7 cm.',
      'Langkah 2: Karena r = 7 kelipatan 7, pakai π = 22/7.',
      'Langkah 3: Masukkan ke rumus Luas: L = π × r² = 22/7 × 7 × 7.',
      'Langkah 4: Coret 7 dengan penyebut 7 → L = 22 × 7 = 154 cm².',
    ],
  },
  {
    id: 'q6',
    level: 2,
    levelLabel: 'Level 2 · Hitung Tepat',
    topicTag: 'Luas dari Jari-jari (π = 3,14)',
    questionText:
      'Sebuah lingkaran memiliki jari-jari r = 10 cm. Berapakah luas lingkaran tersebut? (Gunakan π = 3,14)',
    options: [
      {
        id: 'q6-a',
        label: '62,8 cm²',
        isCorrect: false,
        misconceptionTag: 'Tertukar rumus Keliling',
        diagnosticFeedback:
          'Rumusnya tertukar! 2 × 3,14 × 10 = 62,8 adalah rumus Keliling. Soal meminta Luas, jadi gunakan L = π × r² = 3,14 × 10 × 10.',
      },
      {
        id: 'q6-b',
        label: '31,4 cm²',
        isCorrect: false,
        misconceptionTag: 'Lupa mengkuadratkan r',
        diagnosticFeedback:
          'Kamu baru mengalikan 3,14 × 10 saja! Ingat r² artinya r × r (10 × 10 = 100), jadi 3,14 × 100 = 314 cm².',
      },
      {
        id: 'q6-c',
        label: '314 cm²',
        isCorrect: true,
        diagnosticFeedback:
          'Tepat! Karena soal sudah memberi jari-jari r = 10 cm, langsung hitung L = 3,14 × 10 × 10 = 3,14 × 100 = 314 cm².',
      },
      {
        id: 'q6-d',
        label: '1.256 cm²',
        isCorrect: false,
        misconceptionTag: 'Mengalikan r dengan 2',
        diagnosticFeedback:
          'Kamu memakai angka 20 (3,14 × 20 × 20 = 1.256). Di soal, 10 cm sudah merupakan jari-jari (r), tidak perlu dikali 2 lagi.',
      },
    ],
    solutionSteps: [
      'Diketahui sudah berupa jari-jari: r = 10 cm.',
      '10 bukan kelipatan 7, jadi gunakan π = 3,14.',
      'Rumus Luas: L = π × r × r = 3,14 × 10 × 10.',
      'Hasil: 3,14 × 100 = 314 cm².',
    ],
  },
  {
    id: 'q7',
    level: 2,
    levelLabel: 'Level 2 · Hitung Tepat',
    topicTag: 'Keliling dari Diameter',
    questionText:
      'Hitunglah keliling lingkaran yang memiliki diameter d = 28 cm! (Gunakan π = 22/7)',
    options: [
      {
        id: 'q7-a',
        label: '88 cm',
        isCorrect: true,
        diagnosticFeedback:
          'Betul sekali! Untuk Keliling jika diketahui diameter, langsung pakai K = π × d = 22/7 × 28 = 22 × 4 = 88 cm.',
      },
      {
        id: 'q7-b',
        label: '616 cm',
        isCorrect: false,
        misconceptionTag: 'Tertukar rumus Luas',
        diagnosticFeedback:
          '616 adalah hasil Luas (22/7 × 14 × 14)! Soal ini menanyakan Keliling, jadi rumusnya K = π × d (bukan π × r²).',
      },
      {
        id: 'q7-c',
        label: '176 cm',
        isCorrect: false,
        misconceptionTag: 'Mengalikan 2 pada diameter',
        diagnosticFeedback:
          'Kamu memasukkan diameter 28 ke rumus 2 × π × r (jadinya 2 × 22/7 × 28 = 176). Jika memakai 2 × π × r, gunakan r = 14, atau langsung π × d = 22/7 × 28 = 88 cm.',
      },
      {
        id: 'q7-d',
        label: '44 cm',
        isCorrect: false,
        misconceptionTag: 'Lupa dikali 2 saat pakai r',
        diagnosticFeedback:
          'Kamu membagi d = 28 menjadi r = 14, lalu hanya menghitung π × r (22/7 × 14 = 44) tanpa dikali 2! Keliling memakai 2 × π × r = 88 cm.',
      },
    ],
    solutionSteps: [
      'Diketahui diameter d = 28 cm (kelipatan 7, maka π = 22/7).',
      'Rumus Keliling langsung dari diameter: K = π × d.',
      'Hitung: K = 22/7 × 28 = 22 × 4 = 88 cm.',
    ],
  },
  {
    id: 'q8',
    level: 2,
    levelLabel: 'Level 2 · Hitung Tepat',
    topicTag: 'Luas dari Diameter (π = 3,14)',
    questionText:
      'Berapakah luas sebuah lingkaran yang diameternya 20 cm? (Gunakan π = 3,14)',
    options: [
      {
        id: 'q8-a',
        label: '1.256 cm²',
        isCorrect: false,
        misconceptionTag: 'Lupa bagi 2 diameter',
        diagnosticFeedback:
          'Ups, diameter 20 langsung kamu kuadratkan! Ubah dulu menjadi jari-jari: r = 20 : 2 = 10 cm, lalu hitung 3,14 × 10 × 10 = 314 cm².',
      },
      {
        id: 'q8-b',
        label: '62,8 cm²',
        isCorrect: false,
        misconceptionTag: 'Tertukar rumus Keliling',
        diagnosticFeedback:
          '62,8 adalah Keliling lingkaran (3,14 × 20). Karena soal meminta Luas, hitung r = 10 cm lalu L = 3,14 × 10² = 314 cm².',
      },
      {
        id: 'q8-c',
        label: '314 cm²',
        isCorrect: true,
        diagnosticFeedback:
          'Sempurna! Kamu membagi 20 : 2 = 10 cm terlebih dahulu, lalu menghitung L = 3,14 × 10 × 10 = 314 cm².',
      },
      {
        id: 'q8-d',
        label: '157 cm²',
        isCorrect: false,
        misconceptionTag: 'Membagi dua hasil akhir',
        diagnosticFeedback:
          '157 cm² adalah luas setengah lingkaran. Soal menanyakan 1 lingkaran penuh, yaitu 314 cm².',
      },
    ],
    solutionSteps: [
      'Ubah diameter menjadi jari-jari: r = 20 ÷ 2 = 10 cm.',
      '10 bukan kelipatan 7, pilih π = 3,14.',
      'Hitung Luas: L = 3,14 × 10 × 10 = 314 cm².',
    ],
  },

  // LEVEL 3: Detektif Soal Cerita (Highlighting Kata Kunci)
  {
    id: 'q9',
    level: 3,
    levelLabel: 'Level 3 · Soal Cerita',
    topicTag: 'Konteks Tutup Toples',
    questionText:
      'Ibu memiliki tutup toples bundar yang berdiameter 14 cm. Bagian atas tutup toples tersebut akan ditempeli stiker penuh. Berapa luas stiker yang dibutuhkan?',
    storySegments: [
      { text: 'Ibu memiliki ', role: 'normal' },
      { text: 'tutup toples bundar', role: 'context' },
      { text: ' yang ', role: 'normal' },
      { text: 'berdiameter 14 cm', role: 'known' },
      { text: '. Bagian atas tutup toples tersebut akan ', role: 'normal' },
      { text: 'ditempeli stiker penuh', role: 'context' },
      { text: '. Berapa ', role: 'normal' },
      { text: 'luas stiker', role: 'asked' },
      { text: ' yang dibutuhkan?', role: 'normal' },
    ],
    clueHint: 'Menempel stiker penuh di permukaan = mencari Luas. Ingat: diketahui masih diameter 14 cm!',
    options: [
      {
        id: 'q9-a',
        label: '154 cm²',
        isCorrect: true,
        diagnosticFeedback:
          'Hebat! Kamu berhasil membaca petunjuk soal cerita: stiker penuh = Luas, diameter 14 → r = 7 cm, sehingga L = 22/7 × 7 × 7 = 154 cm².',
      },
      {
        id: 'q9-b',
        label: '616 cm²',
        isCorrect: false,
        misconceptionTag: 'Lupa bagi 2 diameter',
        diagnosticFeedback:
          'Kamu sudah benar memilih rumus Luas, tetapi lupa membagi diameter 14 cm menjadi jari-jari (r = 7 cm). Hasilnya jadi 4× terlalu besar!',
      },
      {
        id: 'q9-c',
        label: '44 cm²',
        isCorrect: false,
        misconceptionTag: 'Salah tafsir konteks (Keliling)',
        diagnosticFeedback:
          '44 cm adalah keliling (panjang pita di pinggiran tutup). Karena stiker ditempel penuh menutup permukaan atas, yang dicari adalah Luas (π × r²).',
      },
      {
        id: 'q9-d',
        label: '77 cm²',
        isCorrect: false,
        misconceptionTag: 'Setengah lingkaran',
        diagnosticFeedback:
          '77 cm² hanya menutupi setengah tutup toples. Stiker ditempel penuh satu lingkaran: 22/7 × 7 × 7 = 154 cm².',
      },
    ],
    solutionSteps: [
      'Kata kunci [Diketahui]: berdiameter 14 cm → r = 14 ÷ 2 = 7 cm.',
      'Kata kunci [Ditanya]: ditempeli stiker penuh / luas stiker → gunakan rumus Luas.',
      'Hitung: L = 22/7 × 7 × 7 = 154 cm².',
    ],
  },
  {
    id: 'q10',
    level: 3,
    levelLabel: 'Level 3 · Soal Cerita',
    topicTag: 'Konteks Roda Sepeda',
    questionText:
      'Roda sepeda Andi memiliki jari-jari 21 cm. Jika roda tersebut berputar tepat 1 kali putaran penuh, berapa jarak lintasan yang ditempuh sepeda?',
    storySegments: [
      { text: 'Roda sepeda Andi', role: 'context' },
      { text: ' memiliki ', role: 'normal' },
      { text: 'jari-jari 21 cm', role: 'known' },
      { text: '. Jika roda tersebut ', role: 'normal' },
      { text: 'berputar tepat 1 kali putaran penuh', role: 'context' },
      { text: ', berapa ', role: 'normal' },
      { text: 'jarak lintasan', role: 'asked' },
      { text: ' yang ditempuh sepeda?', role: 'normal' },
    ],
    clueHint: 'Saat roda berputar 1 kali, bagian yang menyentuh aspal adalah tepi luar roda = Keliling!',
    options: [
      {
        id: 'q10-a',
        label: '1.386 cm',
        isCorrect: false,
        misconceptionTag: 'Salah tafsir konteks (Luas)',
        diagnosticFeedback:
          '1.386 adalah Luas roda! Saat roda menggelinding di jalan sebanyak 1 putaran penuh, jarak tempuhnya sama dengan panjang pinggiran roda (Keliling = 2 × π × r).',
      },
      {
        id: 'q10-b',
        label: '132 cm',
        isCorrect: true,
        diagnosticFeedback:
          'Tepat! 1 kali putaran roda = 1 × Keliling lingkaran = 2 × 22/7 × 21 = 2 × 22 × 3 = 132 cm.',
      },
      {
        id: 'q10-c',
        label: '66 cm',
        isCorrect: false,
        misconceptionTag: 'Lupa dikali 2 pada Keliling',
        diagnosticFeedback:
          'Kamu menghitung π × r (22/7 × 21 = 66). Ingat! 21 cm adalah jari-jari, bukan diameter. Rumus keliling dari jari-jari adalah 2 × π × r = 132 cm.',
      },
      {
        id: 'q10-d',
        label: '264 cm',
        isCorrect: false,
        misconceptionTag: 'Salah faktor pengali',
        diagnosticFeedback:
          '264 cm adalah jarak untuk 2 putaran roda. Soal menanyakan 1 kali putaran penuh: 2 × 22/7 × 21 = 132 cm.',
      },
    ],
    solutionSteps: [
      'Kata kunci [Diketahui]: jari-jari r = 21 cm (kelipatan 7 → π = 22/7).',
      'Kata kunci [Konteks]: berputar 1 kali putaran penuh → jarak lintasan = Keliling roda.',
      'Hitung: K = 2 × 22/7 × 21 = 2 × 22 × 3 = 132 cm.',
    ],
  },
  {
    id: 'q11',
    level: 3,
    levelLabel: 'Level 3 · Soal Cerita',
    topicTag: 'Konteks Taman Sekolah',
    questionText:
      'Di halaman sekolah terdapat taman bunga berbentuk lingkaran dengan diameter 20 meter. Di sekeliling tepi taman akan dipasang pagar kayu. Berapa panjang pagar yang diperlukan? (π = 3,14)',
    storySegments: [
      { text: 'Di halaman sekolah terdapat ', role: 'normal' },
      { text: 'taman bunga berbentuk lingkaran', role: 'context' },
      { text: ' dengan ', role: 'normal' },
      { text: 'diameter 20 meter', role: 'known' },
      { text: '. Di ', role: 'normal' },
      { text: 'sekeliling tepi taman', role: 'context' },
      { text: ' akan dipasang pagar kayu. Berapa ', role: 'normal' },
      { text: 'panjang pagar', role: 'asked' },
      { text: ' yang diperlukan?', role: 'normal' },
    ],
    clueHint: 'Kata "di sekeliling tepi taman" adalah petunjuk langsung untuk mencari Keliling.',
    options: [
      {
        id: 'q11-a',
        label: '62,8 meter',
        isCorrect: true,
        diagnosticFeedback:
          'Mantap! Memasang pagar di sekeliling tepi = Keliling. Karena diketahui d = 20 m, langsung hitung K = π × d = 3,14 × 20 = 62,8 meter.',
      },
      {
        id: 'q11-b',
        label: '314 meter',
        isCorrect: false,
        misconceptionTag: 'Salah tafsir konteks (Luas)',
        diagnosticFeedback:
          '314 m² adalah Luas isi taman (misal untuk menanam rumput). Memasang pagar di tepi taman berarti mencari Keliling (π × d).',
      },
      {
        id: 'q11-c',
        label: '125,6 meter',
        isCorrect: false,
        misconceptionTag: 'Mengalikan 2 pada diameter',
        diagnosticFeedback:
          'Kamu memasukkan d = 20 ke rumus 2 × π × r (jadinya 2 × 3,14 × 20 = 125,6). Kalau sudah pakai diameter, cukup K = π × d = 3,14 × 20 = 62,8 meter.',
      },
      {
        id: 'q11-d',
        label: '31,4 meter',
        isCorrect: false,
        misconceptionTag: 'Lupa dikali 2 setelah konversi r',
        diagnosticFeedback:
          'Kamu mengubah d = 20 menjadi r = 10, tapi hanya mengalikan 3,14 × 10 = 31,4! Rumus keliling pakai jari-jari harus dikali 2: 2 × 3,14 × 10 = 62,8 meter.',
      },
    ],
    solutionSteps: [
      'Kata kunci [Diketahui]: diameter d = 20 meter (bukan kelipatan 7 → π = 3,14).',
      'Kata kunci [Ditanya]: pagar di sekeliling tepi = Keliling.',
      'Hitung: K = π × d = 3,14 × 20 = 62,8 meter.',
    ],
  },
  {
    id: 'q12',
    level: 3,
    levelLabel: 'Level 3 · Soal Cerita',
    topicTag: 'Konteks Meja Bundar',
    questionText:
      'Sebuah meja makan bundar memiliki diameter 28 dm. Permukaan meja akan dilapisi kaca bundar tepat seukuran meja. Berapa luas kaca yang dibutuhkan? (π = 22/7)',
    storySegments: [
      { text: 'Sebuah ', role: 'normal' },
      { text: 'meja makan bundar', role: 'context' },
      { text: ' memiliki ', role: 'normal' },
      { text: 'diameter 28 dm', role: 'known' },
      { text: '. ', role: 'normal' },
      { text: 'Permukaan meja akan dilapisi kaca', role: 'context' },
      { text: ' bundar tepat seukuran meja. Berapa ', role: 'normal' },
      { text: 'luas kaca', role: 'asked' },
      { text: ' yang dibutuhkan?', role: 'normal' },
    ],
    clueHint: 'Melapisi seluruh permukaan = mencari Luas. Hati-hati, 28 dm masih diameter!',
    options: [
      {
        id: 'q12-a',
        label: '2.464 dm²',
        isCorrect: false,
        misconceptionTag: 'Lupa bagi 2 diameter',
        diagnosticFeedback:
          'Jebakan diameter! Kamu menghitung 22/7 × 28 × 28 = 2.464. Ingat: 28 dm adalah diameter, harus dibagi 2 dulu menjadi r = 14 dm!',
      },
      {
        id: 'q12-b',
        label: '616 dm²',
        isCorrect: true,
        diagnosticFeedback:
          'Luar biasa! Kamu membagi diameter 28 : 2 = 14 dm, lalu menghitung L = 22/7 × 14 × 14 = 22 × 2 × 14 = 616 dm².',
      },
      {
        id: 'q12-c',
        label: '88 dm²',
        isCorrect: false,
        misconceptionTag: 'Tertukar rumus Keliling',
        diagnosticFeedback:
          '88 dm adalah Keliling pinggiran meja (22/7 × 28). Karena kaca melapisi seluruh permukaan meja, gunakan rumus Luas (π × r²).',
      },
      {
        id: 'q12-d',
        label: '308 dm²',
        isCorrect: false,
        misconceptionTag: 'Setengah luas lingkaran',
        diagnosticFeedback:
          '308 dm² hanya setengah lingkaran. Meja utuh dengan r = 14 dm memiliki luas 22/7 × 14 × 14 = 616 dm².',
      },
    ],
    solutionSteps: [
      'Kata kunci [Diketahui]: diameter d = 28 dm → ubah ke jari-jari: r = 28 ÷ 2 = 14 dm.',
      'Kata kunci [Ditanya]: melapisi permukaan / luas kaca → rumus Luas.',
      'Hitung: L = 22/7 × 14 × 14 = 22 × 2 × 14 = 616 dm².',
    ],
  },
];
