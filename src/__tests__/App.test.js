import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('<App />', () => {
  it('renders a navigator', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains('Navigator'));
    expect(wrapper).toMatchSnapshot();
  });
});

