import Model from '../models/Model';
import User from '../models/User';
import Post from '../models/Post';
import Image from '../models/Image';


const models: Model[] = [
  new User(),
  new Post(),
  new Image()
];


export default models;