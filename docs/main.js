import { products } from "./data/product.js";

const container = document.getElementById("products");

// Function to render products
function renderProducts(list) {
  const container = document.getElementById("products");

  // 🌟 THE SAFETY GUARD
  if (!container) {
    // If the element 'products' isn't on this page, stop here and don't crash.
    return; 
  }

  container.innerHTML = ""; 
  list.forEach(p => {
    container.innerHTML += `
    <div class="container">
   <a href="/EcommerceWeb/pages/product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit;">
    <div class="product-img">
    <img src="${p.image}" />
    </div>
    <div class="product-info">
    <div class="product-title">
    <h3>${p.title}</h3>
    </div>
    <p>price: $${p.price}</p>
    </div>
     <button class="AddCart" data-id="${p.id}">Add to Cart</button>
    </div>
    `;
  });
}

// Initial render
renderProducts(products); 

const filterContainer = document.getElementById("filtered-products");
const searchInput = document.getElementById("search-input");

document.addEventListener("click", (event) => {
  const isClickInside =
    filterContainer.contains(event.target) ||
    searchInput.contains(event.target);

  if (!isClickInside) {
    filterContainer.classList.remove("show");
  }
});

searchInput.addEventListener("input", () => {
  const SearchValue = searchInput.value.toLowerCase().trim();
  filterContainer.innerHTML = ""; 
if (SearchValue==="" ) {
    filterContainer.classList.remove("show");
    return;
  } 
  const searchWords=SearchValue.split(" ");

  const filtered=products.filter(p=>{
    const title=p.title.toLowerCase()
    return searchWords.every(words=>title.includes(words))
  })
if(filtered.length==0){
  filterContainer.classList.remove("show")

}
filterContainer.classList.add("show")
filtered.forEach(p => {
  filterContainer.innerHTML += `
   <div class="filtered-container"> 
<a href="/EcommerceWeb/pages/product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit;">
   <div class="filtered-img">
    <img src="${p.image}" /> 
    </div> 
    <div class="filtered-info">
     <div class="filtered-title"> 
     <h3>${p.title}</h3> 
     </div>
     <div class="filtered-price">
      <p>price: $${p.price}</p> 
      </div>
      </div>`
});
});


const searchQuery = document.getElementById("search-query");
const hidenSearch = document.querySelector(".hidden-search");
const searchBtn = document.querySelector(".search-box");

// Toggle mobile search
searchBtn.addEventListener("click", () => {
  hidenSearch.classList.toggle("active");
});

// Close on outside click
document.addEventListener("click", (event) => {
  const isClicked =
    hidenSearch.contains(event.target) ||
    searchBtn.contains(event.target) ||
    (filterContainer && filterContainer.contains(event.target));

  if (!isClicked) {
    hidenSearch.classList.remove("active");
    filterContainer.classList.remove("show");
  }
});

// Search logic
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
filterContainer.innerHTML = ""; // Clear old results first to prevent duplicates

filtered.forEach(p => {
  filterContainer.innerHTML += `
    <div class="filtered-container">
     <a href="/EcommerceWeb/docs/product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit;">
        <div class="filtered-img">
          <img src="${p.image}" alt="${p.title}" />
        </div>
        <div class="filtered-info">
          <div class="filtered-title">
            <h3>${p.title}</h3>
          </div>
          <div class="filtered-price">
            <p>$${p.price}</p>
          </div>
        </div>
      </a> </div>
  `;
});
});

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
const hamburger=document.querySelector(".hamburger");
const activeMenu=document.querySelector(".Activemenu");
const closeMenu = document.querySelector('#closeMenu');

hamburger.addEventListener("click", () => {
  activeMenu.classList.add("active");
});
closeMenu.addEventListener("click", () => {
  activeMenu.classList.remove("active");
});

// Submenu toggles
const hasSubItems = document.querySelectorAll('.has-sub');

hasSubItems.forEach(item => {
  const link = item.querySelector('a');
  const submenu = item.querySelector('.sub-menu');
  const icon = item.querySelector('i');  

  link.addEventListener('click', (e) => {
    e.preventDefault();  // ← This prevents navigation to shop.html
    e.stopPropagation(); // 🔥 THIS IS THE KEY

    submenu.classList.toggle('active');
    if (submenu.classList.contains('active')) {
      icon.classList.remove('fa-angle-right');
      icon.classList.add('fa-angle-down');
    } else {
      icon.classList.remove('fa-angle-down');
      icon.classList.add('fa-angle-right');
    }
  });
});
document.querySelectorAll('.has-subsub > a ').forEach(span => {
  span.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const parent = span.closest('.has-subsub');
    const submenu = parent.querySelector('.sub-menu-level2');
    const icon = span.querySelector('i');

    submenu.classList.toggle('active');

    if (submenu.classList.contains('active')) {
      icon.classList.remove('fa-angle-right');
      icon.classList.add('fa-angle-down');
    } else {
      icon.classList.remove('fa-angle-down');
      icon.classList.add('fa-angle-right');
    }
  });
});

 
const MegaMenuInput = document.getElementById("MegaMenuInput");
const MegaMenuFilterContainer = document.getElementById("filtered-products2");

MegaMenuInput.addEventListener("input", () => {
  const value = MegaMenuInput.value.toLowerCase().trim();
  MegaMenuFilterContainer.innerHTML = "";

  // 1️⃣ If input is empty → hide
  if (value === "") {
    MegaMenuFilterContainer.classList.remove("show");
    return;
  }

  // 2️⃣ Split words
  const searchWords = value.split(" ");

  // 3️⃣ Filter products
  const filtered = products.filter(p => {
    const title = p.title.toLowerCase();
    return searchWords.every(word => title.includes(word));
  });

  // 4️⃣ If no matches → hide
  if (filtered.length === 0) {
    MegaMenuFilterContainer.classList.remove("show");
    return;
  }

  // 5️⃣ Show results
  MegaMenuFilterContainer.classList.add("show");

  filtered.forEach(p => {
    MegaMenuFilterContainer.innerHTML += `
    <div class="MegaMenuContainer">
       <a href="/EcommerceWeb/docs/product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit;">
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


function bindSearch(input) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSearch(input.value);
    }
  });
}




function handleSearch(query) {
  const value = query.trim();
  if (!value) return;


    window.location.href = `/EcommerceWeb/product.html?search=${encodeURIComponent(value)}`;
}
bindSearch(searchInput);
bindSearch(MegaMenuInput);
bindSearch(searchQuery)

//Products button

const productBtn = document.querySelectorAll(".productBtn");
function HandleProducts(category) {
  if (!container) return;
  const filtered = products.filter(p => p.category === category);

  container.innerHTML = "";

  filtered.forEach(pro => {
    container.innerHTML += `
  <a href="/EcommerceWeb/docs/product-details.html?id=${p.id}"class="product-link" style="text-decoration: none; color: inherit;">
      <div class="container">
        <div class="product-img">
          <img src="${pro.image}" />
        </div>
        <div class="product-info">
          <h3>${pro.title}</h3>
          <p>price: $${pro.price}</p>
        </div>
        <button class="AddCart" data-id="${pro.id}">Add to cart</button>
      </div>
    `;
  });
}

productBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    productBtn.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    HandleProducts(btn.dataset.category);
  });
});


HandleProducts("phones");


const features = document.querySelector(".features");
const cards = document.querySelectorAll(".feature");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");


if (features && cards.length > 0 && nextBtn && prevBtn) {
  let index = 0;

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 800) {
      
      features.style.transform = `translateX(-${index * 0}px)`;
    }
  });

  function updateSlider() {

    if (cards[0]) {
      const cardWidth = cards[0].offsetWidth + 50; 
      features.style.transform = `translateX(-${index * cardWidth}px)`;
    }
  }


  updateSlider();

  nextBtn.addEventListener("click", () => {
    if (index < cards.length - 1) {
      index++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });
}
//cart
// 1. Initialize Cart from LocalStorage or empty array
let cart = JSON.parse(localStorage.getItem("CART_DATA")) || [];

// 2. Delegate click event for "Add to Cart" buttons
// We use delegation because products are rendered dynamically
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("AddCart")) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});

function addToCart(id) {
  // Find product in your imported products list
  const product = products.find((p) => p.id === id);
  
  // Check if it's already in the cart
  const exists = cart.find((item) => item.id === id);

  if (exists) {
    exists.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // Save to LocalStorage
  localStorage.setItem("CART_DATA", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
}