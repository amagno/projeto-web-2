export default [
  {
    type: 'get',
    path: '/',
    render: 'home'
  },
  {
    type: 'get',
    path: '/image/:id',
    controller: 'images@getById'
  },
  {
    type: 'get',
    path: '/posts',
    controller: 'posts@all',
    middlewares: [
      'testing'
    ]
  },
  {
    type: 'get',
    path: '/register',
    controller: 'users@getRegister'
  },
  {
    type: 'get',
    path: '/login',
    controller: 'users@getLogin'
  }
]