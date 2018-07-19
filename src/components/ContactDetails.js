// @flow
import React from 'react';
import { ListItem, Container, Content, Header, Text, Button, View, Thumbnail, Icon, Body, Right, Col, Left, CardItem, Separator, Row } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Vicon from 'react-native-vector-icons/FontAwesome';
import { get, range } from 'lodash';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import UserAvatar from 'react-native-user-avatar';
import { graphqlLoader, Feed, Carousel } from './common';
import { variables } from '../theme';

type Props = {
	data: ApolloData<Contact>,
	navigation: Navigation
};

function ContactDetails({ data, navigation }: Props) {
	if (data.loading) {
		return null;
	}
	const numPlaces = get(data, 'viewer.spaces.edges', []).length;
	return (
		<Container>
			<Header>
				<Left>
					<Button iconLeft primary transparent onPress={() => navigation.goBack()}>
						<Icon name="arrow-back" />
						<Text>Back</Text>
					</Button>
				</Left>
				<Right>
					<Button onPress={() => {}} transparent primary>
						<Text>Edit</Text>
					</Button>
				</Right>
			</Header>
			<Content>
				<ListItem noBorder>
					{get(data, 'node.imageUrl') ? <UserAvatar name={get(data, 'node.fullName')} src={get(data, 'node.imageUrl')} size={71} /> : <UserAvatar size="71" name={get(data, 'node.fullName')} color={navigation.state.params.color} />}
					<Body style={{ justifyContent: 'center' }}>
						<Text nameLarge>
							{get(data, 'node.fullName')}
							{'\n'}
							<Text note>Just now at 27 Elizabeth St</Text>
						</Text>
					</Body>
				</ListItem>
				<Separator bordered />
				<ListItem noBorder>
					<Text primary bodySmall>
						mobile{'\n'}
						<Text body>{get(data, 'node.mobile') && get(data, 'node.mobile').match(/.{1,3}/g).join(' ')}</Text>
					</Text>
					<Right>
						<Row style={{ alignItems: 'center' }}>
							<Button small transparent onPress={() => (get(data, 'node.mobile') ? {} : {})} noPadding style={{ marginHorizontal: 10 }}>
								<Thumbnail
									xSmall
									style={{
										backgroundColor: variables.lightGray,
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<Vicon name="phone" color={get(data, 'node.mobile') ? variables.btnPrimaryBg : variables.btnDisabledBg} size={20} />
								</Thumbnail>
							</Button>
							<Button small transparent onPress={() => (get(data, 'node.mobile') ? {} : {})} noPadding>
								<Thumbnail
									xSmall
									style={{
										backgroundColor: variables.lightGray,
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<Vicon name="commenting" color={get(data, 'node.mobile') ? variables.btnPrimaryBg : variables.btnDisabledBg} size={20} />
								</Thumbnail>
							</Button>
						</Row>
					</Right>
				</ListItem>
				<ListItem noBorder>
					<Text primary bodySmall>
						email{'\n'}
						<Text body>{get(data, 'node.email')}</Text>
					</Text>
					<Right>
						<Button small transparent onPress={() => (get(data, 'node.email') ? {} : {})} noPadding>
							<Thumbnail
								xSmall
								style={{
									backgroundColor: variables.lightGray,
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<Vicon name="envelope" color={get(data, 'node.email') ? variables.btnPrimaryBg : variables.btnDisabledBg} size={16} />
							</Thumbnail>
						</Button>
					</Right>
				</ListItem>
				<ListItem noBorder>
					<Text primary bodySmall>
						address{'\n'}
						<Text body>
							{get(data, 'node.addresses[0].street')} {get(data, 'node.addresses[0].locality')} {get(data, 'node.addresses[0].region')} {get(data, 'node.addresses[0].postcode')}
						</Text>
					</Text>
				</ListItem>
				{get(data, 'node.addresses[0].street') !== '' &&
					<ListItem noBorder>
						<View
							style={{
								width: '100%',
								height: 118,
								borderRadius: 8,
								overflow: 'hidden'
							}}
						>
							<Row>
								<Thumbnail square style={{ width: '31%', height: 118 }} source={{ uri: 'https://unsplash.it/200/300' }} />
								<View
									style={{
										width: '69%',
										height: 118,
										borderLeftWidth: 0,
										borderWidth: 0.5,
										borderColor: '#cdced2',
										borderBottomRightRadius: 8,
										borderTopRightRadius: 8,
										justifyContent: 'center',
										padding: 13.5,
										overflow: 'hidden'
									}}
								>
									<Text body>
										$1.85m{'\n'}
										<Text caption>Estimated Value</Text>
									</Text>
									<Text body style={{ paddingTop: 15 }}>
										$1300pw{'\n'}
										<Text caption>Last Rented (2016)</Text>
									</Text>
									<Thumbnail
										square
										style={{
											position: 'absolute',
											right: 15,
											top: 16,
											borderRadius: 4
										}}
										source={{
											uri: 'https://unsplash.it/200/300'
										}}
									/>
								</View>
							</Row>
						</View>
					</ListItem>}
				<Separator bordered />
				{numPlaces > 0 &&
					<ListItem itemDivider>
						<Text>Recent Places</Text>
					</ListItem>}
				{numPlaces > 0 &&
					<ListItem noBorder style={{ marginLeft: 0, paddingRight: 0 }}>
						<Carousel itemWidth={240} sliderWidth={260}>
							{get(data, 'viewer.spaces.edges', []).map((edge: SpaceEdge) =>
								<TouchableOpacity key={get(edge, 'node.id')} style={{ width: 240, paddingHorizontal: 5 }} onPress={() => navigation.navigate('Space', { id: get(edge, 'node.id') })} activeOpacity={1}>
									<CardItem cardBody>
										<Thumbnail
											style={{
												width: 220,
												height: 110,
												borderRadius: 4
											}}
											source={get(edge, 'node.imageUrl') && { uri: get(edge, 'node.imageUrl') }}
										/>
									</CardItem>
									<CardItem cardBody onPress={() => navigation.navigate('Space', { id: get(edge, 'node.id') })}>
										<Col>
											<Text style={{ marginTop: 4 }} body>
												{get(edge, 'node.title')}
											</Text>
											{get(edge, 'node.nextEvent') &&
												<Text style={{ marginTop: 0 }} caption>
													{`${get(edge, 'node.nextEvent.name')} ${moment(get(edge, 'node.nextEvent.startDate')).fromNow()}`}
												</Text>}
										</Col>
									</CardItem>
								</TouchableOpacity>
							)}
						</Carousel>
					</ListItem>}
				<Separator bordered />
				<ListItem itemDivider>
					<Text>Activity</Text>
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

const ContactDetailsQuery = gql`
	query ContactDetailsQuery($id: ID!) {
		node(id: $id) {
			id
			... on Contact {
				contactId
				mobile
				email
				landline
				firstName
				lastName
				fullName
				imageUrl
				addresses {
					street
					locality
					postcode
					region
					geoLatitude
					geoLongitude
				}
			}
		}
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

export default compose(
	graphql(ContactDetailsQuery, {
		options: props => ({ variables: { id: props.navigation.state.params.id } })
	}),
	graphqlLoader
)(ContactDetails);
