// @flow
import React from 'react';
import { SectionList } from 'react-native';
import { Header, Left, Button, Icon, Body, Right, Text, Container, Separator } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withState } from 'recompose';
import { get, lowerCase, upperCase, groupBy } from 'lodash';
import Search from 'react-native-search-box';
import { connect } from 'react-redux';
import SpaceRow from './SpaceRow';
import { graphqlLoader } from '../common';
import { spaceSelector } from '../../reducers';

type Props = {
	data: ApolloData<void>,
	filters: any,
	searchText: string,
	setSearchText: string => void,
	navigation: Navigation
};

function filterSpaces(spaces?: Array<SpaceEdge>, searchText: string, filters): Array<SpaceEdge> {
	if (!spaces) {
		return [];
	}
	const shouldFilterByTags = Object.keys(filters).reduce((prevState, key) => filters[key] || prevState, false);
	return spaces.filter(space => {
		const title = get(space, 'node.title', '');
		const tags = get(space, 'node.tags', []);
		return lowerCase(title).includes(lowerCase(searchText)) && (!shouldFilterByTags || tags.find(tag => filters[tag]));
	});
}

function generateSectionForSpaces(key: string, groupedSpaces: Object) {
	const data = groupedSpaces[key] || [];
	return {
		data,
		key
	};
}
function generateSectionsForSpaces(spaces: Array<SpaceEdge>) {
	const groupedSpaces = groupBy(spaces, spaceEdge => (get(spaceEdge, 'node.viewerMember') ? 'my places' : 'other places'));
	return [generateSectionForSpaces('my places', groupedSpaces), generateSectionForSpaces('other places', groupedSpaces)];
}

function Spaces({ setSearchText, data, filters, searchText, navigation }: Props) {
	const filteredSpaces = filterSpaces(get(data, 'viewer.spaces.edges'), searchText, filters);
	const sections = generateSectionsForSpaces(filteredSpaces);
	return (
		<Container>
			<Header>
				<Left>
					<Button onPress={() => navigation.goBack()} transparent primary>
						<Icon name="arrow-back" />
					</Button>
				</Left>
				<Body />
				<Right>
					<Button onPress={() => navigation.navigate('SpaceFilters')} transparent primary>
						<Icon name="options" />
					</Button>
				</Right>
			</Header>
			<Search backgroundColor="transparent" onChangeText={setSearchText} titleCancelColor="black" />
			<SectionList
				renderSectionHeader={({ section: { key } }) =>
					<Separator bordered>
						<Text note>
							{upperCase(key)}
						</Text>
					</Separator>}
				renderItem={({ item }: { item: { node: Space }, index: number }) => <SpaceRow space={item.node} last />}
				sections={sections}
				onRefresh={data.refetch}
				refreshing={data.networkStatus === 4}
				keyExtractor={({ node: { id } }) => id}
			/>
		</Container>
	);
}

const SpaceQuery = gql`
  query SpaceQuery {
      viewer {
        userId
        spaces {
          edges {
            node {
              id
              title
              viewerMember {
                id
              }
              tags
              ... SpaceRowSpace
            }
          }
        }
      }
  }
  ${SpaceRow.fragments.space}
`;

export default compose(graphql(SpaceQuery), graphqlLoader, connect(spaceSelector), withState('searchText', 'setSearchText', ''))(Spaces);
