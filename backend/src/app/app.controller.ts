import { controller } from '@foal/core';
import { ApiController } from './controllers/api/api.controller';
import { OpenApiController } from './controllers/swagger/open-api.controller';

export class AppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/swagger', OpenApiController)
  ];
}
