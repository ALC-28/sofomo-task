import { IApiSchema } from "@foal/core";

export const GeolocationSchema: IApiSchema = {
  properties: {
    ip: {type: 'string'},
    type: {type: 'string'},
    continent_code: {type: 'string'},
    continent_name: {type: 'string'},
    country_code: {type: 'string'},
    country_name: {type: 'string'},
    region_code: {type: 'string'},
    region_name: {type: 'string'},
    city: {type: 'string'},
    zip: {type: 'string'},
    latitude: {type: 'number'},
    longitude: {type: 'number'},
    location: {type: 'object', properties: {
      geoname_id: {type: 'number'},
      capital: {type: 'string'},
      languages: {type: 'array', items: {
        properties: {
          code: {type: 'string'},
          name: {type: 'string'},
          native: {type: 'string'}
        }
      }},
      country_flag: {type: 'string'},
      country_flag_emoji: {type: 'string'},
      country_flag_emoji_unicode: {type: 'string'},
      calling_code: {type: 'string'},
      is_eu: {type: 'boolean'}
    }}
  }
};