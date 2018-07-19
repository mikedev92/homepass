// @flow
import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { ListItem, Container, Content, Text, Button, View, Thumbnail, Body, Right, Col, Left, CardItem, Icon, Badge } from 'native-base';
import gql from 'graphql-tag';
import { get, upperCase, range } from 'lodash';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import moment from 'moment';
import { withNavigation } from 'react-navigation';
import { graphqlLoader, Feed, Carousel } from './common';

type Props = {
	data: ApolloData<*>,
	navigation: Navigation
};

function getHomeText(numPlaces: number) {
	if (numPlaces > 1) {
		return `You're selling ${numPlaces} homes. It's a beautiful day ☀️`;
	}
	if (numPlaces === 1) {
		return "You're selling 1 home. It's a beautiful day ☀️";
	}
	return "You're selling no homes today, relax enjoy the sun ☀️";
}

function Home({ data, navigation }: Props) {
	const numPlaces = get(data, 'viewer.spaces.edges', []).length;
	return (
		<Container>
			<Content statusBarPadding>
				<ListItem noBorder>
					<Col>
						<View>
							<Text status>
								{upperCase(moment().format('dddd, DD MMMM'))}
							</Text>
							{data.viewer && data.viewer.firstName
								? <Text display>
										Hi, {data.viewer.firstName}!
									</Text>
								: <Text display>Hey there</Text>}
						</View>
					</Col>
					<Right style={{ paddingBottom: 8, alignSelf: 'flex-end' }}>
						<TouchableOpacity transparent onPress={() => navigation.navigate('Profile')}>
							{data.viewer && data.viewer.imageUrl
								? <Thumbnail source={{ uri: data.viewer.imageUrl }} />
								: <Badge>
										<Text>Profile</Text>
									</Badge>}
						</TouchableOpacity>
					</Right>
				</ListItem>
				<ListItem noBorder>
					<Text accent>
						{getHomeText(numPlaces)}
					</Text>
				</ListItem>
				{numPlaces > 0 &&
					<ListItem itemDivider>
						<Body>
							<Text>Places</Text>
						</Body>
						<Right>
							<Button onPress={() => navigation.navigate('SpaceList')} transparent noPadding>
								<Text>See all</Text>
							</Button>
						</Right>
					</ListItem>}
				{numPlaces > 0 &&
					<ListItem noBorder style={{ marginLeft: 0, paddingRight: 0 }}>
						<Carousel>
							{get(data, 'viewer.spaces.edges', []).map((edge: SpaceEdge) =>
								<TouchableOpacity key={get(edge, 'node.id')} style={{ width: Dimensions.get('window').width - 20, paddingHorizontal: 5 }} onPress={() => navigation.navigate('Space', { id: get(edge, 'node.id') })} activeOpacity={1}>
									<CardItem cardBody>
										<Image style={{ width: '100%', height: 170, borderRadius: 4 }} source={get(edge, 'node.imageUrl') && { uri: get(edge, 'node.imageUrl') }} />
									</CardItem>
									<CardItem cardBody onPress={() => navigation.navigate('Space', { id: get(edge, 'node.id') })}>
										<Col>
											<Text style={{ marginTop: 4 }} body>
												{get(edge, 'node.title')}
											</Text>

											{get(edge, 'node.nextEvent') &&
												<Text rt style={{ marginTop: 0 }} status alert>
													{upperCase(`${get(edge, 'node.nextEvent.name')} ${moment(get(edge, 'node.nextEvent.startDate')).fromNow()}`)}
												</Text>}
										</Col>
									</CardItem>
								</TouchableOpacity>
							)}
						</Carousel>
					</ListItem>}
				<ListItem itemDivider>
					<Body>
						<Text>Activity</Text>
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
			</Content>
		</Container>
	);
}

const HomeQuery = gql`
	query HomeQuery {
		viewer {
			firstName
			imageUrl
			spaces {
				edges {
					node {
						id
						imageUrl
						title
						nextEvent {
							name
							startDate
						}
					}
				}
			}
		}
	}
`;

export default compose(graphql(HomeQuery), withNavigation, graphqlLoader)(Home);
