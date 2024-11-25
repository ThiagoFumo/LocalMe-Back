
import jsonfile from 'jsonfile';
import { IPost } from '@src/models/Post';

const DB_FILE_NAME = 'DatabasePosts.json';

interface IPO {
    Posts: IPost[];
}

//funcion para abrir la base de datos 
async function openDb(): Promise<IPO> {
    return jsonfile.readFile((__dirname + '/' + DB_FILE_NAME));
}

  function saveDb(db: IPO): Promise<void> {
    return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}

export default {
    openDb,
    saveDb,
  } as const;