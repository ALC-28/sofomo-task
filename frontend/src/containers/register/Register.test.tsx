import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Register from './Register';
import * as sinon from 'sinon';

describe('Register', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should render form', () => {
    const wrapper = mount((
      <Register />
    ));
    expect(wrapper.find('Formik').length).to.equal(1);
  });
});