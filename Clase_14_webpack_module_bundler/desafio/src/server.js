import { routerProductos } from "../router/productos.js";
import  express  from "express";
import { routerCarrito } from "../router/carrito.js";

//Creando servidor de express 

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));

// Llamo al router


app.use('/', routerProductos);
app.use("/", routerCarrito); 

// Llamo a express.static

app.use('/formulario', express.static('public'));

