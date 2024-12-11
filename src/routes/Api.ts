import { Router } from 'express';
import Paths from '../constants/Paths';
import SystemRoutes from './SystemRoutes';

// Add SystemRoutes t
const UserRouter = Router();
const PostRouter = Router();

// get all posts
PostRouter.get(
  Paths.Posts.All,
  SystemRoutes.getPosts,
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


// añadir un usuario //
UserRouter.post(
  Paths.Users.Create,
  SystemRoutes.addUsuario,
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

export default {
  UserRouter,
  PostRouter,
} as const;






