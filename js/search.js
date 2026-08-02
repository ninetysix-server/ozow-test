// js/search.js

let searchTimeout = null;


/* =========================================================
   CLOSE MOBILE SEARCH
========================================================= */

function closeMobileSearch() {
    const mobileModal =
        document.getElementById(
            'mobileSearchModal'
        );

    if (mobileModal) {
        mobileModal.classList.remove(
            'active'
        );

        mobileModal.setAttribute(
            'aria-hidden',
            'true'
        );
    }

    document.body.style.overflow = '';
}


/* =========================================================
   RUN DATABASE SEARCH
========================================================= */

async function searchForServices(
    input,
    shouldScroll = false
) {
    if (!input) {
        return;
    }

    const searchTerm =
        input.value.trim();

    if (!searchTerm) {
        input.focus();
        return;
    }

    if (
        typeof window.searchDatabaseServices !==
        'function'
    ) {
        console.error(
            'Service search is not ready.'
        );

        return;
    }

    await window.searchDatabaseServices(
        searchTerm,
        shouldScroll
    );
}


/* =========================================================
   SEARCH WHILE TYPING
========================================================= */

function runDelayedSearch(input) {
    if (!input) {
        return;
    }

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(
        async () => {
            const searchTerm =
                input.value.trim();

            if (!searchTerm) {
                if (
                    typeof window.clearServiceSearch ===
                    'function'
                ) {
                    window.clearServiceSearch();
                }

                return;
            }

            await searchForServices(
                input,
                false
            );
        },
        1200
    );
}


/* =========================================================
   CONNECT SEARCH INPUT
========================================================= */

function connectSearchInput(
    input,
    isMobile = false
) {
    if (!input) {
        return;
    }

    input.addEventListener(
        'input',
        () => {
            runDelayedSearch(input);
        }
    );

    input.addEventListener(
        'keydown',
        async event => {
            if (event.key !== 'Enter') {
                return;
            }

            event.preventDefault();

            clearTimeout(searchTimeout);

            if (isMobile) {
                closeMobileSearch();
            }

            await searchForServices(
                input,
                true
            );
        }
    );
}


/* =========================================================
   PAGE EVENTS
========================================================= */

document.addEventListener(
    'DOMContentLoaded',
    function() {
        const desktopInput =
            document.getElementById(
                'mainSearchInput'
            );

        const desktopButton =
            document.getElementById(
                'mainSearchButton'
            );

        const mobileInput =
            document.getElementById(
                'mobileSearchInput'
            );

        const mobileButton =
            document.getElementById(
                'mobileSearchBtn'
            );

        const mobileSubmitButton =
            document.getElementById(
                'mobileSearchSubmit'
            );

        const mobileModal =
            document.getElementById(
                'mobileSearchModal'
            );

        const closeButton =
            document.getElementById(
                'closeMobileSearch'
            );


        /* Connect desktop and mobile inputs */

        connectSearchInput(
            desktopInput,
            false
        );

        connectSearchInput(
            mobileInput,
            true
        );


        /* Desktop search button */

        desktopButton?.addEventListener(
            'click',
            async () => {
                clearTimeout(
                    searchTimeout
                );

                await searchForServices(
                    desktopInput,
                    true
                );
            }
        );


        /* Open mobile search */

        mobileButton?.addEventListener(
            'click',
            () => {
                if (!mobileModal) {
                    console.error(
                        'Mobile search popup is missing.'
                    );

                    return;
                }

                mobileModal.classList.add(
                    'active'
                );

                mobileModal.setAttribute(
                    'aria-hidden',
                    'false'
                );

                document.body.style.overflow =
                    'hidden';

                setTimeout(
                    () => {
                        mobileInput?.focus();
                    },
                    250
                );
            }
        );


        /* Mobile Search button */

        mobileSubmitButton?.addEventListener(
            'click',
            async () => {
                clearTimeout(
                    searchTimeout
                );

                closeMobileSearch();

                await searchForServices(
                    mobileInput,
                    true
                );
            }
        );


        /* Close button */

        closeButton?.addEventListener(
            'click',
            closeMobileSearch
        );


        /* Close when dark background is clicked */

        mobileModal?.addEventListener(
            'click',
            event => {
                if (
                    event.target ===
                    mobileModal
                ) {
                    closeMobileSearch();
                }
            }
        );


        /* Popular search buttons */

        document
            .querySelectorAll(
                '[data-mobile-search]'
            )
            .forEach(button => {
                button.addEventListener(
                    'click',
                    async () => {
                        const searchTerm =
                            button.dataset
                                .mobileSearch ||
                            '';

                        if (!mobileInput) {
                            return;
                        }

                        mobileInput.value =
                            searchTerm;

                        clearTimeout(
                            searchTimeout
                        );

                        closeMobileSearch();

                        await searchForServices(
                            mobileInput,
                            true
                        );
                    }
                );
            });
    }
);