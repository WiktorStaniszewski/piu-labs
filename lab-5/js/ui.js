import { store } from "./store.js";
import { randomHsl } from "./helpers.js";

const board = document.getElementById("board");
const cntSquares = document.getElementById("cntSquares");
const cntCircles = document.getElementById("cntCircles");

function renderShape(shape) {
   const element = document.createElement("div");
   element.className = `shape ${shape.type}`;
   element.style.backgroundColor = shape.color;
   element.dataset.id = shape.id;
   return element;
}

function updateUI(state) {
   cntSquares.textContent = store.countSquares();
   cntCircles.textContent = store.countCircles();

   const existingIds = new Set(
      [...board.children].map((child) => child.dataset.id)
   );
   const stateIds = new Set(state.shapes.map((shape) => shape.id));

   state.shapes.forEach((shape) => {
      if (!existingIds.has(shape.id)) {
         board.appendChild(renderShape(shape));
      }
   });

   [...board.children].forEach(element => {
      if (!stateIds.has(element.dataset.id)) {
         element.remove();
      }
   });

   [...board.children].forEach(element => {
      const shape = state.shapes.find(s => s.id === element.dataset.id);
      if (shape) element.style.backgroundColor = shape.color;
   });
}
store.subscribe(updateUI);
updateUI(store.state);

board.addEventListener("click", (event) => {
   const id = event.target.dataset.id;
   if (id) store.removeShape(id);
});