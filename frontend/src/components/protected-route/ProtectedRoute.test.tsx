import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import ProtectedRoute from './ProtectedRoute';
import * as recoil from 'recoil';
import * as sinon from 'sinon';
import Geolocations from '../../containers/geolocations/Geolocations';
import { MemoryRouter } from 'react-router-dom';

describe('ProtectedRoute', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should not render when user not logged in', () => {
    const wrapper = mount((
      <recoil.RecoilRoot>
        <MemoryRouter initialEntries={['/geolocations']}>
          <ProtectedRoute exact path='/geolocations' component={Geolocations}></ProtectedRoute>
        </MemoryRouter>
      </recoil.RecoilRoot>
    ));
    expect(wrapper.find('Geolocations').length).to.equal(0);
  });

  it('should render when user is logged in', () => {
    sinon.stub(recoil, 'useRecoilValue').returns('mocked user');
    const wrapper = mount((
      <recoil.RecoilRoot>
        <MemoryRouter initialEntries={['/geolocations']}>
          <ProtectedRoute exact path='/geolocations' component={Geolocations}></ProtectedRoute>
        </MemoryRouter>
      </recoil.RecoilRoot>
    ));
    expect(wrapper.find('Geolocations').length).to.equal(1);
  });
});