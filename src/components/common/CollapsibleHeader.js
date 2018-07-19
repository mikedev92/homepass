// @flow
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Right, Container, Content, Header, Left, Button, Icon, Body, Title } from 'native-base';
import { variables } from '../../theme';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTitle = Animated.createAnimatedComponent(Title);
const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
});

class CollapsibleHeader extends React.Component {
  componentWillMount() {
    this.animated = new Animated.Value(0);
  }

  animated: Animated.Value;
  props: {
    title: any,
    children?: any,
    imageSource: any,
    onBackPress: () => void,
  };

  render() {
    const headerSizeInterpolateStyle = this.animated.interpolate({
      inputRange: [0, 110],
      outputRange: [170, 60],
      extrapolateRight: 'clamp',
    });
    const topSpacing = this.animated.interpolate({
      inputRange: [0, 110],
      outputRange: [0, 110],
      extrapolate: 'clamp',
    });
    const headerBackgroundColor = this.animated.interpolate({
      inputRange: [0, 110],
      outputRange: ['#FFFFFF00', '#FFFFFFFF'],
      extrapolate: 'clamp',
    });
    const imageOpacityStyle = this.animated.interpolate({
      inputRange: [0, 110],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const backButtonColor = this.animated.interpolate({
      inputRange: [0, 110],
      outputRange: ['#FFF', variables.primary],
      extrapolate: 'clamp',
    });
    const headerStyle = {
      height: headerSizeInterpolateStyle,
      backgroundColor: headerBackgroundColor,
    };
    const textTransform = this.animated.interpolate({
      inputRange: [110, 140],
      outputRange: [30, 0],
      extrapolate: 'clamp',
    });
    const textOpacity = this.animated.interpolate({
      inputRange: [110, 140],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const translateText = {
      transform: [
        {
          translateY: textTransform,
        },
      ],
      opacity: textOpacity,
    };

    return (
      <Container>
        <Animated.View style={[headerStyle, styles.header]}>
          <Animated.Image
            source={this.props.imageSource}
            style={[StyleSheet.absoluteFill, { opacity: imageOpacityStyle }]}
          />
          <Header style={{ backgroundColor: 'transparent' }}>
            <Left>
              <Button primary transparent onPress={this.props.onBackPress}>
                <AnimatedIcon style={{ color: backButtonColor }} name="arrow-back" />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <AnimatedTitle style={translateText}>{this.props.title}</AnimatedTitle>
            </Body>
            <Right />
          </Header>
        </Animated.View>
        <Content
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.animated } } }])}
        >
          <Animated.View style={[{ height: topSpacing }]} />
          {this.props.children}
        </Content>
      </Container>
    );
  }
}
export default CollapsibleHeader;
