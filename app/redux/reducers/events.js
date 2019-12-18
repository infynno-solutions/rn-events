import {
  EVENTS_FETCH_PENDING,
  EVENTS_FETCH_SUCCESS,
  EVENTS_FETCH_MORE,
  EVENT_DETAILS_FETCH_PENDING,
  EVENT_DETAILS_FETCH_SUCCESS
} from "../types";

import { flatten } from "lodash";

const initialState = {
  isFetching: true,
  finish: false,
  error: null,
  list: [],
  event: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_FETCH_PENDING:
      // console.log("EVENTS_FETCH_PENDING");
      return { ...state, isFetching: true, error: null };
    case EVENTS_FETCH_SUCCESS:
      // console.log("EVENTS_FETCH_SUCCESS");
      return {
        ...state,
        isFetching: false,
        error: null,
        list: flatten(action.payload),
        finish: action.finish
      };
    case EVENTS_FETCH_MORE:
      // console.log("EVENTS_FETCH_MORE");
      return {
        ...state,
        isFetching: false,
        error: null,
        list: state.list.concat(flatten(action.payload)),
        finish: action.finish
      };
    case EVENT_DETAILS_FETCH_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case EVENT_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        event: action.payload
      };
    default:
      return state;
  }
};
