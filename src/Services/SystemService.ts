import SystemRepo from "@src/repos/SystemRepo";
import { IUsuario } from "@src/models/Usuario";
import { IComentario } from "@src/models/Comentario";
import { IPost } from "@src/models/Post";
import { RouteError } from "@src/other/classes";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

// **** Variables **** //

export const USUARIO_NOT_FOUND_ERR = 'Usuario not found';
export const POST_NOT_FOUND_ERR = 'Post not found';

// **** Functions **** //

//get all posts//
function getPosts(): Promise<IPost[]> {
  return SystemRepo.getPosts();
}

//get all comentarios of a post//
function getComentarios(id: number): Promise<IComentario[]> {
  return SystemRepo.getComentarios(id);
}

//get one post//
function getPost(id: number): Promise<IPost | null> {
  return SystemRepo.getPost(id);
}

//get one usuario//
function getUsuario(id: number): Promise<IUsuario | null> {
  return SystemRepo.getUsuario(id);
}

//add one post//
function addPost(post: IPost): Promise<void> {
  return SystemRepo.addPost(post);
}

//add like to a post//
function addLike(IdPost: number, idUser: number): Promise<void> {
  return SystemRepo.addLike(IdPost, idUser);
}

//remove like to a post//
function removeLike(IdPost: number, idUser: number): Promise<void> {
  return SystemRepo.removeLike(IdPost, idUser);
}

//añadir un usuario//
function addUsuario(usuario: IUsuario): Promise<void> {
  return SystemRepo.addUsuario(usuario);
}

//añadir un comentario a un post//
function addComentario(id: number, comentario: IComentario): Promise<void> {
  return SystemRepo.addComentario(id, comentario);
}


// update a post //
function updatePost(post: IPost): Promise<void> {
  if (!SystemRepo.persistsPost(post.IdPost)) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      POST_NOT_FOUND_ERR,
    );
  }
  return SystemRepo.updatePost(post);
}

// update a usuario //
function updateUsuario(usuario: IUsuario): Promise<void> {
  if (!SystemRepo.persistsUsuario(usuario.IdUsuario)) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USUARIO_NOT_FOUND_ERR,
    );
  }
  return SystemRepo.updateUsuario(usuario);
}

// update a comentario //
function updateComentario(IdPost: number, comentario: IComentario): Promise<void> {
  if (!SystemRepo.persistsComentario(IdPost, comentario.IdComentario)) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      'Comentario not found',
    );
  }
  return SystemRepo.updateComentario(IdPost, comentario);
}

// delete a post //
function deletePost(id: number): Promise<void> {
  return SystemRepo.deletePost(id);
}

// delete a comentario //
function deleteComentario(IdPost: number, IdComentario: number ): Promise<void> {
  return SystemRepo.deleteComentario(IdPost, IdComentario);
}

// get all post likeados de un usuario//
function getPostsLikeados(id: number): Promise<IPost[]> {
  return SystemRepo.getPostsLikeados(id);
}

//get all posts de un usuario en especifico//
function getPostsUsuario(id: number): Promise<IPost[]> {
  return SystemRepo.getPostsUsuario(id);
}

//add like to a comment//
function addLikeComentario(IdUser : number, IdPost: number, idComentario: number): Promise<void> {
  return SystemRepo.addLikeComentario(IdUser , IdPost, idComentario);
}

//remove like to a comment//
function removeLikeComentario(IdUser : number, IdPost: number, idComentario: number): Promise<void> {
  return SystemRepo.removeLikeComentario(IdUser ,IdPost, idComentario);
}

// Export default

export default {
  getPosts,
  getComentarios,
  getPost,
  getUsuario,
  addPost,
  addLike,
  removeLike,
  addUsuario,
  addComentario,
  updateUsuario,
  updatePost,
  getPostsUsuario,
  getPostsLikeados,
  deletePost,
  updateComentario,
  deleteComentario,
  addLikeComentario,
  removeLikeComentario,
} as const;