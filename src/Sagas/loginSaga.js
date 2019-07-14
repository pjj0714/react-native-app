import { call, takeLatest, put } from 'redux-saga/effects';
import API from '../Service/baseAPI';
import * as Actions from '../Reducers/loginReducer';
import { AsyncStorage } from 'react-native';
import { getData } from './vehiclesDataSaga';

async function storeToken(token) {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log('AsyncStorage error during token store:', error);
  }
}

function* isLogin(action) {
  const { userId, password, deviceType, keep } = action.payload;
  try {
    const user = {
      userId,
      password,
      deviceType
    };
    const toeknResponse = yield call(API.post, '/auth', user);

    console.log('ttt : ', toeknResponse);
    if (keep) yield call(storeToken, toeknResponse.data.token);

    yield call(getData, toeknResponse.data.token);
    yield put(Actions.loginSuccess(toeknResponse.data.token));
  } catch (e) {
    console.log('errpr : ', e);
    yield put(Actions.loginFaild());
  }
}

export default function* root() {
  yield [yield takeLatest(Actions.LOGIN, isLogin)];
}
