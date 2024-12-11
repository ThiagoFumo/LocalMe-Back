import { Router } from 'express';
import Paths from '../constants/Paths';
import SystemRoutes from './SystemRoutes';

// Add SystemRoutes t
const UserRouter = Router();
const CommentRouter = Router();
const PostRouter = Router();

// get all posts
PostRouter.get(
  Paths.Posts.All,
  SystemRoutes.getPosts,
);

// Get all comments of a post
CommentRouter.get(
  Paths.Comments.All,
  SystemRoutes.getComentarios,
);

// Get one post //
PostRouter.get(
  Paths.Posts.Read,
  SystemRoutes.getPost,
);

// Get one user //
UserRouter.get(
  Paths.Users.Read,
  SystemRoutes.getUsuario,
);

// add a post //
PostRouter.post(
  Paths.Posts.Create,
  SystemRoutes.addPost,
);

// añadir un like //
PostRouter.post(
  Paths.Posts.Like,
  SystemRoutes.addLike,
);

//quitar un like//
PostRouter.post(
  Paths.Posts.Dislike,
  SystemRoutes.removeLike,
);

// añadir un usuario //
UserRouter.post(
  Paths.Users.Create,
  SystemRoutes.addUsuario,
);

// añadir un comentario //
CommentRouter.post(
  Paths.Comments.Create,
  SystemRoutes.addComentario,
);

// update usuario //
UserRouter.put(
  Paths.Users.Update,
  SystemRoutes.updateUsuario,
);

//update post//
PostRouter.put(
  Paths.Posts.Update,
  SystemRoutes.updatePost,
);

//get liked posts//
UserRouter.get(
  Paths.Users.Likes,
  SystemRoutes.getPostsLikeados,
);

//get posts of a user//
UserRouter.get(
  Paths.Users.Posts,
  SystemRoutes.getPostsUsuario,
);

//delete post//
PostRouter.delete(
  Paths.Posts.Delete,
  SystemRoutes.deletePost,
);

//delete comment//
CommentRouter.delete(
  Paths.Comments.Delete,
  SystemRoutes.deleteComentario,
);

//update comment//
CommentRouter.put(
  Paths.Comments.Update,
  SystemRoutes.updateComentario,
);

//like a comment//
CommentRouter.post(
  Paths.Comments.Like,
  SystemRoutes.addLikeComentario,
);

//dislike a comment//
CommentRouter.post(
  Paths.Comments.Dislike,
  SystemRoutes.removeLikeComentario,
);

export default {
  UserRouter,
  CommentRouter,
  PostRouter,
} as const;






