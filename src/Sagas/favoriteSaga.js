import { call, takeLatest, put } from 'redux-saga/effects';
import API from '../Service/baseAPI';
import * as favoriteActions from '../Reducers/favoriteReducer';
import { favoriteData } from '../Reducers/vehiclesDataReducer';

export function* favoritePutData(action) {
  const { token, id, status, idx } = action.payload;
  const header = {
    authorization: `Bearer ${token}`
  };
  const data = { idx, status };
  try {
    const response = yield call(
      API.put,
      `/users/self/vehicles/${id}/favorite`,
      { status },
      header
    );
    yield put(favoriteActions.favoriteFetchRequestSuccess(response.data));
    yield put(favoriteData(data));
  } catch (e) {
    yield put(favoriteActions.favoriteFetchRequestFaild());
  }
}

export default function* root() {
  yield [
    yield takeLatest(favoriteActions.FAVORITE_FETCH_REQUEST, favoritePutData)
  ];
}
