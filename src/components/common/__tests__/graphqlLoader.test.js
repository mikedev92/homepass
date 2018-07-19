import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';

jest.dontMock('../graphqlLoader');

describe('graphqlLoader', () => {
  it('matches snapshot', () => {
    /* eslint-disable global-require */
    const graphqlLoader = require('../graphqlLoader').default;
    const Stub = graphqlLoader(() => <View />);
    const testProps = [
      { data: { loading: true } },
      { data: { loading: false } },
      { data: { error: { this: 'IS SOME CRAZY ERROR' } } },
    ];
    testProps.forEach((props) => {
      const wrapper = shallow(
        <Stub {...props} />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});

