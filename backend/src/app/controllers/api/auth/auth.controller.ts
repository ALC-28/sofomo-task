import { ApiResponse, Context, HttpResponseOK, Post, ApiUseTag, ValidateBody, HttpResponseUnauthorized, verifyPassword, Config, HttpResponseBadRequest } from '@foal/core';
import { responseStatusTags, headerTags } from '../../swagger/open-api-tags';
import { JWTRequired } from '@foal/jwt';
import { sign } from 'jsonwebtoken';
import { User } from '../../../models';
import { isCommon } from '@foal/password';
import { ApiErrorCode } from '../api-error-codes';
import { ApiSuccessCode } from '../api-success-codes';

@ApiUseTag(headerTags.AUTH.name)
export class AuthController {

  @Post('/login')
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[400])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  @ValidateBody({
    additionalProperties: false,
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    },
    required: [ 'email', 'password' ],
    type: 'object',
  })
  async login(ctx: Context) {
    const user = await User.findOne({ email: ctx.request.body.email });
    if (!user) {
      return new HttpResponseUnauthorized({code: ApiErrorCode.LOGIN_FAILED});
    }
    if (!await verifyPassword(ctx.request.body.password, user.password)) {
      return new HttpResponseUnauthorized({code: ApiErrorCode.LOGIN_FAILED});
    }
    const token = sign(
      { email: user.email },
      Config.get<string>('settings.jwt.secretOrPublicKey'),
      { expiresIn: '1h' }
    );
    return new HttpResponseOK({ data: token });
  }

  @Post('/register')
  @JWTRequired()
  @ApiResponse(...responseStatusTags[201])
  @ApiResponse(...responseStatusTags[400])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  @ValidateBody({
    additionalProperties: false,
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      passwordConfirmed: { type: 'string' }
    },
    required: [ 'email', 'password', 'passwordConfirmed' ],
    type: 'object',
  })
  async register(ctx: Context) {
    const { email, password, passwordConfirmed } = ctx.request.body;
    const isUserAlreadyRegistered = !!await User.findOne({ email });
    if (isUserAlreadyRegistered) {
      return new HttpResponseBadRequest({code: ApiErrorCode.USER_EXISTS});
    } else if (await isCommon(password)) {
      return new HttpResponseBadRequest({code: ApiErrorCode.PASSWORD_WEAK});
    } else if (password !== passwordConfirmed) {
      return new HttpResponseBadRequest({code: ApiErrorCode.PASSWORD_MISMATCH});
    } 
    const user = new User({email});
    await user.setPassword(password);
    await user.save();
    return new HttpResponseOK({code: ApiSuccessCode.REGISTRATION_OK});
  }

}