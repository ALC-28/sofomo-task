export enum ResponseSuccessCode {
  GEOLOCATION_CREATED = 'GEOLOCATION_CREATED',
  GEOLOCATION_UPDATED = 'GEOLOCATION_UPDATED',
  GEOLOCATION_DELETED = 'GEOLOCATION_DELETED'
}

export class GeolocationService {
  getGeolocations() {
    return true;
  }
  
  getGeolocation() {
    return true;
  }

  createGeolocation() {
    return { code: ResponseSuccessCode.GEOLOCATION_CREATED };
  }

  updateGeolocation() {
    return { code: ResponseSuccessCode.GEOLOCATION_UPDATED };
  }

  deleteGeolocation() {
    return { code: ResponseSuccessCode.GEOLOCATION_DELETED };
  }
}
