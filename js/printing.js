const PRINTING_WHATSAPP_NUMBER = "27817925033";

const printingServices = [
    {
        id: 1,
        title: "Vehicle Branding",
        description:
            "Professional full or partial vehicle branding for cars, vans, bakkies and company fleets.",
        price: "From R5 999",
        image:
            "assets/images/printing/vehicle-branding.jpg"
    },
    {
        id: 2,
        title: "Billboard Printing",
        description:
            "Large-format billboard printing for roadside advertising, campaigns and business promotions.",
        price: "From R2 500",
        image:
            "assets/images/printing/billboard-printing.jpg"
    },
    {
        id: 3,
        title: "Pull-Up Banners",
        description:
            "Portable pull-up banners suitable for exhibitions, events, presentations and retail displays.",
        price: "From R1 250",
        image:
            "assets/images/printing/pull-up-banner.jpg"
    },
    {
        id: 4,
        title: "PVC Banners",
        description:
            "Durable indoor and outdoor PVC banners available in custom sizes with professional finishing.",
        price: "From R450",
        image:
            "assets/images/printing/pvc-banner.jpg"
    },
    {
        id: 5,
        title: "Branded Gazebos",
        description:
            "Custom-branded gazebos for activations, outdoor events, markets and promotional campaigns.",
        price: "From R4 999",
        image:
            "assets/images/printing/branded-gazebo.jpg"
    },
    {
        id: 6,
        title: "Business Cards",
        description:
            "Professional business cards printed on quality material with optional premium finishing.",
        price: "From R350",
        image:
            "assets/images/printing/business-cards.jpg"
    },
    {
        id: 7,
        title: "Flyer Printing",
        description:
            "Affordable promotional flyers for events, campaigns, product launches and business marketing.",
        price: "From R250",
        image:
            "assets/images/printing/flyer-printing.jpg"
    },
    {
        id: 8,
        title: "Poster Printing",
        description:
            "High-quality poster printing available in different sizes for advertising and indoor displays.",
        price: "From R120",
        image:
            "assets/images/printing/poster-printing.jpg"
    },
    {
        id: 9,
        title: "Correx Boards",
        description:
            "Weather-resistant correx boards for property signs, directional signage and promotions.",
        price: "From R180",
        image:
            "assets/images/printing/correx-boards.jpg"
    },
    {
        id: 10,
        title: "Stickers & Labels",
        description:
            "Custom stickers and product labels available in different shapes, sizes and finishes.",
        price: "From R250",
        image:
            "assets/images/printing/stickers-labels.jpg"
    }
];

function escapePrintingValue(value) {
    return String(value ?? "").replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[character]
    );
}

function createPrintingCard(service) {
    const title = escapePrintingValue(service.title);
    const description = escapePrintingValue(
        service.description
    );
    const price = escapePrintingValue(service.price);
    const image = escapePrintingValue(service.image);

    return `
        <article class="printing-card">
            <img
                src="${image}"
                alt="${title}"
                class="printing-card-background"
                loading="lazy"
                onerror="
                    this.onerror = null;
                    this.src = 'assets/images/slide-03.png';
                "
            >

            <div class="printing-card-overlay"></div>

            <div class="printing-card-top">
                <span class="printing-new-tag">
                    New
                </span>
            </div>

            <div class="printing-card-content">
                <div class="printing-card-category">
                    Printing Service
                </div>

                <h3>${title}</h3>

                <p class="printing-description">
                    ${description}
                </p>

                <div class="printing-card-footer">
                    <div class="printing-price-area">
                        <span class="printing-price-label">
                            Starting price
                        </span>

                        <div class="printing-price">
                            ${price}
                        </div>
                    </div>

                    <button
                        type="button"
                        class="printing-quote-btn"
                        data-printing-id="${service.id}"
                        aria-label="Get a quote for ${title}"
                    >
                        <i
                            class="fab fa-whatsapp"
                            aria-hidden="true"
                        ></i>

                        <span>Get Quote</span>
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderPrintingServices() {
    const topContainer = document.getElementById(
        "printingServicesTop"
    );

    const bottomContainer = document.getElementById(
        "printingServicesBottom"
    );

    if (!topContainer || !bottomContainer) {
        return;
    }

    const firstGroup = printingServices.slice(0, 5);
    const secondGroup = printingServices.slice(5, 10);

    topContainer.innerHTML = firstGroup
        .map(createPrintingCard)
        .join("");

    bottomContainer.innerHTML = secondGroup
        .map(createPrintingCard)
        .join("");
}

function openPrintingQuote(service) {
    const message = [
        "Hello 96 Studios.",
        "",
        "I would like to request a printing quotation.",
        "",
        `Printing Service: ${service.title}`,
        `Starting Price: ${service.price}`,
        "",
        "Please provide more information about the available sizes, quantities and final quotation.",
        "",
        "Thank you."
    ].join("\n");

    const whatsappUrl =
        `https://wa.me/${PRINTING_WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(message)}`;

    window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
    );
}

function handlePrintingQuoteClick(event) {
    const button = event.target.closest(
        ".printing-quote-btn"
    );

    if (!button) {
        return;
    }

    const serviceId = Number(
        button.dataset.printingId
    );

    const selectedService = printingServices.find(
        service => service.id === serviceId
    );

    if (!selectedService) {
        return;
    }

    openPrintingQuote(selectedService);
}

function initialisePrintingServices() {
    renderPrintingServices();

    const printingSection = document.getElementById(
        "printingServices"
    );

    if (!printingSection) {
        return;
    }

    printingSection.addEventListener(
        "click",
        handlePrintingQuoteClick
    );
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initialisePrintingServices
    );
} else {
    initialisePrintingServices();
}