import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Header from './Header';
import * as recoil from 'recoil';
import * as sinon from 'sinon';

describe('Header', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should not render when user not logged in', () => {
    sinon.stub(recoil, 'useRecoilValue').returns(null);
    const wrapper = mount((
      <recoil.RecoilRoot>
        <Header />
      </recoil.RecoilRoot>
    ));
    expect(wrapper.find('Navbar').length).to.equal(0);
  });

  it('should render when user logged in', () => {
    sinon.stub(recoil, 'useRecoilValue').returns('mocked user');
    const wrapper = mount((
      <recoil.RecoilRoot>
        <Header />
      </recoil.RecoilRoot>
    ));
    expect(wrapper.find('Navbar').length).to.equal(1);
  });
});