import { createAction, handleActions } from 'redux-actions';

export const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILD = 'LOGIN_FAILD';
export const FETCH_REQUEST = 'DATA_FETCH_REQUEST';
const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';

export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFaild = createAction(LOGIN_FAILD);
export const fetchRequest = createAction(FETCH_REQUEST);
export const fetchRequestSuccess = createAction(FETCH_REQUEST_SUCCESS);

initialState = {
  token: null,
  error: false,
  isFetching: false,
  data: null
};

export default handleActions(
  {
    [LOGIN]: state => ({ ...state, isFetching: true }),
    [LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      token: action.payload,
      isFetching: false
    }),
    [LOGIN_FAILD]: state => ({
      ...state,
      isFetching: false,
      error: true
    }),
    [FETCH_REQUEST_SUCCESS]: (state, action) => ({
      ...state,
      data: action.payload
    })
  },
  initialState
);
