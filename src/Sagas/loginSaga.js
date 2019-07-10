import { call, takeLatest, put } from 'redux-saga/effects';
import API from '../Service/baseAPI';
import * as Actions from '../Reducers/loginReducer';

function* isLogin(action) {
  try {
    const toeknResponse = yield call(API.post, '/auth', action.payload);

    yield put(Actions.loginSuccess(toeknResponse.data.token));

    const header = {
      authorization: `Bearer ${toeknResponse.data.token}`
    };
    const dataResponse = yield call(API.get, '/users/self/vehicles', header);
    yield put(Actions.fetchRequestSuccess(dataResponse.data));
  } catch (e) {
    console.log('errpr : ', e);
    yield put(Actions.loginFaild());
  }
}

export default function* root() {
  yield [yield takeLatest(Actions.LOGIN, isLogin)];
}
