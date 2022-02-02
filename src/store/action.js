import axios from "axios";
import { config, staticDataUrls, storageKey } from "../config";

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  GET_DATA: 'GET_DATA',
  CHANGE_VALUE: 'CHANGE_VALUE',
};

export const login = (userData, userRole, userCompany) => {
  localStorage.setItem(storageKey.user, JSON.stringify(userData));
  localStorage.setItem(storageKey.role_id, userData.role_id);

  return (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN,
      data: userData,
      role: userRole,
      company: userCompany,
    });
  }
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem(storageKey.user);
    localStorage.removeItem(storageKey.role_id);
    dispatch({
      type: actionTypes.LOGOUT
    });
  }
};

export const getData = (key, id, patch) => {
  return async (dispatch, getState) => {
    if (getState().staticData[key].length === 0 || id) {
      let url = config.apiURL + staticDataUrls[key] + (id ? id : '') + (patch ? patch : '');
      await axios.get(url).then(res => {
        dispatch({
          type: actionTypes.GET_DATA,
          data: res.data.data ? res.data.data : res.data,
          key: key,
          id: id
        })
      })
    }
  }
};

export const changeValue = (section, field, value) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHANGE_VALUE,
      section: section,
      field: field,
      value: value,
    });
  }
}