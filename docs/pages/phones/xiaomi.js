import { products } from "../../data/product.js";

const FilterXiaomi=document.getElementById('filter-xiaomi')


function render(list){
  if(!FilterXiaomi)return;

  FilterXiaomi.innerHTML="";

  const xiaomiList=list.filter(p=>p.title.toLowerCase().includes('xiaomi') && p.category ==="phones")

  if(xiaomiList.length===0){
    FilterXiaomi.innerHTML=`No Product`
    return;
  }

  xiaomiList.forEach(p => {
    FilterXiaomi.innerHTML+=
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
  });
}
render(products)