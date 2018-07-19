// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Header, Left, Container, Content, Icon, Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import { compose } from 'recompose';
import * as fromActions from '../actions/auth';

type Props = {
  logout: () => void,
  navigation: Navigation,
};

function Profile({ logout, navigation }: Props) {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent primary onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
      </Header>
      <Content style={{ backgroundColor: 'white' }}>
        <Text>Profile</Text>
        <Button onPress={logout}><Text>Logout</Text></Button>
        <Button onPress={() => navigation.navigate('StyleGuide')}><Text>Style Guide</Text></Button>
      </Content>
    </Container>
  );
}

Profile.navigationOptions = {
  title: 'Profile',
};

export default compose(
  withNavigation,
  connect(null, (dispatch: Dispatch) => ({
    logout: () => dispatch(fromActions.logout()),
  })),
)(Profile);
