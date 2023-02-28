import axios from "axios";
import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP_LOADING,
  AUTH_SIGNUP_SUCCESS,
} from "./auth.types";

const port = import.meta.env.VITE_PORT;

const handleUser = (payload) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload,
});

export const loginSuccess = (creds) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_LOADING });
  try {
    await axios.post(`${port}/signin`, creds).then((data) => {
      console.log(data);
      if (data.data.error) {
        dispatch({ type: AUTH_LOGIN_ERROR, payload: data.data.error });
      } else {
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.data });
      }
      return data;
    });
  } catch (e) {
    dispatch({ type: AUTH_LOGIN_ERROR });
  }
};

export const signupSuccess = (creds) => async (dispatch) => {
  dispatch({ type: AUTH_SIGNUP_LOADING });
  try {
    await axios.post(`${port}/signup`, creds).then((data) => {
      console.log(data);
      if (data.data.error) {
        dispatch({ type: AUTH_SIGNUP_ERROR, payload: data.data.error });
      } else {
        dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: data.data.message });
      }
      return data;
    });
  } catch (e) {
    dispatch({ type: AUTH_SIGNUP_ERROR, payload: "Server Error" });
  }
};

export const login = (creds) => (dispatch) => {
  dispatch(handleUser(creds));
};

const handleLogout = () => ({
  type: AUTH_LOGOUT,
});

export const logout = () => (dispatch) => {
  dispatch(handleLogout());
};
