import { config } from "../config/index.js";
import { MongoDBService } from "../services/index.js";
import { FireBaseService } from "../services/FireBaseService/index.js"
import { CartsMongo, CartsFilesystem, CartsMemory } from "./Carts/index.js";
import { ProductsMongo, ProductsFilesystem, ProductsMemory, ProductsFirebase } from "./Products/index.js";

const getSelectedDaos = () => {
  switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductDao: new ProductsMongo(),
        CartDao: new CartsMongo(),
      };
    }
    case "filesystem": {
      return {
        ProductDao: new ProductsFilesystem(),
        CartDao: new CartsFilesystem(),
      };
    }
    case "memory": {
      return {
        ProductDao: new ProductsMemory(),
        CartDao: new CartsMemory(),
      };
    }
    case "firebase":{
      FireBaseService.conect();
      return {
        ProductDao: new ProductsFirebase()

      }
    }
  }
};

const { ProductDao, CartDao } = getSelectedDaos();

export { ProductDao, CartDao };
