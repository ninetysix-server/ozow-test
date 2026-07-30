// js/hero.js

document.addEventListener(
    "DOMContentLoaded",
    function () {
        const heroSection =
            document.getElementById("heroSection");

        const heroImages = Array.from(
            document.querySelectorAll(
                ".heroSwiper .slide-image"
            )
        );

        if (!heroSection || !heroImages.length) {
            initialiseHeroSwiper();
            return;
        }

        let loadedImageCount = 0;
        let heroHasOpened = false;

        function markImageComplete(image) {
            if (image.dataset.heroProcessed === "true") {
                return;
            }

            image.dataset.heroProcessed = "true";
            image.classList.add("is-loaded");

            loadedImageCount += 1;

            if (loadedImageCount === heroImages.length) {
                revealHero();
            }
        }

        function revealHero() {
            if (heroHasOpened) {
                return;
            }

            heroHasOpened = true;

            heroSection.classList.add(
                "hero-images-ready"
            );

            heroSection.classList.remove(
                "hero-is-loading"
            );

            initialiseHeroSwiper();
        }

        heroImages.forEach(image => {
            if (
                image.complete &&
                image.naturalWidth > 0
            ) {
                markImageComplete(image);
                return;
            }

            image.addEventListener(
                "load",
                function () {
                    markImageComplete(image);
                },
                { once: true }
            );

            image.addEventListener(
                "error",
                function () {
                    /*
                    Do not keep the entire hero blocked if
                    one image path is broken.
                    */
                    markImageComplete(image);
                },
                { once: true }
            );
        });

        /*
        Emergency fallback:
        The page will never remain blocked forever
        because of a slow or failed connection.
        */

        window.setTimeout(function () {
            if (!heroHasOpened) {
                heroImages.forEach(image => {
                    image.classList.add("is-loaded");
                });

                revealHero();
            }
        }, 10000);
    }
);

function initialiseHeroSwiper() {
    const heroSwiper =
        document.querySelector(".heroSwiper");

    if (!heroSwiper) {
        return;
    }

    if (heroSwiper.swiper) {
        heroSwiper.swiper.update();
        return;
    }

    new Swiper(".heroSwiper", {
        direction: "horizontal",
        loop: true,
        speed: 1000,

        autoplay: {
            delay: 7000,
            disableOnInteraction: false
        },

        effect: "fade",

        fadeEffect: {
            crossFade: true
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true
        }
    });
}