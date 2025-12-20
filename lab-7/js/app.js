import productsData from '../data/data.json' with { type: 'json' };
import '../components/product-card.js';
import '../cart/shopping-cart.js';

const listContainer = document.getElementById('product-list');
const cart = document.getElementById('main-cart');

productsData.forEach(data => {
   const card = document.createElement('product-card');
   card.product = data;
   
   card.addEventListener('add-to-cart', (e) => {
         cart.addItem(e.detail);
   });

   listContainer.appendChild(card);
});