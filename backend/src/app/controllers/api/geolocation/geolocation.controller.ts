import { ApiResponse, ApiUseTag, Context, Delete, Get, HttpResponseOK, Post, Put } from '@foal/core';
import { headerTags, responseStatusTags } from '../../swagger/open-api-tags';
import { JWTRequired } from '@foal/jwt';
import { ApiSuccessCode } from '../api-success-codes';

@ApiUseTag(headerTags.GEOLOCATION.name)
@JWTRequired()
export class GeolocationController {

  @Post()
  @ApiResponse(...responseStatusTags[201])
  @ApiResponse(...responseStatusTags[400])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  createGeolocation(ctx: Context) {
    return new HttpResponseOK({ code: ApiSuccessCode.GEOLOCATION_CREATED });
  }

  @Get()
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  getGeolocations(ctx: Context) {
    return new HttpResponseOK({ data: 'ok'});
  }

  @Get('/:id')
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[404])
  @ApiResponse(...responseStatusTags[500])
  getGeolocation(ctx: Context) {
    return new HttpResponseOK({ data: 'ok'});
  }

  @Put('/:id')
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[400])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  updateGeolocation(ctx: Context) {
    return new HttpResponseOK({ code: ApiSuccessCode.GEOLOCATION_UPDATED });
  }

  @Delete('/:id')
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  deleteGeolocation(ctx: Context) {
    return new HttpResponseOK({ code: ApiSuccessCode.GEOLOCATION_DELETED });
  }

}
