export const headerTags = {
  AUTH: { name: 'Auth', description: 'Authentication and authorization of the user' },
  GEOLOCATION: { name: 'Geolocation', description: 'Geolocation management' },
  IPSTACK: { name: 'IPStack', description: 'IPStack external service' }
};

export const responseStatusTags: {[key: number]: [number, {description: string}]} = {
  200: [200, { description: 'successful' }],
  201: [201, { description: 'created' }],
  400: [400, { description: 'bad request' }],
  401: [401, { description: 'unauthorized' }],
  404: [404, { description: 'not found' }],
  500: [500, { description: 'server error' }]
};