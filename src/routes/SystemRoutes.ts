import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import SystemService from '@src/Services/SystemService';
import { IUsuario } from '@src/models/Usuario';
import { IPost } from '@src/models/Post';
import { IReq, IRes } from './types/express/misc';

//functions

//conseguir todos los posts//
async function getPosts(_: IReq, res: IRes) {
  const posts = await SystemService.getPosts();
  return res.status(HttpStatusCodes.OK).json({ posts });
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

//añadir un usuario//
async function addUsuario(req: IReq<{ usuario: IUsuario }>, res: IRes) {
  const { usuario } = req.body;
  await SystemService.addUsuario(usuario);
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

//delete a post//
async function deletePost(req: IReq, res: IRes) {
  const IdPost = +req.params.IdPost;
  await SystemService.deletePost(IdPost);
  return res.status(HttpStatusCodes.OK).end();
}

//get posts of a user//
async function getPostsUsuario(req: IReq, res: IRes) {
  const IdUsuario = +req.params.IdUser;
  const posts = await SystemService.getPostsUsuario(IdUsuario);
  return res.status(HttpStatusCodes.OK).json({ posts });
}

export default {
  getPosts, //
  getPost, //
  getUsuario, //
  addPost, //
  addUsuario, //
  updateUsuario, //
  updatePost, //
  getPostsUsuario, //
  deletePost,
};