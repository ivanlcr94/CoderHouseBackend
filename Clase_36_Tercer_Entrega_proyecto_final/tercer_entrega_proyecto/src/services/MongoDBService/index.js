import mongoose from "mongoose";
import { config } from "../../config/index.js";

const init = async () => {
  try {
    mongoose.connect(config.DATABASES.mongo.url, {
      dbName: config.DATABASES.mongo.dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Conexion con mongoDB iniciada");
  } catch (error) {
    console.log(error);
  }
};
export const MongoDBService = {
  init,
};
