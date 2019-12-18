import {
  EVENTS_FETCH_PENDING,
  EVENTS_FETCH_SUCCESS,
  EVENTS_FETCH_MORE,
  EVENT_DETAILS_FETCH_PENDING,
  EVENT_DETAILS_FETCH_SUCCESS
} from "../types";
import axios from "axios";

export const fetchEvents = (page = 1, performerId) => {
  const limit = 20;
  // console.log(page, performerId);

  return dispatch => {
    dispatch({ type: EVENTS_FETCH_PENDING });

    let reqUrl;

    if (performerId) {
      reqUrl = `https://api.seatgeek.com/2/events?page=${page}&per_page=${limit}&performers.id=${performerId}
      &client_id=MTk3MzQ2MDd8MTU3NTM2NDU0Ni4xOA`;
    } else {
      reqUrl = `https://api.seatgeek.com/2/events?page=${page}&per_page=${limit}&client_id=MTk3MzQ2MDd8MTU3NTM2NDU0Ni4xOA`;
    }

    axios.get(reqUrl).then(res => {
      // console.log(res.data.events.length);
      let finish = false;
      if (res.data.events.length < limit) {
        finish = true;
      }

      if (page == 1) {
        dispatch({
          type: EVENTS_FETCH_SUCCESS,
          payload: res.data.events,
          finish
        });
      } else {
        dispatch({ type: EVENTS_FETCH_MORE, payload: res.data.events, finish });
      }
    });
  };
};

export const fetchEventDetails = id => {
  // console.log(id);
  return dispatch => {
    dispatch({ type: EVENT_DETAILS_FETCH_PENDING });

    const apiUrl = `https://api.seatgeek.com/2/events/${id}?client_id=MTk3MzQ2MDd8MTU3NTM2NDU0Ni4xOA`;
    axios.get(apiUrl).then(res => {
      // console.log(res.data);
      dispatch({ type: EVENT_DETAILS_FETCH_SUCCESS, payload: res.data });
    });
  };
};
