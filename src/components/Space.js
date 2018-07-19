// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Col, ListItem, H1, Text, Container, Left, Button, Icon, Thumbnail, Body, Right, View } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { get, range } from 'lodash';
import { graphqlLoader, CalendarEventView, HorizontalScrollView, ContactSummaryView, Feed, CollapsibleHeader } from './common';
import { variables } from '../theme';

type Props = {
	navigation: Navigation,
	data: ApolloData<Space>,
	joinSpace: () => void
};

function getJoinSpaceButtonText(space: Space) {
	if (space.viewerMemberRequest) {
		return 'Join Requested';
	}
	return space.visibility === 'OPEN' ? 'Join' : 'Request To Join';
}
function SpaceView({ data, navigation, joinSpace }: Props) {
	const space = data.node;
	if (!space) {
		return <Container />;
	}
	return (
		<CollapsibleHeader imageSource={{ uri: space.imageUrl }} title={space.title} onBackPress={() => navigation.goBack()}>
			<ListItem noBorder>
				<Col>
					<H1>
						{get(data, 'node.title')}
					</H1>
					<Text caption darkGray numberOfLines={2} ellipsizeMode="tail">
						{get(data, 'node.resources[0].spaceResourceDescription')}
					</Text>
				</Col>
			</ListItem>
			<ListItem noBorder>
				<Body style={{ flexDirection: 'row', overflow: 'hidden' }}>
					{((space.members && space.members.edges) || []).map(
						(edge: SpaceMemberEdge) =>
							edge.node &&
							edge.node.user &&
							edge.node.user.imageUrl &&
							<TouchableOpacity key={get(edge, 'node.user.id')} onPress={() => navigation.navigate('MemberView', { id: get(edge, 'node.user.id') })}>
								<Thumbnail style={{ margin: 5 }} tiny source={{ uri: get(edge, 'node.user.imageUrl') }} />
							</TouchableOpacity>
					)}
				</Body>
				{space.viewerMember &&
					<Right>
						<Button onPress={() => navigation.navigate('SpaceMemberships', { id: space.id })} transparent noPadding>
							<Icon style={{ fontSize: 24 }} name="add-circle" />
						</Button>
					</Right>}
			</ListItem>
			{!space.viewerMember &&
				<Button onPress={joinSpace} style={{ marginHorizontal: variables.contentPadding }} primary={!space.viewerMemberRequest} disabled={Boolean(space.viewerMemberRequest)} bordered={Boolean(space.viewerMemberRequest)} block>
					<Text>
						{getJoinSpaceButtonText(space)}
					</Text>
				</Button>}
			{space.viewerMember &&
				<View>
					<ListItem itemDivider>
						<Body>
							<Text title>Events</Text>
						</Body>
						<Right>
							<Button transparent noPadding onPress={() => navigation.navigate('SpaceEvents')}>
								<Text>See all</Text>
							</Button>
						</Right>
					</ListItem>
					<HorizontalScrollView>
						{get(data, 'node.calendarEvents.edges', []).map((edge: CalendarEventEdge) => edge.node && <CalendarEventView key={edge.node.id} event={edge.node} />)}
					</HorizontalScrollView>
					<ListItem itemDivider>
						<Body>
							<Text title>Top Contacts</Text>
						</Body>
						<Right>
							<Button transparent noPadding onPress={() => navigation.navigate('SpaceContacts')}>
								<Text>See all</Text>
							</Button>
						</Right>
					</ListItem>
					<HorizontalScrollView>
						{((space.contacts && space.contacts.edges) || []).map((edge: SpaceContactEdge) => edge.node && edge.node.contact && <ContactSummaryView key={edge.node.contact.id} spaceContact={edge.node} />)}
					</HorizontalScrollView>
					<ListItem itemDivider>
						<Body>
							<Text title>Activity</Text>
						</Body>
					</ListItem>
					<ListItem noBorder>
						<Feed>
							{range(10).map(i =>
								<ListItem key={i}>
									<Left>
										<Icon name="arrow-back" />
									</Left>
									<Body>
										<Text>Note added to christina for 27 Elizabeth St</Text>
										<Text status>Today at 9:41AM</Text>
										{i % 4 === 0 ? <Text>Some extra content</Text> : null}
									</Body>
									<Right>
										<Thumbnail source={{ uri: 'https://unsplash.it/200/300' }} />
									</Right>
								</ListItem>
							)}
						</Feed>
					</ListItem>
				</View>}
		</CollapsibleHeader>
	);
}

const SpaceFragment = gql`
  fragment SpaceFragment on Space {
        id
        spaceId
        title
        imageUrl
        visibility
        viewerMember {
          id
        }
        viewerMemberRequest {
          id
        }
        members {
          edges {
            node {
              id
             user {
               id
               imageUrl
             }
            }
          }
        }
        calendarEvents {
          edges {
            node {
              id
              name
              startDate
              endDate
            }
          }
        }
        contacts {
          edges {
            node {
             ...SpaceContactSummaryViewFragment
            }
          }
        }
        resources {
          spaceResourceTitle
          spaceResourceSubtitle
          spaceResourceDescription
        }
  }
  ${ContactSummaryView.fragments.SpaceContact}
`;
const SpaceQuery = gql`
  query SpaceQuery($id: ID!) {
    node(id: $id) {
      ...SpaceFragment
    }
  }
  ${SpaceFragment}
`;

const JoinSpaceMutation = gql`
  mutation joinSpace($input: JoinSpaceInput!) {
    joinSpace(input: $input) {
      space {
        ...SpaceFragment
      }
    }
  }
  ${SpaceFragment}
`;

export default compose(
	graphql(SpaceQuery, {
		options: props => ({ variables: { id: props.navigation.state.params.id } })
	}),
	graphql(JoinSpaceMutation, {
		props: ({ mutate, ownProps }) => ({
			joinSpace: () => mutate({ variables: { input: { spaceId: get(ownProps, 'data.node.spaceId') } } })
		})
	}),
	graphqlLoader
)(SpaceView);
