import { FireBaseContainer } from "../../Containers/index.js";


export class ProductsFirebase extends FireBaseContainer {
  constructor() {
    super({
      collections: "ecommerce",
      data: "products",
    });
  }
}