import Model from '../models/Model';
import User from '../models/User';
import Post from '../models/Post';
import Image from '../models/Image';
import UserAddress from '../models/UserAddress';


const models: Model[] = [
  new User(),
  new Post(),
  new Image(),
  new UserAddress()
];


export default models;