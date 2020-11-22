import { Document } from 'mongoose';
import { Geolocation } from '../models/geolocation.model';

export enum ResponseSuccessCode {
  GEOLOCATION_CREATED = 'GEOLOCATION_CREATED',
  GEOLOCATION_UPDATED = 'GEOLOCATION_UPDATED',
  GEOLOCATION_DELETED = 'GEOLOCATION_DELETED'
}

export class GeolocationService {
  async getGeolocations() {
    const geolocations = await Geolocation.find({})
    return { result: geolocations };
  }
  
  async getGeolocation(id) {
    const geolocation = await Geolocation.findById(id);
    return { result: geolocation };
  }

  async createGeolocation(ipstackGeolocation) {
    const geolocation: Document = new Geolocation(ipstackGeolocation);
    await geolocation.save();
    return { code: ResponseSuccessCode.GEOLOCATION_CREATED };
  }

  async updateGeolocation(id) {
    // await Geolocation.findByIdAndUpdate(id, {});
    return { code: ResponseSuccessCode.GEOLOCATION_UPDATED };
  }

  async deleteGeolocation(id) {
    // await Geolocation.findByIdAndDelete(id);
    return { code: ResponseSuccessCode.GEOLOCATION_DELETED };
  }
}
