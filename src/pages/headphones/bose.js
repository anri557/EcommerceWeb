import { products } from "../../data/product.js";


const Filterbose=document.getElementById("filter-bose")

function render(list){
if(!Filterbose)return;

Filterbose.innerHTML="";
const boseList=list.filter(p=>p.title.toLowerCase().trim().includes('bose') && p.category ==="headphones")


if(boseList.length===0){
  Filterbose.innerHTML=`No Products`
  return;
}

boseList.forEach(p=>{
  Filterbose.innerHTML+=
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