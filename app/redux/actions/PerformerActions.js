import {
  PERFORMERS_FETCH_PENDING,
  PERFORMERS_FETCH_SUCCESS,
  PERFORMERS_FETCH_MORE
} from "../types";

import axios from "axios";

export const fetchPerformers = (page = 1) => {
  const limit = 20;
  // console.log(page);

  return dispatch => {
    dispatch({ type: PERFORMERS_FETCH_PENDING });

    const reqUrl = `https://api.seatgeek.com/2/performers?page=${page}&per_page=${limit}&client_id=MTk3MzQ2MDd8MTU3NTM2NDU0Ni4xOA`;

    axios.get(reqUrl).then(res => {
      // console.log(res.data.events.length);
      let finish = false;
      if (res.data.performers.length < limit) {
        finish = true;
      }

      if (page == 1) {
        dispatch({
          type: PERFORMERS_FETCH_SUCCESS,
          payload: res.data.performers,
          finish
        });
      } else {
        dispatch({
          type: PERFORMERS_FETCH_MORE,
          payload: res.data.performers,
          finish
        });
      }
    });
  };
};
