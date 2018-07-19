// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Col, connectStyle, mapPropsToStyleNames } from 'native-base';
import PropTypes from 'prop-types';

type Props = {
  [string]: mixed,
  children?: mixed,
};

class Feed extends Component {
  static contextTypes = {
    theme: PropTypes.object,
  };
  _root: string;
  props: Props;

  render() {
    const variables = this.context.theme['@@shoutem.theme/themeStyle'].variables;
    return (
      <Col {...this.props}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 10,
            backgroundColor: variables.borderColor,
            width: 1,
          }}
        />
        {this.props.children}
      </Col>
    );
  }
}

export default connectStyle('Homepass.Feed', {}, mapPropsToStyleNames)(Feed);
