import { ApiParameter, ApiResponse, ApiUseTag, Context, dependency, Get, HttpResponseOK } from '@foal/core';
import { JWTRequired } from '@foal/jwt';
import { IpstackService } from '../../../services/ipstack.service';
import { headerTags, getResponseStatusTags } from '../../swagger/open-api-tags';
import { GeolocationSchema } from '../../swagger/schema/ipstack';

@ApiUseTag(headerTags.IPSTACK.name)
@JWTRequired()
export class IpstackController {
  @dependency
  ipstackService: IpstackService
  
  @Get('/own')
  @ApiResponse(...getResponseStatusTags(GeolocationSchema)[200])
  @ApiResponse(...getResponseStatusTags()[401])
  @ApiResponse(...getResponseStatusTags()[500])
  async getOwnGeolocation() {
    const geolocationResponse = await this.ipstackService.getOwnGeolocation();
    return new HttpResponseOK({ result: geolocationResponse.data});
  }

  @Get('/custom/:ip')
  @ApiParameter({name: 'ip', in: 'path', required: true, description: 'IP address'})
  @ApiResponse(...getResponseStatusTags(GeolocationSchema)[200])
  @ApiResponse(...getResponseStatusTags()[400])
  @ApiResponse(...getResponseStatusTags()[401])
  @ApiResponse(...getResponseStatusTags()[500])
  async getCustomGeolocation(ctx: Context) {
    const { ip } = ctx.request.params;
    const geolocationResponse = await this.ipstackService.getCustomGeolocation(ip);
    return new HttpResponseOK({ result: geolocationResponse.data});
  }

}
