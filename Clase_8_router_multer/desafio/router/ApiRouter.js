// Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.


import  express  from "express";

const router = express.Router();

// soporte de persistencia en memoria array productos.
const productos = [{
    title: "pala",
    price: 500,
    thumbnail: "url.imagen",
    id: 1
}];


// GET '/api/productos' -> devuelve todos los productos.
router.get('/api/productos', (req, res) => {
    res.send(productos);
})


// GET '/api/productos/:id' -> devuelve un producto según su id.
router.get('/api/productos/:id', (req, res) => {
    const id = req.params.id
    const foundElement = productos.find((element) => element.id == id);
    
    res.send(foundElement == undefined ? "Producto no encontrado" : foundElement );
})


// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post('/api/productos', async (req, res) => {
    const element = req.body;
    const id = productos.length === 0 ? 1 : productos[productos.length - 1].id + 1;
    element.id = id;
    productos.push(element);

    res.status(200).send('Producto agregado');
})


// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    obj.id = parseInt(id)
    const foundElement = productos.find((element) => element.id == id);
    const modificarElemento = foundElement == undefined ? "El producto que quiere modificar no existe" : productos.splice(id-1, 1, obj);

    res.send(modificarElemento);
})


// DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    obj.id = parseInt(id)
    const foundElement = productos.find((element) => element.id == id);
    const eliminarElemento = foundElement == undefined ? "El producto que quiere eliminar no existe" : productos.splice(id-1, 1);

    res.send(eliminarElemento);
})

// EXPORTAMOS ROUTER

export {router};

