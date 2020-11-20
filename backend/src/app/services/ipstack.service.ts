import { Config } from '@foal/core';
import axios from 'axios';
import { GeolocationInterface } from '../interfaces/geolocation.interface';

export class IpstackService {
  getOwnGeolocation(): Promise<{data: GeolocationInterface}> {
    const url = `${Config.get('ipstack.url')}check`;
    return axios.get(url, { params: { 'access_key': Config.get('ipstack.key') } });
  }
  
  getCustomGeolocation(ip: string): Promise<{data: GeolocationInterface}> {
    const url = `${Config.get('ipstack.url')}${ip}`;
    return axios.get(url, { params: { 'access_key': Config.get('ipstack.key') } });
  }
}
