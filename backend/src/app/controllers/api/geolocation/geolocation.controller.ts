import { ApiResponse, ApiUseTag, Context, Delete, dependency, Get, HttpResponseOK, Post, Put } from '@foal/core';
import { headerTags, responseStatusTags } from '../../swagger/open-api-tags';
import { JWTRequired } from '@foal/jwt';
import { GeolocationService } from '../../../services/geolocation.service';

@ApiUseTag(headerTags.GEOLOCATION.name)
// @JWTRequired()
export class GeolocationController {
  @dependency
  geolocationService: GeolocationService

  @Post()
  @ApiResponse(...responseStatusTags[201])
  @ApiResponse(...responseStatusTags[400])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  createGeolocation(ctx: Context) {
    const geolocationResponse = this.geolocationService.createGeolocation();
    return new HttpResponseOK(geolocationResponse);
  }

  @Get()
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  async getGeolocations(ctx: Context) {
    const geolocationResponse = this.geolocationService.getGeolocations();
    return new HttpResponseOK(geolocationResponse);
  }

  @Get('/:id')
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[404])
  @ApiResponse(...responseStatusTags[500])
  getGeolocation(ctx: Context) {
    const geolocationResponse = this.geolocationService.getGeolocation();
    return new HttpResponseOK(geolocationResponse);
  }

  @Put('/:id')
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[400])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  updateGeolocation(ctx: Context) {
    const geolocationResponse = this.geolocationService.updateGeolocation();
    return new HttpResponseOK(geolocationResponse);
  }

  @Delete('/:id')
  @ApiResponse(...responseStatusTags[200])
  @ApiResponse(...responseStatusTags[401])
  @ApiResponse(...responseStatusTags[500])
  deleteGeolocation(ctx: Context) {
    const geolocationResponse = this.geolocationService.deleteGeolocation();
    return new HttpResponseOK(geolocationResponse);
  }

}
