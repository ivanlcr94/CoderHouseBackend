import { Router } from "express";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { ProductController } from "../../controllers/index.js";

const router = Router();

// Muestra todos los productos
router.get("/", ProductController.getAll);

// Busca producto por su ID
router.get("/:id", ProductController.getById);

// Crea producto por body, con el validador de joy y verifica rol de admin
router.post("/", verifyRole, ProductController.createProduct);

// elimina producto por su ID
router.delete("/:id", ProductController.deleteById);

export { router as ProductRouter };
