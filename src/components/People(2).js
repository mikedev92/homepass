// @flow
import React from 'react';
import { List, Thumbnail, ListItem, Container, Header, Left, Title, Body, Content, Right, Icon, Button, Text, H1 } from 'native-base';
import { Dimensions, ListView } from 'react-native';
import Search from 'react-native-search-box';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const itemDivider = '',
	colorIDX = 0;

class People extends React.Component {
	constructor(props) {
		super(props);

		const rowHasChanged = (r1, r2) => r1 !== r2;
		const ds = new ListView.DataSource({ rowHasChanged });

		this.state = {
			dataSource: ds,
			searchText: '',
			inidx: 0
		};
	}

	searchText(event) {
		this.setState({ searchText: event });

		var searchData = [];
		this.props.viewer.accounts.edges[0].node.contacts.edges.map((data, i) => {
			if (data.node.firstName !== null && data.node.lastName !== null) {
				if (data.node.firstName.toLowerCase().search(event.toLowerCase()) !== -1 || data.node.lastName.toLowerCase().search(event.toLowerCase()) !== -1) {
					searchData.push(data);
				}
			}
		});

		//reset dataSource of ListView with searchText
		const rowHasChanged = (r1, r2) => r1 !== r2;
		const ds = new ListView.DataSource({ rowHasChanged });

		if (searchData.length == 0) {
			this.setState({ dataSource: ds });
		} else {
			this.setState({ dataSource: ds.cloneWithRows(searchData) });
		}
	}

	renderRow(rowData: string, sectionID: number, rowID: number) {
		const colorAssets = ['#03a9f4', '#03ca1e', '#ff3b30', '#ac3ef9', '#ffcd00', '#fe2851', '#ff9800'];

		var firstChar = rowData.node.firstName.charAt(0);
		var lastChar = '';
		if (rowData.node.lastName !== null) {
			lastChar = rowData.node.lastName.charAt(0);
		}

		var flag = 1;

		if (itemDivider !== firstChar) {
			itemDivider = firstChar;

			if (colorIDX > 5) {
				colorIDX = 0;
			} else {
				colorIDX++;
			}

			flag = 0;
		}

		return (
			<List style={{ borderBottomWidth: 0 }}>
				{flag === 0 &&
					<ListItem itemDivider style={{ borderTopWidth: 1, marginTop: 10, width: '95%', alignSelf: 'flex-end' }}>
						<Text caption style={{ marginLeft: -20 }}>
							{firstChar}
						</Text>
					</ListItem>}
				<ListItem onPress={() => {}} avatar icon style={{ height: 50 }}>
					{rowData.node.imageUrl
						? <Left>
								<Thumbnail small source={{ uri: rowData.node.imageUrl }} />
							</Left>
						: <Left>
								<Thumbnail small style={{ backgroundColor: colorAssets[colorIDX], alignItems: 'center', justifyContent: 'center' }}>
									<Text bodySmall style={{ color: '#ffffff' }}>
										{firstChar}
										{rowData.node.lastName !== null && lastChar}
									</Text>
								</Thumbnail>
							</Left>}
					<Body style={{ borderBottomWidth: 0 }}>
						<Text style={{ marginLeft: -20 }}>
							{rowData.node.firstName} {rowData.node.lastName}
						</Text>
					</Body>
				</ListItem>
			</List>
		);
	}

	render() {
		if (this.props.viewer === undefined) {
			return null;
		}

		var MainData = [];
		this.props.viewer.accounts.edges[0].node.contacts.edges.map((data, i) => {
			if (data.node.firstName !== null) {
				MainData.push(data);
			}
		});

		if (MainData.length === 0) {
			this.props.loadMoreEntries();
		}

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
				<Search backgroundColor="transparent" onChangeText={this.searchText.bind(this)} titleCancelColor="black" onCancel={() => this.setState({ searchText: '' })} onDelete={() => this.setState({ searchText: '' })} />
				<Content
					keyboardShouldPersistTaps="handled"
					onScroll={e => {
						var windowHeight = Dimensions.get('window').height,
							height = e.nativeEvent.contentSize.height,
							offset = e.nativeEvent.contentOffset.y;
						if (windowHeight + offset >= height) {
							this.props.loadMoreEntries();
						}
					}}
				>
					<ListView
						dataSource={MainData.length === 0 || this.state.searchText !== '' ? this.state.dataSource : this.state.dataSource.cloneWithRows(MainData)}
						renderRow={this.renderRow.bind(this)}
						onEndReached={() => {
							if (this.state.inidx === 0) {
								this.setState({ inidx: 1 });
								this.props.loadMoreEntries();
							}
						}}
						onEndReachedThreshold={100}
					/>
				</Content>
			</Container>
		);
	}
}

const ContactsQuery = gql`
	query contacts($cursor: String) {
		viewer {
			accounts {
				edges {
					node {
						contacts(first: 20, after: $cursor) {
							edges {
								node {
									id
									firstName
									lastName
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

const PeopleWithData = graphql(ContactsQuery, {
	props: ({ data: { loading, viewer, fetchMore } }) => {
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
})(People);

export default PeopleWithData;
