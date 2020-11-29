import { Document } from 'mongoose';
import { GeolocationInterface } from '../interfaces/geolocation.interface';
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
