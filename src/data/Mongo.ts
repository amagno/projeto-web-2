import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(`Connect to mongoURL: ${process.env.MONGO_URL}`);
export default class Mongo {
  private static instance: mongoose.Connection = undefined;
  public static init(
    mongoUrl: string,
    dev: boolean,
    opts: mongoose.ConnectionOptions = { useMongoClient: true }
  ): mongoose.Connection {
    if (!Mongo.instance) {
      mongoose.set('debug', dev);
      (<any>mongoose).Promise = global.Promise;
      mongoose.connect(mongoUrl, opts);
      const connection = mongoose.connection;
      connection.on('error', (error) => {
        console.log(error);
      });
      connection.once('open', () => {
        console.log('connection to MongoDB database success');
      });
      Mongo.instance = connection;
    }
    return Mongo.instance;
  }
}