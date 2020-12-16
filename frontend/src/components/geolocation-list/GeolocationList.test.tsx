import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import GeolocationList from './GeolocationList';
import * as sinon from 'sinon';

describe('GeolocationList', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('should render list', () => {
    const wrapper = mount((
      <GeolocationList searchResult={{content: [], displayParams: {totalPages: 0}}} pageChanged={sinon.mock()} />
    ));
    expect(wrapper.find('table').length).to.equal(1);
  });

  it('should render pagination', () => {
    const wrapper = mount((
      <GeolocationList searchResult={{content: [], displayParams: {totalPages: 0}}} pageChanged={sinon.mock()} />
    ));
    expect(wrapper.find('.pagination').length).to.equal(1);
  });
});