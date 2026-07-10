# JagatJombang — Web Project

Prototipe aplikasi mobile **JagatJombang** (Inisiatif Inkubator Digital Mahasiswa): marketplace, wisata budaya, & sastra Jombang dalam satu genggaman.

Dokumen ini menjelaskan **langkah demi langkah** cara file HTML tunggal dipecah menjadi struktur web yang rapi, cara menjalankannya, cara mengeditnya, dan cara mem-publish-nya.

---

## 1. Struktur Folder

Awalnya semua kode (HTML + CSS + JavaScript + 7 gambar) berada dalam **satu file** `jagatjombang.html` berukuran ~764 KB. Sekarang sudah dipecah menjadi:

```
jagatjombang-web/
├── index.html          # Struktur halaman (HTML saja)
├── css/
│   └── styles.css      # Semua styling (dulu di dalam <style>)
├── js/
│   └── app.js          # Logika navigasi antar layar (dulu di dalam <script>)
├── assets/
│   ├── img1.jpg        # Gambar-gambar (dulu ditanam sebagai base64)
│   ├── img2.jpg
│   ├── ... 
│   └── img7.jpg
└── README.md           # Dokumen ini
```

**Kenapa dipecah?**
- Lebih mudah dibaca & di-maintain (HTML, CSS, JS terpisah).
- Gambar jadi file nyata, bukan teks base64 raksasa → file HTML mengecil dari 764 KB menjadi ~11 KB.
- Siap di-upload ke GitHub / hosting statis.

---

## 2. Cara Menjalankan (3 Metode)

### Metode A — Paling Cepat (klik ganda)
1. Buka folder `jagatjombang-web`.
2. Klik dua kali `index.html`.
3. Halaman terbuka di browser (Chrome/Edge/Firefox). Selesai.

> Catatan: karena gambar sekarang file terpisah, tetap buka lewat folder yang utuh (jangan pindahkan `index.html` keluar dari foldernya).

### Metode B — Live Server (VS Code) — direkomendasikan saat mengedit
1. Install **Visual Studio Code**.
2. Buka folder `jagatjombang-web` di VS Code (`File > Open Folder`).
3. Install ekstensi **Live Server** (cari "Live Server" oleh Ritwick Dey).
4. Klik kanan `index.html` → **Open with Live Server**.
5. Browser otomatis terbuka di `http://127.0.0.1:5500`. Setiap kali kamu menyimpan file, halaman auto-refresh.

### Metode C — Web Server bawaan (Terminal)
Jika punya Python:
```bash
cd jagatjombang-web
python3 -m http.server 8000
```
Lalu buka `http://localhost:8000` di browser.

Atau jika punya Node.js:
```bash
cd jagatjombang-web
npx serve
```

---

## 3. Cara Kerja Aplikasi

Aplikasi ini adalah **Single Page App sederhana**: semua layar ("screen") ada di dalam `index.html`, tetapi hanya satu yang tampil dalam satu waktu.

### Daftar layar (`id` di HTML)
| ID Layar | Fungsi |
|---|---|
| `scr-onboarding` | Halaman pembuka |
| `scr-beranda` | Beranda / Home |
| `scr-pasar` | Marketplace / Pasar |
| `scr-detail` | Detail produk |
| `scr-budaya` | Wisata Budaya |
| `scr-sastra` | Sastra |
| `scr-inkubator` | Inkubator Digital |

### Fungsi navigasi `go(id)` (di `js/app.js`)
Saat kamu mengklik menu atau kartu, HTML memanggil `go("pasar")`, `go("budaya")`, dst. Fungsi itu:
1. Menyembunyikan semua layar (menghapus class `active`).
2. Menampilkan layar tujuan `scr-<id>` (menambah class `active`).
3. Menyembunyikan/menampilkan navbar bawah (`navwrap`) — disembunyikan di layar `onboarding` & `detail`.
4. Menandai item navbar yang sedang aktif.
5. Menggulung layar kembali ke atas.

---

## 4. Cara Mengedit

### Ganti warna tema
Buka `css/styles.css`, ubah variabel di bagian `:root` paling atas:
```css
:root{
  --coklat:#3E2B23;  /* warna gelap utama */
  --terra:#C2683B;   /* aksen terracotta  */
  --emas:#D9A441;    /* aksen emas        */
  --krem:#FBF6EF;    /* latar             */
  /* ... */
}
```
Ubah satu nilai di sini → warna berubah di seluruh aplikasi.

### Ganti gambar
Timpa file di folder `assets/` dengan gambar baru **memakai nama yang sama** (mis. `img1.jpg`), atau ubah nama file di `index.html`/`styles.css` pada properti `background-image: url(assets/...)`.

### Ubah teks
Semua teks ada di `index.html`. Cari kalimat yang mau diganti dan edit langsung.

### Menambah layar baru
1. Di `index.html`, salin salah satu blok `<div class="screen" id="scr-...">...</div>` dan beri `id` baru, mis. `scr-tentang`.
2. Tambahkan tombol/menu yang memanggil `onclick="go('tentang')"`.
3. (Opsional) tambahkan ke array `NAV` di `js/app.js` jika ingin muncul di navbar.

---

## 5. Cara Mem-publish (Gratis)

### GitHub Pages
1. Buat repository baru di GitHub, upload seluruh isi folder `jagatjombang-web`.
2. Buka **Settings > Pages**.
3. Pilih branch `main` dan folder `/root`, klik **Save**.
4. Beberapa menit kemudian situs tayang di `https://<username>.github.io/<repo>/`.

### Netlify / Vercel (drag & drop)
1. Buka [netlify.com](https://www.netlify.com) (atau [vercel.com](https://vercel.com)).
2. Seret folder `jagatjombang-web` ke area deploy.
3. Situs langsung online dengan URL otomatis.

---

## 6. Ringkasan Proses Pemecahan (Referensi Teknis)

Untuk dokumentasi, beginilah file tunggal tadi dipecah:
1. **Ekstrak CSS** — ambil isi tag `<style>` → simpan ke `css/styles.css`.
2. **Ekstrak JavaScript** — ambil isi tag `<script>` → simpan ke `js/app.js`.
3. **Ekstrak gambar** — semua `url(data:image/jpeg;base64,...)` di-decode menjadi file `.jpg` nyata di folder `assets/`, lalu referensinya diganti menjadi `url(assets/imgN.jpg)`.
4. **Rapikan HTML** — ganti blok `<style>` & `<script>` inline dengan tautan eksternal:
   ```html
   <link rel="stylesheet" href="css/styles.css">
   <script src="js/app.js"></script>
   ```
5. **Uji tampilan** — render ulang untuk memastikan hasilnya identik dengan file asli.

---

_Hasil visual 100% sama dengan file asli — hanya struktur file-nya yang dirapikan._
