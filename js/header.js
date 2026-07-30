document.addEventListener("DOMContentLoaded", function () {
    const servicesNavItem = document.querySelector(
        ".services-nav-item"
    );

    const servicesTrigger = document.querySelector(
        ".services-menu-trigger"
    );

    const servicesMenu = document.getElementById(
        "servicesMegaMenu"
    );

    if (
        !servicesNavItem ||
        !servicesTrigger ||
        !servicesMenu
    ) {
        return;
    }

    function setServicesMenuState(isOpen) {
        servicesNavItem.classList.toggle(
            "is-open",
            isOpen
        );

        servicesTrigger.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        servicesMenu.setAttribute(
            "aria-hidden",
            String(!isOpen)
        );
    }

    servicesTrigger.addEventListener(
        "click",
        function (event) {
            event.preventDefault();
            event.stopPropagation();

            const isCurrentlyOpen =
                servicesNavItem.classList.contains(
                    "is-open"
                );

            setServicesMenuState(!isCurrentlyOpen);
        }
    );

    servicesMenu.addEventListener(
        "click",
        function (event) {
            const link = event.target.closest("a");

            if (link) {
                setServicesMenuState(false);
            }
        }
    );

    document.addEventListener(
        "click",
        function (event) {
            if (
                !servicesNavItem.contains(event.target)
            ) {
                setServicesMenuState(false);
            }
        }
    );

    document.addEventListener(
        "keydown",
        function (event) {
            if (event.key === "Escape") {
                setServicesMenuState(false);
                servicesTrigger.focus();
            }
        }
    );
});