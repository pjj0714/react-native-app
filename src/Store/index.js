import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import reducers from '../Reducers/rootReducer';
import mysaga from '../Sagas/rootSaga';

export default function configureStore() {
  const sagaMiddleWare = createSagaMiddleWare();
  const store = createStore(reducers, applyMiddleware(sagaMiddleWare));

  sagaMiddleWare.run(mysaga);

  return store;
}
