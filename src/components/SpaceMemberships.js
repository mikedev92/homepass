// @flow
import React from 'react';
import { Share } from 'react-native';
import {
  Badge,
  Right,
  Icon,
  Container,
  Header,
  Left,
  Button,
  ListItem,
  Body,
  Content,
  Text,
  Thumbnail,
  Title,
  List,
} from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { get, capitalize } from 'lodash';
import Swipeout from 'react-native-swipeout';
import { graphqlLoader } from './common';
import { variables } from '../theme';

type Props = {
  navigation: Navigation,
  data: ApolloData<Space>,
  inviteSpaceMember: () => void,
  removeSpaceMember: string => () => void,
};

function SpaceMemberships({ navigation, data, inviteSpaceMember, removeSpaceMember }: Props) {
  const space = data.node;
  if (!space) {
    return <Container backgroundDark />;
  }
  const memberRequests: SpaceMemberRequestEdge[] = get(space, 'memberRequests.edges') || [];
  const members: SpaceMemberEdge[] = get(space, 'members.edges') || [];
  return (
    <Container backgroundDark>
      <Header bordered>
        <Left>
          <Button onPress={() => navigation.goBack()} transparent primary>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body><Title>Membership</Title></Body>
        <Right />
      </Header>
      <Content>
        <ListItem itemHeader />
        <List>
          <ListItem
            icon
            last={memberRequests.length === 0}
            onPress={() => navigation.navigate('SpaceVisibility', { id: space.id })}
          >
            <Body><Text>Visibility</Text></Body>
            <Right><Text>{capitalize(space.visibility)}</Text><Icon name="arrow-forward" /></Right>
          </ListItem>
          {memberRequests.length > 0 &&
            <ListItem
              icon
              last={memberRequests.length !== 0}
              onPress={() => navigation.navigate('SpaceMembershipRequests', { id: space.id })}
            >
              <Body><Text>Membership Requests</Text></Body>
              <Right>
                <Badge><Text>{memberRequests.length}</Text></Badge>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>}
        </List>
        <ListItem itemHeader>
          <Text caption>MEMBERS</Text>
        </ListItem>
        <List>
          <ListItem
            last={members.length === 0}
            onPress={() => navigation.navigate('SpaceAddMember', { id: space.id })}
          >
            <Text primary>Add Member</Text>
          </ListItem>
          {members.length > 0 &&
            members.map(
              ({ node }, index) =>
                node &&
                node.user &&
                node.spaceMemberId &&
                <Swipeout
                  backgroundColor="transparent"
                  right={[
                    {
                      backgroundColor: variables.btnDangerBg,
                      text: 'Delete',
                      onPress: removeSpaceMember(node.spaceMemberId),
                    },
                  ]}
                  key={node.spaceMemberId}
                >
                  <ListItem avatar last={members.length - 1 === index}>
                    {node.user.imageUrl &&
                      <Left><Thumbnail small source={{ uri: node.user.imageUrl }} /></Left>}
                    <Body><Text>{node.user.name}</Text></Body>
                  </ListItem>
                </Swipeout>,
            )}
        </List>
        <ListItem itemHeader>
          <Text caption>GUESTS</Text>
        </ListItem>
        <List>
          <ListItem last onPress={inviteSpaceMember}>
            <Text primary>Invite Guest</Text>
          </ListItem>
        </List>
        <Content listPadding>
          <Text caption>
            Invite customers as guests to give theme a live mobile experience
          </Text>
        </Content>
      </Content>
    </Container>
  );
}

const SpaceMembershipsFragment = gql`
  fragment SpaceMembershipsFragment on Space {
      id
      spaceId
      visibility
      members {
        edges {
          node {
            id
            spaceMemberId
            user {
              id
              imageUrl
              name
            }
          }
        }
      }
      memberRequests {
        edges {
          node {
            id
          }
        }
      }
  }
`;

const GetSpaceInviteMutation = gql`
  mutation($input: GetSpaceInviteInput!) {
    getSpaceInvite(input: $input) {
      spaceInvite {
        subject
        body
        inviteUrl
      }
    }
  }
`;

const RemoveSpaceMemberMutation = gql`
  mutation($input: RemoveSpaceMemberInput!) {
    removeSpaceMember(input: $input) {
      space {
        ...SpaceMembershipsFragment
      }
    }
  }
  ${SpaceMembershipsFragment}
`;

const SpaceMembershipsQuery = gql`
  query SpaceMembershipsQuery($id: ID!) {
    node(id: $id) {
      ...SpaceMembershipsFragment
    }
  }
  ${SpaceMembershipsFragment}
`;

export default compose(
  graphql(SpaceMembershipsQuery, {
    options: props => ({ variables: { id: props.navigation.state.params.id } }),
  }),
  graphql(RemoveSpaceMemberMutation, {
    props: ({ mutate }) => ({
      removeSpaceMember: spaceMemberId => () =>
        mutate({
          variables: {
            input: { spaceMemberId },
          },
        }),
    }),
  }),
  graphql(GetSpaceInviteMutation, {
    props: ({ mutate, ownProps }) => ({
      inviteSpaceMember: async () => {
        const mutation = mutate({
          variables: {
            input: {
              spaceId: ownProps.data.node.spaceId,
            },
          },
        });
        const res = await mutation;
        const spaceInvite: SpaceInvitationType = get(res, 'data.getSpaceInvite.spaceInvite');
        Share.share({
          message: spaceInvite.body,
          title: spaceInvite.subject,
        });
      },
    }),
  }),
  graphqlLoader,
)(SpaceMemberships);
