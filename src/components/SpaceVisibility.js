// @flow
import React from 'react';
import {
  Container,
  Header,
  Button,
  Icon,
  Body,
  Title,
  Separator,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Content,
  Radio,
} from 'native-base';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

type Props = {
  navigation: Navigation,
  data: ApolloData<Space>,
  setVisibility: string => void => void,
};

function SpaceVisibility({ navigation, data, setVisibility }: Props) {
  const visibility = data.node.visibility;
  return (
    <Container backgroundDark>
      <Header bordered>
        <Left>
          <Button onPress={() => navigation.goBack()} transparent primary>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body><Title>Visibility</Title></Body>
        <Right />
      </Header>
      <Content>
        <Separator bordered noTopBorder />
        <List>
          <ListItem onPress={setVisibility('OPEN')}>
            <Text>
              Open{'\n'}
              <Text caption>
                Non members can join.
              </Text>
            </Text>
            <Right>
              <Radio selected={visibility === 'OPEN'} />
            </Right>
          </ListItem>
          <ListItem onPress={setVisibility('PRIVATE')}>
            <Text>
              Private{'\n'}
              <Text caption>
                Non members must request to join.
              </Text>
            </Text>
            <Right>
              <Radio selected={visibility === 'PRIVATE'} />
            </Right>
          </ListItem>
          <ListItem last onPress={setVisibility('SECRET')}>
            <Text>
              Secret{'\n'}
              <Text caption>
                Only members can find and must be manually added.
              </Text>
            </Text>
            <Right>
              <Radio selected={visibility === 'SECRET'} />
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}

const SpaceVisibilityQuery = gql`
  query SpaceVisibilityQuery($id: ID!) {
    node(id: $id) {
      id
      ... on Space {
        spaceId
        visibility
      }
    }
  }
`;

const SetVisibilityMutation = gql`
  mutation($input: SetSpaceVisibilityInput!) {
    setSpaceVisibility(input: $input) {
      space {
        id
        visibility
      }
    }
  }
`;

export default compose(
  graphql(SpaceVisibilityQuery, {
    options: props => ({ variables: { id: props.navigation.state.params.id } }),
  }),
  graphql(SetVisibilityMutation, {
    props: ({ mutate, ownProps }) => ({
      setVisibility: visibility => () =>
        mutate({
          variables: { input: { visibility, spaceId: ownProps.data.node.spaceId } },
          optimisticResponse: {
            __typename: 'Mutation',
            setSpaceVisibility: {
              __typename: 'SetSpaceVisibilityPayload',
              space: {
                __typename: 'Space',
                id: ownProps.data.node.id,
                visibility,
              },
            },
          },
        }),
    }),
  }),
)(SpaceVisibility);
