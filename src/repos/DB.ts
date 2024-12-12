import Mongoose, { Connection, Schema } from "mongoose";
import { IUsuario } from "@src/models/Usuario";
import { IPost } from "@src/models/Post";

// Definición de esquemas
const UserSchema: Schema = new Mongoose.Schema(
    {
        Nombre: { type: String, required: true },
        Contraseña: { type: String, required: true },
        edad: { type: Number, required: true },
        email: { type: String, required: true }
    },
    { collection: "users", versionKey: false }
);

const PostSchema: Schema = new Mongoose.Schema(
    {
        IdPost: { type: Number, required: false },
        Titulo: { type: String, required: true },
        Contenido: { type: String, required: true },
        Fecha: { type: Date, required: true },
        IdUsuario: { type: Number, required: true }
    },
    { collection: "posts", versionKey: false }
);

// Crear la conexión a MongoDB
export const db: Connection = Mongoose.createConnection("mongodb://127.0.0.1:27017/LocalME");

// Escuchar eventos de conexión
db.on("connected", () => {
    console.log("Conexión a MongoDB exitosa");
});

db.on("error", (err) => {
    console.error("Error de conexión a MongoDB:", err);
});

db.on("disconnected", () => {
    console.log("Desconectado de MongoDB");
});

// Modelos
export const UserModel = db.model<IUsuario>("users", UserSchema);
export const PostModel = db.model<IPost>("posts", PostSchema);
