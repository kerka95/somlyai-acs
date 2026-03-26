document.addEventListener('DOMContentLoaded', () => {

    // 1. Dátum beállítása a footerben
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Navbar szkript (görgetéskor hátteret kap)
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobil menü kezelése
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Ne lehessen görgetni a hátteret
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 4. Hero BG animáció indítása betöltéskor
    setTimeout(() => {
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) heroBg.classList.add('loaded');
    }, 100);

    // 5. Scroll Reveal Animációk (Intersection Observer)
    const revealElements = document.querySelectorAll('.fade-up, .fade-in, .reveal-from-bottom, .reveal-from-left, .reveal-from-right, .reveal-scale');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            // Hozzáadja az in-view classt ami CSS-ben megcsinálja az animációt
            entry.target.classList.add('in-view');

            // Ha egyszer betöltődött az animáció, akkor nem kell többé figyelni
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 6. Smooth scroll a horgony linkekhez
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Kiszámítjuk a nav magasságát, hogy ne takarja a szekció tetejét
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. Cookie Banner kezelés
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const rejectCookiesBtn = document.getElementById('reject-cookies');

    if (cookieBanner && !localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1500);
    }

    if(acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
            // Ide jöhet az esetleges analitika iniciálása
        });
    }

    if(rejectCookiesBtn) {
        rejectCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'rejected');
            cookieBanner.classList.remove('show');
        });
    }
});
