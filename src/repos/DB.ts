import jsonfile from "jsonfile";

import Mongoose, { Connection, Model, Schema } from "mongoose";
import exp from "constants";
import { MongoOIDCError } from "mongodb";
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
      Comentarios: [
        {
        usuarioId: Number,
        Contenido: String,
        fecha: Date,
        cantLikes: Number,
        IdComentario: Number,
        UsersLikes: [Number]
        }
      ],
      CantLikes: {type: Number, required:true}
    },
    {collection: "posts", versionKey: false}
);


export const db: Connection = Mongoose.createConnection("mongodb://localhost:27017/LocalME");

export const UserModel = db.model<IUsuario>("users", UserSchema);
export const PostModel = db.model<IPost>("posts", PostSchema);