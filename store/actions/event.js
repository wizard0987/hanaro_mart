import queryString from "query-string";
import { API_URL } from "@constants/settings";
export const SET_EVENT = "SET_EVENT";
export const SET_EVENT_MORE = "SET_EVENT_MORE";
export const SET_EVENT_DETAIL = "SET_EVENT_DETAIL";

export const fetchEvent = (query) => {
  //dv-www.hanaromartapp.com/api/event?store_cd=4&status=O
  if (!query.page) query.page = "1";
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event`,
    query: query,
  });
  console.warn(url);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();

      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("fetchEvent Something went wrong!");
      }

      let type = SET_EVENT;
      if (query.page > 1) {
        type = SET_EVENT_MORE;
      } else {
        type = SET_EVENT;
      }
      dispatch({ type: type, event: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchEventDetail = (query) => {
  //dv-www.hanaromartapp.com/api/event?store_cd=4&status=O
  const event_cd = query.event_cd;
  delete query.event_cd;
  const url = queryString.stringifyUrl({
    url: `${API_URL}/event/${event_cd}`,
    query: query,
  });

  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();

      if (!response.ok) {
        console.warn(url, resData.error.errorMsg);
        throw new Error("fetchEventDetail Something went wrong!");
      }

      // console.warn("fetchEvent", resData.data.eventInfo);

      dispatch({ type: SET_EVENT_DETAIL, eventDetail: resData.data.eventInfo });
    } catch (err) {
      throw err;
    }
  };
};
