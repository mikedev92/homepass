import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from 'native-base';
import { Raw as SpaceAddMember } from '../SpaceAddMember';

const testProps = [
  {
    data: {
      loading: false,
      node: {
        id: '123',
        spaceId: '123',
        suggestedMembers: [
          {
            id: 'abc',
            userId: 'adc',
            name: 'my image',
          },
          {
            id: 'cde',
            userId: 'cde',
            name: 'my image 2',
          },
          {
            id: '345',
            userId: '345',
            name: 'my image 3',
          },
        ],
      },
    },
    selectedMembers: { abc: true, cde: true }, // eslint-disable-line
  },
];
describe('<SpaceAddMember />', () => {
  it('matches snapshots', () => {
    testProps.forEach((props) => {
      const baseProps = {
        toggleMember: jest.fn(),
      };
      const wrapper = shallow(<SpaceAddMember {...baseProps} {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('calls toggleMember correctly', () => {
    testProps.forEach((props) => {
      const baseProps = {
        toggleMember: jest.fn(() => jest.fn()),
      };
      const wrapper = shallow(<SpaceAddMember {...baseProps} {...props} />);
      const listItems = wrapper.find(ListItem);
      listItems.forEach(listItem => listItem.prop('onPress')());
      expect(baseProps.toggleMember).toHaveBeenCalledTimes(listItems.length);
    });
  });
});
