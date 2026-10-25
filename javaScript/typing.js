document.addEventListener("DOMContentLoaded", function () {
  const typingElement = document.querySelector(".typing-text");
  
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = ""; // Kosongkan teks asli
    typingElement.classList.add("typing-container");

    // Loop untuk memecah teks menjadi setiap huruf yang dibungkus span
    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char; // Tangani spasi agar tetap terbaca
      span.classList.add("char");
      
      // Atur jeda kemunculan tiap huruf (0.05 detik per huruf)
      span.style.animationDelay = `${index * 0.05}s`;
      
      typingElement.appendChild(span);
    });
  }
});