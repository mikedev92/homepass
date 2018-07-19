// @flow
import React from 'react';
import { Row, Left, View, Text, ListItem, Body, Thumbnail } from 'native-base';
import { withNavigation } from 'react-navigation';
import gql from 'graphql-tag';
import moment from 'moment';
import { compose, setStatic } from 'recompose';
import { get } from 'lodash';

type Props = {
	space: Space,
	navigation: Object,
	last: Boolean
};
function SpaceRow({ space, navigation, last }: Props) {
	const { id, title, subtitle, imageUrl, nextEvent } = space;
	const memberEdges: SpaceMemberEdge[] = get(space, 'members.edges') || [];
	return (
		<ListItem thumbnail onPress={() => navigation.navigate('Space', { id, title })} last={last}>
			<Left>
				<Thumbnail square style={{ borderRadius: 5 }} source={{ uri: imageUrl }} />
			</Left>
			<Body>
				<Text>
					{title}
					{'\n'}
					<Text note>
						{subtitle}
					</Text>
					{'\n'}
					{nextEvent &&
						<Text note>
							{nextEvent.name} {moment(nextEvent.startDate).fromNow()}
						</Text>}
				</Text>
				<Row>
					<View style={{ flex: 1 }} />
					{memberEdges.map(member => member && member.node && member.node.user && member.node.user.imageUrl && <Thumbnail xSmall key={member.node.id} source={{ uri: member.node.user.imageUrl }} style={{ marginHorizontal: 2 }} />)}
				</Row>
			</Body>
		</ListItem>
	);
}

export default compose(
	setStatic('fragments', {
		space: gql`
			fragment SpaceRowSpace on Space {
				id
				title
				imageUrl
				subtitle
				nextEvent {
					startDate
					endDate
					name
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
			}
		`
	}),
	withNavigation
)(SpaceRow);
