// @flow
import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import SpaceMemberRequestRow from '../SpaceMemberRequestRow';

const testProps = [
  {
    approveSpaceMemberRequest: jest.fn(),
    rejectSpaceMemberRequest: jest.fn(),
    spaceMemberRequest: {
      id: '123',
      spaceMemberRequestId: '123',
      createdAt: new Date(1234).toISOString(),
      user: null,
    },
    last: true,
  },
  {
    approveSpaceMemberRequest: jest.fn(),
    rejectSpaceMemberRequest: jest.fn(),
    spaceMemberRequest: {
      id: '123',
      spaceMemberRequestId: '123',
      createdAt: new Date(1234).toISOString(),
      user: {
        id: '123',
        userId: '123',
        name: 'Name',
        firstName: 'first name',
        lastName: 'last name',
        imageUrl: 'Image',
        email: null,
        emailVerified: false,
        lastLoginAt: new Date(1234).toISOString(),
        layerId: null,
        mobile: null,
        mobileVerified: false,
      },
    },
    last: true,
  },
];
describe('<SpaceMemberRequestRow />', () => {
  beforeEach(() => {
    MockDate.set(new Date('1/1/2000'));
  });

  afterEach(() => {
    MockDate.reset();
  });
  it('matches snapshots', () => {
    testProps.forEach((props) => {
      const wrapper = shallow(<SpaceMemberRequestRow {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
