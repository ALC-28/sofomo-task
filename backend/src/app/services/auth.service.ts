import { Config, verifyPassword } from '@foal/core';
import { sign } from 'jsonwebtoken';
import { isCommon } from '@foal/password';
import { User } from '../models/user.model';
import { UserInterface } from '../interfaces/user.interface';

export enum MessageCode {
  REGISTRATION_OK = 'REGISTRATION_OK',
  ERROR_LOGIN_FAILED = 'ERROR_LOGIN_FAILED',
  ERROR_USER_EXISTS = 'ERROR_USER_EXISTS',
  ERROR_PASSWORD_WEAK = 'ERROR_PASSWORD_WEAK',
  ERROR_PASSWORD_MISMATCH = 'ERROR_PASSWORD_MISMATCH'
}

export class AuthService {
  async login(requestBody) {
    const { email, password } = requestBody;
    const user = await User.findOne({ email }).lean() as UserInterface;
    if (!user) {
      return { message: MessageCode.ERROR_LOGIN_FAILED };
    }
    const passwordMismatch = !await verifyPassword(password, user.password);
    if (passwordMismatch) {
      return { message: MessageCode.ERROR_LOGIN_FAILED };
    }
    const userData = {firstName: user.firstName, lastName: user.lastName, email: user.email};
    const token = sign(userData, Config.get('settings.jwt.secretOrPublicKey'), { expiresIn: '1h' });
    return { result: { token, ...userData } };
  }

  async register(requestBody) {
    const { firstName, lastName, email, password, passwordConfirmed } = requestBody;
    const isUserAlreadyRegistered = !!await User.findOne({ email });
    if (isUserAlreadyRegistered) {
      return { message: MessageCode.ERROR_USER_EXISTS };
    } else if (await isCommon(password)) {
      return { message: MessageCode.ERROR_PASSWORD_WEAK };
    } else if (password !== passwordConfirmed) {
      return { message: MessageCode.ERROR_PASSWORD_MISMATCH };
    } 
    const user = new User({firstName, lastName, email});
    await user.setPassword(password);
    await user.save();
    return { message: MessageCode.REGISTRATION_OK, successful: true };
  }
}
