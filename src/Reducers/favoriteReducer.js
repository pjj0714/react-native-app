import { createAction, handleActions } from 'redux-actions';

export const FAVORITE_FETCH_REQUEST = 'FAVORITE_FETCH_REQUEST';
const FAVORITE_FETCH_REQUEST_SUCCESS = 'FAVORITE_FETCH_REQUEST_SUCCESS';
const FAVORITE_FETCH_REQUEST_FAILD = 'FAVORITE_FETCH_REQUEST_FAILD';

export const favoriteFetchRequest = createAction(FAVORITE_FETCH_REQUEST);
export const favoriteFetchRequestSuccess = createAction(
  FAVORITE_FETCH_REQUEST_SUCCESS
);
export const favoriteFetchRequestFaild = createAction(
  FAVORITE_FETCH_REQUEST_FAILD
);

const initailState = {
  error: false,
  isFetching: false,
  success: false
};

export default handleActions(
  {
    [FAVORITE_FETCH_REQUEST]: state => ({
      ...state,
      isFetching: true
    }),
    [FAVORITE_FETCH_REQUEST_SUCCESS]: state => ({
      ...state,
      success: true,
      isFetching: false
    }),
    [FAVORITE_FETCH_REQUEST_FAILD]: state => ({
      ...state,
      isFetching: false,
      error: true
    })
  },
  initailState
);
