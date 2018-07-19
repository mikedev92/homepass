// @flow
import React from 'react';
import { ScrollView } from 'react-native';
import { variables } from '../../theme';

type Props = {
  [string]: any
};

export default function HorizontalScrollView(props: Props) {
  return (
    <ScrollView
      style={{ marginVertical: variables.contentPadding }}
      contentContainerStyle={{ marginLeft: variables.contentPadding }}
      horizontal
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  );
}
