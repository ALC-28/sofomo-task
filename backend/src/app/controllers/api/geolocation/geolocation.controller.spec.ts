// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { GeolocationController } from './geolocation.controller';

describe('GeolocationController', () => {

  let controller: GeolocationController;

  beforeEach(() => controller = createController(GeolocationController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(GeolocationController, 'foo'), 'GET');
      strictEqual(getPath(GeolocationController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
