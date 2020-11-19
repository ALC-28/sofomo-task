import { Config, verifyPassword } from '@foal/core';
import { sign } from 'jsonwebtoken';
import { isCommon } from '@foal/password';
import { User } from '../models/user.model';

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
    const user = await User.findOne({ email });
    const passwordMismatch = !await verifyPassword(password, user.password);
    if (!user || passwordMismatch) {
      return { code: ResponseErrorCode.LOGIN_FAILED };
    }
    const token = sign({ email: user.email }, Config.get('settings.jwt.secretOrPublicKey'), { expiresIn: '1h' });
    return { data: token };
  }

  async register(requestBody) {
    const { email, password, passwordConfirmed } = requestBody;
    const isUserAlreadyRegistered = !!await User.findOne({ email });
    if (isUserAlreadyRegistered) {
      return { code: ResponseErrorCode.USER_EXISTS };
    } else if (await isCommon(password)) {
      return { code: ResponseErrorCode.PASSWORD_WEAK };
    } else if (password !== passwordConfirmed) {
      return { code: ResponseErrorCode.PASSWORD_MISMATCH };
    } 
    const user = new User({email});
    await user.setPassword(password);
    await user.save();
    return { code: ResponseSuccessCode.REGISTRATION_OK, successful: true };
  }
}
