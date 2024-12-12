
import Mongoose, { Connection, Schema } from "mongoose";
import { IUsuario } from "@src/models/Usuario";
import { IPost } from "@src/models/Post";

const UserSchema: Schema = new Mongoose.Schema(
    {
      Nombre: {type: String, required:true},
      Contraseña: {type: String, required:true},
      edad: {type: Number, required:true},
      email: {type: String, required:true}
    },
    {collection: "users", versionKey: false}
);

const PostSchema: Schema = new Mongoose.Schema(
    {
      IdPost: {type: Number, required:false},
      Titulo: {type: String, required:true},
      Contenido: {type: String, required:true},
      Fecha: {type: Date, required:true},
      IdUsuario: {type: Number, required:true},
    },
    {collection: "posts", versionKey: false}
);


export const db: Connection = Mongoose.createConnection("mongodb://127.0.0.1:27017/LocalME");

export const UserModel = db.model<IUsuario>("users", UserSchema);
export const PostModel = db.model<IPost>("posts", PostSchema);
