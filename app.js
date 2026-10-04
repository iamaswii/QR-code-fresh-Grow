// Fresh GROW Interactive Script
document.addEventListener('DOMContentLoaded', () => {
    
    /* -------------------------------------------------------------
       1. Mobile Navigation Toggle
    ------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* -------------------------------------------------------------
       2. Product Tab Switching System
    ------------------------------------------------------------- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Deactivate all buttons & panels
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none';
            });

            // Activate current button & matching panel
            btn.classList.add('active');
            const activePanel = document.getElementById(`tab-${targetTab}`);
            if (activePanel) {
                activePanel.style.display = 'block';
                // Trigger reflow for CSS opacity animation
                setTimeout(() => {
                    activePanel.classList.add('active');
                }, 10);
            }
        });
    });

    /* -------------------------------------------------------------
       3. Lightbox Image Viewer for Product Images
    ------------------------------------------------------------- */
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const clickableImages = document.querySelectorAll('.clickable-image');

    clickableImages.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-img');
            const imgCaption = card.getAttribute('data-caption') || '';

            if (imgSrc && lightboxModal && lightboxImg) {
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = imgCaption;
                lightboxModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Close Lightbox
    const closeLightbox = () => {
        if (lightboxModal) {
            lightboxModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    /* -------------------------------------------------------------
       4. Scroll Animation Observer (Fade-In & Zoom-In)
    ------------------------------------------------------------- */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        scrollObserver.observe(el);
    });

    /* -------------------------------------------------------------
       5. Sticky Header Scroll Effect & Active Nav Link Highlight
    ------------------------------------------------------------- */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Header shadow on scroll
        if (window.scrollY > 30) {
            header.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }

        // Active link indicator
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});
