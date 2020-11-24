import { ApiResponse, Context, Post, ApiUseTag, ValidateBody, dependency, HttpResponseUnauthorized, HttpResponseOK, HttpResponseBadRequest } from '@foal/core';
import { responseStatusTags, headerTags } from '../../swagger/open-api-tags';
import { JWTRequired } from '@foal/jwt';
import { AuthService } from '../../../services/auth.service';

@ApiUseTag(headerTags.AUTH.name)
export class AuthController {
  @dependency
  authService: AuthService

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
    const loginResponse: {code?: string; data?: any} = await this.authService.login(ctx.request.body);
    if (loginResponse.code) {
      return new HttpResponseUnauthorized(loginResponse);
    }
    return new HttpResponseOK(loginResponse);
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
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
      passwordConfirmed: { type: 'string' }
    },
    required: [ 'firstName', 'lastName', 'email', 'password', 'passwordConfirmed' ],
    type: 'object',
  })
  async register(ctx: Context) {
    const registerResponse: {code: string; successful?: boolean} = await this.authService.register(ctx.request.body);
    if (!registerResponse.successful) {
      return new HttpResponseBadRequest(registerResponse);
    }
    return new HttpResponseOK(registerResponse);
  }

}