import IRoute from '../interfaces/IRoute';

const routes: IRoute[] = [
  {
    type: 'get',
    path: '/',
    controller: 'Home',
  },
  {
    type: 'get',
    path: '/login',
    controller: 'Users@getLogin',
  },
  {
    type: 'post',
    path: '/login',
    controller: 'Users@postLogin'
  },
  {
    type: 'get',
    path: '/logout',
    controller: 'Users@logout'
  },
  {
    type: 'get',
    path: '/register',
    controller: 'Users@getRegister'
  },
  {
    type: 'post',
    path: '/register',
    controller: 'Users@postRegister'
  },
  {
    type: 'get',
    path: '/user/:id',
    controller: 'Users@getUserInfo'
  },
  {
    type: 'get',
    path: '/posts',
    controller: 'Posts'
  },
  {
    type: 'get',
    path: '/post',
    controller: 'Posts@getNewPost'
  },
  {
    type: 'post',
    path: '/post',
    controller: 'Posts@postNewPost'
  },
  {
    type: 'get',
    path: '/post/delete/:id',
    controller: 'Posts@getDeletePost'
  },
  {
    type: 'get',
    path: '/image/:id',
    controller: 'Images@getImage'
  },
  {
    type: 'get',
    path: '*',
    controller: 'Errors'
  }
];


export default routes;