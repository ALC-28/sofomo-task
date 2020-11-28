import { Document } from 'mongoose';
import { Geolocation } from '../models/geolocation.model';

export enum MessageCode {
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

  async createGeolocation(payload) {
    const geolocation: Document = new Geolocation(payload);
    await geolocation.save();
    return { message: MessageCode.GEOLOCATION_CREATED };
  }

  async updateGeolocation(id) {
    // await Geolocation.findByIdAndUpdate(id, {});
    return { message: MessageCode.GEOLOCATION_UPDATED };
  }

  async deleteGeolocation(id) {
    // await Geolocation.findByIdAndDelete(id);
    return { message: MessageCode.GEOLOCATION_DELETED };
  }
}
