// @flow
import React from 'react';
import { Container, Header, Input, Text, Item, Button, Content, Icon, Left } from 'native-base';
import { withNavigation } from 'react-navigation';
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import { authSelector } from '../../reducers';

type Props = {
  navigation: Navigation,
  code: string,
  enteredEmail: string,
  codeInvalid: boolean,
  setCode: string => void,
  verifyEmailWithCode: string => void,
};

function EmailSignIn({
  navigation,
  setCode,
  code,
  verifyEmailWithCode,
  enteredEmail: email,
  codeInvalid,
}: Props) {
  return (
    <Container>
      <Header style={{ borderBottomWidth: 0 }}>
        <Left>
          <Button transparent primary onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
      </Header>
      <Content style={{ backgroundColor: 'white', padding: 24 }} keyboardShouldPersistTaps="handled">
        <Text display>Verify</Text>
        <Text accent style={{ marginTop: 8 }}>Enter the 4 digit code sent to {email}</Text>
        <Item error={codeInvalid} style={{ marginVertical: 32 }}>
          <Input
            large
            onChangeText={v => setCode(v)}
            value={code}
            placeholderTextColor="#CDCED2"
            style={{ paddingLeft: 0 }}
            placeholder="Verification code"
            keyboardType="numeric"
          />
        </Item>
        <Button iconRight primary onPress={() => verifyEmailWithCode(code)}>
          <Text>Confirm</Text>
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
  withState('code', 'setCode', ''),
  connect(authSelector, (dispatch: Dispatch) => ({
    verifyEmailWithCode: code => dispatch({ code, type: 'PASSWORDLESS_VERIFY_CODE' }),
  })),
)(EmailSignIn);
