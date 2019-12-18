import {
  PERFORMERS_FETCH_PENDING,
  PERFORMERS_FETCH_SUCCESS,
  PERFORMERS_FETCH_MORE
} from "../types";

import { flatten } from "lodash";

const initialState = {
  isFetching: true,
  error: null,
  list: [],
  finish: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PERFORMERS_FETCH_PENDING:
      // console.log("PERFORMERS_FETCH_PENDING");
      return { ...state, isFetching: true, error: null };
    case PERFORMERS_FETCH_SUCCESS:
      // console.log("PERFORMERS_FETCH_SUCCESS");
      return {
        ...state,
        isFetching: false,
        error: null,
        list: flatten(action.payload),
        finish: action.finish
      };
    case PERFORMERS_FETCH_MORE:
      // console.log("PERFORMERS_FETCH_MORE");
      return {
        ...state,
        isFetching: false,
        error: null,
        list: state.list.concat(flatten(action.payload)),
        finish: action.finish
      };
    default:
      return state;
  }
};
