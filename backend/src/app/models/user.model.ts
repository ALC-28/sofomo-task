import { hashPassword } from '@foal/core';
import { model, models, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.setPassword = async function(password: string) {
  this.password = await hashPassword(password);
};

export const User = models.User || model('User', userSchema);
