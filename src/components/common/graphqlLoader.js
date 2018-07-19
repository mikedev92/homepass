/**
 * This component displays Loading for apollo-ql queries
 * @flow
 */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, Button } from 'native-base';
import hoistNonReactStatics from 'hoist-non-react-statics';

type Props = {
  data: ApolloData<*>
};

const Loader = Component => (props: Props) => {
  const { data: { loading, error, refetch } } = props;
  if (error) {
    console.error(error);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{JSON.stringify(error, null, 2)}</Text>
        <Button onPress={() => refetch({})} light block outline><Text>retry</Text></Button>
      </View>
    );
  }
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  return <Component {...props} />;
};

export default (Component: any) => hoistNonReactStatics(Loader(Component), Component);
