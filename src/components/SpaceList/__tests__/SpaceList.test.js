import React from 'react';
import { shallow } from 'enzyme';
import SpaceList from '../SpaceList';

describe('<SpaceList />', () => {
  it('renders a segmented list of properties', () => {
    const wrapper = shallow(
      <SpaceList
        filters={{}}
        searchText=""
        data={{
          viewer: {
            spaces: {
              edges: [{
                node: {
                  title: 'a',
                  isViewerMember: true,
                },
              }, {
                node: {
                  title: 'b',
                  isViewerMember: false,
                },
              }],
            },
          },
        }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

