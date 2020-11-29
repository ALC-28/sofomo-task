import { IApiSchema } from "@foal/core";

export const headerTags = {
  AUTH: { name: 'Auth', description: 'Authentication and authorization of the user' },
  GEOLOCATION: { name: 'Geolocation', description: 'Geolocation management' },
  IPSTACK: { name: 'IPStack', description: 'IPStack external service' }
};

interface ResponseStatusTags {
  [key: number]: [number, {description: string, content?: any}];
}

export const getResponseStatusTags: (rawSchema?: IApiSchema, isArray?: boolean) => ResponseStatusTags = (rawSchema = {}, isArray = false) => {
  const schema = isArray ? {type: 'array', items: rawSchema} : rawSchema;
  return {
    200: [
      200, 
      { 
        description: 'successful', 
        content: {
          'application/json': {
            schema 
          }
        }
      } 
    ],
    201: [
      201, 
      { 
        description: 'created',
        content: {
          'application/json': {
            schema 
          }
        }
      }
    ],
    400: [
      400, 
      { description: 'bad request' }
    ],
    401: [
      401, 
      { description: 'unauthorized' }
    ],
    404: [
      404, 
      { description: 'not found' }
    ],
    500: [
      500, 
      { description: 'server error' }
    ]
  };
};