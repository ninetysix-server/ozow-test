// js/services.js
import { getServices } from './supabase.js';
import { cartManager } from './cart.js';

let allServices = [];
let filteredServices = [];
let currentSort = 'featured';
let selectedCategories = [];
let selectedTiers = ['starter'];
let priceRange = { min: 0, max: 5000 };
let wishlistItems = [];

let currentPage = 1;
const itemsPerPage = 6;
let totalPages = 1;
let isLoading = true; 

// Load wishlist from localStorage
function loadWishlistItems() {
    try {
        const saved = localStorage.getItem('designWishlist');
        wishlistItems = saved ? JSON.parse(saved) : [];
    } catch (error) {
        wishlistItems = [];
    }
}

function saveWishlist() {
    try {
        localStorage.setItem('designWishlist', JSON.stringify(wishlistItems));
        updateWishlistCount();
        updateAllWishlistIcons();
    } catch (error) {
        console.error('Error saving wishlist:', error);
    }
}

function updateWishlistCount() {
    const count = wishlistItems.length;
    const counter = document.getElementById('wishlistCounter');
    if (counter) {
        counter.textContent = count;
        counter.style.display = count > 0 ? 'flex' : 'none';
    }
}

function updateAllWishlistIcons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const serviceId = btn.dataset.serviceId;
        if (serviceId) {
            const isInWishlist = wishlistItems.some(item => item.id === serviceId);
            const icon = btn.querySelector('i');
            if (isInWishlist) {
                icon.className = 'fas fa-heart';
                icon.style.color = '#ef4444';
                btn.title = 'Remove from wishlist';
            } else {
                icon.className = 'far fa-heart';
                icon.style.color = '#6b6b6b';
                btn.title = 'Add to wishlist';
            }
        }
    });
}

function updateWishlistUI() {
    const emptyState = document.getElementById('wishlistEmptyState');
    const itemsContainer = document.getElementById('wishlistItemsContainer');
    const itemsList = document.getElementById('wishlistItemsList');
    const submitBtn = document.getElementById('submitWishlist');
    const footer = document.getElementById('wishlistFooter');
    
    if (wishlistItems.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        if (itemsContainer) itemsContainer.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (submitBtn) submitBtn.disabled = true;
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (itemsContainer) itemsContainer.style.display = 'block';
    if (footer) footer.style.display = 'block';
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fab fa-whatsapp"></i> Submit ${wishlistItems.length} Design${wishlistItems.length > 1 ? 's' : ''} via WhatsApp`;
    }
    
    if (itemsList) {
        itemsList.innerHTML = wishlistItems.map(item => `
            <li class="wishlist-item" data-id="${item.id}">
                <div class="wishlist-item-header">
                    <div>
                        <div class="wishlist-item-title">${item.title}</div>
                        <div class="wishlist-item-category">${item.category || 'Design'}</div>
                    </div>
                    <span class="wishlist-item-tier">${item.tier}</span>
                </div>
                <div class="wishlist-item-details">
                    <div class="wishlist-detail-group">
                        <div class="wishlist-detail-label">Price</div>
                        <div class="wishlist-detail-value wishlist-item-price">${item.price}</div>
                    </div>
                    <div class="wishlist-detail-group">
                        <div class="wishlist-detail-label">Added</div>
                        <div class="wishlist-detail-value">${new Date(item.addedAt).toLocaleDateString()}</div>
                    </div>
                </div>
                ${item.description ? `
                    <div class="wishlist-item-description">${item.description}</div>
                ` : ''}
                <div class="wishlist-item-footer">
                    <button class="wishlist-item-remove" onclick="removeFromWishlist('${item.id}')">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </li>
        `).join('');
    }
}

window.removeFromWishlist = function(serviceId) {
    const index = wishlistItems.findIndex(item => item.id === serviceId);
    if (index > -1) {
        const removed = wishlistItems[index];
        wishlistItems.splice(index, 1);
        saveWishlist();
        updateWishlistUI();
    }
};

window.toggleWishlist = function(serviceId) {
    const service = allServices.find(s => s.id === serviceId);
    if (!service) return;
    
    const existingIndex = wishlistItems.findIndex(item => item.id === serviceId);
    
    if (existingIndex > -1) {
        wishlistItems.splice(existingIndex, 1);
        saveWishlist();
        updateWishlistUI();
    } else {
        const tierData = service.tiers?.[0] || {};
        wishlistItems.push({
            id: serviceId,
            title: service.title,
            tier: tierData.name || 'Starter',
            price: tierData.price || 'Contact',
            description: tierData.description || service.description || '',
            category: service.category || 'Design',
            addedAt: new Date().toISOString()
        });
        saveWishlist();
        updateWishlistUI();
    }
};

function showToast(message, type = 'success') {
    document.querySelectorAll('.custom-toast').forEach(t => t.remove());
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    const color = type === 'success' ? '#10b981' : '#3b82f6';
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    Object.assign(toast.style, {
        position: 'fixed', bottom: '30px', left: '50%',
        transform: 'translateX(-50%) translateY(100px)',
        padding: '14px 32px', background: color, color: 'white',
        borderRadius: '60px', display: 'flex', alignItems: 'center', gap: '10px',
        zIndex: '9999', opacity: '0', transition: 'all 0.4s ease',
        fontFamily: 'Inter, sans-serif', fontSize: '0.9rem'
    });
    document.body.appendChild(toast);
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

function getCategories(services) {
    const cats = new Set();
    services.forEach(s => {
        if (s.category) cats.add(s.category);
        if (s.id) cats.add(s.id);
    });
    return Array.from(cats);
}

async function loadServices() {
    try {
        isLoading = true;
        // Show loading spinner immediately
        document.getElementById('servicesGrid').innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
                <div class="spinner"></div>
                <p style="color:#6b6b6b;margin-top:16px;">Loading services...</p>
            </div>
        `;
        document.getElementById('paginationContainer').innerHTML = '';
        
        loadWishlistItems();
        const services = await getServices();
        allServices = services.map(s => ({
            ...s,
            category: s.category || s.id || 'uncategorized',
            tiers: s.tiers || [
                { name: 'Starter', price: 'R299', description: 'Basic package', features: ['2 concepts', '3 revisions'] },
                { name: 'Premium', price: 'R599', description: 'Standard package', features: ['5 concepts', '10 revisions'] },
                { name: 'Pro', price: 'R999', description: 'Full package', features: ['10 concepts', 'Unlimited revisions'] }
            ]
        }));
        generateCategoryFilters(allServices);
        filteredServices = [...allServices];
        isLoading = false;
        renderServices();
        updateServiceCount();
    } catch (error) {
        console.error('Error loading services:', error);
        isLoading = false;
        document.getElementById('servicesGrid').innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#6b6b6b;">
                <i class="fas fa-exclamation-circle" style="font-size:48px;color:#ef4444;margin-bottom:16px;display:block;"></i>
                <h3>Failed to load services</h3>
                <p>Please refresh the page and try again.</p>
            </div>
        `;
        document.getElementById('paginationContainer').innerHTML = '';
    }
}

function generateCategoryFilters(services) {
    const container = document.querySelector('.filter-group:first-child');
    if (!container) return;
    const categories = getCategories(services);
    const labels = {
        'logo-design': 'Logo Design',
        'poster-design': 'Poster Design',
        'business-card': 'Business Card',
        'board-design': 'Board Design',
        'branding': 'Branding',
        'website-design': 'Website Design',
        'flyer-design': 'Flyer Design'
    };
    let html = '<h4>Service Type</h4>';
    categories.forEach(cat => {
        const label = labels[cat] || cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        html += `<label><input type="checkbox" class="category-filter" value="${cat}" onchange="toggleCategory('${cat}')" /> ${label}</label>`;
    });
    container.innerHTML = html;
}

function renderServices() {
    const grid = document.getElementById('servicesGrid');
    
    // Show loading spinner if still loading
    if (isLoading) {
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
                <div class="spinner"></div>
                <p style="color:#6b6b6b;margin-top:16px;">Loading services...</p>
            </div>
        `;
        document.getElementById('paginationContainer').innerHTML = '';
        return;
    }
    
    if (filteredServices.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#6b6b6b;"><i class="fas fa-search" style="font-size:48px;color:#cbd5e1;margin-bottom:16px;display:block;"></i><h3>No services found</h3><p>Try adjusting your filters</p></div>`;
        document.getElementById('paginationContainer').innerHTML = '';
        return;
    }

    // Calculate pagination
    totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredServices.slice(start, end);

    grid.innerHTML = pageItems.map(service => {
        let tierData = null;
        for (const tier of service.tiers) {
            if (selectedTiers.includes(tier.name.toLowerCase())) {
                tierData = tier;
                break;
            }
        }
        if (!tierData) tierData = service.tiers[0];
        
        const price = tierData?.price || 'Contact';
        const desc = tierData?.description || service.description || '';
        const features = tierData?.features || service.features || [];
        const isOnSale = service.discount_active && service.discount_percentage > 0;
        
        let salePrice = null;
        if (isOnSale) {
            const match = price.match(/R\s*(\d+(\.\d+)?)/);
            if (match) {
                const original = parseFloat(match[1]);
                salePrice = original * (1 - service.discount_percentage / 100);
            }
        }
        
        const isInWishlist = wishlistItems.some(item => item.id === service.id);
        
        return `
            <div class="product-card" data-service="${service.id}">
                <div class="card-top">
                    <div class="card-top-right">
                        ${isOnSale ? `<span class="sale-badge">-${service.discount_percentage}%</span>` : ''}
                        <button class="wishlist-btn" data-service-id="${service.id}" onclick="toggleWishlist('${service.id}')">
                            <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-image"><i class="fas fa-paint-brush"></i></div>
                <div class="product-brand">${service.category || 'Design'}</div>
                <div class="product-name">${service.title}</div>
                <div class="product-desc">${desc}</div>
                <div class="product-features">
                    ${features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                    ${features.length > 3 ? `<span class="feature-tag">+${features.length - 3} more</span>` : ''}
                </div>
                <div class="product-rating"><span>★★★★☆</span><span>4.8 (120)</span></div>
                <div class="product-price">
                    ${isOnSale && salePrice ? `
                        <span class="price-current" style="color:#ef4444;">R${salePrice.toFixed(2)}</span>
                        <span class="price-original">${price}</span>
                        <span class="price-save">Save ${service.discount_percentage}%</span>
                    ` : `
                        <span class="price-current">${price}</span>
                    `}
                </div>
                <div class="card-actions">
                    <button class="btn-primary" onclick="addToCart('${service.id}')"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                    <button class="btn-secondary" onclick="quickView('${service.id}')"><i class="fas fa-eye"></i></button>
                </div>
            </div>
        `;
    }).join('');
    
    // Render pagination
    renderPagination();
    updateAllWishlistIcons();
    updateWishlistCount();
}

// Add pagination render function
function renderPagination() {
    const container = document.getElementById('paginationContainer');
    if (!container) return;
    
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div class="pagination">';
    
    // Previous button
    html += `<button class="page-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&laquo;</button>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<span class="page-dots">...</span>`;
        }
    }
    
    // Next button
    html += `<button class="page-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&raquo;</button>`;
    
    html += '</div>';
    container.innerHTML = html;
}

// Go to page function
window.goToPage = function(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderServices();
    // Scroll to top of services section
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.addToCart = function(serviceId) {
    const service = allServices.find(s => s.id === serviceId);
    if (!service) return;
    let tierData = null;
    for (const tier of service.tiers) {
        if (selectedTiers.includes(tier.name.toLowerCase())) {
            tierData = tier;
            break;
        }
    }
    if (!tierData) tierData = service.tiers[0];
    const price = tierData?.price || 'R0';
    const tierName = tierData?.name || 'Starter';
    cartManager.addItem(serviceId, tierName, service.title, price, 1, { tier: tierName });
    document.getElementById('cartPopup').classList.add('active');
    document.body.style.overflow = 'hidden';
    cartManager.updateUI();
};

window.quickView = function(serviceId) {
    const service = allServices.find(s => s.id === serviceId);
    if (service) showToast(`${service.title} - ${service.category}`, 'info');
};

window.toggleCategory = function(category) {
    const index = selectedCategories.indexOf(category);
    if (index > -1) selectedCategories.splice(index, 1);
    else selectedCategories.push(category);
    applyFilters();
};

window.applyFilters = function() {
    // Show loading while filtering
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
            <div class="spinner"></div>
            <p style="color:#6b6b6b;margin-top:16px;">Loading services...</p>
        </div>
    `;
    document.getElementById('paginationContainer').innerHTML = '';
    
    // Use setTimeout to allow UI to update before filtering
    setTimeout(() => {
        let results = [...allServices];
        if (selectedCategories.length > 0) {
            results = results.filter(s => selectedCategories.includes(s.category));
        }
        if (selectedTiers.length > 0 && selectedTiers.length < 3) {
            results = results.filter(s => {
                const serviceTiers = s.tiers.map(t => t.name.toLowerCase());
                return selectedTiers.some(t => serviceTiers.includes(t));
            });
        }
        results = results.filter(s => {
            return s.tiers.some(t => {
                const match = t.price?.match(/R\s*(\d+(\.\d+)?)/);
                if (!match) return true;
                const price = parseFloat(match[1]);
                return price >= priceRange.min && price <= priceRange.max;
            });
        });
        switch(currentSort) {
            case 'price-low':
                results.sort((a, b) => {
                    const getMin = (s) => Math.min(...s.tiers.map(t => { const m = t.price?.match(/R\s*(\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : Infinity; }));
                    return getMin(a) - getMin(b);
                });
                break;
            case 'price-high':
                results.sort((a, b) => {
                    const getMax = (s) => Math.max(...s.tiers.map(t => { const m = t.price?.match(/R\s*(\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : 0; }));
                    return getMax(b) - getMax(a);
                });
                break;
            case 'sale':
                results = results.filter(s => s.discount_active === true);
                break;
        }
        filteredServices = results;
        currentPage = 1;
        renderServices();
        updateServiceCount();
    }, 300);
};

window.sortServices = function(sortBy) {
    currentSort = sortBy;
    applyFilters();
};

window.setPriceRange = function(min, max) {
    priceRange = { min, max };
    document.getElementById('priceDisplay').textContent = `R${min} - R${max}+`;
    applyFilters();
};

window.resetFilters = function() {
    selectedCategories = [];
    selectedTiers = ['starter'];
    currentSort = 'featured';
    priceRange = { min: 0, max: 5000 };
    document.getElementById('priceRangeInput').value = 5000;
    document.getElementById('priceDisplay').textContent = 'R0 - R5000+';
    document.getElementById('sortSelect').value = 'featured';
    document.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
    document.querySelectorAll('.tier-filter').forEach(cb => cb.checked = cb.value === 'starter');
    applyFilters();
};

function updateServiceCount() {
    const count = document.getElementById('serviceCount');
    if (count) count.textContent = `${filteredServices.length} services`;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Wishlist modal events
    document.getElementById('mobileWishlistBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('wishlistModal').classList.add('active');
        document.body.style.overflow = 'hidden';
        updateWishlistUI();
    });
    
    document.getElementById('openWishlistModal')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('wishlistModal').classList.add('active');
        document.body.style.overflow = 'hidden';
        updateWishlistUI();
    });
    
    document.getElementById('closeWishlist')?.addEventListener('click', function() {
        document.getElementById('wishlistModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    document.getElementById('wishlistModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            document.getElementById('wishlistModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    document.getElementById('wishlistBrowseDesigns')?.addEventListener('click', function() {
        document.getElementById('wishlistModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('continueBrowsing')?.addEventListener('click', function() {
        document.getElementById('wishlistModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('submitWishlist')?.addEventListener('click', function() {
        if (wishlistItems.length === 0) {
            showToast('Your wishlist is empty!', 'error');
            return;
        }
        let msg = "Hi! I'm interested in these designs:\n\n";
        wishlistItems.forEach((item, i) => {
            msg += `${i+1}. ${item.title} - ${item.tier} - ${item.price}\n`;
        });
        window.open(`https://wa.me/27817925033?text=${encodeURIComponent(msg)}`, '_blank');
    });
    
    // Price range
    document.getElementById('priceRangeInput')?.addEventListener('input', function() {
        setPriceRange(0, parseInt(this.value));
    });
    
    // Tier checkboxes
    document.querySelectorAll('.tier-filter').forEach(cb => {
        cb.addEventListener('change', function() {
            if (this.checked) {
                if (!selectedTiers.includes(this.value)) selectedTiers.push(this.value);
            } else {
                const index = selectedTiers.indexOf(this.value);
                if (index > -1) selectedTiers.splice(index, 1);
                if (selectedTiers.length === 0) {
                    selectedTiers = ['starter', 'premium', 'pro'];
                    document.querySelectorAll('.tier-filter').forEach(c => c.checked = true);
                }
            }
            applyFilters();
        });
    });
    
    loadServices();
});


// Make functions globally available
window.toggleWishlist = toggleWishlist;
window.removeFromWishlist = removeFromWishlist;
window.updateAllWishlistIcons = updateAllWishlistIcons;

console.log('✅ Services module loaded');
