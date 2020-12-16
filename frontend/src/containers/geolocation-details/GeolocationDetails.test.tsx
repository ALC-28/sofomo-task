import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import GeolocationDetails from './GeolocationDetails';
import * as sinon from 'sinon';
import * as recoil from 'recoil';
import * as router from 'react-router-dom';

describe('GeolocationDetails', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should render details', () => {
    const wrapper = mount((
      <recoil.RecoilRoot>
        <router.MemoryRouter initialEntries={['/geolocations/1']}>
          <GeolocationDetails />
        </router.MemoryRouter>
      </recoil.RecoilRoot>
    ));
    expect(wrapper.find('ListGroup').length).to.equal(0);
  });

  it('should render update form', () => {
    const wrapper = mount((
      <recoil.RecoilRoot>
        <router.MemoryRouter initialEntries={['/geolocations/1']}>
          <GeolocationDetails />
        </router.MemoryRouter>
      </recoil.RecoilRoot>
    ));
    expect(wrapper.find('Formik').length).to.equal(0);
  });
});