import { Container } from "./containers/Container.js";
import  express  from "express";

//Creando servidor de express 

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));

const ProductContainer = new Container("productos");


// a) Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor

app.get('/productos', async (req, res) => {

 const mostrarProductos = await ProductContainer.getAll()
    res.json(mostrarProductos);
})


// b) Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

app.get('/productosRandom', async (req, res) => {
  const id = await ProductContainer.getAll()
  const producto= await ProductContainer.getById(Math.floor(Math.random()* id.length + 1))
  res.send(producto);
})











/*  ProductContainer.getAll()
   .then((data) => console.log({ data }))
   .catch((error) => console.log({ error })); */

/*  ProductContainer.save({
   title: "Guinche Pluma Hidráulico Plegable 2 Tn - Delfabro S.r.l",
   price: 116.698,
   thumbnail: "https://articulo.mercadolibre.com.ar/MLA-1125188244-guinche-pluma-hidraulico-plegable-2-tn-delfabro-srl-_JM#reco_item_pos=1&reco_backend=machinalis-homes-pdp-boos&reco_backend_type=function&reco_client=home_navigation-recommendations&reco_id=ca4c48aa-78b8-4ad3-a4db-028509f4ddd8&c_id=/home/navigation-recommendations/element&c_element_order=2&c_uid=34d971c8-5ff6-495b-8c38-3f67a715c34d",
 })
   .then((data) => console.log({ data }))
   .catch((error) => console.log({ error })); */


/*  ProductContainer.getById(2)
   .then((data) => console.log({ data }))
   .catch((error) => console.log({ error })); */

 /* ProductContainer.deleteById(1).then((data) => console.log({ data })); */
/*  ProductContainer.deleteAll(); */






