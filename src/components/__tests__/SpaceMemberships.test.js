// @flow
import React from 'react';
import { shallow } from 'enzyme';
import SpaceMemberships from '../SpaceMemberships';

const testProps = [
  {
    data: {
      node: {
        visibility: 'OPEN',
        memberRequests: {
          edges: [{}],
        },
        members: {
          edges: [{ node: { user: { name: 'Name', imageUrl: 'Image' } } }],
        },
      },
    },
  },
  {
    data: {
      node: {
        visibility: 'SECRET',
        memberRequests: {
          edges: [],
        },
        members: {
          edges: [{ node: { spaceMemberId: '123', user: { name: 'Name', imageUrl: 'Image' } } }],
        },
      },
    },
  },
  {
    data: {
      node: {
        visibility: 'PRIVATE',
        memberRequests: {
          edges: [{}, {}],
        },
        members: {
          edges: [],
        },
      },
    },
  },
];
describe('<SpaceMemberships />', () => {
  it('matches snapshots', () => {
    testProps.forEach((props) => {
      const baseProps = {
        inviteSpaceMember: jest.fn(),
        removeSpaceMember: jest.fn(),
      };
      const wrapper = shallow(<SpaceMemberships {...baseProps} {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
