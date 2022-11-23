import { DATE_UTILS, ERRORS_UTILS } from "../../utils/index.js";
import { CartDao, ProductDao } from "../../Dao/index.js";



// Consulta los carritos creados
const getAll = async (req, res) => {
  const { id } = req.params;

  const cart = await CartDao.getById(id);

  res.send({ success: true, cart });
};

// Crea un carrito
const createCard = async (req, res) => {
  const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

  const cart = await CartDao.save(baseCart);

  res.send({ success: true, cartId: cart.id });
};

// Inserta productos con el productId
const insertProduct = async (req, res) => {
  const { productId } = req.body;
  const { cartId } = req.params;

  const cart = await CartDao.getById(cartId);

  if (!cart)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });

  const product = await ProductDao.getById(productId);

  if (!product)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

  // TODO
  cart.products.push(product);

  const updatedCart = await CartDao.updateById(cartId, cart);

  res.send({ success: true, cart: updatedCart });
};

export const CartController = {
    getAll,
    createCard,
    insertProduct
  };