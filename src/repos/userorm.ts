
import jsonfile from 'jsonfile';
import { IUsuario } from '@src/models/Usuario';

const DB_FILE_NAME = 'DatabaseUsuarios.json';

interface IDb {
    Users: IUsuario[];
}

//funcion para abrir la base de datos 
async function openDb(): Promise<IDb> {
    return jsonfile.readFile((__dirname + '/' + DB_FILE_NAME));
}

  function saveDb(db: IDb): Promise<void> {
    return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}

export default {
    openDb,
    saveDb,
  } as const;