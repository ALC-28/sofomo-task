import { ApiDefineTag, ApiInfo, controller } from "@foal/core";
import { headerTags } from "../swagger/open-api-tags";
import { AuthController } from "./auth/auth.controller";
import { GeolocationController } from "./geolocation/geolocation.controller";

@ApiInfo({
  title: 'Sofomo Task API',
  version: '1.0.0'
})
@ApiDefineTag(headerTags.AUTH)
@ApiDefineTag(headerTags.GEOLOCATION)
export class ApiController {
  subControllers = [
    controller('/auth', AuthController),
    controller('/geolocations', GeolocationController)
  ];
}
