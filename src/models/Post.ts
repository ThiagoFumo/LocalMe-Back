import { IComentario } from "./Comentario";

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';

  export interface IPost {
    IdPost: number;
    IdUsuario: number;
    Imagen: string;
    Titulo: string;
    Contenido: string;
    Comentarios: IComentario[];
    fecha: Date;
    CantLikes: number;
}

export function newPost(
    id?: number,
    id2? : number,
    imagen?: string,
    titulo?: string,
    contenido?: string,
    comentarios?: IComentario[],
    fecha?: Date,
    cantLikes?: number
): IPost {
    return {
        IdPost: id ?? -1,
        IdUsuario: id2 ?? -1,
        Imagen: imagen ?? '',
        Titulo: titulo ?? '',
        Contenido: contenido ?? '',
        Comentarios: comentarios ?? [],
        fecha: fecha ?? new Date(),
        CantLikes: cantLikes ?? 0
    };
}

export function fromPost(param: unknown): IPost {
    if (!isPost(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    return param as IPost;
}

export function isPost(arg: unknown): arg is IPost {
    if (!arg || typeof arg !== 'object') {
        return false;
    }

    const post = arg as IPost;
    console.log(typeof post.IdPost === 'number')
    console.log(typeof post.IdUsuario === 'number')
    console.log(typeof post.Imagen === 'string')
    console.log(typeof post.Titulo === 'string')
    console.log(typeof post.Contenido === 'string')
    console.log(Array.isArray(post.Comentarios))
    console.log(typeof post.fecha === 'string')
    console.log(typeof post.CantLikes === 'number')

    return (
        typeof post.IdPost === 'number' &&
        typeof post.IdUsuario === 'number' &&
        typeof post.Imagen === 'string' &&
        typeof post.Titulo === 'string' &&
        typeof post.Contenido === 'string' &&
        Array.isArray(post.Comentarios) &&
        typeof post.fecha === 'string' &&
        typeof post.CantLikes === 'number'
    );
}

export default {
    new: newPost,
    from: fromPost,
    isPost,
};
