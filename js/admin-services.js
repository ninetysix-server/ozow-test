import {
    supabase,
    getServices
} from "./supabase.js";

const money = value => {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR"
    }).format(Number(value));
};

const safe = value =>
    String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);

    const valueOrNull = id => {
    const value = document.getElementById(id).value.trim();

    return value === ""
        ? null
        : Number(value);
};

const createSlug = value =>
    String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

        let loadedServices = [];

export function initialiseServiceManager() {
    const addButton = document.getElementById("addServiceBtn");
    const closeButton = document.getElementById("closeServiceModal");
    const modal = document.getElementById("serviceModal");
    const form = document.getElementById("serviceForm");
    const titleInput = document.getElementById("serviceTitle");
    const slugInput = document.getElementById("serviceSlug");

    if (!addButton || !modal || !form) {
        return;
    }

    addButton.addEventListener("click", openAddServiceModal);

    closeButton.addEventListener("click", closeServiceModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeServiceModal();
        }
    });

    titleInput.addEventListener("input", () => {
        const serviceId = document.getElementById("serviceId").value;

        if (!serviceId) {
            slugInput.value = createSlug(titleInput.value);
        }
    });

    form.addEventListener("submit", saveService);
}

export async function loadServices() {
    const container = document.getElementById("servicesTable");

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="loading">
            Loading services...
        </div>
    `;

    const services = await getServices();
    loadedServices = services;

    if (!services.length) {
        container.innerHTML = `
            <div class="empty">
                No services created yet.
            </div>
        `;

        return;
    }

    container.innerHTML = services.map(service => `
        <article class="service-card" data-service-id="${safe(service.id)}">

            <div class="service-card-header">
                <div>
                    <h3>${safe(service.title)}</h3>
                    <p>${safe(service.category || "Uncategorised")}</p>
                </div>

                <span class="badge ${
                    service.active
                        ? "badge-paid"
                        : "badge-cancelled"
                }">
                    ${service.active ? "Active" : "Inactive"}
                </span>
            </div>

            <div class="service-prices">
                <div>
                    <small>Starter</small>
                    <strong>${money(service.starter_price)}</strong>
                </div>

                <div>
                    <small>Premium</small>
                    <strong>${money(service.premium_price)}</strong>
                </div>

                <div>
                    <small>Pro</small>
                    <strong>${money(service.pro_price)}</strong>
                </div>
            </div>

            <div class="service-printing">
                <small>Printing</small>

                <strong>
                    ${
                        service.printing_enabled
                            ? `Available · ${money(service.printing_price)}`
                            : "Not available"
                    }
                </strong>
            </div>

            <div class="actions">
                <button
                    type="button"
                    class="icon-btn"
                    data-edit-service="${safe(service.id)}"
                    title="Edit service"
                >
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    type="button"
                    class="icon-btn"
                    data-toggle-service="${safe(service.id)}"
                    data-current-active="${service.active}"
                    title="${
                        service.active
                            ? "Deactivate service"
                            : "Activate service"
                    }"
                >
                    <i class="fa-solid ${
                        service.active
                            ? "fa-eye-slash"
                            : "fa-eye"
                    }"></i>
                </button>

                <button
                    type="button"
                    class="icon-btn"
                    data-delete-service="${safe(service.id)}"
                    title="Delete service"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>

        </article>
    `).join("");

    bindServiceActions();
}

function bindServiceActions() {
    document
        .querySelectorAll("[data-toggle-service]")
        .forEach(button => {
            button.addEventListener("click", async () => {
                const serviceId = button.dataset.toggleService;
                const currentActive =
                    button.dataset.currentActive === "true";

                await toggleService(serviceId, !currentActive);
            });
        });

    document
        .querySelectorAll("[data-delete-service]")
        .forEach(button => {
            button.addEventListener("click", async () => {
                await deleteService(button.dataset.deleteService);
            });
        });

    document
    .querySelectorAll("[data-edit-service]")
    .forEach(button => {
        button.addEventListener("click", () => {
            openEditServiceModal(button.dataset.editService);
        });
    });
}

async function toggleService(serviceId, active) {
    const { error } = await supabase
        .from("services")
        .update({
            active,
            updated_at: new Date().toISOString()
        })
        .eq("id", serviceId);

    if (error) {
        alert(error.message);
        return;
    }

    await loadServices();
}

async function deleteService(serviceId) {
    const confirmed = confirm(
        "Are you sure you want to permanently delete this service?"
    );

    if (!confirmed) {
        return;
    }

    const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", serviceId);

    if (error) {
        alert(error.message);
        return;
    }

    await loadServices();
}

function openAddServiceModal() {
    const form = document.getElementById("serviceForm");

    form.reset();

    document.getElementById("serviceId").value = "";
    document.getElementById("serviceDisplayOrder").value = "0";
    document.getElementById("printingEnabled").value = "false";
    document.getElementById("printingPrice").value = "0";
    document.getElementById("serviceActive").value = "true";

    document.getElementById("serviceModalTitle").textContent =
        "Add Service";

    document.getElementById("saveServiceBtn").innerHTML = `
        <i class="fa-solid fa-floppy-disk"></i>
        Save Service
    `;

    document.getElementById("serviceModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function openEditServiceModal(serviceId) {
    const service = loadedServices.find(item => item.id === serviceId);

    if (!service) {
        alert("Service could not be found.");
        return;
    }

    document.getElementById("serviceId").value = service.id;
    document.getElementById("serviceTitle").value =
        service.title || "";

    document.getElementById("serviceSlug").value =
        service.slug || "";

    document.getElementById("serviceCategory").value =
        service.category || "";

    document.getElementById("serviceDisplayOrder").value =
        service.display_order ?? 0;

    document.getElementById("serviceDescription").value =
        service.description || "";

    document.getElementById("starterPrice").value =
        service.starter_price ?? "";

    document.getElementById("premiumPrice").value =
        service.premium_price ?? "";

    document.getElementById("proPrice").value =
        service.pro_price ?? "";

    document.getElementById("starterOriginalPrice").value =
        service.starter_original_price ?? "";

    document.getElementById("premiumOriginalPrice").value =
        service.premium_original_price ?? "";

    document.getElementById("proOriginalPrice").value =
        service.pro_original_price ?? "";

    document.getElementById("printingEnabled").value =
        String(service.printing_enabled === true);

    document.getElementById("printingPrice").value =
        service.printing_price ?? 0;

    document.getElementById("serviceActive").value =
        String(service.active !== false);

    document.getElementById("serviceModalTitle").textContent =
        "Edit Service";

    document.getElementById("saveServiceBtn").innerHTML = `
        <i class="fa-solid fa-floppy-disk"></i>
        Update Service
    `;

    document.getElementById("serviceModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeServiceModal() {
    document.getElementById("serviceModal").style.display = "none";
    document.body.style.overflow = "";
}

async function saveService(event) {
    event.preventDefault();

    const button = document.getElementById("saveServiceBtn");
    const serviceId = document.getElementById("serviceId").value;

    const title =
        document.getElementById("serviceTitle").value.trim();

    const slug =
        createSlug(
            document.getElementById("serviceSlug").value
        );

    if (!title || !slug) {
        alert("Service title and slug are required.");
        return;
    }

    const printingEnabled =
        document.getElementById("printingEnabled").value === "true";

    const serviceData = {
        title,
        slug,

        category:
            document.getElementById("serviceCategory").value.trim()
            || null,

        description:
            document.getElementById("serviceDescription").value.trim()
            || null,

        display_order:
            Number(
                document.getElementById("serviceDisplayOrder").value
                || 0
            ),

        starter_price: valueOrNull("starterPrice"),
        premium_price: valueOrNull("premiumPrice"),
        pro_price: valueOrNull("proPrice"),

        starter_original_price:
            valueOrNull("starterOriginalPrice"),

        premium_original_price:
            valueOrNull("premiumOriginalPrice"),

        pro_original_price:
            valueOrNull("proOriginalPrice"),

        printing_enabled: printingEnabled,

        printing_price:
            printingEnabled
                ? Number(
                    document.getElementById("printingPrice").value
                    || 0
                )
                : 0,

        active:
            document.getElementById("serviceActive").value === "true",

        updated_at: new Date().toISOString()
    };

    button.disabled = true;
    button.textContent = serviceId
        ? "Updating..."
        : "Saving...";

    let error;

    if (serviceId) {
        const result = await supabase
            .from("services")
            .update(serviceData)
            .eq("id", serviceId);

        error = result.error;
    } else {
        const result = await supabase
            .from("services")
            .insert(serviceData);

        error = result.error;
    }

    button.disabled = false;

    button.innerHTML = `
        <i class="fa-solid fa-floppy-disk"></i>
        ${serviceId ? "Update Service" : "Save Service"}
    `;

    if (error) {
        alert(error.message);
        return;
    }

    closeServiceModal();
    await loadServices();
}