import { ApiUseTag, Context, dependency, Get, HttpResponseOK } from '@foal/core';
import { IpstackService } from '../../../services/ipstack.service';
import { headerTags } from '../../swagger/open-api-tags';

@ApiUseTag(headerTags.IPSTACK.name)
// @JWTRequired()
export class IpstackController {
  @dependency
  ipstackService: IpstackService

  @Get('/own')
  async getOwnGeolocation() {
    const geolocationResponse = await this.ipstackService.getOwnGeolocation();
    return new HttpResponseOK({ result: geolocationResponse.data});
  }

  @Get('/custom/:ip')
  async getCustomGeolocation(ctx: Context) {
    const { ip } = ctx.request.params;
    const geolocationResponse = await this.ipstackService.getCustomGeolocation(ip);
    return new HttpResponseOK({ result: geolocationResponse.data});
  }

}
