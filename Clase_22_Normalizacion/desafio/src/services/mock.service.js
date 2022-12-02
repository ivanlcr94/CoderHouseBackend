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


const objetoss = { 
    author: {
        id: 'mail del usuario', 
        nombre: 'nombre del usuario', 
        apellido: 'apellido del usuario', 
        edad: 'edad del usuario', 
        alias: 'alias del usuario',
        avatar: 'url avatar (foto, logo) del usuario'
    },
    text: 'mensaje del usuario'
}
