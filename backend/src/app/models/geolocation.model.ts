import { Model, model, models, Schema, Document } from 'mongoose';
import { GeolocationInterface } from '../interfaces/geolocation.interface';

const geolocationSchema: Schema = new Schema({
  ip: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  'continent_code': { type: String, required: true },
  'continent_name': { type: String, required: true },
  'country_code': { type: String, required: true },
  'country_name': { type: String, required: true },
  'region_code': { type: String, required: true },
  'region_name': { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  location: {
    'geoname_id': { type: Number, required: true },
    capital: { type: String, required: true },
    languages: [{
      code: { type: String, required: true },
      name: { type: String, required: true },
      native: { type: String, required: true },
    }],
    'country_flag': { type: String, required: true },
    'country_flag_emoji': { type: String, required: true },
    'country_flag_emoji_unicode': { type: String, required: true },
    'calling_code': { type: String, required: true },
    'is_eu': { type: Boolean, required: true },
  }
});

interface GeolocationModel extends Model<Document>, GeolocationInterface {}

export const Geolocation = models.Geolocation || model<Document, GeolocationModel>('Geolocation', geolocationSchema);