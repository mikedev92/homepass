import React from 'react';
import { shallow } from 'enzyme';
import Root from '../Root';

describe('<Root />', () => {
  it('renders a navigator', () => {
    const wrapper = shallow(<Root />);
    expect(wrapper).toMatchSnapshot();
  });
});

