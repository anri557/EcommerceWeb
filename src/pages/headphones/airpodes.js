import { products } from "../../data/product.js";


const FilterAirpods=document.getElementById("filter-airpods")

function render(list){
if(!FilterAirpods)return;

FilterAirpods.innerHTML="";
const AirpodsList=list.filter(p=>p.title.toLowerCase().trim().includes('airpods') && p.category ==="headphones")


if(AirpodsList.length===0){
  FilterAirpods.innerHTML=`No Products`
  return;
}

AirpodsList.forEach(p=>{
  FilterAirpods.innerHTML+=
  `<div class="container">
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