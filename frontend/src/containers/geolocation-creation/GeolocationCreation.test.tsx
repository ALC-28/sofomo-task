import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import GeolocationCreation from './GeolocationCreation';
import * as sinon from 'sinon';
import * as recoil from 'recoil';

describe('GeolocationCreation', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should render form', () => {
    const wrapper = mount((
      <recoil.RecoilRoot>
        <GeolocationCreation />
      </recoil.RecoilRoot>
    ));
    expect(wrapper.find('Formik').length).to.equal(1);
  });
});