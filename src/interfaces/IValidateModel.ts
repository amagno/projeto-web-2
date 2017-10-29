import * as mongoose from 'mongoose';
export default interface IValidateModel {
  definition(): mongoose.SchemaDefinition;
  name(): string;
}