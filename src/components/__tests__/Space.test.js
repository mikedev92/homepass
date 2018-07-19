// @flow
import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import Space from '../Space';

const testProps = [
  {
    data: {
      node: {
        id: '123',
        spaceId: '123',
        title: 'Title',
        imageUrl: 'Image',
        visibility: 'OPEN',
        viewerMember: {
          id: '123',
        },
        viewerMemberRequest: null,
        members: {
          edges: [
            {
              node: {
                id: '123',
                user: {
                  id: '123',
                  imageUrl: 'user 1 image',
                },
              },
            },
          ],
        },
        calendarEvents: {
          edges: [
            {
              node: {
                id: '123',
                name: 'Open',
                startDate: new Date(0),
                endDate: new Date(1000000000000000),
              },
            },
          ],
        },
        contacts: {
          edges: [
            {
              node: {
                id: '123',
              },
            },
          ],
        },
        resources: [
          {
            spaceResourceTitle: 'resource title',
            spaceResourceSubtitle: 'resource subtitle',
            spaceResourceDescription: 'resource description',
          },
        ],
      },
    },
  },
  {
    data: {
      node: {
        id: '123',
        spaceId: '123',
        title: 'Title',
        imageUrl: 'Image',
        visibility: 'OPEN',
        viewerMember: null,
        viewerMemberRequest: null,
        members: {
          edges: [],
        },
        calendarEvents: {
          edges: [
            {
              node: {
                id: '123',
                name: 'Open',
                startDate: new Date(0),
                endDate: new Date(1000000000000000),
              },
            },
          ],
        },
        contacts: {
          edges: [
            {
              node: {
                id: '123',
              },
            },
          ],
        },
        resources: [
          {
            spaceResourceTitle: 'resource title',
            spaceResourceSubtitle: 'resource subtitle',
            spaceResourceDescription: 'resource description',
          },
        ],
      },
    },
  },
  {
    data: {
      node: {
        id: '123',
        spaceId: '123',
        title: 'Title',
        imageUrl: 'Image',
        visibility: 'OPEN',
        viewerMember: null,
        viewerMemberRequest: null,
        members: {
          edges: [
            {
              node: {
                id: '123',
                user: {
                  id: '123',
                  imageUrl: 'user 1 image',
                },
              },
            },
          ],
        },
        calendarEvents: {
          edges: [],
        },
        contacts: {
          edges: [
            {
              node: {
                id: '123',
              },
            },
          ],
        },
        resources: [
          {
            spaceResourceTitle: 'resource title',
            spaceResourceSubtitle: 'resource subtitle',
            spaceResourceDescription: 'resource description',
          },
        ],
      },
    },
  },

  {
    data: {
      node: {
        id: '123',
        spaceId: '123',
        title: 'Title',
        imageUrl: 'Image',
        visibility: 'OPEN',
        viewerMember: null,
        viewerMemberRequest: null,
        members: {
          edges: [
            {
              node: {
                id: '123',
                user: {
                  id: '123',
                  imageUrl: 'user 1 image',
                },
              },
            },
          ],
        },
        calendarEvents: {
          edges: [
            {
              node: {
                id: '123',
                name: 'Open',
                startDate: new Date(0),
                endDate: new Date(1000000000000000),
              },
            },
          ],
        },
        contacts: {
          edges: [
            {
              node: {
                id: '123',
              },
            },
          ],
        },
        resources: [
          {
            spaceResourceTitle: 'resource title',
            spaceResourceSubtitle: 'resource subtitle',
            spaceResourceDescription: 'resource description',
          },
        ],
      },
    },
  },
  {
    data: {
      node: {
        id: '123',
        spaceId: '123',
        title: 'Title',
        imageUrl: 'Image',
        visibility: 'PRIVATE',
        viewerMember: null,
        viewerMemberRequest: null,
        members: {
          edges: [
            {
              node: {
                id: '123',
                user: {
                  id: '123',
                  imageUrl: 'user 1 image',
                },
              },
            },
          ],
        },
        calendarEvents: {
          edges: [
            {
              node: {
                id: '123',
                name: 'Open',
                startDate: new Date(0),
                endDate: new Date(1000000000000000),
              },
            },
          ],
        },
        contacts: {
          edges: [
            {
              node: {
                id: '123',
              },
            },
          ],
        },
        resources: [
          {
            spaceResourceTitle: 'resource title',
            spaceResourceSubtitle: 'resource subtitle',
            spaceResourceDescription: 'resource description',
          },
        ],
      },
    },
  },
  {
    data: {
      node: {
        id: '123',
        spaceId: '123',
        title: 'Title',
        imageUrl: 'Image',
        visibility: 'OPEN',
        viewerMember: null,
        viewerMemberRequest: { id: '123' },
        members: {
          edges: [
            {
              node: {
                id: '123',
                user: {
                  id: '123',
                  imageUrl: 'user 1 image',
                },
              },
            },
          ],
        },
        calendarEvents: {
          edges: [
            {
              node: {
                id: '123',
                name: 'Open',
                startDate: new Date(0),
                endDate: new Date(1000000000000000),
              },
            },
          ],
        },
        contacts: {
          edges: [
            {
              node: {
                id: '123',
              },
            },
          ],
        },
        resources: [
          {
            spaceResourceTitle: 'resource title',
            spaceResourceSubtitle: 'resource subtitle',
            spaceResourceDescription: 'resource description',
          },
        ],
      },
    },
  },
];

describe('<Space />', () => {
  beforeEach(() => {
    MockDate.set(new Date('1/1/2000'));
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('matches snapshots', () => {
    testProps.forEach((props) => {
      const wrapper = shallow(<Space {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
