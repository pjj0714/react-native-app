import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';

export default function* root() {
  yield all([loginSaga()]);
}
