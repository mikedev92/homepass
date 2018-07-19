// @flow
import React from 'react';
import { Container, Header, Left, Button, Icon, Content } from 'native-base';

type Props = {
	navigation: Navigation
};

export default function SpaceContacts({ navigation }: Props) {
	return (
		<Container>
			<Header>
				<Left>
					<Button primary transparent onPress={() => navigation.goBack()}>
						<Icon name="arrow-back" />
					</Button>
				</Left>
			</Header>
			<Content />
		</Container>
	);
}
