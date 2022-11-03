import { productos } from "../router/productos.js";
import { verifyrole } from "../src/middlewares/verifyRole.js";
import { Container } from "../src/containers/Container.js";
import  express  from "express";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParseFormat)

const router = express.Router();

// instancia de carrito
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
    element.productos = []
    await carrito.save(element);

    res.send("nuevo carrito id: " + id)
});

// DELETE: '/:id' - Vacía un carrito y lo elimina.
router.delete('/api/carrito/:id', async (req, res) => {
    const id = req.params.id;
    const foundElement = await carrito.getById(id);

   const eliminarElemento = foundElement? await carrito.deleteById(id) : "el carrito no existe";  

    res.send(eliminarElemento? "el carrito no existe":'se elimino el carrito');
});

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
router.get('/api/carrito/:id/productos', async (req, res) =>{
    const id = req.params.id;
    const foundElement = await carrito.getById(id);

    res.send(foundElement? foundElement.productos : 'el carrito no existe')
})

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
router.post('/api/carrito/:id/productos/', async (req, res) =>{
    const id = req.params.id;
    const card = await carrito.getById(id);

    if(card) {
        const { productId } = req.body;
        const productoSeleccionado = await productos.getById(productId)
        if (!productoSeleccionado) return res.send("no existe el producto");
        card.productos.push(productoSeleccionado)
        const cargarCarrito = await carrito.updateById(id, card)
    } else {
       return res.send("no existe el carro perro")
    }

    
    res.send("el producto se guardo correctamente")
})


// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

router.delete('/api/carrito/:id/productos/:id_prod', async (req, res) =>{
    const id = req.params.id;
    const cart = await carrito.getById(id);

    if(cart) {
        const id_prod = req.params.id_prod;
       if (!cart.productos.find(element => element.id == id_prod)) return res.send("no existe el producto");
        const filterElement = cart.productos.filter((element) => element.id != id_prod)
        cart.productos = filterElement
        const cargarCarrito = await carrito.updateById(id, cart);
    } else {
       return res.send("no existe el carro perro")
    }

    
    res.send("el producto se elimino correctamente")
})

// EXPORTAMOS ROUTER

export {router as routerCarrito};