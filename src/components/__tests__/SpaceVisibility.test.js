// @flow
import React from 'react';
import { shallow } from 'enzyme';
import SpaceVisibility from '../SpaceVisibility';

const testProps = [
  {
    data: {
      node: {
        visibility: 'OPEN',
      },
    },
  },
  {
    data: {
      node: {
        visibility: 'PRIVATE',
      },
    },
  },
  {
    data: {
      node: {
        visibility: 'SECRET',
      },
    },
  },
];

describe('<SpaceVisibility />', () => {
  it('matches snapshots', () => {
    testProps.forEach((props) => {
      const wrapper = shallow(<SpaceVisibility setVisibility={jest.fn()} {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
