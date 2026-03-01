// product.js
import { products } from "../data/product.js";

const grid = document.getElementById("productGrid");
const title = document.getElementById("result-title");

// Get HTML elements needed for search
const filterContainer = document.getElementById("filtered-products");
const searchInput = document.getElementById("search-input");
const searchQuery = document.getElementById("search-query"); // Mobile search input
const hidenSearch = document.querySelector(".hidden-search");
const searchBtn = document.querySelector(".search-box");
const MegaMenuInput = document.getElementById("MegaMenuInput");
const MegaMenuFilterContainer = document.getElementById("filtered-products2");

// --- INITIAL RENDER LOGIC ---
const params = new URLSearchParams(window.location.search);
const searchParam = params.get("search");

if (!searchParam) {
  if (title) title.textContent = "All Products";
  renderProducts(products);
} else {
  if (title) title.textContent = `Results for "${searchParam}"`;
  const filtered = filterProducts(products, searchParam);
  renderProducts(filtered);
}

function filterProducts(products, query) {
  const searchWords = query.toLowerCase().trim().split(" ");
  return products.filter(product => {
    const productTitle = product.title.toLowerCase();
    return searchWords.every(word => productTitle.includes(word));
  });
}

function renderProducts(list) {
  if (!grid) return;
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p>No products found</p>";
    return;
  }

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
    <a href="/src/product-details.html?id=${product.id}" class="product-link" style="text-decoration: none; color: inherit;">
      <div class="card-img">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="card-info">
        <div class="card-title">
          <h3>${product.title}</h3>
        </div>
        <p>$${product.price}</p>
      </div>
      <button class="AddCart" data-id="${product.id}">Add to Cart</button>
    `;

    grid.appendChild(card);
  });
}

// --- CART LOGIC ---
let cart = JSON.parse(localStorage.getItem("CART_DATA")) || [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("AddCart")) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const exists = cart.find((item) => item.id === id);

  if (exists) {
    exists.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("CART_DATA", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
}

// --- MEGA MENU DESKTOP LOGIC ---
const categories = document.querySelectorAll(".category");
const submenus = document.querySelectorAll(".submenu");
const MegaMenu = document.querySelector(".mega-menu");
const shopWrapper = document.querySelector(".shop-wrapper");

categories.forEach(cat => {
  cat.addEventListener("mouseenter", () => {
    categories.forEach(c => c.classList.remove("active"));
    submenus.forEach(s => s.classList.remove("active"));
    
    cat.classList.add("active");
    
    const targetElement = document.getElementById(cat.dataset.target);
    if(targetElement) targetElement.classList.add("active");
  });
});

let closeTimeout;
if (shopWrapper && MegaMenu) {
  shopWrapper.addEventListener("mouseenter", () => {
    clearTimeout(closeTimeout);
    MegaMenu.classList.add("active");
  });
  
  shopWrapper.addEventListener("mouseleave", () => {
    closeTimeout = setTimeout(() => {
      MegaMenu.classList.remove("active");
    }, 300); 
  });
}

// --- HAMBURGER & MOBILE MENU LOGIC ---
const hamburger = document.querySelector(".hamburger");
const activeMenu = document.querySelector(".Activemenu");
const closeMenu = document.querySelector('#closeMenu');

if (hamburger && activeMenu) {
  hamburger.addEventListener("click", () => {
    activeMenu.classList.add("active");
  });
}

if (closeMenu && activeMenu) {
  closeMenu.addEventListener("click", () => {
    activeMenu.classList.remove("active");
  });
}

// --- MOBILE SEARCH TOGGLE ---
if (searchBtn && hidenSearch) {
  searchBtn.addEventListener("click", () => {
    hidenSearch.classList.toggle("active");
  });
}

// Close search on outside click
document.addEventListener("click", (event) => {
  if (hidenSearch && searchBtn && filterContainer) {
    const isClicked =
      hidenSearch.contains(event.target) ||
      searchBtn.contains(event.target) ||
      filterContainer.contains(event.target);

    if (!isClicked) {
      hidenSearch.classList.remove("active");
      filterContainer.classList.remove("show");
    }
  }
});

// --- SEARCH INPUT LOGIC (Live Filtering) ---
if (searchQuery && filterContainer) {
  searchQuery.addEventListener("input", () => {
    const query = searchQuery.value.toLowerCase().trim();
    filterContainer.innerHTML = "";

    if (query === "") {
      filterContainer.classList.remove("show");
      return;
    }

    const searchWords = query.split(" ");
    const filtered = products.filter(p => {
      const productTitle = p.title.toLowerCase();
      return searchWords.every(word => productTitle.includes(word));
    });

    if (filtered.length === 0) {
      filterContainer.classList.remove("show");
      return;
    }

    filterContainer.classList.add("show");
    filtered.forEach(p => {
      filterContainer.innerHTML += `
        <div class="filtered-container">
          <div class="filtered-img">
            <img src="${p.image}" />
          </div>
          <div class="filtered-info">
            <div class="filtered-title">
              <h3>${p.title}</h3>
            </div>
            <div class="filtered-price">
              <p>$${p.price}</p>
            </div>
          </div>
        </div>
      `;
    });
  });
}

// --- MEGA MENU SEARCH INPUT LOGIC ---
if (MegaMenuInput && MegaMenuFilterContainer) {
  MegaMenuInput.addEventListener("input", () => {
    const value = MegaMenuInput.value.toLowerCase().trim();
    MegaMenuFilterContainer.innerHTML = "";

    if (value === "") {
      MegaMenuFilterContainer.classList.remove("show");
      return;
    }

    const searchWords = value.split(" ");
    const filtered = products.filter(p => {
      const productTitle = p.title.toLowerCase();
      return searchWords.every(word => productTitle.includes(word));
    });

    if (filtered.length === 0) {
      MegaMenuFilterContainer.classList.remove("show");
      return;
    }

    MegaMenuFilterContainer.classList.add("show");
    filtered.forEach(p => {
      MegaMenuFilterContainer.innerHTML += `
      <div class="MegaMenuContainer">
        <a href="product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit; display: flex; width: 100%;">
          <div class="MegaMenuContainer-img">
            <img src="${p.image}" />
          </div>
          <div class="MegaMenuContainer-info">
            <div class="MegaMenuContainer-title">
              <h3>${p.title}</h3>
            </div>
            <div class="MegaMenuContainer-price">
              <p>$${p.price}</p>
            </div>
          </div>
        </a>
      </div>
    `;
  });
});
}

// --- MOBILE SUBMENU ACCORDIONS ---
const hasSubItems = document.querySelectorAll('.has-sub');
hasSubItems.forEach(item => {
  const link = item.querySelector('a');
  const submenu = item.querySelector('.sub-menu');
  const icon = item.querySelector('i');  

  if (link && submenu) {
    link.addEventListener('click', (e) => {
      e.preventDefault(); 
      e.stopPropagation(); 

      submenu.classList.toggle('active');
      if(icon) {
        if (submenu.classList.contains('active')) {
          icon.classList.remove('fa-angle-right');
          icon.classList.add('fa-angle-down');
        } else {
          icon.classList.remove('fa-angle-down');
          icon.classList.add('fa-angle-right');
        }
      }
    });
  }
});

document.querySelectorAll('.has-subsub > a').forEach(span => {
  span.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const parent = span.closest('.has-subsub');
    const submenu = parent.querySelector('.sub-menu-level2');
    const icon = span.querySelector('i');

    if (submenu) {
      submenu.classList.toggle('active');
      if (icon) {
        if (submenu.classList.contains('active')) {
          icon.classList.remove('fa-angle-right');
          icon.classList.add('fa-angle-down');
        } else {
          icon.classList.remove('fa-angle-down');
          icon.classList.add('fa-angle-right');
        }
      }
    }
  });
});

// --- ENTER KEY SEARCH REDIRECT LOGIC ---
function bindSearch(input) {
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleSearch(input.value);
      }
    });
  }
}

function handleSearch(query) {
  const value = query.trim();
  if (!value) return;
  window.location.href = `/src/product.html?search=${encodeURIComponent(value)}`;
}

bindSearch(searchInput);
bindSearch(MegaMenuInput);
bindSearch(searchQuery);