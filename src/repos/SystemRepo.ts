import { IPost } from '@src/models/Post';
import { getRandomInt } from '@src/util/misc';
import { UserModel, PostModel } from './DB';
import { IUsuario } from '@src/models/Usuario';


//conseguir todos los posts//
async function getPosts(): Promise<IPost[]> { 
  return PostModel.find({});
}

//conseguir un post//
async function getPost(id: number): Promise<IPost | null> {
  return PostModel.findOne({IdPost: id});
}

//conseguir un usuario//
async function getUsuario(id: number): Promise<IUsuario | null> {
  return UserModel.findOne({IdUsuario: id});
}

//añadir un post//
async function addPost(post: IPost): Promise<void> {
  post.IdPost = getRandomInt();
  post.fecha = new Date();
  PostModel.create(post);
}



//añadir un usuario//
async function addUsuario(user: IUsuario): Promise<void> {
  user.IdUsuario = getRandomInt();
  user.postsIds = [];
  UserModel.create(user);
}

//actualizar usuario//
async function updateUsuario(user: IUsuario): Promise<void> {
  const index = await UserModel.findOne({ IdUsuario: user.IdUsuario });

  if (index) {
    await UserModel.updateOne(
      { IdUsuario: user.IdUsuario },
      { $set: user }
    );
  }
}

//actualizar post//
async function updatePost(post: IPost): Promise<void> {
  const postInDb = await PostModel.findOne({ IdPost: post.IdPost });

  if (postInDb) {
    await PostModel.updateOne(
      { IdPost: post.IdPost },
      { $set: post }
    );
  }
  
}

//conseguir todos los posts de un usuario//
async function getPostsUsuario(id: number): Promise<IPost[]> {
  const user = await UserModel.findOne({ IdUsuario: id });

  let OwnPosts: IPost[] | PromiseLike<IPost[]> = [];
  
  if (user?.postsIds?.length) {
    OwnPosts = await PostModel.find({ IdPost: { $in: user.postsIds } });
  }
  
  return OwnPosts;
  
}


 //borrar un post//
async function deletePost(id: number): Promise<void> {
  const result = await PostModel.deleteOne({ IdPost: id });

  if (result.deletedCount > 0) {
    console.log(`Post with IdPost ${id} deleted successfully.`);
  }
  
}

//ver si existe un usuario con esa ID//
async function persistsUsuario(id: number): Promise<boolean> {
  const userExists = await UserModel.exists({ IdUsuario: id });

  return userExists !== null;
  
}

//ver si existe un post con esa ID//
async function persistsPost(id: number): Promise<boolean> {
  const postExists = await PostModel.exists({ IdPost: id });

  return postExists !== null;  
}
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
  persistsUsuario,
  persistsPost,
};