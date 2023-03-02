import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  nombre: String,
  direccion: String,
  edad: Number,
  telefono: Number,
});

export const UserModel = mongoose.model("User", userSchema);