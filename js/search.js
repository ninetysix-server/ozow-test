// js/search.js
import { searchServices } from './supabase.js';

let searchTimeout;

function setupSearch(input, resultsContainer, isMobile = false) {
    if (!input) return;
    
    input.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const term = this.value.trim();
        if (term.length === 0) {
            if (resultsContainer) resultsContainer.innerHTML = '';
            return;
        }
        searchTimeout = setTimeout(async () => {
            const results = await searchServices(term);
            displayResults(results, term, resultsContainer, isMobile);
        }, 300);
    });
}

function displayResults(results, term, container, isMobile) {
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="text-align:center;padding:40px 20px;">
                <i class="fas fa-search" style="font-size:40px;color:#cbd5e1;margin-bottom:15px;"></i>
                <p style="color:#64748b;">No results found for "${term}"</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = results.map(service => `
        <div class="search-result-item" style="padding:15px;border-bottom:1px solid #f1f5f9;cursor:pointer;" data-service="${service.id}">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                <div style="font-size:16px;font-weight:600;color:#004370;">${service.title}</div>
                <div style="font-size:16px;font-weight:700;color:#009B5B;background:rgba(0,155,91,0.1);padding:4px 12px;border-radius:20px;">${service.price || 'Contact'}</div>
            </div>
            <div style="color:#64748b;font-size:14px;line-height:1.5;margin-bottom:10px;">${service.description || ''}</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${service.features?.slice(0,3).map(f => `<span style="background:#f1f5f9;color:#475569;padding:4px 10px;border-radius:12px;font-size:11px;">${f}</span>`).join('') || ''}
            </div>
        </div>
    `).join('');
    
    container.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', function() {
            const sid = this.dataset.service;
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            if (!isMobile) {
                const dropdown = document.getElementById('searchResultsDropdown');
                if (dropdown) dropdown.classList.remove('active');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const desktopInput = document.getElementById('mainSearchInput');
    const desktopResults = document.createElement('div');
    desktopResults.id = 'searchResultsDropdown';
    desktopResults.className = 'search-results-dropdown';
    desktopResults.style.cssText = `
        position:fixed;top:140px;left:50%;transform:translateX(-50%);
        width:90%;max-width:700px;max-height:60vh;background:white;
        border-radius:16px;z-index:99999;display:none;overflow-y:auto;
        padding:0;box-shadow:0 15px 35px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(desktopResults);
    
    if (desktopInput) {
        desktopInput.addEventListener('focus', function() {
            if (this.value.trim()) {
                desktopResults.style.display = 'block';
                setupSearch(desktopInput, desktopResults, false);
            }
        });
        
        desktopInput.addEventListener('input', function() {
            if (this.value.trim()) {
                desktopResults.style.display = 'block';
            } else {
                desktopResults.style.display = 'none';
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!desktopInput.contains(e.target) && !desktopResults.contains(e.target)) {
                desktopResults.style.display = 'none';
            }
        });
    }
    
    // Mobile search
    const mobileBtn = document.getElementById('mobileSearchBtn');
    const mobileModal = document.getElementById('mobileSearchModal');
    const mobileInput = document.getElementById('mobileSearchInput');
    const mobileResults = document.getElementById('mobileSearchResults');
    
    if (mobileBtn && mobileModal) {
        mobileBtn.addEventListener('click', () => {
            mobileModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => mobileInput?.focus(), 300);
        });
        
        document.getElementById('closeMobileSearch')?.addEventListener('click', () => {
            mobileModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        mobileModal.addEventListener('click', e => {
            if (e.target === mobileModal) {
                mobileModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    if (mobileInput && mobileResults) {
        setupSearch(mobileInput, mobileResults, true);
    }
});