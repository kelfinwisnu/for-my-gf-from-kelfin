document.addEventListener("DOMContentLoaded", function () {
  // Pastikan elemen audio global ada di setiap halaman, atau buat secara dinamis
  let globalAudio = document.getElementById("audioPlayer");
  let globalCardWrapper = document.getElementById("cardWrapper");

  // Tangani klik navigasi secara dinamis (AJAX / Fetch)
  document.addEventListener("click", function (e) {
    const link = e.target.closest(".nav-link");
    if (link) {
      e.preventDefault();
      const targetUrl = link.getAttribute("href");

      // Jangan lakukan apa-apa jika klik halaman yang sedang aktif
      if (targetUrl === window.location.pathname.split("/").pop()) return;

      // Efek pudar keluar (fade-out) sebelum mengganti konten
      document.body.classList.add("fade-out");

      fetch(targetUrl)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "html5");

          // Ambil konten baru dari halaman tujuan
          const newContent = doc.querySelector(".vertical-slider-container") || doc.querySelector(".home-container");
          const currentContent = document.querySelector(".vertical-slider-container") || document.querySelector(".home-container");

          if (newContent && currentContent) {
            currentContent.innerHTML = newContent.innerHTML;
          }

          // Perbarui judul halaman (Title)
          document.title = doc.title;

          // Perbarui URL di browser tanpa reload
          window.history.pushState({}, "", targetUrl);

          // Perbarui kelas active pada navbar
          document.querySelectorAll(".nav-link").forEach(nav => nav.classList.remove("active"));
          const activeNav = document.querySelector(`.nav-link[href="${targetUrl}"]`);
          if (activeNav) activeNav.classList.add("active");

          // Sesuaikan kelas body (misal: latar belakang home-page)
          if (targetUrl === "home.html") {
            document.body.classList.add("home-page");
            initHomeInteractions(); // Inisialisasi ulang animasi teks & musik home
          } else {
            document.body.classList.remove("home-page");
          }

          // Hilangkan efek pudar (fade-in)
          setTimeout(() => {
            document.body.classList.remove("fade-out");
          }, 100);
        })
        .catch(err => {
          console.error("Gagal memuat halaman:", err);
          window.location.href = targetUrl; // Fallback jika gagal
        });
    }
  });

  // Fungsi inisialisasi interaksi halaman Home
  function initHomeInteractions() {
    const typingElement = document.querySelector(".typing-text");
    if (typingElement && !typingElement.classList.contains("typing-container")) {
      const text = typingElement.textContent;
      typingElement.textContent = ""; 
      typingElement.classList.add("typing-container");

      text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.classList.add("char");
        span.style.animationDelay = `${index * 0.05}s`;
        typingElement.appendChild(span);
      });
    }

    const cardWrapper = document.getElementById("cardWrapper");
    const musicDetailsBtn = document.getElementById("musicDetailsBtn");
    const audioPlayer = document.getElementById("audioPlayer");

    // Sinkronkan status visual piringan hitam jika musik sedang berjalan di latar belakang
    if (audioPlayer && !audioPlayer.paused && cardWrapper) {
      cardWrapper.classList.add("active");
    }

    function toggleMusic() {
      if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
          if (cardWrapper) cardWrapper.classList.add("active");
        }).catch(e => console.log("Audio play blocked:", e));
      } else {
        audioPlayer.pause();
        if (cardWrapper) cardWrapper.classList.remove("active");
      }
    }

    if (cardWrapper && audioPlayer) {
      cardWrapper.onclick = toggleMusic;
      if (musicDetailsBtn) musicDetailsBtn.onclick = toggleMusic;
    }
  }

  // Jalankan pertama kali saat halaman dimuat
  initHomeInteractions();
});