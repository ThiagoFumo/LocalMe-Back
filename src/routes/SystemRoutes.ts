import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import SystemService from '@src/Services/SystemService';
import { IUsuario } from '@src/models/Usuario';
import { IPost } from '@src/models/Post';
import { IComentario } from '@src/models/Comentario';
import { IReq, IRes } from './types/express/misc';

//functions

//conseguir todos los posts//
async function getPosts(req: IReq, res: IRes) {
  const posts = await SystemService.getPosts();
  return res.status(HttpStatusCodes.OK).json({ posts });
}

//conseguir todos los comentarios de un post//
async function getComentarios(req: IReq, res: IRes) {
  const IdPost = +req.params.IdPost;
  const comentarios = await SystemService.getComentarios(IdPost);
  return res.status(HttpStatusCodes.OK).json({ comentarios });
}

//conseguir un post//
async function getPost(req: IReq, res: IRes) {
  const IdPost = +req.params.IdPost;
  const post = await SystemService.getPost(IdPost);
  return res.status(HttpStatusCodes.OK).json({ post });
}

//conseguir un usuario//
async function getUsuario(req: IReq, res: IRes) {
  const IdUsuario = +req.params.IdUser;
  const usuario = await SystemService.getUsuario(IdUsuario);
  return res.status(HttpStatusCodes.OK).json({ usuario });
}

//añadir un post//
async function addPost(req: IReq<{ post: IPost }>, res: IRes) {
  const { post } = req.body;
  await SystemService.addPost(post);
  return res.status(HttpStatusCodes.CREATED).end();
}

//añadir un like a un post//
async function addLike(req: IReq, res: IRes) {
  const IdPost = +req.params.IdPost;
  const IdUsuario = +req.params.IdUser;
  console.log(IdUsuario+" ID QUE LLEGA POR URL")
  await SystemService.addLike(IdPost, IdUsuario);
  return res.status(HttpStatusCodes.CREATED).end();
}

//remover un like a un post//
async function removeLike(req: IReq, res: IRes) {
  const IdPost = +req.params.IdPost;
  const IdUsuario = +req.params.IdUser;
  await SystemService.removeLike(IdPost, IdUsuario);
  return res.status(HttpStatusCodes.OK).end();
}

//añadir un usuario//
async function addUsuario(req: IReq<{ usuario: IUsuario }>, res: IRes) {
  const { usuario } = req.body;
  await SystemService.addUsuario(usuario);
  return res.status(HttpStatusCodes.CREATED).end();
}

//añadir un comentario a un post//
async function addComentario(req: IReq<{ comentario: IComentario }>, res: IRes) {
  const IdPost = +req.params.IdPost;
  const { comentario } = req.body;
  console.log(comentario+"comentario que llega")
  console.log(IdPost+"id que llega")
  await SystemService.addComentario(IdPost, comentario);
  return res.status(HttpStatusCodes.CREATED).end();
}

//update a post//
async function updatePost(req: IReq<{ post: IPost }>, res: IRes) {
  const { post } = req.body;
  await SystemService.updatePost(post);
  return res.status(HttpStatusCodes.OK).end();
}

//update a usuario//
async function updateUsuario(req: IReq<{ usuario: IUsuario }>, res: IRes) {
  const { usuario } = req.body;
  await SystemService.updateUsuario(usuario);
  return res.status(HttpStatusCodes.OK).end();
}

//update a comentario//
async function updateComentario(req: IReq<{ comentario: IComentario }>, res: IRes) {
  const IdPost = +req.params.IdPost;
  const { comentario } = req.body;
  await SystemService.updateComentario(IdPost, comentario);
  return res.status(HttpStatusCodes.OK).end();
}

//delete a post//
async function deletePost(req: IReq, res: IRes) {
  const IdPost = +req.params.IdPost;
  await SystemService.deletePost(IdPost);
  return res.status(HttpStatusCodes.OK).end();
}

//delete a comentario//
async function deleteComentario(req: IReq, res: IRes) {
  const IdPost = +req.params.IdPost;
  const IdComentario = +req.params.IdComentario;
  await SystemService.deleteComentario(IdPost, IdComentario);
  return res.status(HttpStatusCodes.OK).end();
}

//get liked posts//
async function getPostsLikeados(req: IReq, res: IRes) {
  const IdUsuario = +req.params.IdUser;
  const posts = await SystemService.getPostsLikeados(IdUsuario);
  return res.status(HttpStatusCodes.OK).json({ posts });
}

//get posts of a user//
async function getPostsUsuario(req: IReq, res: IRes) {
  const IdUsuario = +req.params.IdUser;
  const posts = await SystemService.getPostsUsuario(IdUsuario);
  return res.status(HttpStatusCodes.OK).json({ posts });
}

//like a comment//
async function addLikeComentario(req: IReq, res: IRes) {
  const IdPost = +req.params.IdPost;
  const IdUsuario = +req.params.IdUser;
  const IdComentario = +req.params.IdComment;
  console.log(IdUsuario+" Id usuario QUE LLEGA POR URL")
  console.log(IdPost+" Id post QUE LLEGA POR URL")
  console.log(IdComentario+" Id comentario QUE LLEGA POR URL")
  await SystemService.addLikeComentario(IdUsuario, IdPost, IdComentario);
  return res.status(HttpStatusCodes.CREATED).end();
}

//remove like a comment//
async function removeLikeComentario(req: IReq, res: IRes) {
  const IdPost = +req.params.IdPost;
  const IdUsuario = +req.params.IdUser;
  const IdComentario = +req.params.IdComment;
  console.log(IdUsuario+" Id usuario QUE LLEGA POR URL")
  console.log(IdPost+" Id post QUE LLEGA POR URL")
  console.log(IdComentario+" Id comentario QUE LLEGA POR URL")
  await SystemService.removeLikeComentario(IdUsuario, IdPost, IdComentario);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  getPosts, //
  getComentarios, //
  getPost, //
  getUsuario, //
  addPost, //
  addLike, //
  removeLike, //
  addUsuario, //
  addComentario, //
  updateUsuario, //
  updatePost, //
  getPostsUsuario, //
  getPostsLikeados, //
  deletePost,
  updateComentario,
  deleteComentario,
  addLikeComentario,
  removeLikeComentario,
};