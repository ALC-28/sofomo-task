import { ApiResponse, Context, Post, ApiUseTag, ValidateBody, dependency, HttpResponseUnauthorized, HttpResponseOK, HttpResponseBadRequest, ApiRequestBody } from '@foal/core';
import { getResponseStatusTags, headerTags } from '../../swagger/open-api-tags';
import { JWTRequired } from '@foal/jwt';
import { AuthService } from '../../../services/auth.service';
import { LoginPayloadShema, LoginSchema, RegisterPayloadSchema } from '../../swagger/schema/auth';
import { MessageShema } from '../../swagger/schema/message';

@ApiUseTag(headerTags.AUTH.name)
export class AuthController {
  @dependency
  authService: AuthService

  @Post('/login')
  @ApiRequestBody({required: true, content: {'application/json': {schema: LoginPayloadShema}}})
  @ApiResponse(...getResponseStatusTags(LoginSchema)[200])
  @ApiResponse(...getResponseStatusTags()[400])
  @ApiResponse(...getResponseStatusTags()[401])
  @ApiResponse(...getResponseStatusTags()[500])
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
    const loginResponse: {message?: string; data?: any} = await this.authService.login(ctx.request.body);
    if (loginResponse.message) {
      return new HttpResponseUnauthorized(loginResponse);
    }
    return new HttpResponseOK(loginResponse);
  }

  @Post('/register')
  @JWTRequired()
  @ApiRequestBody({required: true, content: {'application/json': {schema: RegisterPayloadSchema}}})
  @ApiResponse(...getResponseStatusTags(MessageShema)[201])
  @ApiResponse(...getResponseStatusTags()[400])
  @ApiResponse(...getResponseStatusTags()[401])
  @ApiResponse(...getResponseStatusTags()[500])
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
    const registerResponse: {message: string; successful?: boolean} = await this.authService.register(ctx.request.body);
    if (!registerResponse.successful) {
      return new HttpResponseBadRequest(registerResponse);
    }
    return new HttpResponseOK(registerResponse);
  }

}