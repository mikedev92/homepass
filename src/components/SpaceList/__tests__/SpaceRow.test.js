import React from 'react';
import { shallow } from 'enzyme';
import SpaceRow from '../SpaceRow';

describe('<SpaceRow />', () => {
  it('matches snapshot', () => {
    const testProps = [
      {
        space: {
          id: '',
          title: '3 Derry St',
          subtitle: 'Aberfeldie 3040',
          imageUrl: 'http://myImage.png',
          viewerIsMember: true,
          addressFormatted: '3 Derry St, Aberfeldie 3040',
          nextEvent: {
            name: 'Open',
            startDate: (new Date('2018-12-12')).toISOString(),
            endDate: (new Date('2018-12-12')).toISOString(),
          },
          memberships: { edges: [] },
        },
      },
    ];

    testProps.forEach((props) => {
      const wrapper = shallow(<SpaceRow {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});

