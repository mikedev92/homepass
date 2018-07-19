// @flow
import React from 'react';
import { shallow } from 'enzyme';
import SpaceFilters from '../SpaceFilters';

const testProps = [
  {
    filters: { OPEN: true },
    data: {
      viewer: {
        spaceFilters: [{ tag: 'OPEN', label: 'woo' }],
      },
    },
  },
  {
    filters: { OPEN2: true },
    data: {
      viewer: {
        spaceFilters: [
          { tag: 'OPEN', label: 'woo' },
          { tag: 'OPEN1', label: 'woo 1' },
          { tag: 'OPEN2', label: 'woo 2' },
        ],
      },
    },
  },
];
describe('<SpaceFilters />', () => {
  it('matches snapshots', () => {
    testProps.forEach((props) => {
      const baseProps = {
        toggleFilter: jest.fn(),
      };
      const wrapper = shallow(<SpaceFilters {...baseProps} {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('call set visibility with the correct value', () => {
    const toggleFilter = jest.fn();
    const wrapper = shallow(
      <SpaceFilters
        filters={{}}
        data={{
          viewer: {
            spaceFilters: [{ tag: 'OPEN', label: 'open' }],
          },
        }}
        toggleFilter={toggleFilter}
      />,
    );
    const listItem = wrapper.find({ last: true });
    listItem.props().onPress();
    expect(toggleFilter).toHaveBeenCalledTimes(1);
    expect(toggleFilter).toHaveBeenCalledWith('OPEN', true);
  });
});
