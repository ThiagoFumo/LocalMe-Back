import { IPost } from "./Post";

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';

  export interface IUsuario {
    Nombre: string;
    Contraseña: string;
    edad: number;
    email: string;
    IdUsuario: number;
    postsIds: number[];
    likesIds: number[];
}

export function newUsuario(
    nombre?: string,
    contraseña?: string,
    edad?: number,
    email?: string,
    id?: number,
    postsIds?: number[],
    likesIds?: number[]
): IUsuario {
    return {
        Nombre: nombre ?? '',
        Contraseña: contraseña ?? '',
        edad: edad ?? 0,
        email: email ?? '',
        IdUsuario: id ?? -1,
        postsIds: postsIds ?? [],
        likesIds: likesIds ?? [],
    };
}

export function fromUsuario(param: unknown): IUsuario {
    if (!isUsuario(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    return param as IUsuario;
}

export function isUsuario(arg: unknown): arg is IUsuario {
    if (!arg || typeof arg !== 'object') {
        return false;
    }

    const usuario = arg as IUsuario;
    console.log(typeof usuario.Nombre === 'string')
    console.log(typeof usuario.Contraseña === 'string')
    console.log(typeof usuario.edad === 'number')
    console.log(typeof usuario.email === 'string')
    console.log(typeof usuario.IdUsuario === 'number')
    console.log(Array.isArray(usuario.postsIds))
    console.log(Array.isArray(usuario.likesIds))

    return (
        typeof usuario.Nombre === 'string' &&
        typeof usuario.Contraseña === 'string' &&
        typeof usuario.edad === 'number' &&
        typeof usuario.email === 'string' &&
        typeof usuario.IdUsuario === 'number' &&
        Array.isArray(usuario.postsIds) &&
        Array.isArray(usuario.likesIds)
    );
}

export default {
    new: newUsuario,
    from: fromUsuario,
    isUsuario,
};
