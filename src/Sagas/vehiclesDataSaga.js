import { call, takeLatest, put } from 'redux-saga/effects';
import API from '../Service/baseAPI';
import * as vehiclesActions from '../Reducers/vehiclesDataReducer';

export function* getData(action) {
  const token = action.payload || action;
  const header = {
    authorization: `Bearer ${token}`
  };
  try {
    const response = yield call(API.get, '/users/self/vehicles', header);
    console.log('response : ', response);
    yield put(vehiclesActions.fetchRequestSuccess(response.data));
  } catch (e) {
    console.log('e, : ', e);
    yield put(vehiclesActions.fetchRequestFaild());
  }
}

export default function* root() {
  yield [yield takeLatest(vehiclesActions.FETCH_REQUEST, getData)];
}
