import SystemRepo from "@src/repos/SystemRepo";
import { IUsuario } from "@src/models/Usuario";
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

//añadir un usuario//
function addUsuario(usuario: IUsuario): Promise<void> {
  return SystemRepo.addUsuario(usuario);
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

// delete a post //
function deletePost(id: number): Promise<void> {
  return SystemRepo.deletePost(id);
}

//get all posts de un usuario en especifico//
function getPostsUsuario(id: number): Promise<IPost[]> {
  return SystemRepo.getPostsUsuario(id);
}

// Export default

export default {
  getPosts,
  getPost,
  getUsuario,
  addPost,
  addUsuario,
  updateUsuario,
  updatePost,
  getPostsUsuario,
  deletePost,
} as const;