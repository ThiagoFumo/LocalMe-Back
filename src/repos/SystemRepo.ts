import { IPost } from '@src/models/Post';
import { IComentario } from '@src/models/Comentario';
import { getRandomInt } from '@src/util/misc';
import { UserModel, PostModel } from './DB';
import { IUsuario } from '@src/models/Usuario';


//conseguir todos los posts//
async function getPosts(): Promise<IPost[]> { 
  return PostModel.find({});
}

//conseguir todos los comentarios de un post//
async function getComentarios(id: number): Promise<IComentario[]> {
  return PostModel.find({IdPost: id}).select('Comentarios');
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
  post.Comentarios = [];
  post.fecha = new Date();
  post.CantLikes = 0;
  PostModel.create(post);
}

//añadir un like a un post//
async function addLike(id: number, idUser: number): Promise<void> {
// Find the post by ID
const post = await PostModel.findOne({ IdPost: id });

if (post) {
  // Check if any user has liked the post
  const userWithLike = await UserModel.findOne({ likesIds: id });

  // If post exists and no user has liked it
  if (!userWithLike) {
    // Increment the post's likes count
    await PostModel.updateOne(
      { IdPost: id },
      { $inc: { CantLikes: 1 } }
    );

    // Add the post to the user's likes list
    await UserModel.updateOne(
      { IdUsuario: idUser },
      { $push: { likesIds: id } }
    );
  }
}

}

//quitar un like a un post//
async function removeLike(id: number, idUser: number): Promise<void> {
  // Find the post by ID
  const post = await PostModel.findOne({ IdPost: id });

  if (post) {
    // Check if the user has already liked the post
    const userWithLike = await UserModel.findOne({
      IdUsuario: idUser,
      likesIds: id
    });

    // If the post exists and the user has liked it
    if (userWithLike) {
      // Decrement the post's likes count
      await PostModel.updateOne(
        { IdPost: id },
        { $inc: { CantLikes: -1 } }
      );

      // Remove the post ID from the user's likes list
      await UserModel.updateOne(
        { IdUsuario: idUser },
        { $pull: { likesIds: id } }
      );
    }
  }
}

//añadir un usuario//
async function addUsuario(user: IUsuario): Promise<void> {
  user.IdUsuario = getRandomInt();
  user.postsIds = [];
  user.likesIds = [];
  UserModel.create(user);
}

//añadir un comentario a un post//
async function addComentario(id: number, comentario: IComentario): Promise<void> {
  const post = await PostModel.findOne({ IdPost: id });

  if (post) {
    // Add the new comment to the "Comentarios" array
    await PostModel.updateOne(
      { IdPost: id },
      { $push: { Comentarios: comentario } }
    );
}
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

//conseguir todos los posts likeados de un usuario//
async function getPostsLikeados(id: number): Promise<IPost[]> {
  const user = await UserModel.findOne({ IdUsuario: id });

  let LikedPosts: IPost[] | PromiseLike<IPost[]> = [];
  
  if (user?.likesIds?.length) {
    LikedPosts = await PostModel.find({ IdPost: { $in: user.likesIds } });
  }
  
  return LikedPosts;
  
}

 //borrar un post//
async function deletePost(id: number): Promise<void> {
  const result = await PostModel.deleteOne({ IdPost: id });

  if (result.deletedCount > 0) {
    console.log(`Post with IdPost ${id} deleted successfully.`);
  }
  
}

//actualizar un comentario//
async function updateComentario(id: number, comentario: IComentario): Promise<void> {
  const post = await PostModel.findOne({ IdPost: id });

  if (post) {
    const commentIndex = post.Comentarios.findIndex(c => c.IdComentario === comentario.IdComentario);
  
    if (commentIndex !== -1) {
      post.Comentarios[commentIndex] = comentario;
  
      // Update the post with the modified comment array
      await PostModel.updateOne(
        { IdPost: id },
        { $set: { Comentarios: post.Comentarios } }
      );
    }
  }
  
}

//borrar un comentario//
async function deleteComentario(id: number, idComentario: number): Promise<void> {
  const post = await PostModel.findOne({ IdPost: id });

  if (post) {
    const commentIndex = post.Comentarios.findIndex(c => c.IdComentario === idComentario);
  
    if (commentIndex !== -1) {
      // Remove the comment from the array
      post.Comentarios.splice(commentIndex, 1);
  
      // Update the post with the modified comment array
      await PostModel.updateOne(
        { IdPost: id },
        { $set: { Comentarios: post.Comentarios } }
      );
    }
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

//ver si existe un comentario con esa ID//
async function persistsComentario(IdPost: number,idComentario: number): Promise<boolean> {
  const post = await PostModel.findOne({ IdPost: IdPost });

  if (post) {
    const commentExists = post.Comentarios.some(comentario => comentario.IdComentario === idComentario);
    return commentExists;
  }
  
  return false;
  
}

//añadir like a un comentario//
async function addLikeComentario(IdUser: number,IdPost: number, idComentario: number): Promise<void> {
  const post = await PostModel.findOne({ IdPost: IdPost });

  if (post) {
    // Check if the user has already liked any comment in this post
    const userHasLiked = post.Comentarios.some(comentario =>
      comentario.UsersLikes.includes(IdUser)
    );
  
    if (!userHasLiked) {
      // Find the specific comment by IdComentario
      const comentario = post.Comentarios.find(c => c.IdComentario === idComentario);
  
      if (comentario) {
        // Update the comment's likes count and add the user to the likes array
        await PostModel.updateOne(
          { IdPost: IdPost, 'Comentarios.IdComentario': idComentario },
          { 
            $inc: { 'Comentarios.$.cantLikes': 1 },
            $push: { 'Comentarios.$.UsersLikes': IdUser }
          }
        );
      }
    }
  }
  
}

//quitar like a un comentario//
async function removeLikeComentario(IdUser: number,IdPost: number, idComentario: number): Promise<void> {
  const post = await PostModel.findOne({ IdPost: IdPost });

  if (post) {
    // Check if the user has liked any comment in this post
    const userHasLiked = post.Comentarios.some(comentario =>
      comentario.UsersLikes.includes(IdUser)
    );
  
    if (userHasLiked) {
      // Find the specific comment by IdComentario
      const comentario = post.Comentarios.find(c => c.IdComentario === idComentario);
  
      if (comentario) {
        // Update the comment's likes count and remove the user from the likes array
        await PostModel.updateOne(
          { IdPost: IdPost, 'Comentarios.IdComentario': idComentario },
          { 
            $inc: { 'Comentarios.$.cantLikes': -1 },
            $pull: { 'Comentarios.$.UsersLikes': IdUser }
          }
        );
      }
    }
  }
}

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
  persistsUsuario,
  persistsPost,
  persistsComentario,
  addLikeComentario,
  removeLikeComentario,
};