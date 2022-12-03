import { createFakeproduct } from "../utils/productos.utils.js";

class MockService {
    items=[]
    constructor(){}
  getAll(qty = 5) {
    for (let i = 1; i <= qty; i++) {
      const newItem = createFakeproduct(i);
      this.items.push(newItem);
    }
    return this.items;
  }
}

export {MockService};

