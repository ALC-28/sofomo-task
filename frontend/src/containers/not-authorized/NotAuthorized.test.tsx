import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import NotAuthorized from './NotAuthorized';
import * as sinon from 'sinon';

describe('NotAuthorized', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should render message', () => {
    const wrapper = mount((
      <NotAuthorized />
    ));
    expect(wrapper.find('h1').text()).to.equal('You\'re not authorized to view this page.');
  });
});

