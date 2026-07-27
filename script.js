document.addEventListener("DOMContentLoaded", () => {
  // 1. KẾT NỐI PHẦN TỬ HTML
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

  // Hàm hỗ trợ ẩn/hiện màn hình
  function switchScreen(from, to) {
    from.classList.remove("active");
    from.classList.add("hidden");
    to.classList.remove("hidden");
    to.classList.add("active");
  }

  // 2. KHỞI TẠO NỀN TIA SAO GALAXY
  const starsContainer = document.querySelector(".stars-container");
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

  // 3. HIỆU ỨNG TIM BAY THEO CHUỘT
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.3) return; // Hạn chế số lượng để không lag
    const heart = document.createElement("span");
    heart.className = "heart-cursor";
    heart.innerHTML = "💖";
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });

  // 4. HIỆU ỨNG CÁNH HOA RƠI
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

  // 5. XỬ LÝ NÚT VÀ CHUYỂN MÀN HÌNH
  // Màn hình 0 -> Màn hình 1
  startBtn.addEventListener("click", () => {
    bgMusic.play().catch(() => console.log("Trình duyệt chặn tự động phát nhạc"));
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    switchScreen(screens.welcome, screens.baby);
  });

  // Màn hình 1 -> Timeline
  toTransitionBtn.addEventListener("click", () => {
    switchScreen(screens.baby, screens.transition);
  });

  // Timeline -> Màn hình Hiện Tại (Ảnh + Thư + Album)
  toNowBtn.addEventListener("click", () => {
    switchScreen(screens.transition, screens.now);
    setInterval(createPetal, 300); // Bắt đầu rơi cánh hoa
  });

  // Bật/tắt Lá Thư
  letterBtn.addEventListener("click", () => {
    letterContent.classList.toggle("hidden");
  });

  // Nút Bất Ngờ Cuối Cùng (Màn hình Pháo hoa)
  surpriseBtn.addEventListener("click", () => {
    switchScreen(screens.now, screens.surprise);
    
    // Bắn pháo hoa liên tục trong 10 giây
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
    }, 250);
  });
});