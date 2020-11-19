import { ApiResponse, Context, Get, HttpResponseOK, Post, ApiDefineTag, ApiUseTag, ValidateBody, HttpResponseUnauthorized, verifyPassword, Config } from '@foal/core';
import { responseStatusTags, headerTags } from '../../swagger/open-api-tags';
import { JWTRequired } from '@foal/jwt';
import { sign } from 'jsonwebtoken';
import { User } from '../../../models';

@ApiUseTag(headerTags.AUTH.name)
export class AuthController {

  @Post('/login')
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[400])
  @ApiResponse(...responseStatusTags[404])
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
      return new HttpResponseUnauthorized();
    }
    if (!await verifyPassword(ctx.request.body.password, user.password)) {
      return new HttpResponseUnauthorized();
    }
    const token = sign(
      { email: user.email },
      Config.get<string>('settings.jwt'),
      { expiresIn: '1h' }
    );
    return new HttpResponseOK({ token });
  }

  @Get('/logout')
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  logout(ctx: Context) {
    return new HttpResponseOK();
  }

  @Post('/register')
  @JWTRequired()
  @ApiResponse(...responseStatusTags[201])
  @ApiResponse(...responseStatusTags[400])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  register(ctx: Context) {
    return new HttpResponseOK();
  }

}