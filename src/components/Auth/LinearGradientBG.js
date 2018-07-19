// @flow
import React from 'react';
import LinearGradient from 'react-native-linear-gradient'; // eslint-disable-line

type Props = {
  children?: ReactElement<*>,
};

export default function LinearGradientBG({ children }: Props) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      colors={['#28DBA7CC', '#03A9F4CC', '#0385F4CC', '#6800FFCC']}
      locations={[0, 0.46, 0.7, 1]}
      style={{
        flex: 1,
      }}
    >
      {children}
    </LinearGradient>
  );
}
