// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { IpstackController } from './ipstack.controller';

describe('IpstackController', () => {

  let controller: IpstackController;

  beforeEach(() => controller = createController(IpstackController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(IpstackController, 'foo'), 'GET');
      strictEqual(getPath(IpstackController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
