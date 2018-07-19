// @flow
import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

type Props = {
  [string]: mixed
};

const { width } = Dimensions.get('window');

export default function HomepassCarousel(props: Props) {
  return (
    <Carousel
      itemWidth={width - 20}
      sliderWidth={width}
      inactiveSlideScale={1}
      {...props}
    />
  );
}
