// @flow
import React from 'react';
import {
  Header,
  Container,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Body,
  Right,
  Left,
  Radio,
  List,
} from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { get } from 'lodash';
import { connect } from 'react-redux';
import graphqlLoader from './common/graphqlLoader';
import { type State, spaceSelector } from '../reducers';
import * as fromActions from '../actions/Space';

type Props = {
  data: ApolloData<void>,
  toggleFilter: string => void,
  filters: { [string]: boolean },
  navigation: Navigation,
};
function SpaceFilters({ data, toggleFilter, filters, navigation }: Props) {
  const spaceFilters: Array<SpaceFilter> = get(data, 'viewer.spaceFilters', []);
  return (
    <Container backgroundDark>
      <Header bordered>
        <Left>
          <Button onPress={() => navigation.goBack()} transparent primary>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
      <Content>
        <ListItem itemHeader>
          <Text>
            SHOW
          </Text>
        </ListItem>
        <List>
          {spaceFilters.map(
            (filter, i) =>
              filter &&
              <ListItem
                onPress={() => filter.tag && toggleFilter(filter.tag, !filters[filter.tag])}
                key={filter.tag}
                last={i === spaceFilters.length - 1}
              >
                <Text>{filter.label}</Text>
                <Right>
                  <Radio selected={filters[filter.tag || '']} />
                </Right>
              </ListItem>,
          )}
        </List>
      </Content>
    </Container>
  );
}

const SpaceFiltersQuery = gql`
  query {
    viewer {
      spaceFilters {
        label
        tag
      }
    }
  }
`;

const mapStateToProps = (state: State) => ({
  filters: spaceSelector(state).filters,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleFilter: (key, value) => dispatch(fromActions.setFilter(key, value)),
});
const connector = connect(mapStateToProps, mapDispatchToProps);

export default compose(graphql(SpaceFiltersQuery), graphqlLoader, connector)(SpaceFilters);
