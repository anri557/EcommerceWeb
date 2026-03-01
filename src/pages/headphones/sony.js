import { products } from "../../data/product.js";


const Filtersony=document.getElementById("filter-Sony")

function render(list){
if(!Filtersony)return;

Filtersony.innerHTML="";
const sonyList=list.filter(p=>p.title.toLowerCase().trim().includes('sony') && p.category ==="headphones")


if(sonyList.length===0){
  Filtersony.innerHTML=`No Products`
  return;
}

sonyList.forEach(p=>{
  Filtersony.innerHTML+=
  `<div class="product-card">
    <a  href="/src/product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit;">
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
})
}
render(products)