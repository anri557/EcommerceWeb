import { products } from "../../data/product.js";


const FiltergarminWatch=document.getElementById("filter-GarminWatches")

function render(list){
if(!FiltergarminWatch)return;

FiltergarminWatch.innerHTML="";
const garminWatchList=list.filter(p=>p.title.toLowerCase().trim().includes('garmin') && p.category ==="watches")


if(garminWatchList.length===0){
  FiltergarminWatch.innerHTML=`No Products`
  return;
}

garminWatchList.forEach(p=>{
  FiltergarminWatch.innerHTML+=
  `<div class="container">
    <a href="/EcommerceWeb/product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit;">
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