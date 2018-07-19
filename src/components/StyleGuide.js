// @flow
import React from 'react';
import { compose, setStatic } from 'recompose';
import {
  Left,
  Button,
  View,
  Container,
  Header,
  Body,
  Title,
  Content,
  Icon,
  Text,
  Right,
  H1,
  H2,
} from 'native-base';
import { withNavigation } from 'react-navigation';
import { omit } from 'lodash';
import { variables } from '../theme';

type BoxProps = {
  [string]: mixed,
  children?: string,
};
function Box(props: BoxProps) {
  return (
    <View
      style={{
        width: 70,
        margin: 5,
      }}
    >
      <View style={{ width: 66, height: 66, borderRadius: 33 }} {...omit(props, 'children')} />
      <Text caption>{props.children}</Text>
    </View>
  );
}

type Props = {
  navigation: Navigation,
};

function StyleGuide({ navigation }: Props) {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent primary onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>
            Style Guide
          </Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ backgroundColor: 'white' }}>
        <Text display>Display</Text>
        <H1 headline2>H1</H1>
        <H2 headline3>H2</H2>
        <Text accent>Accent</Text>
        <Text title>Title</Text>
        <Text body>Body</Text>
        <Text bodySmall>Body Small</Text>
        <Text caption>Caption</Text>
        <Text status>Status</Text>
        <View
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <Box backgroundPrimary>
            Primary
          </Box>
          <Box backgroundDark>
            Dark
          </Box>
          <Box backgroundDarkGray>
            Dark Gray
          </Box>
          <Box backgroundGray>
            Gray
          </Box>
          <Box backgroundLightGray>
            Light Gray
          </Box>
          <Box backgroundLight>
            Light
          </Box>
          <Box backgroundAlert>
            Alert
          </Box>
        </View>
      </Content>
    </Container>
  );
}
export default compose(
  withNavigation,
  setStatic('navigationOptions', {
    tabBarIcon: ({ tintColor, focused }: NavigationTabBarIconProps) =>
      <Icon style={{ color: tintColor }} active={focused} name="color-palette" />,
    tintColor: variables.brandPrimary,
  }),
)(StyleGuide);
