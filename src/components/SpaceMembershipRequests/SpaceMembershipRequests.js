// @flow
import React from 'react';
import {
  Right,
  Button,
  List,
  Container,
  Header,
  Left,
  Icon,
  Content,
  Body,
  Title,
  ListItem,
  Text,
} from 'native-base';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import SpaceMemberRequestRow from './SpaceMemberRequestRow';

type Props = {
  data: ApolloData<Space>,
  navigation: Navigation,
  approveSpaceMemberRequest: string => () => void,
  rejectSpaceMemberRequest: string => () => void,
};

function SpaceMembershipRequests({
  navigation,
  data,
  approveSpaceMemberRequest,
  rejectSpaceMemberRequest,
}: Props) {
  const space = data.node;
  if (!space) {
    return null;
  }
  const memberRequests: SpaceMemberRequestEdge[] = get(space, 'memberRequests.edges') || [];
  return (
    <Container backgroundDark>
      <Header bordered>
        <Left>
          <Button onPress={() => navigation.goBack()} transparent primary>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}><Title>Membership Requests</Title></Body>
        <Right />
      </Header>
      <Content
        contentContainerStyle={
          memberRequests.length === 0 ? { flex: 1, alignItems: 'center', justifyContent: 'center' } : {}
        }
        padder={memberRequests.length === 0}
      >
        {memberRequests.length > 0 && <ListItem itemHeader />}
        {memberRequests.length > 0 &&
          <List style={{ flex: 1 }}>
            {memberRequests.map(
              ({ node }, index) =>
                node &&
                <SpaceMemberRequestRow
                  key={node.id}
                  approveSpaceMemberRequest={approveSpaceMemberRequest}
                  rejectSpaceMemberRequest={rejectSpaceMemberRequest}
                  last={index === memberRequests.length - 1}
                  spaceMemberRequest={node}
                />,
            )}
          </List>}
        {memberRequests.length === 0 &&
          <Text caption>There are no membership requests for this space</Text>}
      </Content>
    </Container>
  );
}

const SpaceMembershipRequestsFragment = gql`
  fragment SpaceMembershipRequestsFragment on Space {
    id
    memberRequests {
      edges {
        node {
          id
          spaceMemberRequestId
          createdAt
          user {
            name
            imageUrl
          }
        }
      }
    }
  }
`;
const SpaceMembershipRequestsQuery = gql`
  query SpaceMembershipRequests($id: ID!) {
    node(id: $id) {
      id
      ...SpaceMembershipRequestsFragment
    }
  }
  ${SpaceMembershipRequestsFragment}
`;

const ApproveSpaceMemberRequestMutation = gql`
  mutation($input: ApproveSpaceMemberRequestInput!) {
    approveSpaceMemberRequest(input: $input) {
      space {
        ...SpaceMembershipRequestsFragment
      }
    }
  }
  ${SpaceMembershipRequestsFragment}
`;

const RejectSpaceMemberRequestMutation = gql`
  mutation($input: RejectSpaceMemberRequestInput!) {
    rejectSpaceMemberRequest(input: $input) {
      space {
        ...SpaceMembershipRequestsFragment
      }
    }
  }
  ${SpaceMembershipRequestsFragment}
`;

export default compose(
  graphql(SpaceMembershipRequestsQuery, {
    options: props => ({ variables: { id: props.navigation.state.params.id } }),
  }),
  graphql(ApproveSpaceMemberRequestMutation, {
    props: ({ mutate }) => ({
      approveSpaceMemberRequest: spaceMemberRequestId => () =>
        mutate({
          variables: {
            input: { spaceMemberRequestId },
          },
        }),
    }),
  }),
  graphql(RejectSpaceMemberRequestMutation, {
    props: ({ mutate }) => ({
      rejectSpaceMemberRequest: spaceMemberRequestId => () =>
        mutate({
          variables: {
            input: { spaceMemberRequestId },
          },
        }),
    }),
  }),
)(SpaceMembershipRequests);
