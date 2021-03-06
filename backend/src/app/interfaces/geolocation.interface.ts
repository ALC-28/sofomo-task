import { DisplayParams } from "./search-result.interface";

export interface IPStackGeolocationInterface {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: Location;
}

export interface GeolocationInterface extends IPStackGeolocationInterface {
  comment: string;
}

export interface GeolocationSearchParams extends DisplayParams {
  ip?: string; 
  country_name?: string; 
  city?: string;
}

export interface GeolocationSearchResult {
  content: GeolocationInterface[],
  displayParams: DisplayParams;
}

interface Location {
  geoname_id: number;
  capital: string;
  languages: Language[];
  country_flag: string;
  country_flag_emoji: string;
  country_flag_emoji_unicode: string;
  calling_code: string;
  is_eu: boolean;
}

interface Language {
  code: string;
  name: string;
  native: string;
}