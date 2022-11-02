import { verifyrole } from "../src/middlewares/verifyRole.js";
import { Container } from "../src/containers/Container.js";
import  express  from "express";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

const router = express.Router();

// instancia de productos
const carrito = new Container("carrito");

// POST: '/' - Crea un carrito y devuelve su id.
router.post("/api/carrito", async (req, res) => {
    const element = {}
    const todosLosCarritos = await carrito.getAll()
    const id = todosLosCarritos.length === 0 ? 1 : todosLosCarritos[todosLosCarritos.length - 1].id + 1;
    
    const date = new Date()
    const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss');

    element.id = parseInt(id);
    element.timestamp = dateFormated

    await carrito.save(element);

    res.send("id del carrito: " + id)
})

// DELETE: '/:id' - Vacía un carrito y lo elimina.
router.delete('/api/carrito/:id', async (req, res) => {
    const id = req.params.id;
    const foundElement = await carrito.getById(id)

   const eliminarElemento = foundElement? await carrito.deleteById(id) : "el producto no existe";  

    res.send(eliminarElemento? "el carrito no existe":'se elimino el carrito');
})


// EXPORTAMOS ROUTER

export {router as routerCarrito};