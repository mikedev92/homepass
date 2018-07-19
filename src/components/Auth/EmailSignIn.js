// @flow
import React from 'react';
import { Container, Header, Input, Text, Item, Button, Content, Icon, Left } from 'native-base';
import { withNavigation } from 'react-navigation';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import validator from 'validator';

type Props = {
  navigation: Navigation,
  email: string,
  setEmail: string => void,
  loginWithEmail: string => void,
};

function EmailSignIn({ navigation, setEmail, email, loginWithEmail }: Props) {
  return (
    <Container>
      <Header style={{ borderBottomWidth: 0 }}>
        <Left>
          <Button transparent primary onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
      </Header>
      <Content
        style={{ backgroundColor: 'white', padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text display>Sign in</Text>
        <Text accent style={{ marginTop: 8 }}>What{"'"}s your email address?</Text>
        <Item style={{ marginVertical: 32, borderColor: '#CDCED2' }}>
          <Input
            onChangeText={v => setEmail(v)}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            large
          />
        </Item>
        <Button
          iconRight
          primary
          disabled={!validator.isEmail(email)}
          onPress={() => loginWithEmail(email)}
        >
          <Text>Next</Text>
          <Icon name="arrow-forward" />
        </Button>
      </Content>
    </Container>
  );
}
EmailSignIn.navigationOptions = {
  header: undefined,
};

export default compose(
  withNavigation,
  withState('email', 'setEmail', ''),
  connect(null, (dispatch: Dispatch) => ({
    loginWithEmail: email => dispatch({ email, type: 'PASSWORDLESS_LOGIN_WITH_EMAIL' }),
  })),
)(EmailSignIn);
