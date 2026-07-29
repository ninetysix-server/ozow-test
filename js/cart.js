// ./js/cart.js - Fully Fixed Version

import { getCurrentUser, getOrCreateClientId, saveOrder } from './supabase.js';

class CartManager {
    constructor() {
        this.cartKey = 'designStudioCart';
        this.guestKey = 'designStudioGuestCart';
        this.cart = [];
        this.loadCart();
    }

    async loadCart() {
        const user = await this.getCurrentUser();
        let json;
        if (user) {
            json = localStorage.getItem(`${this.cartKey}_${user.id}`);
            if (!json) {
                const guest = localStorage.getItem(this.guestKey);
                if (guest) {
                    localStorage.setItem(`${this.cartKey}_${user.id}`, guest);
                    localStorage.removeItem(this.guestKey);
                    json = guest;
                }
            }
        } else {
            json = localStorage.getItem(this.guestKey);
        }
        this.cart = json ? JSON.parse(json) : [];
        this.updateUI();
        this.updateBadge();
    }

    async saveCart() {
        const user = await this.getCurrentUser();
        const key = user ? `${this.cartKey}_${user.id}` : this.guestKey;
        localStorage.setItem(key, JSON.stringify(this.cart));
        this.updateBadge();
        this.updateUI();
    }

    async getCurrentUser() {
        try {
            const user = await getCurrentUser();
            if (user) {
                const clientId = await getOrCreateClientId(user.id);
                return { id: user.id, email: user.email, clientId };
            }
            return null;
        } catch {
            return null;
        }
    }

    createConfigurationKey(serviceId, tierName, details = {}) {
    const configuration = {
        serviceId,
        tierName,

        pages: Number(details.pages || 0),

        printingSelected:
            details.printingSelected === true,

        printingPrice: Number(
            details.printingPrice || 0
        ),

        addonId:
            details.addonId || null,

        parentServiceId:
            details.parentServiceId || null
    };

    return JSON.stringify(configuration);
}

    addItem(
    serviceId,
    tierName,
    title,
    price,
    qty = 1,
    details = {}
) {
    const priceNum = this.parsePrice(price);

    const configurationKey =
        this.createConfigurationKey(
            serviceId,
            tierName,
            details
        );

    const existing = this.cart.find(item => {
        const existingKey =
            item.configurationKey ||
            this.createConfigurationKey(
                item.serviceId,
                item.tierName,
                item.details || {}
            );

        return existingKey === configurationKey;
    });

    if (existing) {
        existing.quantity += qty;
    } else {
        this.cart.push({
            id: `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,

            serviceId,
            tierName,
            serviceTitle: title,

            price: priceNum,
            quantity: qty,

            details,
            configurationKey,

            addedAt: new Date().toISOString()
        });
    }

    this.saveCart();

    return true;
}
    parsePrice(str) {
        if (typeof str === 'number') return str;
        const match = str.match(/R\s*(\d+(\.\d+)?)/);
        return match ? parseFloat(match[1]) : 0;
    }

    removeItem(id) {
        this.cart = this.cart.filter(i => i.id !== id);
        this.saveCart();
        this.updateUI();
        this.updateBadge();
    }

    updateQuantity(id, qty) {
        const item = this.cart.find(i => i.id === id);
        if (item) { 
            item.quantity = Math.max(1, qty); 
            this.saveCart();
            this.updateUI();
            this.updateBadge();
        }
    }

    getSubtotal() {
        return this.cart.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0);
    }

    getTotal() { return this.getSubtotal(); }

    clearCart() { this.cart = []; this.saveCart(); }

    isEmpty() { return this.cart.length === 0; }

    updateBadge() {
        const total = this.cart.reduce((s, i) => s + (i.quantity || 1), 0);
        document.querySelectorAll('.cart-badge').forEach(b => {
            b.textContent = total;
            b.style.display = total > 0 ? 'flex' : 'none';
        });
    }

    updateUI() {
        const list = document.getElementById('cartItemsList');
        const empty = document.getElementById('cartEmptyState');
        const container = document.getElementById('cartItemsContainer');
        const footer = document.getElementById('cartFooter');
        const proceed = document.getElementById('proceedToConfirmation');

        if (this.isEmpty()) {
            if (empty) empty.style.display = 'block';
            if (container) container.style.display = 'none';
            if (footer) footer.style.display = 'none';
            if (list) list.innerHTML = '';
            if (proceed) proceed.disabled = true;
        } else {
            if (empty) empty.style.display = 'none';
            if (container) container.style.display = 'block';
            if (footer) footer.style.display = 'block';
            if (proceed) proceed.disabled = false;
            if (list) {
                list.innerHTML = '';
                this.cart.forEach(item => list.appendChild(this.createItemHTML(item)));
            }
            const subtotalEl = document.getElementById('cartSubtotal');
            const totalEl = document.getElementById('cartGrandTotal');
            if (subtotalEl) subtotalEl.textContent = `R${this.getSubtotal().toFixed(2)}`;
            if (totalEl) totalEl.textContent = `R${this.getTotal().toFixed(2)}`;
        }
    }

    createItemDetailsHTML(item, confirmation = false) {
    const details = item.details || {};
    const rows = [];

    // Multi-page services
    if (details.pages) {
        rows.push(`
            <div class="cart-selection-row">
                <span>Pages</span>
                <strong>${details.pages}</strong>
            </div>
        `);

        rows.push(`
            <div class="cart-selection-row">
                <span>First page</span>
                <strong>R${Number(details.basePrice || 0).toFixed(2)}</strong>
            </div>
        `);

        if (Number(details.additionalPages) > 0) {
            rows.push(`
                <div class="cart-selection-row">
                    <span>
                        Additional pages
                        (${details.additionalPages} ×
                        R${Number(details.pricePerPage || 0).toFixed(2)})
                    </span>

                    <strong>
                        R${(
                            Number(details.additionalPages || 0) *
                            Number(details.pricePerPage || 0)
                        ).toFixed(2)}
                    </strong>
                </div>
            `);
        }
    }

    // Website add-ons
    if (details.addonName) {
        rows.push(`
            <div class="cart-selection-row">
                <span>Website add-on</span>
                <strong>${details.addonName}</strong>
            </div>
        `);

        if (details.parentServiceTitle) {
            rows.push(`
                <div class="cart-selection-row">
                    <span>Service</span>
                    <strong>${details.parentServiceTitle}</strong>
                </div>
            `);
        }
    }

    // Normal service category
    if (
        details.category &&
        !details.pages &&
        !details.addonName
    ) {
        rows.push(`
            <div class="cart-selection-row">
                <span>Category</span>
                <strong>${details.category}</strong>
            </div>
        `);
    }

    // Sale information
    if (Number(details.discountPercentage) > 0) {
        rows.push(`
            <div class="cart-selection-row">
                <span>Discount</span>
                <strong>${details.discountPercentage}% off</strong>
            </div>
        `);
    }

    if (details.printingSelected === true) {
    rows.push(`
        <div class="cart-selection-row">
            <span>Printing</span>

            <strong>
                Included — R${Number(
                    details.printingPrice || 0
                ).toFixed(2)}
            </strong>
        </div>
    `);
}

    return `
        <div class="${
            confirmation
                ? 'confirmation-selection-summary'
                : 'cart-selection-summary'
        }">
            ${rows.join('')}
        </div>
    `;
}

    createItemHTML(item) {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.dataset.itemId = item.id;
        const total = item.price * (item.quantity || 1);
        li.innerHTML = `
            <div class="cart-item-header">
                <div class="cart-item-title">${item.serviceTitle}</div>
                <span class="cart-item-tier">${item.tierName}</span>
                <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
            <div class="cart-item-details">
                <div class="cart-detail-group"><div class="cart-detail-label">Unit Price</div><div class="cart-detail-value cart-item-price">R${item.price.toFixed(2)}</div></div>
                <div class="cart-detail-group"><div class="cart-detail-label">Quantity</div><div class="cart-detail-value">${item.quantity || 1}</div></div>
            </div>

            ${this.createItemDetailsHTML(item)}

            <div class="cart-item-footer">
                <div class="cart-quantity-controls">
                    <button class="cart-quantity-btn minus" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                    <span class="cart-quantity">${item.quantity || 1}</span>
                    <button class="cart-quantity-btn plus" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                </div>
                <div class="cart-item-total">R${total.toFixed(2)}</div>
            </div>
        `;
        return li;
    }

    createConfirmationHTML(item) {
        const li = document.createElement('li');
        li.className = 'confirmation-item';
        const total = item.price * (item.quantity || 1);
        li.innerHTML = `
            <div class="confirmation-item-header">
                <div class="confirmation-item-title">${item.serviceTitle}</div>
                <span class="confirmation-item-tier">${item.tierName}</span>
            </div>
            <div class="confirmation-item-details">
                <div class="confirmation-detail-group"><div class="confirmation-detail-label">Unit Price</div><div class="confirmation-detail-value confirmation-item-price">R${item.price.toFixed(2)}</div></div>
                <div class="confirmation-detail-group"><div class="confirmation-detail-label">Quantity</div><div class="confirmation-detail-value">${item.quantity || 1}</div></div>
            </div>

            ${this.createItemDetailsHTML(item, true)}

            <div class="confirmation-item-footer">
                <div class="confirmation-quantity"><i class="fas fa-box"></i> Qty: ${item.quantity || 1}</div>
                <div class="confirmation-item-total">R${total.toFixed(2)}</div>
            </div>
        `;
        return li;
    }

    updateConfirmationUI() {
        const list = document.getElementById('confirmationItemsList');
        if (list) {
            list.innerHTML = '';
            this.cart.forEach(item => list.appendChild(this.createConfirmationHTML(item)));
        }
        const subtotalEl = document.getElementById('confirmationSubtotal');
        const totalEl = document.getElementById('confirmationTotal');
        if (subtotalEl) subtotalEl.textContent = `R${this.getSubtotal().toFixed(2)}`;
        if (totalEl) totalEl.textContent = `R${this.getTotal().toFixed(2)}`;
    }

    setupEvents() {
        document.addEventListener('click', e => {
            // Remove item
            const remove = e.target.closest('.cart-item-remove');
            if (remove) {
                e.preventDefault();
                e.stopPropagation();
                const id = remove.dataset.id;
                if (id) {
                    this.removeItem(id);
                    this.updateUI();
                    this.updateBadge();
                }
                return;
            }
            
            // Minus button
            const minus = e.target.closest('.cart-quantity-btn.minus');
            if (minus) {
                e.preventDefault();
                e.stopPropagation();
                const id = minus.dataset.id;
                if (id) {
                    const item = this.cart.find(i => i.id === id);
                    if (item && (item.quantity || 1) > 1) {
                        this.updateQuantity(id, (item.quantity || 1) - 1);
                    }
                    this.updateUI();
                    this.updateBadge();
                }
                return;
            }
            
            // Plus button
            const plus = e.target.closest('.cart-quantity-btn.plus');
            if (plus) {
                e.preventDefault();
                e.stopPropagation();
                const id = plus.dataset.id;
                if (id) {
                    const item = this.cart.find(i => i.id === id);
                    if (item) {
                        this.updateQuantity(id, (item.quantity || 1) + 1);
                    }
                    this.updateUI();
                    this.updateBadge();
                }
                return;
            }
        });
    }
}

export const cartManager = new CartManager();

// Cart popup - Using arrow functions for proper 'this' binding
const popup = {
    open: () => {
        document.getElementById('cartPopup').classList.add('active');
        document.body.style.overflow = 'hidden';
        cartManager.updateUI();
        cartManager.updateBadge();
    },
    close: () => {
        document.getElementById('cartPopup').classList.remove('active');
        document.body.style.overflow = 'auto';
    },
    openConfirmation: () => {
        if (cartManager.isEmpty()) {
            popup.showToast('Your cart is empty!', 'error');
            return;
        }
        // Close cart popup
        popup.close();
        // Open confirmation popup
        document.getElementById('confirmationPopup').classList.add('active');
        document.body.style.overflow = 'hidden';
        cartManager.updateConfirmationUI();
        document.getElementById('designDescription').value = '';
        document.getElementById('preferredColors').value = '';
        document.getElementById('sketchImageUrl').value = '';
    },
    closeConfirmation: () => {
        document.getElementById('confirmationPopup').classList.remove('active');
        document.body.style.overflow = 'auto';
    },
    showToast: (message, type = 'success') => {
        // Remove existing toasts
        document.querySelectorAll('.custom-toast, .toast-notification').forEach(t => t.remove());
        
        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;
        const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
        
        const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
        
        Object.assign(toast.style, {
            position: 'fixed', 
            bottom: '30px', 
            left: '50%',
            transform: 'translateX(-50%) translateY(100px)',
            padding: '14px 32px',
            background: bgColor, 
            color: 'white',
            borderRadius: '60px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            zIndex: '9999', 
            boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
            opacity: '0',
            transition: 'all 0.4s ease',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            fontWeight: '500',
            maxWidth: '400px'
        });
        document.body.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
            toast.style.opacity = '1';
        });
        
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }
};

// Setup cart events
document.addEventListener('DOMContentLoaded', function() {
    cartManager.setupEvents();
    
    // Cart icons
    document.querySelectorAll('.cart-icon, .cart-icon-mobile, .nav-icon[href="#"]').forEach(el => {
        el.addEventListener('click', function(e) { 
            e.preventDefault(); 
            popup.open(); 
        });
    });
    
    // Close cart
    document.getElementById('closeCart')?.addEventListener('click', popup.close);
    document.getElementById('cartPopup')?.addEventListener('click', function(e) { 
        if (e.target === e.currentTarget) popup.close(); 
    });
    document.getElementById('continueShopping')?.addEventListener('click', popup.close);
    document.getElementById('cartBrowseServices')?.addEventListener('click', function() {
        popup.close();
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('proceedToConfirmation')?.addEventListener('click', popup.openConfirmation);
    
    // Confirmation popup
    document.getElementById('closeConfirmation')?.addEventListener('click', popup.closeConfirmation);
    document.getElementById('confirmationPopup')?.addEventListener('click', function(e) { 
        if (e.target === e.currentTarget) popup.closeConfirmation(); 
    });
    document.getElementById('backToCart')?.addEventListener('click', function() {
        popup.closeConfirmation();
        popup.open();
    });
    
    // Checkout - Updated to redirect to payment page
    document.getElementById('proceedToCheckout')?.addEventListener('click', async function() {
        const desc = document.getElementById('designDescription').value.trim();
        if (!desc) {
            popup.showToast('Please provide a design description', 'error');
            return;
        }
        
        const user = await cartManager.getCurrentUser();
        if (!user) {
            popup.showToast('Please login to proceed', 'error');
            popup.closeConfirmation();
            setTimeout(() => {
                document.getElementById('desktopAuthOverlay')?.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 500);
            return;
        }
        
        const orderId = 'ORD-' + Date.now().toString().slice(-8);
        const orderData = {
            order_id: orderId,
            cart: cartManager.cart,
            userInput: {
                sketchImageUrl: document.getElementById('sketchImageUrl').value.trim(),
                designDescription: desc,
                preferredColors: document.getElementById('preferredColors').value.trim()
            },
            totals: { subtotal: cartManager.getSubtotal(), total: cartManager.getTotal() },
            paymentStatus: 'Pending',
            designStatus: 'Waiting',
            progress: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        
        const { error } = await saveOrder(orderData);
        if (error) {
            popup.showToast('Error creating order. Please try again.', 'error');
            return;
        }
        
        cartManager.clearCart();
        popup.closeConfirmation();
        popup.showToast('Order created! Redirecting to payment...', 'success');
        
        // Redirect to payment page with order ID
        setTimeout(() => {
            window.location.href = `payment.html?orderId=${orderId}`;
        }, 1500);
    });
});

// Initial load
document.addEventListener('DOMContentLoaded', function() {
    cartManager.loadCart();
    cartManager.updateBadge();
});