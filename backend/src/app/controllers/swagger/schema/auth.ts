import { IApiSchema } from "@foal/core";

export const LoginPayloadShema: IApiSchema = {
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  }
};

export const LoginSchema: IApiSchema = {
  properties: {
    result: {type: 'object', properties: {
      firstName: {type: 'string'},
      lastName: {type: 'string'},
      email: {type: 'string'},
      token: {type: 'string'}
    }}
  }
};

export const RegisterPayloadSchema: IApiSchema = {
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    passwordConfirmed: { type: 'string' }
  }
};