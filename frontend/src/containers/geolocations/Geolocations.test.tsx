import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Geolocations from './Geolocations';
import * as sinon from 'sinon';
import * as recoil from 'recoil';

describe('Geolocations', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should render search form', () => {
    const wrapper = mount((
      <recoil.RecoilRoot>
        <Geolocations />
      </recoil.RecoilRoot>
    ));
    expect(wrapper.find('GeolocationSearch').length).to.equal(1);
  });

  it('should render list', () => {
    const wrapper = mount((
      <recoil.RecoilRoot>
        <Geolocations />
      </recoil.RecoilRoot>
    ));
    expect(wrapper.find('GeolocationList').length).to.equal(1);
  });
});


