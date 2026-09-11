/**
 * Personal Portfolio Interactive Script
 * Candidate: Snigdha Parimella
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize dynamic copyright year
  initCurrentYear();

  // Initialize mobile navigation hamburger menu
  initMobileMenu();

  // Initialize active scroll highlighting for navigation links
  initScrollSpy();

  // Initialize recommendation carousel functionality
  initCarousel();
});

/**
 * Sets the current year dynamically in the footer notice.
 */
function initCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Mobile Navigation Toggle and Auto-Close Behavior
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  // Toggle mobile navigation menu
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close mobile navigation menu upon clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // Close menu when clicking outside of navigation overlay
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
}

/**
 * Highlights active navigation link according to vertical scroll position
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function checkScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
}

/**
 * Recommendation / Testimonial Carousel Implementation
 */
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const indicators = document.querySelectorAll('.indicator');

  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  const totalSlides = cards.length;

  function updateCarousel(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Apply smooth sliding translation
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update indicators state
    indicators.forEach((indicator, i) => {
      if (i === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  // Event Listeners for Next and Prev controls
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateCarousel(currentIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentIndex - 1);
    });
  }

  // Indicator dot navigation
  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      updateCarousel(i);
    });
  });
}