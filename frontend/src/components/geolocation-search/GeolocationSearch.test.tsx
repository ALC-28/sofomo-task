import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import GeolocationSearch from './GeolocationSearch';
import * as sinon from 'sinon';

describe('GeolocationSearch', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should render form', () => {
    const wrapper = mount((
      <GeolocationSearch perform={sinon.mock()} />
    ));
    expect(wrapper.find('Formik').length).to.equal(1);
  });
});