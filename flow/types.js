// @flow
/* eslint-disable no-undef */

declare type ApolloData<A> = {
  viewer: Viewer,
  node: A,
  placeSearch: PlaceConnection,
  loading: boolean,
  error: boolean,
  refetch: ({ [string]: mixed }) => void,
  networkStatus: number,
}

declare type GraphQLResponse<A> = {
  viewer: Viewer,
  node: A,
  placeSearch: PlaceConnection,
}

declare type ApolloMutationOptions = {
  [string]: mixed
};

declare type Navigation = {
  state: {
    params: {
      [string]: mixed
    }
  },
  navigate: (string, mixed) => void,
  goBack: () => void,
}

declare type NavigationTabBarIconProps = {
  tintColor: string,
  focused: boolean
}
