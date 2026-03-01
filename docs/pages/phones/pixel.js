import { products } from "../../data/product.js";

const FilterPixel=document.getElementById("filter-pixel")

function render(list){
  if(!FilterPixel)return;

  FilterPixel.innerHTML="";

  const PixelList=list.filter(p=>p.title.toLowerCase().includes("google") && p.category=== "phones");

  if(PixelList.length===0){
    FilterPixel.innerHTML=`<p>No products</p>`
    return;

  }

  PixelList.forEach(p => {
    FilterPixel.innerHTML +=`
        <div class="container">
        <a  href="/product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit;">
          <div class="product-img">
            <img src="${p.image}" alt="${p.title}" />
          </div>
          <div class="product-info">
            <h3>${p.title}</h3>
            <p>$${p.price}</p>
          </div>
        </a>
        
        <button class="AddCart" data-id="${p.id}">Add to Cart</button>
      </div>
    `;
  });
}
render(products)