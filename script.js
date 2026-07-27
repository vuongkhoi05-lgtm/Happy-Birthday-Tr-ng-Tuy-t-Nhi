document.addEventListener("DOMContentLoaded", () => {
  // 1. PHẦN TỬ GIAO DIỆN
  const bgMusic = document.getElementById("bg-music");
  const startBtn = document.getElementById("start-btn");
  const toTransitionBtn = document.getElementById("to-transition-btn");
  const toNowBtn = document.getElementById("to-now-btn");
  const surpriseBtn = document.getElementById("surprise-btn");
  const letterBtn = document.getElementById("letter-btn");
  const letterContent = document.getElementById("letter-content");

  const screens = {
    welcome: document.getElementById("welcome-sec"),
    baby: document.getElementById("baby-sec"),
    transition: document.getElementById("transition-sec"),
    now: document.getElementById("now-sec"),
    surprise: document.getElementById("surprise-sec")
  };

  function switchScreen(from, to) {
    from.classList.remove("active");
    from.classList.add("hidden");
    to.classList.remove("hidden");
    to.classList.add("active");
  }

  // 2. NỀN SAO BẦU TRỜI
  const starsContainer = document.querySelector(".stars-container");
  if (starsContainer) {
    for (let i = 0; i < 150; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.setProperty("--duration", `${2 + Math.random() * 3}s`);
      starsContainer.appendChild(star);
    }
  }

  // 3. HIỆU ỨNG TIM BAY THEO CHUỘT
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.3) return;
    const heart = document.createElement("span");
    heart.className = "heart-cursor";
    heart.innerHTML = "💖";
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });

  // 4. CÁNH HOA RƠI
  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.width = `${Math.random() * 10 + 10}px`;
    petal.style.height = `${Math.random() * 10 + 10}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${4 + Math.random() * 5}s`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 9000);
  }

  // 5. BẮT SỰ KIỆN NÚT VÀ PHÁT NHẠC
  startBtn.addEventListener("click", () => {
    // Ép buộc phát nhạc khi bấm nút
    if (bgMusic) {
      bgMusic.volume = 0.8;
      bgMusic.play().then(() => {
        console.log("Nhạc đang phát thành công!");
      }).catch((err) => {
        console.log("Lỗi phát nhạc:", err);
      });
    }

    if (typeof confetti === "function") {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
    
    switchScreen(screens.welcome, screens.baby);
  });

  toTransitionBtn.addEventListener("click", () => {
    switchScreen(screens.baby, screens.transition);
  });

  toNowBtn.addEventListener("click", () => {
    switchScreen(screens.transition, screens.now);
    setInterval(createPetal, 300);
  });

  // Mở / Ẩn lá thư
  letterBtn.addEventListener("click", () => {
    letterContent.classList.toggle("hidden");
  });

  // Nút pháo hoa màn hình cuối
  surpriseBtn.addEventListener("click", () => {
    switchScreen(screens.now, screens.surprise);
    
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      if (typeof confetti === "function") {
        confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
      }
    }, 250);
  });
});