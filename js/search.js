// js/search.js

let searchTimeout = null;

function closeMobileSearch() {
    const mobileModal =
        document.getElementById(
            'mobileSearchModal'
        );

    if (mobileModal) {
        mobileModal.classList.remove('active');
    }

    document.body.style.overflow = 'auto';
}

function runSearch(input) {
    if (!input) {
        return;
    }

    clearTimeout(searchTimeout);

    const term = input.value.trim();

    /*
     * Give the user enough time to finish typing.
     * Search starts only after 1.2 seconds without typing.
     */
    searchTimeout = setTimeout(async () => {
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
            term,
            false
        );
    }, 1200);
}

function connectSearchInput(input) {
    if (!input) {
        return;
    }

    input.addEventListener('input', () => {
        runSearch(input);
    });

    input.addEventListener('keydown', async event => {
    if (event.key !== 'Enter') {
        return;
    }

    event.preventDefault();
    clearTimeout(searchTimeout);

    if (
        typeof window.searchDatabaseServices ===
        'function'
    ) {
        await window.searchDatabaseServices(
            input.value.trim(),
            true
        );
    }
});
}

document.addEventListener(
    'DOMContentLoaded',
    function() {
        const desktopInput =
            document.getElementById(
                'mainSearchInput'
            );

        const mobileInput =
            document.getElementById(
                'mobileSearchInput'
            );

        const mobileButton =
            document.getElementById(
                'mobileSearchBtn'
            );

        const mobileModal =
            document.getElementById(
                'mobileSearchModal'
            );

        const closeButton =
            document.getElementById(
                'closeMobileSearch'
            );

        connectSearchInput(desktopInput);
        connectSearchInput(mobileInput);

        mobileButton?.addEventListener(
            'click',
            () => {
                mobileModal?.classList.add(
                    'active'
                );

                document.body.style.overflow =
                    'hidden';

                setTimeout(() => {
                    mobileInput?.focus();
                }, 250);
            }
        );

        closeButton?.addEventListener(
            'click',
            closeMobileSearch
        );

        mobileModal?.addEventListener(
            'click',
            event => {
                if (event.target === mobileModal) {
                    closeMobileSearch();
                }
            }
        );

        mobileInput?.addEventListener(
            'keydown',
            event => {
                if (event.key === 'Enter') {
                    closeMobileSearch();
                }
            }
        );
    }
);