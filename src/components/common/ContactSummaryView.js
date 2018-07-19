// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import { Col, Thumbnail, Text, Icon } from 'native-base';
import gql from 'graphql-tag';
import { variables } from '../../theme';

type Props = {
  spaceContact: SpaceContact,
};

const styles = StyleSheet.create({
  container: {
    marginRight: variables.contentPadding,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
});

export default function ContactSummaryView({ spaceContact }: Props) {
  if (!spaceContact || !spaceContact.contact) {
    return null;
  }

  return (
    <Col style={styles.container}>
      {spaceContact.contact.imageUrl
        ? <Thumbnail xLarge source={{ uri: spaceContact.contact.imageUrl }} />
        : <Icon style={{ width: 70, height: 70, fontSize: 70, lineHeight: 70, textAlign: 'center' }} active name="contact" />}
      <Text center>{spaceContact.contact.firstName}</Text>
      <Icon name="star" active={spaceContact.interested} />
    </Col>
  );
}

ContactSummaryView.fragments = {
  SpaceContact: gql`
    fragment SpaceContactSummaryViewFragment on SpaceContact {
      interested
      contact {
        id
        firstName
        imageUrl
      }
    }
  `,
};
