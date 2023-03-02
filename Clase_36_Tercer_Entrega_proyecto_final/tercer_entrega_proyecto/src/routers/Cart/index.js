import { Router } from "express";
import { CartController } from "../../controllers/index.js";

const router = Router();

// Muestra todos los carritos
router.get("/:id",CartController.getAll );

// Crea un nuevo carrito
router.post("/", CartController.createCard );

// Carga un producto por body enviando productId
router.post("/:cartId/products", CartController.insertProduct );

export { router as CartRouter };
