import queryString from "query-string";
import { API_URL } from "@constants/settings";
export const SET_ADDRESS1 = "SET_ADDRESS1";
export const SET_ADDRESS2 = "SET_ADDRESS2";
export const SET_BRANCHES = "SET_BRANCHES";
export const SET_BRANCH = "SET_BRANCH";

export const fetchAddress1 = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/lname`);

      if (!response.ok) {
        throw new Error("fetchAddress1 Something went wrong!");
      }

      const resData = await response.json();
      // const loadedAddress1 = [];

      // for (const key in resData.data.lnameList) {
      //   loadedAddress1.push(new Address1(resData.data.lnameList[key].lname));
      // }

      dispatch({ type: SET_ADDRESS1, address1: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchAddress2 = (lname) => {
  if (!lname || lname == "") return async () => null;
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/${lname}/mname`);

      if (!response.ok) {
        throw new Error("fetchAddress2 Something went wrong!");
      }

      const resData = await response.json();

      dispatch({ type: SET_ADDRESS2, address2: resData.data });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchBranches = (query) => {
  const url = queryString.stringifyUrl({
    url: `${API_URL}/store`,
    query: query,
  });
  // console.warn(url);
  return async (dispatch, getState) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("fetchBranches Something went wrong!");
      }

      const resData = await response.json();

      dispatch({ type: SET_BRANCHES, branches: resData.data });
    } catch (err) {
      throw err;
    }
  };
};
export const fetchBranch = (store_cd) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${API_URL}/store/${store_cd}`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      dispatch({ type: SET_BRANCH, branch: resData.data.storeInfo });
    } catch (err) {
      throw err;
    }
  };
};