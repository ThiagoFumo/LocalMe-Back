

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';

  export interface IPost {
    IdPost: number;
    IdUsuario: number;
    Titulo: string;
    Contenido: string;
    fecha: Date;
}

export function newPost(
    id?: number,
    id2? : number,
    titulo?: string,
    contenido?: string,
    fecha?: Date,
): IPost {
    return {
        IdPost: id ?? -1,
        IdUsuario: id2 ?? -1,
        Titulo: titulo ?? '',
        Contenido: contenido ?? '',
        fecha: fecha ?? new Date(),
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
    console.log(typeof post.Titulo === 'string')
    console.log(typeof post.Contenido === 'string')
    console.log(typeof post.fecha === 'string')


    return (
        typeof post.IdPost === 'number' &&
        typeof post.IdUsuario === 'number' &&
        typeof post.Titulo === 'string' &&
        typeof post.Contenido === 'string' &&
        typeof post.fecha === 'string' 
    );
}

export default {
    new: newPost,
    from: fromPost,
    isPost,
};
