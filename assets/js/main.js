// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Add scroll listener for header (add shadow on scroll)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // 3. Dynamic Mobile Menu Implementation
    const headerContainer = document.querySelector('.header-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (headerContainer && navMenu) {
        // Create mobile menu button
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '☰';
        mobileBtn.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Insert before header actions
        const headerActions = document.querySelector('.header-actions');
        if (headerActions) {
            headerContainer.insertBefore(mobileBtn, headerActions);
        } else {
            headerContainer.appendChild(mobileBtn);
        }

        // Toggle mobile menu on click
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            if (navMenu.classList.contains('mobile-active')) {
                mobileBtn.innerHTML = '✕';
            } else {
                mobileBtn.innerHTML = '☰';
            }
        });
    }

    // 4. Scroll Reveal Animations
    // Automatically add .reveal class to section containers for fade-up effects
    const sectionsToReveal = document.querySelectorAll('section > .container');
    sectionsToReveal.forEach(section => {
        section.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
