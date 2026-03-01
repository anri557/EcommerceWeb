import { products } from "../../data/product.js";


const Filterjbl=document.getElementById("filter-JBL")

function render(list){
if(!Filterjbl)return;

Filterjbl.innerHTML="";
const jblList=list.filter(p=>p.title.toLowerCase().trim().includes('jbl') && p.category ==="headphones")


if(jblList.length===0){
  Filterjbl.innerHTML=`No Products`
  return;
}

jblList.forEach(p=>{
  Filterjbl.innerHTML+=
  `<div class="container">
    <a  href="/docs/product-details.html?id=${p.id}" class="product-link" style="text-decoration: none; color: inherit;">
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