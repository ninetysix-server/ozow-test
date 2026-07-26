// js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Header load animation
    const header = document.querySelector('.header-container');
    if (header) {
        void header.offsetWidth;
        header.classList.add('loaded');
    }
    
    // Offer bar close
    document.querySelectorAll('.close-offer').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('offerBar').style.display = 'none';
        });
    });
    
    // Mobile menu
    const menuBtn = document.getElementById('mobileMenuButton');
    const overlay = document.getElementById('mobileMenuOverlay');
    const menu = document.getElementById('mobileMenu');
    const closeMenu = document.getElementById('closeMobileMenu');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menu.classList.add('active');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            menu.classList.remove('active');
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            menu.classList.remove('active');
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Mobile nav items
    document.querySelectorAll('.nav-item-mobile').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item-mobile').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Desktop nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Get Quote
    document.querySelectorAll('.get-quote-btn, .mobile-get-quote-btn, #bottomNavQuoteBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'https://quote.96studios.co.za/';
        });
    });
    
    // Scroll to services
    document.querySelectorAll('#nav-services, #mobile-services, .slide-cta, #nav-pricing, #mobile-pricing, #nav-branding, #mobile-branding').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Scroll top
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.classList.toggle('active', window.scrollY > 1000);
        });
        scrollBtn.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Footer portal link
    document.getElementById('footer-portal')?.addEventListener('click', e => {
        e.preventDefault();
        const user = localStorage.getItem('userClientId');
        if (user) {
            window.location.href = 'portal.html';
        } else {
            document.getElementById('desktopAuthOverlay')?.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});