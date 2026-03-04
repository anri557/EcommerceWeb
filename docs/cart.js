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
renderCart();