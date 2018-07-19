// @flow
import React from 'react';
import { shallow } from 'enzyme';
import SpaceMembershipRequests from '../SpaceMembershipRequests';

const testProps = [
  {
    data: {
      node: {
        memberRequests: {
          edges: [{}],
        },
      },
    },
  },
  {
    data: {
      node: {
        memberRequests: {
          edges: [],
        },
      },
    },
  },
  {
    data: {
      node: {
        memberRequests: {
          edges: [{}, {}, {}],
        },
      },
    },
  },
];
describe('<SpaceMembershipRequests />', () => {
  it('matches snapshots', () => {
    testProps.forEach((props) => {
      const baseProps = {
        approveSpaceMemberRequest: jest.fn(),
        rejectSpaceMemberRequest: jest.fn(),
      };
      const wrapper = shallow(<SpaceMembershipRequests {...baseProps} {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
