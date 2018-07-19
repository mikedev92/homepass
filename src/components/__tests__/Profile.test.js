// @flow
import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../Profile';

describe('<Profile />', () => {
  it('matches snapshots', () => {
    const wrapper = shallow(<Profile />);
    expect(wrapper).toMatchSnapshot();
  });
});
