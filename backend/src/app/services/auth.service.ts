import { Config, verifyPassword } from '@foal/core';
import { sign } from 'jsonwebtoken';
import { isCommon } from '@foal/password';
import { User } from '../models/user.model';
import { UserInterface } from '../interfaces/user.interface';

export enum ResponseSuccessCode {
  REGISTRATION_OK = 'REGISTRATION_OK'
}

export enum ResponseErrorCode {
  LOGIN_FAILED = 'LOGIN_FAILED',
  USER_EXISTS = 'USER_EXISTS',
  PASSWORD_WEAK = 'PASSWORD_WEAK',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH'
}

export class AuthService {
  async login(requestBody) {
    const { email, password } = requestBody;
    const user = await User.findOne({ email }).lean() as UserInterface;
    if (!user) {
      return { code: ResponseErrorCode.LOGIN_FAILED };
    }
    const passwordMismatch = !await verifyPassword(password, user.password);
    if (passwordMismatch) {
      return { code: ResponseErrorCode.LOGIN_FAILED };
    }
    const userData = {firstName: user.firstName, lastName: user.lastName, email: user.email};
    const token = sign(userData, Config.get('settings.jwt.secretOrPublicKey'), { expiresIn: '1h' });
    return { result: { token, ...userData } };
  }

  async register(requestBody) {
    const { firstName, lastName, email, password, passwordConfirmed } = requestBody;
    const isUserAlreadyRegistered = !!await User.findOne({ email });
    if (isUserAlreadyRegistered) {
      return { code: ResponseErrorCode.USER_EXISTS };
    } else if (await isCommon(password)) {
      return { code: ResponseErrorCode.PASSWORD_WEAK };
    } else if (password !== passwordConfirmed) {
      return { code: ResponseErrorCode.PASSWORD_MISMATCH };
    } 
    const user = new User({firstName, lastName, email});
    await user.setPassword(password);
    await user.save();
    return { code: ResponseSuccessCode.REGISTRATION_OK, successful: true };
  }
}
