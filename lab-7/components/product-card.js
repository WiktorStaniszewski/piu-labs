import loadTemplate from "../js/loadTemplate.js";

let template = null;

export default class ProductCard extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._product = null;
   }

   set product(value) {
      this._product = value;
      this.render();
   }

   async connectedCallback() {
      if (!template) {
         template = await loadTemplate("./components/product-card.html");
      }
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.shadowRoot.querySelector('.add-to-cart').addEventListener('click', () => { 
         this.handleAddToCart();
      });

      this.render();
   }

   handleAddToCart() {
      const selectedSize = this.shadowRoot.querySelector(`input[name="size-${this._product.id}"]:checked`)?.value;
      const selectedColor = this.shadowRoot.querySelector(`input[name="color-${this._product.id}"]:checked`)?.value;

      const productToAdd = {
          ...this._product,
          selectedSize: selectedSize || null,
          selectedColor: selectedColor || null
      };

      this.dispatchEvent(new CustomEvent('add-to-cart', { 
          detail: productToAdd, 
          bubbles: true, 
          composed: true
      })); 
   }

   render() {
    if (!this._product || !this.shadowRoot.querySelector(".product-name")) return;

    this.shadowRoot.querySelector(".product-name").textContent = this._product.name;
    this.shadowRoot.querySelector(".product-price").textContent = `${this._product.price} zł`;
    
    const img = this.shadowRoot.querySelector("img");
    img.src = this._product.image;
    img.alt = this._product.name;

    const promoEl = this.shadowRoot.querySelector(".product-promotion");
    if (promoEl) {
        promoEl.textContent = this._product.promotion || "";
        promoEl.style.display = this._product.promotion ? "block" : "none";
    }

    const colorsEl = this.shadowRoot.querySelector(".product-colors");
    if (colorsEl) {
        colorsEl.textContent = this._product.colors ? `Kolory: ${this._product.colors}` : "";
    }

    const sizesEl = this.shadowRoot.querySelector(".product-sizes");
    if (sizesEl) {
        sizesEl.textContent = this._product.sizes ? `Rozmiary: ${this._product.sizes}` : "";
    }
   }
}

customElements.define("product-card", ProductCard);