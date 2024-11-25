const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';

  export interface IComentario {
    usuarioId: number;
    Contenido: string;
    fecha: Date;
    cantLikes: number;
    IdComentario: number;
    UsersLikes: number[];
}

export function newComentario(
    usuario?: number,
    contenido?: string,
    fecha?: Date,
    cantLikes?: number,
    id?: number,
    UsersLikes?: number[]
): IComentario{
    return {
        usuarioId: usuario ?? -1,
        Contenido: contenido ?? '',
        fecha: fecha ?? new Date(),
        cantLikes: cantLikes ?? 0,
        IdComentario: id ?? -1,
        UsersLikes: UsersLikes ?? [],
    };
}

export function fromComentario(param: unknown): IComentario {
    if (!isComentario(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    return param as IComentario;
}

export function isComentario(arg: unknown): arg is IComentario {
    if (!arg || typeof arg !== 'object') {
        return false;
    }

    const comentario = arg as IComentario;
    console.log(typeof comentario.usuarioId === 'number')
    console.log(typeof comentario.Contenido === 'string')
    console.log(typeof comentario.fecha === 'object')
    console.log(typeof comentario.cantLikes === 'number')
    console.log(typeof comentario.IdComentario === 'number')

    return (
        typeof comentario.usuarioId === 'number' &&
        typeof comentario.Contenido === 'string' &&
        typeof comentario.fecha === 'object' &&
        typeof comentario.cantLikes === 'number' &&
        typeof comentario.IdComentario === 'number'
    );
}

export default {
    new: newComentario,
    from: fromComentario,
    isComentario,
};
