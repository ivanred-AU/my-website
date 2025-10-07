// The Golden Fork - Restaurant Website JavaScript
// =============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const reservationForm = document.getElementById('reservationForm');
const reservationSuccess = document.getElementById('reservationSuccess');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrolling();
    initMenuTabs();
    initReservationForm();
    initBackToTop();
    initAnimations();
    setMinDate();
});

// Navigation Functions
function initNavigation() {
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menu Tabs
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');

            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding category
            menuCategories.forEach(cat => {
                if (cat.id === category) {
                    cat.classList.add('active');
                } else {
                    cat.classList.remove('active');
                }
            });
        });
    });
}

// Reservation Form
function initReservationForm() {
    if (!reservationForm) return;

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Simulate form submission
        // In a real application, this would send data to a server
        console.log('Reservation Data:', data);

        // Show success message
        this.classList.add('hide');
        reservationSuccess.classList.add('show');

        // Reset form after delay
        setTimeout(() => {
            this.reset();
            this.classList.remove('hide');
            reservationSuccess.classList.remove('show');
        }, 5000);
    });
}

// Set minimum date to today
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }
}

// Back to Top Button
function initBackToTop() {
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.section-header, .feature-card, .menu-item, .gallery-item, ' +
        '.testimonial-card, .about-content, .reservation-content'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Hero Slider (if multiple slides are added in the future)
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length <= 1) return;

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance slides
    setInterval(nextSlide, 5000);
}

// Gallery Lightbox (optional enhancement)
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.src;
            const alt = img.alt;

            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${src}" alt="${alt}">
                    <div class="lightbox-caption">${alt}</div>
                </div>
            `;

            document.body.appendChild(lightbox);

            // Add styles
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;

            // Close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target === this || e.target.className === 'lightbox-close') {
                    this.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        this.remove();
                    }, 300);
                }
            });
        });
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const heroSlide = document.querySelector('.hero-slide');
    if (!heroSlide) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroSlide.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Form Validation Enhancement
function enhanceFormValidation() {
    const inputs = document.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.classList.add('error');
                this.classList.remove('valid');
            } else {
                this.classList.remove('error');
                this.classList.add('valid');
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                if (this.value) {
                    this.classList.remove('error');
                    this.classList.add('valid');
                }
            }
        });
    });
}

// Loading Screen (optional)
function initLoadingScreen() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loading');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 300);
            }, 500);
        }
    });
}

// Newsletter Form
document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;

        // Simulate subscription
        console.log('Newsletter subscription:', email);

        // Show success message
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Abonniert!';
        button.style.background = 'var(--accent-warm)';

        // Reset after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            this.reset();
        }, 3000);
    });
});

// Active Navigation Highlighting
function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + navbar.offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize additional features
highlightActiveNav();
enhanceFormValidation();
initGalleryLightbox();

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedHighlight = debounce(highlightActiveNav, 100);
window.addEventListener('scroll', debouncedHighlight);