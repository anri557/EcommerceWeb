// 1. MUST include .js extension
import { products } from "./data/product.js";

// 2. Initialize the cart from LocalStorage! (You were missing this line)
let cart = JSON.parse(localStorage.getItem("CART_DATA")) || [];


function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const summarySubtotal = document.getElementById("summary-subtotal");
  const cartCount = document.getElementById("cart-count");


  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p style='padding: 20px;'>Your cart is empty.</p>";
    totalPriceElement.innerText = "$0.00";
    if (summarySubtotal) summarySubtotal.innerText = "$0.00";
    if (cartCount) cartCount.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    totalItems += item.quantity;

    cartItemsContainer.innerHTML += `
      <div class="cart-card">
        <button class="remove-btn" onclick="removeItem(${index})">
          <i class="fa-solid fa-xmark"></i>
        </button>
        
        <div class="cart-card-content">
          <img src="${item.image}" alt="${item.title}" class="cart-card-img">
          
          <div class="cart-card-details">
            <h3 class="cart-card-title">${item.title}</h3>
            <p class="cart-card-color">color: Default</p>
            
            <div class="qty-stepper">
              <button onclick="changeQty(${index}, -1)">–</button>
              <span>${item.quantity}</span>
              <button onclick="changeQty(${index}, 1)">+</button>
            </div>
          </div>
          
          <div class="cart-card-price">$${subtotal.toFixed(2)}</div>
        </div>
      </div>
    `;
  });

  // Update all the numbers on the screen
  const formattedTotal = `$${total.toFixed(2)}`;
  if (totalPriceElement) totalPriceElement.innerText = formattedTotal;
  if (summarySubtotal) summarySubtotal.innerText = formattedTotal;
  if (cartCount) cartCount.innerText = totalItems;
}

window.changeQty = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
    saveAndRender();
};

window.removeItem = (index) => {
    cart.splice(index, 1);
    saveAndRender();
};

function saveAndRender() {
    localStorage.setItem("CART_DATA", JSON.stringify(cart));
    renderCart();
}

// --- SEARCH & NAVIGATION LOGIC ---
const filterContainer = document.getElementById("filtered-products");
const searchInput = document.getElementById("search-input");
const searchQuery = document.getElementById("search-query");
const hidenSearch = document.querySelector(".hidden-search");
const searchBtn = document.querySelector(".search-box");
const hamburger = document.querySelector(".hamburger");
const activeMenu = document.querySelector(".Activemenu");
const closeMenu = document.querySelector('#closeMenu');
const MegaMenuInput = document.getElementById("MegaMenuInput");
const MegaMenuFilterContainer = document.getElementById("filtered-products2");

// Desktop Search
if (searchInput && filterContainer) {
    searchInput.addEventListener("input", () => {
        const SearchValue = searchInput.value.toLowerCase().trim();
        filterContainer.innerHTML = "";
        
        if (SearchValue === "") {
            filterContainer.classList.remove("show");
            return;
        }

        const searchWords = SearchValue.split(" ");
        const filtered = products.filter(p => {
            const title = p.title.toLowerCase();
            return searchWords.every(word => title.includes(word));
        });

        if (filtered.length === 0) {
            filterContainer.classList.remove("show");
            return;
        }

        filterContainer.classList.add("show");
        filtered.forEach(p => {
            filterContainer.innerHTML += `
                <div class="filtered-container"> 
               <a href="/EcommerceWeb/product-details.html?id=${p.id}"  class="product-link" style="text-decoration: none; color: inherit;">
                    <div class="filtered-img"><img src="${p.image}" /></div> 
                    <div class="filtered-info">
                        <div class="filtered-title"><h3>${p.title}</h3></div>
                        <div class="filtered-price"><p>price: $${p.price}</p></div>
                    </div>
                </div>`;
        });
    });
}

// Mobile Search Toggle
if (searchBtn && hidenSearch) {
  searchBtn.addEventListener("click", () => {
    hidenSearch.classList.toggle("active");
  });
}

// Mobile Search Logic
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
      const title = p.title.toLowerCase();
      return searchWords.every(word => title.includes(word));
    });

    if (filtered.length === 0) {
      filterContainer.classList.remove("show");
      return;
    }

    filterContainer.classList.add("show");
    filtered.forEach(p => {
      filterContainer.innerHTML += `
        <div class="filtered-container">
       <a href="/EcommerceWeb/product-details.html?id=${p.id}"  class="product-link" style="text-decoration: none; color: inherit;">
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

// Mega Menu Search
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
      const title = p.title.toLowerCase();
      return searchWords.every(word => title.includes(word));
    });

    if (filtered.length === 0) {
      MegaMenuFilterContainer.classList.remove("show");
      return;
    }

    MegaMenuFilterContainer.classList.add("show");
    filtered.forEach(p => {
      MegaMenuFilterContainer.innerHTML += `
        <div class="MegaMenuContainer">
       <a href="/EcommerceWeb/product-details.html?id=${pro.id}" class="product-link" style="text-decoration: none; color: inherit;">
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
        </div>
      `;
    });
  });
}

// Close search on outside click
document.addEventListener("click", (event) => {
  if (filterContainer && !filterContainer.contains(event.target) && searchInput && !searchInput.contains(event.target)) {
      filterContainer.classList.remove("show");
  }
  
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

// Navigation Toggles
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

// Submenu toggles
const hasSubItems = document.querySelectorAll('.has-sub');
hasSubItems.forEach(item => {
  const link = item.querySelector('a');
  const submenu = item.querySelector('.sub-menu');
  const icon = item.querySelector('i');  

  if (link && submenu && icon) {
    link.addEventListener('click', (e) => {
      e.preventDefault(); 
      e.stopPropagation(); 

      submenu.classList.toggle('active');
      if (submenu.classList.contains('active')) {
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-angle-down');
      } else {
        icon.classList.remove('fa-angle-down');
        icon.classList.add('fa-angle-right');
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

    if (submenu && icon) {
      submenu.classList.toggle('active');

      if (submenu.classList.contains('active')) {
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-angle-down');
      } else {
        icon.classList.remove('fa-angle-down');
        icon.classList.add('fa-angle-right');
      }
    }
  });
});

// General Search Handlers
function handleSearch(query) {
  const value = query.trim();
  if (!value) return;
  window.location.href = `/EcommerceWeb/product.html?search=${encodeURIComponent(value)}`;
}

if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch(searchInput.value);
  });
}

if (MegaMenuInput) {
  MegaMenuInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch(MegaMenuInput.value);
  });
  
}
if(searchQuery){
  searchQuery.addEventListener('keydown',(e)=>{
    if(e.key==='Enter') handleSearch(searchQuery.value)
  })
}


const categories = document.querySelectorAll(".category");
const submenus = document.querySelectorAll(".submenu");
const MegaMenu = document.querySelector(".mega-menu");
const shopWrapper=document.querySelector(".shop-wrapper");


categories.forEach(cat => {
  cat.addEventListener("mouseenter", () => {
    
    categories.forEach(c => c.classList.remove("active"));
    submenus.forEach(s => s.classList.remove("active"));
    
    cat.classList.add("active");
    
    document.getElementById(cat.dataset.target).classList.add("active");
  });
 
  });

  let closeTimeout;

  shopWrapper.addEventListener("mouseenter", () => {
    clearTimeout(closeTimeout);
   MegaMenu.classList.add("active");
  });
  
  shopWrapper.addEventListener("mouseleave", () => {
    closeTimeout = setTimeout(() => {
      MegaMenu.classList.remove("active");
    }, 300); // Small delay before closing
  });
// Initial Load
renderCart();