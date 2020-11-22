import { hashPassword } from '@foal/core';
import { Document, Model, model, models, Schema } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.setPassword = async function(password: string) {
  this.password = await hashPassword(password);
};

export interface UserModel extends Model<Document>, UserInterface {}

export const User = models.User || model<Document, UserModel>('User', userSchema);
