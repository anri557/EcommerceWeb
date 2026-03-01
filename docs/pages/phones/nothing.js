import { products } from "../../data/product.js";


const FilterNothing=document.getElementById("filter-nothing")

function render(list){
if(!FilterNothing)return;

const NothingList=list.filter(p=>p.title.toLowerCase().includes('nothing') && p.category ==="phones")

if(NothingList.length===0){
  FilterNothing.innerHTML=`No Products`
  return;
}

NothingList.forEach(p=>{
  FilterNothing.innerHTML+=
  `<div class="container">
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