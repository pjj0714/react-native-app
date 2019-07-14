import { createAction, handleActions } from 'redux-actions';

export const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILD = 'LOGIN_FAILD';

export const login = createAction(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFaild = createAction(LOGIN_FAILD);

initialState = {
  token: null,
  error: false,
  isFetching: false,
  success: false
};

export default handleActions(
  {
    [LOGIN]: state => ({ ...state, isFetching: true }),
    [LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      token: action.payload,
      isFetching: false,
      success: true
    }),
    [LOGIN_FAILD]: state => ({
      ...state,
      isFetching: false,
      error: true,
      success: false
    })
  },
  initialState
);
