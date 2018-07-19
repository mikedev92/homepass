// @flow
import React from 'react';
import {
  List,
  Thumbnail,
  ListItem,
  Container,
  Header,
  Left,
  Title,
  Body,
  Content,
  Right,
  Icon,
  Button,
  Text,
} from 'native-base';
import { compose, withState, withHandlers } from 'recompose';
import Search from 'react-native-search-box';
import { graphql } from 'react-apollo';
import { lowerCase } from 'lodash';
import gql from 'graphql-tag';

type Props = {
  data: ApolloData<Space>,
  navigation: Navigation,
  toggleMember: string => void,
  setSearchText: string => void,
  selectedMembers: {
    [string]: boolean,
  },
  searchText: string,
  addMembersToSpace: ({ [string]: boolean }) => void,
};

function SpaceAddMember({
  data,
  navigation,
  searchText,
  setSearchText,
  toggleMember,
  selectedMembers,
  addMembersToSpace,
}: Props) {
  if (!data.node || !data.node.suggestedMembers) {
    return null;
  }
  const suggestedMembers = data.node.suggestedMembers.filter(
    user => user.name && lowerCase(user.name).includes(lowerCase(searchText)),
  );
  return (
    <Container>
      <Header bordered>
        <Left>
          <Button onPress={() => navigation.goBack()} transparent primary>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body><Title>Add Members</Title></Body>
        <Right>
          <Button onPress={() => addMembersToSpace(selectedMembers)} transparent primary>
            <Text primary>Done</Text>
          </Button>
        </Right>
      </Header>
      <Content keyboardShouldPersistTaps="handled">
        <List>
          <Search
            backgroundColor="transparent"
            onChangeText={setSearchText}
            titleCancelColor="black"
          />
          {suggestedMembers.map(
            (user, index) =>
              user.userId &&
              <ListItem
                onPress={() => user.userId && toggleMember(user.userId)}
                avatar
                icon
                key={user.userId}
                last={suggestedMembers.length - 1 === index}
              >
                {user.imageUrl &&
                  <Left>
                    <Thumbnail small source={{ uri: user.imageUrl }} />
                  </Left>}
                <Body>
                  <Text>
                    {user.name}
                  </Text>
                </Body>
                <Right>
                  <Icon primary active={selectedMembers[user.userId]} name="checkmark-circle" />
                </Right>
              </ListItem>,
          )}
        </List>
      </Content>
    </Container>
  );
}

const SpaceAddMemberQuery = gql`
  query SpaceAddMemberQuery($id: ID!) {
    node(id: $id) {
      id
      ... on Space {
        spaceId
        suggestedMembers {
          id
          userId
          name
          imageUrl
        }
      }
    }
  }
`;

const AddMemberToSpaceMutation = gql`
  mutation($input: AddSpaceMemberInput!) {
    addSpaceMember(input: $input) {
      space {
        id
        members {
          edges {
            node {
              id
              user {
                id
              }
            }
          }
        }
        suggestedMembers {
          id
          userId
          name
          imageUrl
        }
      }
    }
  }
`;

export default compose(
  graphql(SpaceAddMemberQuery, {
    options: props => ({ variables: { id: props.navigation.state.params.id } }),
  }),
  graphql(AddMemberToSpaceMutation, {
    props: ({ mutate, ownProps }) => ({
      addMembersToSpace: async (userIds) => {
        const mutations = Object.keys(userIds).map(
          userId =>
            userIds[userId] &&
            mutate({
              variables: {
                input: {
                  userId,
                  spaceId: ownProps.data.node.spaceId,
                },
              },
            }),
        );
        await Promise.all(mutations);
        return ownProps.navigation.goBack();
      },
    }),
  }),
  withState('searchText', 'setSearchText', ''),
  withState('selectedMembers', 'setSelectedMembers', {}),
  withHandlers({
    toggleMember: ({ setSelectedMembers, selectedMembers }) => id =>
      setSelectedMembers({
        ...selectedMembers,
        [id]: !selectedMembers[id],
      }),
  }),
)(SpaceAddMember);

export {
  SpaceAddMember as Raw,
};
