import { Document } from 'mongoose';
import { GeolocationInterface, GeolocationSearchParams, GeolocationSearchResult } from '../interfaces/geolocation.interface';
import { Geolocation } from '../models/geolocation.model';

export enum MessageCode {
  GEOLOCATION_CREATED = 'GEOLOCATION_CREATED',
  GEOLOCATION_UPDATED = 'GEOLOCATION_UPDATED',
  GEOLOCATION_DELETED = 'GEOLOCATION_DELETED'
}

export class GeolocationService {
  async getGeolocations(query: GeolocationSearchParams): Promise<{result: GeolocationSearchResult}> {
    let { pageNumber, itemsPerPage, ...filterQuery } = query;
    pageNumber = Number(pageNumber);
    itemsPerPage = Number(itemsPerPage);
    const totalItems = (await Geolocation.find(filterQuery)).length;
    const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 0;
    const skippedQuantity = (pageNumber - 1) * itemsPerPage; 
    const geolocations = await Geolocation.find(filterQuery).skip(skippedQuantity).limit(itemsPerPage);
    return { result: {displayParams: {pageNumber, itemsPerPage, totalPages}, content: geolocations }};
  }
  
  async getGeolocation(id: string) {
    const geolocation = await Geolocation.findById(id);
    return { result: geolocation };
  }

  async createGeolocation(payload: GeolocationInterface) {
    const geolocation: Document = new Geolocation(payload);
    await geolocation.save();
    return { message: MessageCode.GEOLOCATION_CREATED };
  }

  async updateGeolocation(id: string, payload: GeolocationInterface) {
    await Geolocation.findByIdAndUpdate(id, payload);
    return { message: MessageCode.GEOLOCATION_UPDATED };
  }

  async deleteGeolocation(id: string) {
    await Geolocation.findByIdAndDelete(id);
    return { message: MessageCode.GEOLOCATION_DELETED };
  }
}
