import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createSaga from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const composeEnhancers =
  (__DEV__ && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default (client) => {
  const saga = createSaga();
  const store = createStore(
    rootReducer(client),
    undefined,
    composeEnhancers(autoRehydrate(), applyMiddleware(client.middleware(), saga)),
  );
  saga.run(rootSaga);
  return store;
};
