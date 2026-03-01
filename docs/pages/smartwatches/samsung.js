import { products } from "../../data/product.js";


const FilterSamsungWatch=document.getElementById("filter-samsungWatches")

function render(list){
if(!FilterSamsungWatch)return;

FilterSamsungWatch.innerHTML="";
const SamsungWatchList=list.filter(p=>p.title.toLowerCase().trim().includes('samsung galaxy watch') && p.category ==="watches")


if(SamsungWatchList.length===0){
  FilterSamsungWatch.innerHTML=`No Products`
  return;
}

SamsungWatchList.forEach(p=>{
  FilterSamsungWatch.innerHTML+=
  `<div class="product-card">
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
})
}
render(products)