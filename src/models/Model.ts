import * as mongoose from 'mongoose';
import * as path from 'path';



export default abstract class Model {
  protected mongoModel: mongoose.Model<any>;
  protected schema: mongoose.Schema;
  constructor() {
    this.schema = new mongoose.Schema(this.definition(), { timestamps: true });
    this.mongoModel = mongoose.model(this.name(), this.schema);
  }
  public mongo(): mongoose.Model<any> {
    return this.mongoModel;
  }
  abstract definition(): mongoose.SchemaDefinition;
  abstract name(): string;

  // static getModelByString(model: string): mongoose.Model<any> {
  //   const ModelClass = require(path.join(__dirname, '..', 'models', model)).default;
  //   return new ModelClass().model;
  // }
}