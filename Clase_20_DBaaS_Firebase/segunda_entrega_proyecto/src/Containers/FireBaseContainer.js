class FireBaseContainer {

    constructor(collections, data) {
      this.collections = collections ;
      this.data = data;
    }
  
    async getAll() {
        try{
            const document=await this.collections.get()
            return document.docs.map(doc =>{ return {...doc.data(), id:doc.id}} )
        }
        catch(e){
            console.error('Error al crear un docuemento: ',e);
        }
    }
  
    async save(element) {
     
    }
  
    async getById(id) {
      
    }
  
    async deleteById(id) {
      
    }
  
    async deleteAll() {
      
    }
  
    async updateById(id, newData) {
      
    }
  }
  
  export { FireBaseContainer };
  