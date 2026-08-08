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

export const printingServices = [
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

                    <a
                        href="printing-service.html?id=${service.id}"
                        class="printing-service-btn"
                    >
                        Get Quote
                    </a>
                </div>
            </div>
        </article>
    `;
}

function createPrintingSlide(service) {
    return `
        <div class="swiper-slide printing-swiper-slide">
            ${createPrintingCard(service)}
        </div>
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
        .map(createPrintingSlide)
        .join("");

    bottomContainer.innerHTML = secondGroup
        .map(createPrintingSlide)
        .join("");
}

let printingTopSwiper = null;
let printingBottomSwiper = null;

function createPrintingSwiper(
    selector,
    paginationSelector,
    reverseDirection = false
) {
    const sliderElement = document.querySelector(selector);

    if (!sliderElement || typeof Swiper === "undefined") {
        return null;
    }

    return new Swiper(selector, {
        slidesPerView: 1.15,
        spaceBetween: 14,
        speed: 850,
        loop: true,
        grabCursor: true,
        watchOverflow: true,
        observer: true,
        observeParents: true,

        autoplay: {
            delay: 3200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection
        },

        pagination: {
            el: paginationSelector,
            clickable: true,
            dynamicBullets: true
        },

        breakpoints: {
            430: {
                slidesPerView: 1.35,
                spaceBetween: 16
            },

            560: {
                slidesPerView: 2,
                spaceBetween: 18
            },

            820: {
                slidesPerView: 2.5,
                spaceBetween: 20
            },

            1000: {
                slidesPerView: 3,
                spaceBetween: 21
            },

            1200: {
                slidesPerView: 4,
                spaceBetween: 22
            }
        }
    });
}

function initialisePrintingSwipers() {
    if (printingTopSwiper) {
        printingTopSwiper.destroy(true, true);
    }

    if (printingBottomSwiper) {
        printingBottomSwiper.destroy(true, true);
    }

    printingTopSwiper = createPrintingSwiper(
        "#printingSwiperTop",
        ".printing-pagination-top",
        false
    );

    printingBottomSwiper = createPrintingSwiper(
        "#printingSwiperBottom",
        ".printing-pagination-bottom",
        true
    );
}

function initialisePrintingServices() {
    renderPrintingServices();
    initialisePrintingSwipers();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initialisePrintingServices
    );
} else {
    initialisePrintingServices();
}