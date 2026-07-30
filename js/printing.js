const PRINTING_WHATSAPP_NUMBER = "27817925033";

/*
=========================================================
PRINTING SERVICES DATA

You can change:
- titles
- descriptions
- starting prices
- images
- questions
- options

No configurator HTML needs to be redesigned when the data changes.
=========================================================
*/

const printingServices = [
    {
        id: 1,
        title: "Vehicle Branding",
        description:
            "Professional full or partial vehicle branding for cars, vans, bakkies and company fleets.",
        price: "From R5 999",
        image:
            "assets/images/printing/vehicle-branding.jpg",

        steps: [
            {
                id: "vehicleType",
                title: "Select the vehicle type",
                description:
                    "Choose the vehicle that will be branded.",
                type: "single",
                options: [
                    "Hatchback",
                    "Sedan",
                    "SUV",
                    "Bakkie",
                    "Panel Van",
                    "Truck",
                    "Other Vehicle"
                ]
            },
            {
                id: "brandingCoverage",
                title: "Choose the branding coverage",
                description:
                    "Tell us how much of the vehicle you want branded.",
                type: "single",
                options: [
                    "Door Branding",
                    "Partial Branding",
                    "Half Wrap",
                    "Full Wrap",
                    "Rear Window Branding",
                    "Custom Branding"
                ]
            },
            {
                id: "material",
                title: "Choose the preferred material",
                description:
                    "The final material recommendation will be confirmed after inspection.",
                type: "single",
                options: [
                    "Standard Vehicle Vinyl",
                    "Premium Vehicle Vinyl",
                    "Reflective Vinyl",
                    "Perforated Window Vinyl",
                    "Not Sure — Please Recommend"
                ]
            },
            {
                id: "finish",
                title: "Choose the finish",
                description:
                    "Select the appearance you prefer.",
                type: "single",
                options: [
                    "Gloss",
                    "Matte",
                    "Satin",
                    "Not Sure — Please Recommend"
                ]
            }
        ]
    },

    {
        id: 2,
        title: "Billboard Printing",
        description:
            "Large-format billboard printing for roadside advertising, campaigns and business promotions.",
        price: "From R2 500",
        image:
            "assets/images/printing/billboard-printing.jpg",

        steps: [
            {
                id: "usage",
                title: "Where will the billboard be installed?",
                description:
                    "Choose the environment where it will be displayed.",
                type: "single",
                options: [
                    "Roadside Billboard",
                    "Building Billboard",
                    "Construction Site",
                    "Event Advertising",
                    "Other"
                ]
            },
            {
                id: "size",
                title: "Select the billboard size",
                description:
                    "Choose a common size or request a custom size.",
                type: "single",
                options: [
                    "3 × 6 metres",
                    "4.5 × 18 metres",
                    "6 × 12 metres",
                    "Custom Size",
                    "Not Sure"
                ]
            },
            {
                id: "material",
                title: "Choose the material",
                description:
                    "Outdoor materials offer different durability and airflow.",
                type: "single",
                options: [
                    "Heavy-Duty PVC",
                    "Billboard Vinyl",
                    "Mesh Material",
                    "Fabric",
                    "Please Recommend"
                ]
            },
            {
                id: "finishing",
                title: "Select finishing requirements",
                description:
                    "You may choose more than one option.",
                type: "multiple",
                options: [
                    "Hemmed Edges",
                    "Eyelets",
                    "Pole Pockets",
                    "Reinforced Edges",
                    "Installation Required"
                ]
            }
        ]
    },

    {
        id: 3,
        title: "Pull-Up Banners",
        description:
            "Portable pull-up banners suitable for exhibitions, events, presentations and retail displays.",
        price: "From R1 250",
        image:
            "assets/images/printing/pull-up-banner.jpg",

        steps: [
            {
                id: "usage",
                title: "Where will the banner be used?",
                description:
                    "This helps us recommend the most suitable banner.",
                type: "single",
                options: [
                    "Indoor",
                    "Outdoor",
                    "Exhibition",
                    "Conference",
                    "Retail Display",
                    "Event"
                ]
            },
            {
                id: "bannerType",
                title: "Choose the banner type",
                description:
                    "Select the display system you need.",
                type: "single",
                options: [
                    "Standard Pull-Up Banner",
                    "Premium Pull-Up Banner",
                    "Double-Sided Pull-Up",
                    "Wide Pull-Up Banner",
                    "Mini Desktop Pull-Up"
                ]
            },
            {
                id: "size",
                title: "Select a size",
                description:
                    "Available sizes may depend on the selected banner system.",
                type: "single",
                options: [
                    "600 × 1600 mm",
                    "800 × 2000 mm",
                    "850 × 2000 mm",
                    "1000 × 2000 mm",
                    "1200 × 2000 mm",
                    "Custom Size"
                ]
            },
            {
                id: "quantity",
                title: "Select the required quantity",
                description:
                    "Choose an approximate quantity for your quotation.",
                type: "single",
                options: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "More Than 5"
                ]
            }
        ]
    },

    {
        id: 4,
        title: "PVC Banners",
        description:
            "Durable indoor and outdoor PVC banners available in custom sizes with professional finishing.",
        price: "From R450",
        image:
            "assets/images/printing/pvc-banner.jpg",

        steps: [
            {
                id: "usage",
                title: "Where will the banner be used?",
                description:
                    "Choose the environment where the banner will be displayed.",
                type: "single",
                options: [
                    "Indoor",
                    "Outdoor",
                    "Event",
                    "Retail",
                    "Fence",
                    "Wall"
                ]
            },
            {
                id: "bannerType",
                title: "Choose the banner style",
                description:
                    "Select the type of banner you want.",
                type: "single",
                options: [
                    "Standard PVC Banner",
                    "Wall Banner",
                    "Hanging Banner",
                    "Fence Banner",
                    "Street Pole Banner",
                    "X-Banner",
                    "Custom Banner"
                ]
            },
            {
                id: "size",
                title: "Select the banner size",
                description:
                    "Choose a common size or request custom measurements.",
                type: "single",
                options: [
                    "1 × 1 metre",
                    "2 × 1 metres",
                    "3 × 1 metres",
                    "3 × 2 metres",
                    "4 × 2 metres",
                    "Custom Size"
                ]
            },
            {
                id: "material",
                title: "Choose the material",
                description:
                    "Select your preferred banner material.",
                type: "single",
                options: [
                    "Standard PVC",
                    "Heavy-Duty PVC",
                    "Mesh",
                    "Fabric",
                    "Blockout Material",
                    "Please Recommend"
                ]
            },
            {
                id: "finishing",
                title: "Select finishing options",
                description:
                    "You may select more than one finishing option.",
                type: "multiple",
                options: [
                    "Eyelets",
                    "Hemmed Edges",
                    "Pole Pockets",
                    "Reinforced Corners",
                    "Double-Sided Printing",
                    "Installation Required"
                ]
            },
            {
                id: "quantity",
                title: "Select the quantity",
                description:
                    "Choose the approximate number of banners required.",
                type: "single",
                options: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "More Than 5"
                ]
            }
        ]
    },

    {
        id: 5,
        title: "Branded Gazebos",
        description:
            "Custom-branded gazebos for activations, outdoor events, markets and promotional campaigns.",
        price: "From R4 999",
        image:
            "assets/images/printing/branded-gazebo.jpg",

        steps: [
            {
                id: "usage",
                title: "How will the gazebo be used?",
                description:
                    "Select the main purpose of the gazebo.",
                type: "single",
                options: [
                    "Outdoor Event",
                    "Market",
                    "Brand Activation",
                    "Sports Event",
                    "Exhibition",
                    "Corporate Event"
                ]
            },
            {
                id: "size",
                title: "Choose the gazebo size",
                description:
                    "Select the approximate gazebo dimensions.",
                type: "single",
                options: [
                    "2 × 2 metres",
                    "3 × 3 metres",
                    "3 × 4.5 metres",
                    "3 × 6 metres",
                    "Custom Size"
                ]
            },
            {
                id: "branding",
                title: "Choose the branding coverage",
                description:
                    "Select how much of the gazebo should be branded.",
                type: "single",
                options: [
                    "Canopy Only",
                    "Canopy and Back Wall",
                    "Canopy and Half Walls",
                    "Full Gazebo Branding",
                    "Custom Branding"
                ]
            },
            {
                id: "extras",
                title: "Choose additional gazebo items",
                description:
                    "You may select more than one item.",
                type: "multiple",
                options: [
                    "Back Wall",
                    "Two Half Walls",
                    "Two Full Side Walls",
                    "Carry Bag",
                    "Gazebo Weights",
                    "Premium Frame"
                ]
            },
            {
                id: "quantity",
                title: "Select the quantity",
                description:
                    "Choose the number of gazebos required.",
                type: "single",
                options: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "More Than 5"
                ]
            }
        ]
    },

    {
        id: 6,
        title: "Business Cards",
        description:
            "Professional business cards printed on quality material with optional premium finishing.",
        price: "From R350",
        image:
            "assets/images/printing/business-cards.jpg",

        steps: [
            {
                id: "cardType",
                title: "Choose the business card type",
                description:
                    "Select the style of business card required.",
                type: "single",
                options: [
                    "Standard Business Card",
                    "Premium Business Card",
                    "Folded Business Card",
                    "Square Business Card",
                    "Custom Shape"
                ]
            },
            {
                id: "material",
                title: "Choose the card material",
                description:
                    "Paper availability will be confirmed with your quotation.",
                type: "single",
                options: [
                    "300 gsm Card",
                    "350 gsm Card",
                    "400 gsm Card",
                    "Recycled Card",
                    "Textured Card",
                    "Please Recommend"
                ]
            },
            {
                id: "printingSides",
                title: "Choose the printing sides",
                description:
                    "Select whether printing is required on one or both sides.",
                type: "single",
                options: [
                    "Single-Sided",
                    "Double-Sided"
                ]
            },
            {
                id: "finish",
                title: "Choose the finishing",
                description:
                    "You may select more than one premium finish.",
                type: "multiple",
                options: [
                    "Matte Lamination",
                    "Gloss Lamination",
                    "Soft-Touch Lamination",
                    "Rounded Corners",
                    "Spot UV",
                    "Foil"
                ]
            },
            {
                id: "quantity",
                title: "Select the quantity",
                description:
                    "Choose an approximate print quantity.",
                type: "single",
                options: [
                    "50",
                    "100",
                    "250",
                    "500",
                    "1 000",
                    "More Than 1 000"
                ]
            }
        ]
    },

    {
        id: 7,
        title: "Flyer Printing",
        description:
            "Affordable promotional flyers for events, campaigns, product launches and business marketing.",
        price: "From R250",
        image:
            "assets/images/printing/flyer-printing.jpg",

        steps: [
            {
                id: "flyerType",
                title: "Choose the flyer type",
                description:
                    "Select the format required for your campaign.",
                type: "single",
                options: [
                    "Standard Flyer",
                    "Folded Flyer",
                    "Leaflet",
                    "Menu",
                    "Promotional Handout"
                ]
            },
            {
                id: "size",
                title: "Select the flyer size",
                description:
                    "Choose one of the common flyer sizes.",
                type: "single",
                options: [
                    "A6",
                    "A5",
                    "A4",
                    "DL",
                    "Square",
                    "Custom Size"
                ]
            },
            {
                id: "material",
                title: "Choose the paper",
                description:
                    "Select the approximate material required.",
                type: "single",
                options: [
                    "Standard Paper",
                    "Gloss Paper",
                    "Matte Paper",
                    "Premium Card",
                    "Recycled Paper",
                    "Please Recommend"
                ]
            },
            {
                id: "printingSides",
                title: "Choose the printing sides",
                description:
                    "Select one-sided or double-sided printing.",
                type: "single",
                options: [
                    "Single-Sided",
                    "Double-Sided"
                ]
            },
            {
                id: "quantity",
                title: "Select the quantity",
                description:
                    "Choose an approximate print quantity.",
                type: "single",
                options: [
                    "50",
                    "100",
                    "250",
                    "500",
                    "1 000",
                    "More Than 1 000"
                ]
            }
        ]
    },

    {
        id: 8,
        title: "Poster Printing",
        description:
            "High-quality poster printing available in different sizes for advertising and indoor displays.",
        price: "From R120",
        image:
            "assets/images/printing/poster-printing.jpg",

        steps: [
            {
                id: "usage",
                title: "Where will the poster be displayed?",
                description:
                    "Choose the environment where the poster will be used.",
                type: "single",
                options: [
                    "Indoor",
                    "Outdoor",
                    "Retail Display",
                    "Event",
                    "Office",
                    "Window Display"
                ]
            },
            {
                id: "size",
                title: "Choose the poster size",
                description:
                    "Select a standard size or request custom measurements.",
                type: "single",
                options: [
                    "A4",
                    "A3",
                    "A2",
                    "A1",
                    "A0",
                    "Custom Size"
                ]
            },
            {
                id: "material",
                title: "Choose the poster material",
                description:
                    "Select the material best suited to your display.",
                type: "single",
                options: [
                    "Standard Poster Paper",
                    "Gloss Paper",
                    "Matte Paper",
                    "Photo Paper",
                    "Synthetic Waterproof Material",
                    "Please Recommend"
                ]
            },
            {
                id: "finish",
                title: "Choose additional finishing",
                description:
                    "You may select more than one option.",
                type: "multiple",
                options: [
                    "No Additional Finish",
                    "Gloss Lamination",
                    "Matte Lamination",
                    "Mounted on Board",
                    "Framing Required"
                ]
            },
            {
                id: "quantity",
                title: "Select the quantity",
                description:
                    "Choose the approximate number of posters.",
                type: "single",
                options: [
                    "1",
                    "5",
                    "10",
                    "25",
                    "50",
                    "More Than 50"
                ]
            }
        ]
    },

    {
        id: 9,
        title: "Correx Boards",
        description:
            "Weather-resistant correx boards for property signs, directional signage and promotions.",
        price: "From R180",
        image:
            "assets/images/printing/correx-boards.jpg",

        steps: [
            {
                id: "purpose",
                title: "What will the board be used for?",
                description:
                    "Select the main purpose of the correx board.",
                type: "single",
                options: [
                    "Property Sign",
                    "Directional Sign",
                    "Event Sign",
                    "Safety Sign",
                    "Promotional Sign",
                    "Other"
                ]
            },
            {
                id: "size",
                title: "Choose the board size",
                description:
                    "Select a standard size or request custom dimensions.",
                type: "single",
                options: [
                    "A3",
                    "A2",
                    "A1",
                    "600 × 900 mm",
                    "900 × 1200 mm",
                    "Custom Size"
                ]
            },
            {
                id: "printingSides",
                title: "Choose the printing sides",
                description:
                    "Select whether the board is printed on one or both sides.",
                type: "single",
                options: [
                    "Single-Sided",
                    "Double-Sided"
                ]
            },
            {
                id: "extras",
                title: "Choose additional requirements",
                description:
                    "You may select more than one option.",
                type: "multiple",
                options: [
                    "Metal Stand",
                    "Wooden Stake",
                    "Mounting Holes",
                    "Cable Ties",
                    "Installation Required"
                ]
            },
            {
                id: "quantity",
                title: "Select the quantity",
                description:
                    "Choose the approximate number of boards.",
                type: "single",
                options: [
                    "1",
                    "5",
                    "10",
                    "25",
                    "50",
                    "More Than 50"
                ]
            }
        ]
    },

    {
        id: 10,
        title: "Stickers & Labels",
        description:
            "Custom stickers and product labels available in different shapes, sizes and finishes.",
        price: "From R250",
        image:
            "assets/images/printing/stickers-labels.jpg",

        steps: [
            {
                id: "stickerType",
                title: "Choose the sticker or label type",
                description:
                    "Select the product you need.",
                type: "single",
                options: [
                    "Product Labels",
                    "Window Stickers",
                    "Vehicle Stickers",
                    "Wall Stickers",
                    "Floor Stickers",
                    "Packaging Labels"
                ]
            },
            {
                id: "material",
                title: "Choose the material",
                description:
                    "Select the preferred sticker material.",
                type: "single",
                options: [
                    "Paper",
                    "White Vinyl",
                    "Clear Vinyl",
                    "Waterproof Vinyl",
                    "Reflective Vinyl",
                    "Please Recommend"
                ]
            },
            {
                id: "shape",
                title: "Choose the shape",
                description:
                    "Select the approximate sticker shape.",
                type: "single",
                options: [
                    "Round",
                    "Square",
                    "Rectangle",
                    "Oval",
                    "Custom Shape"
                ]
            },
            {
                id: "size",
                title: "Choose the size",
                description:
                    "Select an approximate size for the quotation.",
                type: "single",
                options: [
                    "Small",
                    "Medium",
                    "Large",
                    "Extra Large",
                    "Custom Size"
                ]
            },
            {
                id: "finish",
                title: "Choose the finishing",
                description:
                    "You may select more than one option.",
                type: "multiple",
                options: [
                    "Gloss",
                    "Matte",
                    "Laminated",
                    "Die-Cut",
                    "Kiss-Cut",
                    "No Additional Finish"
                ]
            },
            {
                id: "quantity",
                title: "Select the quantity",
                description:
                    "Choose the approximate number required.",
                type: "single",
                options: [
                    "25",
                    "50",
                    "100",
                    "250",
                    "500",
                    "More Than 500"
                ]
            }
        ]
    }
];

let activePrintingService = null;
let activePrintingStep = 0;
let printingSelections = {};

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
        <article
            class="printing-card"
            data-printing-card="${service.id}"
        >
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

                <h3>${title}</h3>

                <p class="printing-description">
                    ${description}
                </p>

                <div class="printing-card-footer">
                    <div class="printing-price-area">
                        <div class="printing-price">
                            ${price}
                        </div>
                    </div>

                    <button
                        type="button"
                        class="printing-quote-btn"
                        data-configure-printing="${service.id}"
                        aria-label="Configure ${title}"
                    >
                        <i
                            class="fas fa-sliders-h"
                            aria-hidden="true"
                        ></i>

                        <span>Configure</span>
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

function createPrintingConfigurator() {
    const configurator = document.createElement("section");

    configurator.id = "printingConfigurator";
    configurator.className = "printing-configurator";
    configurator.hidden = true;

    configurator.innerHTML = `
        <div class="printing-configurator-shell">
            <div class="printing-configurator-main">
                <div class="printing-configurator-header">
                    <button
                        type="button"
                        class="printing-configurator-close"
                        aria-label="Close configurator"
                    >
                        <i class="fas fa-arrow-left"></i>
                        <span>Back to services</span>
                    </button>

                    <div class="printing-configurator-service">
                        <span>Printing quotation builder</span>
                        <h3 id="printingConfiguratorTitle"></h3>
                    </div>
                </div>

                <div class="printing-progress">
                    <div class="printing-progress-information">
                        <span id="printingProgressText"></span>
                        <strong id="printingProgressPercentage"></strong>
                    </div>

                    <div class="printing-progress-track">
                        <div
                            class="printing-progress-fill"
                            id="printingProgressFill"
                        ></div>
                    </div>
                </div>

                <div
                    class="printing-step-container"
                    id="printingStepContainer"
                ></div>

                <div class="printing-configurator-navigation">
                    <button
                        type="button"
                        class="printing-navigation-btn printing-back-btn"
                        id="printingBackButton"
                    >
                        <i class="fas fa-arrow-left"></i>
                        <span>Previous</span>
                    </button>

                    <button
                        type="button"
                        class="printing-navigation-btn printing-next-btn"
                        id="printingNextButton"
                    >
                        <span>Continue</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            <aside class="printing-configurator-summary">
                <div class="printing-summary-heading">
                    <span>Your request</span>
                    <h3>Quotation summary</h3>
                </div>

                <div
                    class="printing-summary-service"
                    id="printingSummaryService"
                ></div>

                <div
                    class="printing-summary-selections"
                    id="printingSummarySelections"
                ></div>

                <div class="printing-summary-price">
                    <span>Starting price</span>
                    <strong id="printingSummaryPrice"></strong>

                    <p>
                        The final price will be confirmed after
                        96 Studios reviews your selections.
                    </p>
                </div>
            </aside>
        </div>
    `;

    return configurator;
}

function openPrintingConfigurator(serviceId) {
    const service = printingServices.find(
        item => item.id === serviceId
    );

    if (!service) {
        return;
    }

    activePrintingService = service;
    activePrintingStep = 0;
    printingSelections = {};

    const configurator =
        document.getElementById("printingConfigurator");

    const selectedCard = document.querySelector(
        `[data-printing-card="${service.id}"]`
    );

    if (!configurator || !selectedCard) {
        return;
    }

    document
        .querySelectorAll(".printing-card.is-active")
        .forEach(card => {
            card.classList.remove("is-active");
        });

    selectedCard.classList.add("is-active");

    const selectedGrid = selectedCard.closest(".printing-grid");

    if (selectedGrid) {
        selectedGrid.insertAdjacentElement(
            "afterend",
            configurator
        );
    }

    configurator.hidden = false;

    requestAnimationFrame(() => {
        configurator.classList.add("is-open");
    });

    renderPrintingConfigurator();

    setTimeout(() => {
        configurator.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 100);
}

function closePrintingConfigurator() {
    const configurator =
        document.getElementById("printingConfigurator");

    if (!configurator) {
        return;
    }

    configurator.classList.remove("is-open");

    document
        .querySelectorAll(".printing-card.is-active")
        .forEach(card => {
            card.classList.remove("is-active");
        });

    setTimeout(() => {
        configurator.hidden = true;
    }, 280);

    activePrintingService = null;
    activePrintingStep = 0;
    printingSelections = {};
}

function getCurrentPrintingStep() {
    if (!activePrintingService) {
        return null;
    }

    return activePrintingService.steps[activePrintingStep];
}

function createOptionButton(step, option) {
    const escapedOption = escapePrintingValue(option);
    const currentSelection = printingSelections[step.id];

    const isSelected =
        step.type === "multiple"
            ? Array.isArray(currentSelection) &&
              currentSelection.includes(option)
            : currentSelection === option;

    return `
        <button
            type="button"
            class="printing-option-card ${
                isSelected ? "is-selected" : ""
            }"
            data-printing-option="${escapedOption}"
            aria-pressed="${isSelected}"
        >
            <span class="printing-option-check">
                <i class="fas fa-check"></i>
            </span>

            <span class="printing-option-name">
                ${escapedOption}
            </span>
        </button>
    `;
}

function renderPrintingConfigurator() {
    if (!activePrintingService) {
        return;
    }

    const step = getCurrentPrintingStep();

    const title =
        document.getElementById("printingConfiguratorTitle");

    const progressText =
        document.getElementById("printingProgressText");

    const progressPercentage =
        document.getElementById(
            "printingProgressPercentage"
        );

    const progressFill =
        document.getElementById("printingProgressFill");

    const stepContainer =
        document.getElementById("printingStepContainer");

    const backButton =
        document.getElementById("printingBackButton");

    const nextButton =
        document.getElementById("printingNextButton");

    if (
        !title ||
        !progressText ||
        !progressPercentage ||
        !progressFill ||
        !stepContainer ||
        !backButton ||
        !nextButton
    ) {
        return;
    }

    title.textContent = activePrintingService.title;

    const isReview =
        activePrintingStep ===
        activePrintingService.steps.length;

    const totalScreens =
        activePrintingService.steps.length + 1;

    const currentScreen = activePrintingStep + 1;

    const percentage = Math.round(
        (currentScreen / totalScreens) * 100
    );

    progressText.textContent = isReview
        ? "Review your request"
        : `Step ${currentScreen} of ${totalScreens}`;

    progressPercentage.textContent = `${percentage}%`;
    progressFill.style.width = `${percentage}%`;

    if (isReview) {
        renderPrintingReview(stepContainer);

        nextButton.innerHTML = `
            <i class="fab fa-whatsapp"></i>
            <span>Request Quotation</span>
        `;

        nextButton.classList.add("is-whatsapp");
        nextButton.disabled = false;
    } else {
        stepContainer.innerHTML = `
            <div class="printing-step-heading">
                <span>
                    Step ${activePrintingStep + 1}
                </span>

                <h2>
                    ${escapePrintingValue(step.title)}
                </h2>

                <p>
                    ${escapePrintingValue(
                        step.description
                    )}
                </p>
            </div>

            <div class="printing-options-grid">
                ${step.options
                    .map(option =>
                        createOptionButton(step, option)
                    )
                    .join("")}
            </div>

            ${
                step.type === "multiple"
                    ? `
                        <p class="printing-multiple-note">
                            <i class="fas fa-info-circle"></i>
                            You may select more than one option.
                        </p>
                    `
                    : ""
            }
        `;

        nextButton.innerHTML = `
            <span>Continue</span>
            <i class="fas fa-arrow-right"></i>
        `;

        nextButton.classList.remove("is-whatsapp");
        nextButton.disabled =
            !hasPrintingStepSelection(step);
    }

    backButton.disabled = activePrintingStep === 0;

    renderPrintingSummary();
}

function hasPrintingStepSelection(step) {
    if (!step) {
        return false;
    }

    const selected = printingSelections[step.id];

    if (step.type === "multiple") {
        return (
            Array.isArray(selected) &&
            selected.length > 0
        );
    }

    return Boolean(selected);
}

function handlePrintingOptionSelection(button) {
    const step = getCurrentPrintingStep();

    if (!step) {
        return;
    }

    const option = button.dataset.printingOption;

    if (!option) {
        return;
    }

    if (step.type === "multiple") {
        const currentValues = Array.isArray(
            printingSelections[step.id]
        )
            ? [...printingSelections[step.id]]
            : [];

        const existingIndex =
            currentValues.indexOf(option);

        if (existingIndex >= 0) {
            currentValues.splice(existingIndex, 1);
        } else {
            currentValues.push(option);
        }

        printingSelections[step.id] = currentValues;
    } else {
        printingSelections[step.id] = option;
    }

    renderPrintingConfigurator();
}

function renderPrintingSummary() {
    if (!activePrintingService) {
        return;
    }

    const summaryService =
        document.getElementById(
            "printingSummaryService"
        );

    const summarySelections =
        document.getElementById(
            "printingSummarySelections"
        );

    const summaryPrice =
        document.getElementById(
            "printingSummaryPrice"
        );

    if (
        !summaryService ||
        !summarySelections ||
        !summaryPrice
    ) {
        return;
    }

    summaryService.innerHTML = `
        <img
            src="${escapePrintingValue(
                activePrintingService.image
            )}"
            alt="${escapePrintingValue(
                activePrintingService.title
            )}"
        >

        <div>
            <span>Selected service</span>

            <strong>
                ${escapePrintingValue(
                    activePrintingService.title
                )}
            </strong>
        </div>
    `;

    const selectedRows =
        activePrintingService.steps
            .map(step => {
                const selected =
                    printingSelections[step.id];

                if (
                    !selected ||
                    (Array.isArray(selected) &&
                        selected.length === 0)
                ) {
                    return "";
                }

                const value = Array.isArray(selected)
                    ? selected.join(", ")
                    : selected;

                return `
                    <div class="printing-summary-row">
                        <span>
                            ${escapePrintingValue(
                                step.title
                            )}
                        </span>

                        <strong>
                            ${escapePrintingValue(
                                value
                            )}
                        </strong>
                    </div>
                `;
            })
            .join("");

    summarySelections.innerHTML =
        selectedRows ||
        `
            <div class="printing-summary-empty">
                Your selections will appear here.
            </div>
        `;

    summaryPrice.textContent =
        activePrintingService.price;
}

function renderPrintingReview(container) {
    if (!activePrintingService) {
        return;
    }

    const reviewRows =
        activePrintingService.steps
            .map(step => {
                const selected =
                    printingSelections[step.id];

                const value = Array.isArray(selected)
                    ? selected.join(", ")
                    : selected;

                return `
                    <div class="printing-review-row">
                        <span>
                            ${escapePrintingValue(
                                step.title
                            )}
                        </span>

                        <strong>
                            ${escapePrintingValue(
                                value || "Not selected"
                            )}
                        </strong>
                    </div>
                `;
            })
            .join("");

    container.innerHTML = `
        <div class="printing-review">
            <div class="printing-review-icon">
                <i class="fas fa-clipboard-check"></i>
            </div>

            <div class="printing-step-heading">
                <span>Final step</span>

                <h2>Review your quotation request</h2>

                <p>
                    Check your selections before sending
                    the request to 96 Studios.
                </p>
            </div>

            <div class="printing-review-service">
                <div>
                    <span>Printing service</span>

                    <strong>
                        ${escapePrintingValue(
                            activePrintingService.title
                        )}
                    </strong>
                </div>

                <div>
                    <span>Starting price</span>

                    <strong>
                        ${escapePrintingValue(
                            activePrintingService.price
                        )}
                    </strong>
                </div>
            </div>

            <div class="printing-review-rows">
                ${reviewRows}
            </div>

            <div class="printing-review-notice">
                <i class="fas fa-info-circle"></i>

                <p>
                    This is a quotation request and not a
                    final order. Final pricing, availability
                    and production time will be confirmed
                    after review.
                </p>
            </div>
        </div>
    `;
}

function goToNextPrintingStep() {
    if (!activePrintingService) {
        return;
    }

    const isReview =
        activePrintingStep ===
        activePrintingService.steps.length;

    if (isReview) {
        sendPrintingQuotation();
        return;
    }

    const step = getCurrentPrintingStep();

    if (!hasPrintingStepSelection(step)) {
        return;
    }

    activePrintingStep += 1;
    renderPrintingConfigurator();
}

function goToPreviousPrintingStep() {
    if (activePrintingStep <= 0) {
        return;
    }

    activePrintingStep -= 1;
    renderPrintingConfigurator();
}

function sendPrintingQuotation() {
    if (!activePrintingService) {
        return;
    }

    const selectionLines =
        activePrintingService.steps.flatMap(step => {
            const selected = printingSelections[step.id];

            if (
                !selected ||
                (Array.isArray(selected) &&
                    selected.length === 0)
            ) {
                return [];
            }

            const value = Array.isArray(selected)
                ? selected.join(", ")
                : selected;

            return [
                `${step.title}:`,
                value,
                ""
            ];
        });

    const message = [
        "Hello 96 Studios,",
        "",
        "I would like to request a printing quotation.",
        "",
        "PRINTING SERVICE",
        activePrintingService.title,
        "",
        "SELECTED OPTIONS",
        "",
        ...selectionLines,
        `Starting Price: ${activePrintingService.price}`,
        "",
        "I understand that the final price and production time will be confirmed after reviewing my request.",
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

function handlePrintingSectionClick(event) {
    const configureButton = event.target.closest(
        "[data-configure-printing]"
    );

    if (configureButton) {
        const serviceId = Number(
            configureButton.dataset.configurePrinting
        );

        openPrintingConfigurator(serviceId);
        return;
    }

    const closeButton = event.target.closest(
        ".printing-configurator-close"
    );

    if (closeButton) {
        closePrintingConfigurator();
        return;
    }

    const optionButton = event.target.closest(
        ".printing-option-card"
    );

    if (optionButton) {
        handlePrintingOptionSelection(optionButton);
        return;
    }

    const backButton = event.target.closest(
        "#printingBackButton"
    );

    if (backButton) {
        goToPreviousPrintingStep();
        return;
    }

    const nextButton = event.target.closest(
        "#printingNextButton"
    );

    if (nextButton) {
        goToNextPrintingStep();
    }
}

function initialisePrintingServices() {
    renderPrintingServices();

    const printingSection = document.getElementById(
        "printingServices"
    );

    if (!printingSection) {
        return;
    }

    const configurator = createPrintingConfigurator();

    printingSection.appendChild(configurator);

    printingSection.addEventListener(
        "click",
        handlePrintingSectionClick
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