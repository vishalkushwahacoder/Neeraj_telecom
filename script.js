// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// THEME TOGGLE (light / dark) - stored in localStorage
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function applyStoredTheme() {
  const saved = localStorage.getItem('neeraj_theme');
  if (saved === 'dark') {
    body.classList.add('dark-theme');
    if (themeToggle) themeToggle.textContent = '☀';
  } else {
    body.classList.remove('dark-theme');
    if (themeToggle) themeToggle.textContent = '☾';
  }
}

applyStoredTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-theme');
    localStorage.setItem('neeraj_theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀' : '☾';
  });
}

// Floating WhatsApp button analytics example
const whatsappFloat = document.getElementById('whatsappFloat');
if (whatsappFloat) {
  whatsappFloat.addEventListener('click', function () {
    if (window.gtag) {
      gtag('event', 'click', {
        event_category: 'WhatsApp',
        event_label: 'whatsapp_float_button'
      });
    }
  });
}

// Contact form -> open WhatsApp with pre-filled message
const contactBtn = document.getElementById('contactWhatsAppBtn');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    let text = 'Hello Neeraj Telecom,%0A';
    if (name) text += `My name is ${encodeURIComponent(name)}.%0A`;
    if (phone) text += `My mobile number is ${encodeURIComponent(phone)}.%0A`;
    if (message) {
      text += `%0AQuery:%0A${encodeURIComponent(message)}`;
    } else {
      text += 'I need help with your services.';
    }

    const url = `https://wa.me/918953145865?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
/* ====== Customer Satisfaction Slider ====== */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

function updateSlider() {
  slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}

document.querySelector(".next").addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

// Auto Slide
setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlider();
}, 4000);

/* ====== Customer Satisfaction Slider (fancy) ====== */
(function () {
  const sliderContainer = document.getElementById("testimonialSlider");
  if (!sliderContainer) return;

  const slider = sliderContainer.querySelector(".slider");
  const slides = Array.from(sliderContainer.querySelectorAll(".slide"));
  const btnNext = sliderContainer.querySelector(".next");
  const btnPrev = sliderContainer.querySelector(".prev");
  const progressBar = sliderContainer.querySelector(".slider-progress-bar");

  let currentIndex = 0;
  const AUTO_TIME = 5000; // 5 seconds per slide
  let autoTimer = null;
  let isTouching = false;
  let touchStartX = 0;
  let touchDeltaX = 0;

  function setActiveSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    // Move slider
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Active class for fade
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Restart progress bar
    if (progressBar) {
      progressBar.style.transition = "none";
      progressBar.style.width = "0%";
      // Force reflow
      void progressBar.offsetWidth;
      progressBar.style.transition = `width ${AUTO_TIME}ms linear`;
      progressBar.style.width = "100%";
    }
  }

  function nextSlide() {
    setActiveSlide(currentIndex + 1);
  }

  function prevSlide() {
    setActiveSlide(currentIndex - 1);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, AUTO_TIME);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Buttons
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      nextSlide();
      startAuto();
    });
  }
  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      prevSlide();
      startAuto();
    });
  }

  // Touch swipe (mobile)
  sliderContainer.addEventListener("touchstart", (e) => {
    if (!e.touches || e.touches.length !== 1) return;
    isTouching = true;
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
    stopAuto();
  });

  sliderContainer.addEventListener("touchmove", (e) => {
    if (!isTouching || !e.touches || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    touchDeltaX = currentX - touchStartX;
  });

  sliderContainer.addEventListener("touchend", () => {
    if (!isTouching) return;
    isTouching = false;

    const SWIPE_THRESHOLD = 50; // pixels
    if (touchDeltaX > SWIPE_THRESHOLD) {
      // Swipe right -> previous
      prevSlide();
    } else if (touchDeltaX < -SWIPE_THRESHOLD) {
      // Swipe left -> next
      nextSlide();
    }

    startAuto();
  });

  // Init
  setActiveSlide(0);
  startAuto();
})();
