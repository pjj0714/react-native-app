import { createAction, handleActions } from "redux-actions";

export const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_REQUEST_SUCCESS = "FETCH_REQUEST_SUCCESS";
const FETCH_REQUEST_FAILD = "FETCH_REQUEST_FAILD";
export const FAVORITE_DATA = "FAVORITE_DATA";

export const fetchRequest = createAction(FETCH_REQUEST);
export const fetchRequestSuccess = createAction(FETCH_REQUEST_SUCCESS);
export const fetchRequestFaild = createAction(FETCH_REQUEST_FAILD);
export const favoriteData = createAction(FAVORITE_DATA);

const initailState = {
  data: null,
  error: false,
  isFetching: false,
};

export default handleActions(
  {
    [FETCH_REQUEST]: state => ({
      ...state,
      isFetching: true,
    }),
    [FETCH_REQUEST_SUCCESS]: (state, action) => ({
      isFetching: false,
      error: false,
      data: action.payload,
    }),
    [FETCH_REQUEST_FAILD]: state => ({
      ...state,
      error: true,
      isFetching: false,
    }),
    [FAVORITE_DATA]: (state, action) => {
      const data = [...state.data];
      const { idx, status } = action.payload;
      data[idx].favorite = status;

      return {
        ...state,
        data,
      };
    },
  },
  initailState,
);
