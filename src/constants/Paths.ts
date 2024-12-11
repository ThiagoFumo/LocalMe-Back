
export default {
    Base: '/api',
    Posts: {
        Base: '/posts', 
        All: '/all', //muestra todos los posts
        Create: '/create', //pestaña de crear post//
        Read: '/:IdPost', //leer un post //
        Update: '/:IdPost/update', //
        Delete: '/:IdPost/delete',
        
    },
    Users: {
        Base: '/users',
        Create: '/create',
        Read: '/:IdUser',
        Update: '/:IdUser/update',
        Delete: '/:IdUser/delete',
        Posts: '/:IdUser/posts',
    },
    Login: '/login',
    Register: '/register',
  } as const;