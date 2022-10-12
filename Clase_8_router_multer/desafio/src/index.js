import { router } from "../router/ApiRouter.js";
import  express  from "express";

//Creando servidor de express 

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', err => console.log(`Error: ${err}`));

// Llamo al router

const productRouter = router

app.use('/', productRouter );

// Llamo a express.static

app.use('/formulario', express.static('public'));

