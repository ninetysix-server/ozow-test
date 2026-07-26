// js/hero.js
document.addEventListener('DOMContentLoaded', function() {
    new Swiper('.heroSwiper', {
        direction: 'horizontal',
        loop: true,
        speed: 1000,
        autoplay: { delay: 7000, disableOnInteraction: false },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true }
    });
});