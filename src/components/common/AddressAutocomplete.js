// @flow

import React, { Component } from 'react';
import { Modal, Keyboard, ActivityIndicator } from 'react-native';
import { Header, Item, Label, Input, Text, Icon, Button, Content, List, ListItem, Left, Body } from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import { ApolloClient } from 'apollo-client';
import { graphql, withApollo } from 'react-apollo';
import { get } from 'lodash';

type Props = {
  data: ApolloData<void>,
  client: ApolloClient,
  onSelectAddress: ({
    fullAddress: string,
    addressComponents: AddressComponent[]
  }) => void,
  onChangeText: (string) => void,
  onBlur: () => void,
  success: boolean,
  error: boolean,
  last: boolean,
  initialQuery: string,
};

type State = {
  query: string,
  showModal: boolean
};

class AddressAutocomplete extends Component {
  static defaultProps = {
    onChangeText: () => ({}),
    onBlur: () => ({}),
    last: false,
    initialQuery: '',
  };

  state: State = {
    query: this.props.initialQuery,
    showModal: false,
  };

  componentWillMount() {
    const { initialQuery, data }: Props = this.props;
    if (initialQuery) {
      data.refetch({ query: initialQuery });
    }
  }

  onChangeText(text) {
    this.props.data.refetch({ query: text });
    this.setState({ query: text });
  }

  async selectAddress(data) {
    this.closeModalSafe();
    this.setState({ query: data.fullAddress });
    const res = await this.props.client.query({
      variables: { id: data.id },
      query: gql`
        query PlaceQuery($id: ID!){
          node(id: $id) {
            ... on Place {
              fullAddress
              addressComponents {
                shortName
                longName
                types
              }
            }
          }
        }
      `,
    });
    this.props.onSelectAddress(res.data.node);
  }

  closeModalSafe() {
    Keyboard.dismiss();
    setTimeout(() => {
      this.setState({ showModal: false });
    }, 300);
  }

  props: Props;

  render() {
    const { data, last, error, success, onChangeText } = this.props;
    const { query } = this.state;
    const { placeSearch } = data;
    return (
      <Item last={last} error={error} success={success}>
        <Label>
          Address
        </Label>
        <Text
          numberOfLines={1}
          style={{ paddingVertical: 15, flex: 1 }}
          onPress={() => this.setState({ showModal: true })}
        >
          {query}
        </Text>
        {error ? <Icon name="ios-warning" /> : undefined}
        <Modal
          animationType="slide"
          visible={this.state.showModal}
          onRequestClose={() => this.closeModalSafe()}
        >
          <Header searchBar rounded>
            <Item>
              <Icon name="search" />
              <Input
                onChangeText={(v) => {
                  onChangeText(v);
                  this.onChangeText(v);
                }}
                value={this.state.query}
                placeholder="Enter a location"
                autoFocus
                autoCorrect={false}
              />
              <Icon
                onPress={() => {
                  this.onChangeText('');
                  onChangeText('');
                }}
                active
                contentGray
                name="close-circle"
              />
            </Item>
            <Button
              transparent
              onPress={() => this.closeModalSafe()}
            >
              <Text>Cancel</Text>
            </Button>
          </Header>
          <Content keyboardShouldPersistTaps="always" >
            <List
              keyboardShouldPersistTaps="always"
              dataArray={get(placeSearch, 'edges', []).map(({ node }) => node)}
              renderRow={place => (
                <ListItem icon onPress={() => this.selectAddress(place)}>
                  <Left>
                    <MaterialIcon style={{ fontSize: 24, color: '#a7a7a7' }} name="place" />
                  </Left>
                  <Body>
                    <Text>{place.firstLine}</Text>
                    <Text note>{place.secondLine}</Text>
                  </Body>
                </ListItem>
              )}
            />
            {data.networkStatus !== 7 ? <ActivityIndicator style={{ padding: 15 }} /> : undefined}
          </Content>
        </Modal>
      </Item>
    );
  }
}
const AddressAutocompleteQuery = gql`
  query AddressAutocompleteQuery($query: String) {
    placeSearch(query: $query, first: 10) {
      edges {
        node {
          id
          fullAddress
          firstLine
          secondLine
        }
      }
    }
  }
`;

export default compose(
  graphql(AddressAutocompleteQuery, { options: props => ({ variables: { query: props.initialQuery || '' } }) }),
  withApollo,
)(AddressAutocomplete);
