// @flow
import React from 'react';
import { Right, Button, ListItem, Left, Body, Thumbnail, Text, Row } from 'native-base';
import moment from 'moment';
import { variables } from '../../theme';

type Props = {
  spaceMemberRequest?: SpaceMemberRequest | null,
  last: boolean,
  approveSpaceMemberRequest: string => () => void,
  rejectSpaceMemberRequest: string => () => void,
};

function SpaceMemberRequestRow({
  spaceMemberRequest,
  last,
  approveSpaceMemberRequest,
  rejectSpaceMemberRequest,
}: Props) {
  if (!spaceMemberRequest || !spaceMemberRequest.user) {
    return null;
  }

  const spaceMemberRequestId = spaceMemberRequest.spaceMemberRequestId;
  if (typeof spaceMemberRequestId !== 'string') {
    return null;
  }

  return (
    <ListItem key={spaceMemberRequest.spaceMemberRequestId} thumbnail last={last}>
      {spaceMemberRequest.user.imageUrl &&
        <Left><Thumbnail source={{ uri: spaceMemberRequest.user.imageUrl }} /></Left>}
      <Body>
        <Text>{spaceMemberRequest.user.name}</Text>
        <Text note>{moment(spaceMemberRequest.createdAt).fromNow()}</Text>
        <Row style={{ marginTop: variables.contentPadding }}>
          <Button
            onPress={approveSpaceMemberRequest(spaceMemberRequestId)}
            style={{ marginRight: variables.contentPadding }}
            small
          >
            <Text>Approve</Text>
          </Button>
          <Button onPress={rejectSpaceMemberRequest(spaceMemberRequestId)} small bordered>
            <Text>Decline</Text>
          </Button>
        </Row>
      </Body>
      <Right />
    </ListItem>
  );
}

export default SpaceMemberRequestRow;
