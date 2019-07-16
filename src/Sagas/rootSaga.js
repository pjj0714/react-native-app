import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import vehiclesDataSaga from "./vehiclesDataSaga";
import favoriteSaga from "./favoriteSaga";

export default function* root() {
  yield all([loginSaga(), vehiclesDataSaga(), favoriteSaga()]);
}
