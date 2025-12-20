export default class ShoppingCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._items = [];
  }

  connectedCallback() {
    this.render();
  }

  addItem(item) {
    this._items.push(item);
    this.render();
  }

  removeItem(index) {
    this._items.splice(index, 1);
    this.render();
  }

   render() {
      const total = this._items.reduce((sum, item) => sum + item.price, 0).toFixed(2);
       
       this.shadowRoot.innerHTML = `
           <style>
               :host { display: block; border: 1px solid #ccc; padding: 10px; min-width: 300px; justify-items: center; border-radius: 8px; }
               .item { display: flex; justify-content: space-between; margin-bottom: 5px; border-bottom: 1px solid #eee; padding: 5px; }
               span { font-size: 1rem; align-self: center; }
               button { background: none; border: none; cursor: pointer; font-size: 1rem; padding: 10px; font-weight: bold; }
           </style>
           <h3>Twój koszyk</h3>
           <div id="list">
               ${this._items.map((item, index) => `
                   <div class="item">
                       <span>${item.name}</span>
                       <span>${item.price} zł 
                           <button data-index="${index}" style="margin-left:10px; color:red;">X</button>
                       </span>
                   </div>
               `).join('')}
           </div>
           <hr>
           <strong>Suma: ${total} zł</strong>
       `;

       this.shadowRoot.querySelectorAll('button').forEach(btn => {
           btn.onclick = () => this.removeItem(btn.dataset.index);
       });
   }
}

customElements.define("shopping-cart", ShoppingCart);