import * as mongoose from 'mongoose';

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
        console.log('connection to database success');
      });
      Mongo.instance = connection;
    }
    return Mongo.instance;
  }
}