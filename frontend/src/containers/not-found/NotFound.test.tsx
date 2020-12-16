import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import NotFound from './NotFound';
import * as sinon from 'sinon';

describe('NotFound', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should render message', () => {
    const wrapper = mount((
      <NotFound />
    ));
    expect(wrapper.find('h1').text()).to.equal('The page you\'re trying to view does not exist.');
  });
});
