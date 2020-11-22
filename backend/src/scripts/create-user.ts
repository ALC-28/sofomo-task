import { Config } from '@foal/core';
import { isCommon } from '@foal/password';
import { connect, disconnect } from 'mongoose';
import { User } from '../app/models/user.model';

export const schema = {
  additionalProperties: false,
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
  },
  required: [ 'firstName', 'lastName', 'email', 'password' ],
  type: 'object',
};

export async function main(args) {
  const user = new User();
  user.firstName = args.firstName;
  user.lastName = args.lastName;
  user.email = args.email;
  if (await isCommon(args.password)) {
    console.log('This password is too common. Please choose another one.');
    return;
  }
  await user.setPassword(args.password);

  const uri = Config.getOrThrow('mongodb.uri', 'string');
  await connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

  try {
    console.log(
      await user.save()
    );
  } catch (error) {
    console.log(error.message);
  } finally {
    await disconnect();
  }
}
