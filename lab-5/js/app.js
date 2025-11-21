import { store } from "./store.js";
import { randomHsl } from "./helpers.js";
import './ui.js';

document.getElementById("addSquare")
  .addEventListener("click", () =>
    store.addShape("square", randomHsl())
  );

document.getElementById("addCircle")
  .addEventListener("click", () =>
    store.addShape("circle", randomHsl())
  );

document.getElementById("recolorSquares")
  .addEventListener("click", () =>
    store.recolor("square", randomHsl)
  );

document.getElementById("recolorCircles")
  .addEventListener("click", () =>
    store.recolor("circle", randomHsl)
  );
