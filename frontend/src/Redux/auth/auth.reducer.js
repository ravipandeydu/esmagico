import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP_LOADING,
  AUTH_SIGNUP_SUCCESS,
} from "./auth.types";

let initialState = {
  loading: false,
  error: false,
  isAuth: false,
  token: localStorage.getItem("token") || "",
  user: JSON.parse(localStorage.getItem("user")) || {},
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case AUTH_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        errormsg: payload,
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")),
      };
    }
    case AUTH_LOGOUT: {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: false,
        token: "",
        user: {},
      };
    }

    case AUTH_SIGNUP_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case AUTH_SIGNUP_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case AUTH_SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: false,
      };
    }
    default: {
      return state;
    }
  }
};
