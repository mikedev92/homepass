// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, H2 } from 'native-base';
import moment from 'moment';
import { variables } from '../../theme';

type Props = {
  event: CalendarEvent,
};

function isEventOnNow(startDate, endDate) {
  if (!startDate || !endDate) {
    return false;
  }
  const currentDate = new Date();
  const eventAfterCurrentDate = new Date(startDate) < currentDate;
  const eventEndBeforeCurrentDate = currentDate < new Date(endDate);
  return eventAfterCurrentDate && eventEndBeforeCurrentDate;
}

function CalendarEventView({ event }: Props) {
  const eventOnNow = isEventOnNow(event.startDate, event.endDate);
  return (
    <TouchableOpacity
      style={{ marginRight: variables.contentPadding }}
      onPress={() => {}}
    >
      <View
        key={event.id}
        style={{
          borderRadius: 4,
          borderColor: '#03A9F4',
          borderWidth: 1,
          overflow: 'hidden',
          width: 70,
          height: 70,
        }}
      >
        <View backgroundPrimary>
          <Text style={{ textAlign: 'center' }} light>{moment(event.startDate).format('ddd')}</Text>
        </View>
        <View>
          <H2 style={{ padding: 10, textAlign: 'center' }} body>
            {moment(event.startDate).format('DD')}
          </H2>
        </View>
      </View>
      <View style={{ marginTop: 4 }}>
        <Text status alert={eventOnNow} darkGray={!eventOnNow}>
          {moment(event.startDate).format('hh:mm a')}
        </Text>
        <Text>{event.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CalendarEventView;
