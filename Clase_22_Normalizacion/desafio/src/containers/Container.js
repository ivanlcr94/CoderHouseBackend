import fs from "fs";

class Container {
  constructor(fileName) {
    this.filePath = `./src/db/${fileName}.json`;
  }
 
  
  async getAll() {
    try {
      const file = await fs.promises.readFile(this.filePath, "utf8");
      const elements = JSON.parse(file);

      return elements;
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
        return [];
      }
      console.log(error);
    }
  }

  
  async save(element) {
    try {
      const elements = await this.getAll();

      /* const id =
        elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;

      element.id = id; */

    
      elements[0].mensajes.push(element);

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(elements, null, 3)
      );

      return element.id;
    } catch (error) {
      console.log(error);
    }
  }

 

}

export { Container };