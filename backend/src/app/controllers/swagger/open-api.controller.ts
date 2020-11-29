import { ApiDefineSchema } from '@foal/core';
import { SwaggerController } from '@foal/swagger';
import { ApiController } from '../api/api.controller';

export class OpenApiController extends SwaggerController {
  options = { controllerClass: ApiController };
}
