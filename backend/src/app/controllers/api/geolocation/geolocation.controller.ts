import { ApiParameter, ApiRequestBody, ApiResponse, ApiUseTag, Context, Delete, dependency, Get, HttpResponseOK, Post, Put } from '@foal/core';
import { headerTags, getResponseStatusTags } from '../../swagger/open-api-tags';
import { JWTRequired } from '@foal/jwt';
import { GeolocationService } from '../../../services/geolocation.service';
import { GeolocationSchema } from '../../swagger/schema/geolocation';
import { MessageShema } from '../../swagger/schema/message';

@ApiUseTag(headerTags.GEOLOCATION.name)
@JWTRequired()
export class GeolocationController {
  @dependency
  geolocationService: GeolocationService

  @Post()
  @ApiRequestBody({required: true, content: {'application/json': {schema: GeolocationSchema}}})
  @ApiResponse(...getResponseStatusTags(MessageShema)[201])
  @ApiResponse(...getResponseStatusTags()[400])
  @ApiResponse(...getResponseStatusTags()[401])
  @ApiResponse(...getResponseStatusTags()[500])
  async createGeolocation(ctx: Context) {
    const geolocationResponse = await this.geolocationService.createGeolocation(ctx.request.body);
    return new HttpResponseOK(geolocationResponse);
  }

  @Get()
  @ApiResponse(...getResponseStatusTags(GeolocationSchema, true)[200])
  @ApiResponse(...getResponseStatusTags()[401])
  @ApiResponse(...getResponseStatusTags()[500])
  async getGeolocations(ctx: Context) {
    const geolocationResponse = await this.geolocationService.getGeolocations();
    return new HttpResponseOK(geolocationResponse);
  }

  @Get('/:id')
  @ApiParameter({name: 'id', in: 'path', required: true, description: 'geolocation id'})
  @ApiResponse(...getResponseStatusTags(GeolocationSchema)[200])
  @ApiResponse(...getResponseStatusTags()[401])
  @ApiResponse(...getResponseStatusTags()[404])
  @ApiResponse(...getResponseStatusTags()[500])
  async getGeolocation(ctx: Context) {
    const geolocationResponse = await this.geolocationService.getGeolocation(ctx.request.params.id);
    return new HttpResponseOK(geolocationResponse);
  }

  @Put('/:id')
  @ApiParameter({name: 'id', in: 'path', required: true, description: 'geolocation id'})
  @ApiRequestBody({required: true, content: {'application/json': {schema: GeolocationSchema}}})
  @ApiResponse(...getResponseStatusTags(MessageShema)[200])
  @ApiResponse(...getResponseStatusTags()[400])
  @ApiResponse(...getResponseStatusTags()[401])
  @ApiResponse(...getResponseStatusTags()[500])
  async updateGeolocation(ctx: Context) {
    const geolocationResponse = await this.geolocationService.updateGeolocation(ctx.request.params.id, ctx.request.body);
    return new HttpResponseOK(geolocationResponse);
  }

  @Delete('/:id')
  @ApiParameter({name: 'id', in: 'path', required: true, description: 'geolocation id'})
  @ApiResponse(...getResponseStatusTags(MessageShema)[200])
  @ApiResponse(...getResponseStatusTags()[401])
  @ApiResponse(...getResponseStatusTags()[500])
  async deleteGeolocation(ctx: Context) {
    const geolocationResponse = await this.geolocationService.deleteGeolocation(ctx.request.params.id);
    return new HttpResponseOK(geolocationResponse);
  }

}
