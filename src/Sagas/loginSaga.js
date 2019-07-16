import { call, takeLatest, put } from "redux-saga/effects";
import { AsyncStorage, Alert } from "react-native";
import API from "../Service/baseAPI";
import * as Actions from "../Reducers/loginReducer";
import { getData } from "./vehiclesDataSaga";

async function storeToken(token) {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.log("AsyncStorage error during token store:", error);
  }
}

async function removeToken() {
  try {
    await AsyncStorage.removeItem("token");
  } catch (e) {
    console.log("removeToken Error : ", e);
  }
}

function* isLogin(action) {
  const { userId, password, deviceType, keep } = action.payload;
  try {
    const user = {
      userId,
      password,
      deviceType,
    };
    const toeknResponse = yield call(API.post, "/auth", user);
    if (keep) yield call(storeToken, toeknResponse.data.token);

    yield put(Actions.loginSuccess(toeknResponse.data.token));
    yield call(getData, toeknResponse.data.token);
  } catch (e) {
    Alert.alert("회원 정보를 확인해주세요");
    yield put(Actions.loginFaild());
  }
}

function* logout() {
  console.log("logout 실행");
  try {
    yield call(removeToken);
  } catch (e) {
    console.log("logout err : ", e);
  }
}

export default function* root() {
  yield [
    yield takeLatest(Actions.LOGIN, isLogin),
    yield takeLatest(Actions.LOGOUT, logout),
  ];
}
