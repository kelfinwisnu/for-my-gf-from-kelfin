document.addEventListener("DOMContentLoaded", function () {
  // Efek masuk saat halaman dimuat
  document.body.classList.remove("fade-out");

  // Ambil semua tautan navbar
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const targetUrl = this.getAttribute("href");

      // Pastikan bukan tautan eksternal atau kosong
      if (targetUrl && !targetUrl.startsWith("#") && targetUrl !== window.location.pathname) {
        e.preventDefault(); // Cegah pindah halaman langsung secara instan

        // Tambahkan efek pudar keluar (fade-out)
        document.body.classList.add("fade-out");

        // Pindah halaman setelah animasi selesai (300 milidetik)
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // 1. Kontrol Musik Utama (Daniel Caesar)
  const musicCard = document.getElementById("musicCardBtn");
  const bgMusic = document.getElementById("bgMusic");
  const playIcon = document.getElementById("playIcon");

  if (musicCard && bgMusic) {
    musicCard.addEventListener("click", function () {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          playIcon.textContent = "❚❚";
        }).catch(e => console.log("Audio play blocked:", e));
      } else {
        bgMusic.pause();
        playIcon.textContent = "▶";
      }
    });
  }

  // 2. Kontrol Voice Note Kelfin dengan Garis Progress
  const vnCard = document.getElementById("vnCardBtn");
  const voiceNote = document.getElementById("voiceNote");
  const vnPlayIcon = document.getElementById("vnPlayIcon");
  const vnProgress = document.getElementById("vnProgress");

  if (vnCard && voiceNote) {
    vnCard.addEventListener("click", function () {
      if (voiceNote.paused) {
        voiceNote.play().then(() => {
          vnPlayIcon.textContent = "❚❚";
        }).catch(e => console.log("VN play blocked:", e));
      } else {
        voiceNote.pause();
        vnPlayIcon.textContent = "▶";
      }
    });

    // Update panjang garis putih sesuai durasi VN yang berjalan
    voiceNote.addEventListener("timeupdate", function () {
      if (voiceNote.duration) {
        const percent = (voiceNote.currentTime / voiceNote.duration) * 100;
        if (vnProgress) vnProgress.style.width = percent + "%";
      }
    });

    voiceNote.addEventListener("ended", function () {
      vnPlayIcon.textContent = "▶";
      if (vnProgress) vnProgress.style.width = "0%";
    });
  }
});