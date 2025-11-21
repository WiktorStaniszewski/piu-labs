import { uid } from "./helpers.js";

class Store {
   constructor() {
      this.subscribers = [];

      const saved = localStorage.getItem("shapes-state");
      this.state = saved ? JSON.parse(saved) : { shapes: [] };
   } 


   // Subscription management - 
   subscribe(callback) {
      this.subscribers.push(callback);
   }

   notify() {
      localStorage.setItem("shapes-state", JSON.stringify(this.state));
      this.subscribers.forEach((cb) => cb(this.state));
   }


   // Shape management
   addShape(type, color) {
      this.state.shapes.push( {
         id: uid(),
         type,
         color
      } );
      this.notify();
   } 

   removeShape(id) {
      this.state.shapes = this.state.shapes.filter((shape) => shape.id !== id);
      this.notify();
   }

   recolor(type, newColorFn) {
      this.state.shapes
         .filter((shape) => shape.type === type)
         .forEach((shape) => {
            shape.color = newColorFn();
         });
      this.notify();
   }


   // Counters for the shapes 
   countSquares() {
      return this.state.shapes.filter((shape) => shape.type === "square").length;
   }

   countCircles() {
      return this.state.shapes.filter((shape) => shape.type === "circle").length;
   }
}

export const store = new Store();