import loadTemplate from "../js/loadTemplate.js";

let template = null;

export default class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

   async connectedCallback() {
      if (!template) {
         template = await loadTemplate("./components/product-card.html");
      }
      this.shadowRoot.appendChild(template.content.cloneNode(true));
   }
}

customElements.define("product-card", ProductCard);