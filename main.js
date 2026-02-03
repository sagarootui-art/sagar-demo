// Initialize Lucide
lucide.createIcons();

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    // Offset by half width/height to center
    cursor.style.transform = `translate(${cursorX - 12.5}px, ${cursorY - 12.5}px)`;
    cursorDot.style.transform = `translate(${mouseX - 2}px, ${mouseY - 2}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Preloader & Hub Entrance
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    const loaderText = new SplitType('.loader-text', { types: 'chars' });

    tl.from(loaderText.chars, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out"
    })
        .to(loaderText.chars, {
            y: -100,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: "power4.in"
        }, "+=0.5")
        .to('.loader-wrap', {
            yPercent: -100,
            duration: 1.5,
            ease: "expo.inOut"
        }, "-=0.5")
        .set('.loader-wrap', { display: 'none' })
        .add(() => {
            // Trigger home animations explicitly after loader
            animateSection('home');
        });
});

// Navigation System
const sections = ['home', 'products', 'reviews', 'faq', 'contact', 'login'];
let currentSection = 'home';

function navigateTo(id) {
    if (id === currentSection) return;

    // Update Nav Active State
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(id)) {
            link.classList.add('active');
        }
    });

    // Fade out current section
    const currentEl = document.getElementById(currentSection);
    const nextEl = document.getElementById(id);

    gsap.to(currentEl, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            currentEl.style.display = 'none';
            nextEl.style.display = (id === 'home') ? 'flex' : 'block'; // Home is flex center
            gsap.set(nextEl, { opacity: 0, y: 20 });

            gsap.to(nextEl, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    // Refresh Lucide Icons in case they were hidden
                    lucide.createIcons();
                }
            });

            currentSection = id;
            animateSection(id);
        }
    });

    // Close view if open
    const view = document.getElementById('view');
    if (view.style.display === 'block') {
        view.style.display = 'none';
    }
}

function animateSection(id) {
    if (id === 'home') {
        // Re-run hero animations if desired, or relying on initial load
        // We can create a timeline for the active section elements
        gsap.from('#home .hero-title', { opacity: 0, y: 50, duration: 1, delay: 0.2 });
        gsap.from('#home .hero-description', { opacity: 0, y: 30, duration: 1, delay: 0.4 });
        gsap.from('#home .cat-btn', { scale: 0.8, opacity: 0, stagger: 0.1, duration: 1, delay: 0.6 });
    }
}

// Category Data
const categoryData = {
    editing: {
        title: "Editing Universe",
        desc: "Elite XMLs, Motion Data, and Cinematic Transitions optimized for high-performance visual storytelling.",
        assets: [
            { title: "FlowState XML v4", tag: "XML", price: "$45.00", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
            { title: "Neon Glitch Stack", tag: "PRESET", price: "$25.00", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80" },
            { title: "Cinematic LUTS", tag: "COLOR", price: "$15.00", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    unity: {
        title: "Unity Forge",
        desc: "Advanced modular environments, shader stacks, and optimized asset prefabs for the next generation of 3D games.",
        assets: [
            { title: "Low-Poly Forest Kit", tag: "UNITY", price: "$60.00", img: "https://images.unsplash.com/photo-1616440838010-0979cb35010b?auto=format&fit=crop&w=800&q=80" },
            { title: "Vertex Shader Master", tag: "SHADER", price: "$35.00", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    unreal: {
        title: "Unreal Engine 5",
        desc: "Hyper-realistic world environmental shells, Lumen-ready light rigs, and high-fidelity Nanite assets.",
        assets: [
            { title: "Cyberpunk District", tag: "UE5", price: "$120.00", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=800&q=80" },
            { title: "Metahuman Gear Pack", tag: "ASSET", price: "$85.00", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80" }
        ]
    },
    premiere: {
        title: "Premiere Prime",
        desc: "Streamlined workflow MOGRTs, native transition engines, and clean editorial project bases.",
        assets: [
            { title: "Documentary Master", tag: "PRPRO", price: "$55.00", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80" },
            { title: "Social Hook Engine", tag: "MOGRT", price: "$30.00", img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80" }
        ]
    }
};

// LOAD CUSTOM PRODUCTS FROM ADMIN PANEL
const customProducts = JSON.parse(localStorage.getItem('sagar_custom_products') || '[]');
customProducts.forEach(p => {
    if (categoryData[p.category]) {
        categoryData[p.category].assets.push({
            title: p.title,
            tag: p.tag,
            price: p.price,
            img: p.img
        });
    }
});

// PRELOAD ALL PRODUCTS FOR GRID
let allAssets = [];
Object.keys(categoryData).forEach(key => {
    categoryData[key].assets.forEach(asset => {
        allAssets.push({ ...asset, category: key });
    });
});

// View Management (Product Details & Filtering)
const view = document.getElementById('view');
const assetGrid = document.getElementById('asset-grid');

function renderAssetCard(asset) {
    return `
        <div class="asset-card" data-cat="${asset.category}" data-name="${asset.title.toLowerCase()}">
            <div class="card-img"><img src="${asset.img}" alt="${asset.title}"></div>
            <div class="card-body">
                <span class="card-tag">${asset.tag}</span>
                <h3>${asset.title}</h3>
                <p>Premium files included with full logic blueprints.</p>
                <div class="card-footer">
                    <span class="price">${asset.price}</span>
                    <button class="btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.8rem; border-radius: 12px; border:none;" onclick="startPayment('${asset.title}', '${asset.price}')">Buy Now</button>
                </div>
            </div>
        </div>
    `;
}

// Initial full grid render for Products Page
function renderAllProducts() {
    const grid = document.getElementById('all-products-grid');
    if (!grid) return;
    grid.innerHTML = allAssets.map(asset => renderAssetCard(asset)).join('');
}

// Trigger render on load
renderAllProducts();


function filterProducts() {
    const query = document.getElementById('product-search').value.toLowerCase();
    const cards = document.querySelectorAll('#all-products-grid .asset-card');

    cards.forEach(card => {
        const name = card.getAttribute('data-name');
        if (name.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByCat(cat, btn) {
    // UI Active
    document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');

    // Filter Logic
    const cards = document.querySelectorAll('#all-products-grid .asset-card');
    cards.forEach(card => {
        const category = card.getAttribute('data-cat');
        if (cat === 'all' || category === cat) {
            card.style.display = 'block';
            card.style.animation = 'none';
            card.offsetHeight; /* trigger reflow */
            card.style.animation = 'fadeInUp 0.8s ease backwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Original Detail View Logic (Drill down)
function openCategory(id) {
    const data = categoryData[id];
    if (!data) return;

    document.getElementById('view-title').innerText = data.title;
    document.getElementById('view-desc').innerText = data.desc;

    // Clear and build grid
    assetGrid.innerHTML = '';
    data.assets.forEach((asset, index) => {
        const card = document.createElement('div');
        card.innerHTML = renderAssetCard({ ...asset, category: id }).trim(); // Re-use render logic
        assetGrid.appendChild(card.firstElementChild);
    });
    // Hide current section
    const currentEl = document.getElementById(currentSection);

    gsap.to(currentEl, {
        opacity: 0, y: -50, duration: 0.6, ease: "power3.in", onComplete: () => {
            currentEl.style.display = 'none';
            view.style.display = 'block';
            gsap.to(view, { opacity: 1, y: 0, duration: 1, ease: "power4.out" });

            // Animate cards in
            gsap.to('.asset-card', {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power4.out",
                className: "asset-card show"
            });
        }
    });
}

function closeCategory() {
    gsap.to(view, {
        opacity: 0, y: 50, duration: 0.6, ease: "power3.in", onComplete: () => {
            view.style.display = 'none';
            // Return to current section (usually products or home)
            const sect = document.getElementById(currentSection);
            sect.style.display = (currentSection === 'home') ? 'flex' : 'block';
            gsap.to(sect, { opacity: 1, y: 0, duration: 1, ease: "power4.out" });
        }
    });
}

// Global UI Hover Interaction
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.cat-btn') || e.target.closest('.asset-card') || e.target.closest('.nav-link') || e.target.closest('button') || e.target.closest('a')) {
        gsap.to(cursor, { scale: 3, background: 'rgba(255,255,255,0.1)', duration: 0.3 });
    } else {
        gsap.to(cursor, { scale: 1, background: 'transparent', duration: 0.3 });
    }
});

// FAQ Toggle
function toggleFaq(element) {
    element.classList.toggle('active');
    const icon = element.querySelector('i');
    if (element.classList.contains('active')) {
        icon.style.transform = "rotate(180deg)";
        icon.style.transition = "transform 0.3s";
    } else {
        icon.style.transform = "rotate(0deg)";
    }
}

// Payment Logic
function startPayment(title, price) {
    document.getElementById('checkout-item-title').innerText = title;
    document.getElementById('checkout-item-price').innerText = price;
    navigateTo('payment');
}

function selectPaymentMethod(el) {
    document.querySelectorAll('#payment .cat-btn').forEach(btn => {
        btn.style.background = 'rgba(255,255,255,0.03)';
        btn.style.border = '1px solid var(--glass-border)';
    });
    el.style.background = 'rgba(255,255,255,0.1)';
    el.style.borderColor = '#3b82f6';
}

function processPayment() {
    const btn = document.querySelector('#payment .btn-primary');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('success-overlay').style.display = 'flex';
        btn.innerText = originalText;
        btn.disabled = false;

        // Confetti effect (optional simplified logic)
        // For now just the overlay
    }, 2000);
}

function closeSuccess() {
    document.getElementById('success-overlay').style.display = 'none';
    navigateTo('home');
}
