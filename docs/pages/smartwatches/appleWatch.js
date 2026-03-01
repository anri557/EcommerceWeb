import { products } from "../../data/product.js";


const FilterAppWatch=document.getElementById("filter-applewatch")

function render(list){
if(!FilterAppWatch)return;

FilterAppWatch.innerHTML="";
const AppWatchList=list.filter(p=>p.title.toLowerCase().trim().includes('apple watch') && p.category ==="watches")


if(AppWatchList.length===0){
  FilterAppWatch.innerHTML=`No Products`
  return;
}

AppWatchList.forEach(p=>{
  FilterAppWatch.innerHTML+=
  `<div class="container">
    <a href="/docs/product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit;">
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