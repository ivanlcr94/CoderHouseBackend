import { verifyrole } from "../src/middlewares/verifyRole.js";
import { Container } from "../src/containers/Container.js";
import  express  from "express";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

const router = express.Router();

// instancia de productos
const productos = new Container("productos");

// GET '/api/productos' -> devuelve todos los productos.
router.get('/api/productos', async (req, res) => {
    const mostrarProductos = await productos.getAll()
    res.json(mostrarProductos);
})


// GET '/api/productos/:id' -> devuelve un producto según su id.
router.get('/api/productos/:id', async (req, res) => {
    const id = req.params.id
    const foundElement = await productos.getById(id)
    
    res.send(foundElement == undefined ? "Producto no encontrado" : foundElement );
})


// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id y timestamp asignado.
router.post('/api/productos', verifyrole, async (req, res) => {
    const element = req.body;
    const todosLosProductos = await productos.getAll()
    const id = todosLosProductos.length === 0 ? 1 : todosLosProductos[todosLosProductos.length - 1].id + 1;
    
    const date = new Date()
    const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss');

    element.id = parseInt(id);
    element.timestamp = dateFormated

    await productos.save(element);

    res.status(200).send('Producto agregado');
})


// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put('/api/productos/:id', verifyrole, async (req, res) => {
    const id = req.params.id;
    const foundElement = await productos.getById(id)

    if (foundElement){
        await productos.deleteById(id);
        const element = req.body;

        const date = new Date()
        const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss');

        element.timestamp = dateFormated
        element.id = parseInt(id);
        await productos.save(element);
    } else {
        console.log("no existe")
    }

    res.send(foundElement? "Se modifico producto" : "el producto no existe");
})


// DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/api/productos/:id', verifyrole, async (req, res) => {
    const id = req.params.id;
    const foundElement = await productos.getById(id)

   const eliminarElemento = foundElement? await productos.deleteById(id) : "el producto no existe";  

    res.send(eliminarElemento? "el producto no existe":'se elimino el producto');
})

// EXPORTAMOS ROUTER

export {router as routerProductos};

