import React from 'react';
import { shallow } from 'enzyme';
import { navBar } from '../../../src/client/components/navBar';

describe('My Test Suite', () => {
  it('My Test Case', () => {
    const wrapper = shallow(<navBar />);
    expect(wrapper).toMatchSnapshot();
  });
});