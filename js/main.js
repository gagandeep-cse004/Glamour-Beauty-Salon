// ========================
// 1. Preloader
// ========================
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});


// ========================
// 3. Hero Slider
// ========================
const heroSlides = document.querySelectorAll('.hero-slide');
const sliderDotsContainer = document.querySelector('.slider-dots');
let heroCurrentSlide = 0;
let heroSlideInterval;

// Create dots
heroSlides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToHeroSlide(index));
    sliderDotsContainer.appendChild(dot);
});
const sliderDots = document.querySelectorAll('.slider-dot');

function showHeroSlide(n) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    sliderDots.forEach(dot => dot.classList.remove('active'));
    heroSlides[n].classList.add('active');
    sliderDots[n].classList.add('active');
    heroCurrentSlide = n;
}

function nextHeroSlide() {
    heroCurrentSlide = (heroCurrentSlide + 1) % heroSlides.length;
    showHeroSlide(heroCurrentSlide);
}

function prevHeroSlide() {
    heroCurrentSlide = (heroCurrentSlide - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(heroCurrentSlide);
}

function goToHeroSlide(index) {
    showHeroSlide(index);
}

// Auto-slide
function startHeroSlider() {
    heroSlideInterval = setInterval(nextHeroSlide, 5000);
}

// Pause on hover
const heroSlider = document.querySelector('.hero-slider');
heroSlider.addEventListener('mouseenter', () => clearInterval(heroSlideInterval));
heroSlider.addEventListener('mouseleave', startHeroSlider);

// Init slider
document.querySelector('.slider-btn.next').addEventListener('click', nextHeroSlide);
document.querySelector('.slider-btn.prev').addEventListener('click', prevHeroSlide);
startHeroSlider();

// ========================
// 4. Testimonials Slider
// ========================
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrevBtn = document.querySelector('.testimonial-btn.prev');
const testimonialNextBtn = document.querySelector('.testimonial-btn.next');
let testimonialIndex = 0;

function moveTestimonials() {
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
}

testimonialNextBtn.addEventListener('click', () => {
    if (testimonialIndex < testimonialCards.length - 1) {
        testimonialIndex++;
        moveTestimonials();
    }
});

testimonialPrevBtn.addEventListener('click', () => {
    if (testimonialIndex > 0) {
        testimonialIndex--;
        moveTestimonials();
    }
});

// ========================
// 5. Stats Counter Animation
// ========================
const statNumbers = document.querySelectorAll('.stat-number');

const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Intersection Observer to trigger counter when in view
const statsSection = document.querySelector('.stats-section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-count'));
                animateValue(num, 0, target, 2000);
            });
            statsObserver.unobserve(statsSection);
        }
    });
}, observerOptions);

statsObserver.observe(statsSection);

// ========================
// 6. Back to Top Button
// ========================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================
// 7. Smooth Scrolling for Anchor Links
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ========================
// 8. Newsletter Form Submission
// ========================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value) {
            alert('Thank you for subscribing!');
            emailInput.value = '';
        }
    });
}