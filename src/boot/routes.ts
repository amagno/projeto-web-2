import IRoute from '../interfaces/IRoute';


const routes: IRoute[] = [
  {
    type: 'get',
    path: '/',
    controller: 'Home/Home'
  },
  {
    type: 'get',
    path: '/login',
    controller: 'Users@getLogin'
  },
  {
    type: 'post',
    path: '/login',
    controller: 'Users@postLogin'
  },
  {
    type: 'get',
    path: '/posts',
    controller: 'Posts'
  }
];


export default routes;