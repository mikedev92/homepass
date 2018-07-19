// @flow
import React from 'react';
import { Thumbnail, ListItem, Container, Header, Left, Right, Icon, Button, Text, H1, Separator } from 'native-base';
import { SectionList } from 'react-native';
import { compose, withState } from 'recompose';
import Search from 'react-native-search-box';
import { graphql } from 'react-apollo';
import { lowerCase } from 'lodash';
import gql from 'graphql-tag';
import UserAvatar from 'react-native-user-avatar';
import { variables } from '../theme';

type Props = {
	data: ApolloData<*>,
	navigation: Navigation,
	setSearchText: string => void,
	searchText: string,
	viewer: Object,
	loadMoreEntries: () => void
};

function generateSectionsForContacts(key: string, contacts: Array<ContactEdge>, loadMoreEntries) {
	const sections = [];
	for (var i in contacts) {
		if (key !== contacts[i].node.firstName.charAt(0) && contacts[i].node.firstName.charAt(0).match(/[A-Z]+/g)) {
			key = contacts[i].node.firstName.charAt(0);
			const data = contacts.filter(user => lowerCase(user.node.firstName.charAt(0)).includes(lowerCase(key)));
			const item = { data, key };
			sections.push(item);
		}
	}
	if (sections.length === 0) {
		loadMoreEntries();
	} else {
		return sections;
	}
}

renderItem = (info, sections, navigation) => {
	var items = info.item.node;
	var colors = [variables.brandDanger, variables.brandInfo, variables.brandPrimary, variables.brandSidebar, variables.brandSuccess, variables.brandWarning, variables.alert];

	// Get the index of the object inside an array, matching a condition
	var colorIDX = sections.findIndex(x => x.key == items.firstName.charAt(0)) % colors.length;

	var id = items.id;
	var color = colors[colorIDX];

	return (
		<ListItem onPress={() => navigation.navigate('ContactDetails', { id, color })} noBorder>
			<Left>
				{items.imageUrl ? <UserAvatar name={items.fullName} src={items.imageUrl} size={36} /> : <UserAvatar size="36" name={items.fullName} color={color} />}
				<Text>
					{items.fullName}
				</Text>
			</Left>
		</ListItem>
	);
};

function People({ data, navigation, searchText, setSearchText, viewer, loadMoreEntries }: Props) {
	if (viewer === undefined) {
		return null;
	}

	const ViewerData = viewer.accounts.edges[0].node.contacts.edges.filter(function(element) {
		return element.node.firstName !== null;
	});

	const totalData = ViewerData.filter(user => user.node.fullName && lowerCase(user.node.fullName).includes(lowerCase(searchText)));

	const sections = generateSectionsForContacts('', totalData, loadMoreEntries) || [];

	return (
		<Container>
			<Header>
				<Left>
					<H1>Contacts</H1>
				</Left>
				<Right>
					<Button onPress={() => {}} transparent primary>
						<Icon name="add" />
					</Button>
				</Right>
			</Header>
			<Search
				backgroundColor="transparent"
				onChangeText={setSearchText}
				titleCancelColor="black"
				onCancel={() => {
					setSearchText('');
				}}
				onDelete={() => {
					setSearchText('');
				}}
			/>
			<SectionList
				renderSectionHeader={({ section: { key } }) =>
					<Separator bordered style={{ backgroundColor: variables.light, borderBottomWidth: 0 }}>
						<Text note>
							{key}
						</Text>
					</Separator>}
				renderItem={info => this.renderItem(info, sections, navigation)}
				sections={sections}
				keyExtractor={({ node: { id } }) => id}
				onEndReached={() => {
					loadMoreEntries();
				}}
			/>
		</Container>
	);
}

const ContactsQuery = gql`
	query contacts($cursor: String) {
		viewer {
			accounts {
				edges {
					node {
						contacts(first: 50, after: $cursor) {
							edges {
								node {
									id
									firstName
									lastName
									fullName
									imageUrl
								}
							}
							pageInfo {
								endCursor
								hasNextPage
							}
						}
					}
				}
			}
		}
	}
`;

export default compose(
	graphql(ContactsQuery, {
		props({ data: { loading, viewer, fetchMore } }) {
			if (viewer !== undefined) {
				return {
					loading,
					viewer,
					loadMoreEntries: async () => {
						return fetchMore({
							query: ContactsQuery,
							variables: {
								cursor: viewer.accounts.edges[0].node.contacts.pageInfo.endCursor
							},
							updateQuery: (previousResult, { fetchMoreResult }) => {
								const newEdges = fetchMoreResult.viewer.accounts.edges[0].node.contacts.edges;
								const pageInfo = fetchMoreResult.viewer.accounts.edges[0].node.contacts.pageInfo;
								if (previousResult.viewer.accounts.edges[0].node.contacts.pageInfo.hasNextPage && previousResult.viewer.accounts.edges[0].node.contacts.pageInfo.endCursor !== fetchMoreResult.viewer.accounts.edges[0].node.contacts.pageInfo.endCursor) {
									return {
										viewer: {
											accounts: {
												edges: [
													{
														node: {
															contacts: {
																edges: [...previousResult.viewer.accounts.edges[0].node.contacts.edges, ...newEdges],
																__typename: '',
																pageInfo
															},
															__typename: ''
														},
														__typename: ''
													}
												],
												__typename: ''
											},
											__typename: ''
										},
										__typename: ''
									};
								}
							}
						});
					}
				};
			}
		}
	}),
	withState('searchText', 'setSearchText', '')
)(People);
