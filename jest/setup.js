/* eslint-disable global-require */
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(() => Promise.resolve('')),
}));

jest.mock('react-native-code-push', () => {
  const mod = jest.fn(() => jest.fn(comp => comp));
  mod.CheckFrequency = { ON_APP_RESUME: 'mock' };
  mod.InstallMode = { IMMEDIATE: 'mock' };
  mod.sync = jest.fn();
  return mod;
});

jest.mock('react-redux', () => ({
  connect: jest.fn(() => jest.fn(component => component)),
}));

jest.mock('react-apollo', () => {
  const React = require('react');
  const View = require('react-native').View;
  function def({ networkInterface }) {
    return {
      reducer: () => () => ({}),
      middleware: () => () => () => ({}),
      networkInterface,
    };
  }
  def.graphql = jest.fn(() => jest.fn(component => component));
  def.withApollo = jest.fn(jest.fn(component => component));
  def.createNetworkInterface = jest.fn(() => ({ use: jest.fn() }));
  def.ApolloProvider = () => <View />;
  return def;
});

jest.mock('subscriptions-transport-ws', () => ({
  SubscriptionClient: jest.fn(),
  addGraphQLSubscriptions: jest.fn(c => c),
}));

jest.mock('react-navigation', () => {
  const React = require('react');
  const View = require('react-native').View;
  const Stub = () => <View />;
  Stub.router = { getStateForAction: () => ({}) };
  return {
    withNavigation: jest.fn(component => component),
    StackNavigator: jest.fn(() => Stub),
    TabNavigator: jest.fn(() => Stub),
    addNavigationHelpers: jest.fn(),
    NavigationActions: {
      reset: jest.fn(() => 'reset'),
      navigate: jest.fn(() => 'navigate'),
    },
  };
});

jest.mock('../src/components/common/graphqlLoader', () => component => component);
