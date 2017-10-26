import Model from '../models/Model';
import User from '../models/User';
import Post from '../models/Post';


const models: Model[] = [
  new User(),
  new Post()
];


export default models;