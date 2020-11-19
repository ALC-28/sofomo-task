import { ApiDefineTag, ApiInfo, controller } from '@foal/core';
import { headerTags } from '../swagger/open-api-tags';
import { AuthController } from './auth/auth.controller';
import { GeolocationController } from './geolocation/geolocation.controller';
import { IpstackController } from './ipstack/ipstack.controller';

@ApiInfo({
  title: 'Sofomo Task API',
  version: '1.0.0'
})
@ApiDefineTag(headerTags.AUTH)
@ApiDefineTag(headerTags.GEOLOCATION)
@ApiDefineTag(headerTags.IPSTACK)
export class ApiController {
  subControllers = [
    controller('/auth', AuthController),
    controller('/geolocations', GeolocationController),
    controller('/ipstack', IpstackController)
  ];
}
