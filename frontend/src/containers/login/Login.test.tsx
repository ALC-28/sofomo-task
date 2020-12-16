import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Login from './Login';
import * as sinon from 'sinon';

describe('Login', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should render form', () => {
    const wrapper = mount((
      <Login />
    ));
    expect(wrapper.find('Formik').length).to.equal(1);
  });
});