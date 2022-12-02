import { faker } from '@faker-js/faker';
faker.locale = "es";

const createFakeproduct = () => {
    return {
        producto: faker.commerce.product(),
        precio: faker.commerce.price(),
        urlImagen: faker.image.cats()
    }
  };

  export {createFakeproduct};