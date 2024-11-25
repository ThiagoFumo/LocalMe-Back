
export default {
    Base: '/api',
    Posts: {
        Base: '/posts', 
        All: '/all', //muestra todos los posts
        Create: '/create', //pestaña de crear post//
        Read: '/:IdPost', //leer un post //
        Update: '/:IdPost/update', //
        Delete: '/:IdPost/delete',
        Like: '/:IdUser/like/:IdPost',
        Dislike: '/:IdUser/dislike/:IdPost',
    },
    Users: {
        Base: '/users',
        Create: '/create',
        Read: '/:IdUser',
        Update: '/:IdUser/update',
        Delete: '/:IdUser/delete',
        Posts: '/:IdUser/posts',
        Likes: '/:IdUser/likes',
    },
    Comments: {
        Base: '/comments',
        All: '/:IdPost/all',
        Create: '/:IdPost/create',
        Update: '/:IdPost/update/:IdComment',
        Delete: '/:IdPost/delete/:IdComment',
        Like: '/:IdUser/like/:IdPost/:IdComment',
        Dislike: '/:IdUser/dislike/:IdPost/:IdComment',
    },
    Login: '/login',
    Register: '/register',
  } as const;