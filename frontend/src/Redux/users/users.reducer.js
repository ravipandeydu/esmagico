import {
    GET_USERS_ERROR,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
  PATCH_USERS_ERROR,
  PATCH_USERS_LOADING,
  PATCH_USERS_SUCCESS,
  } from "./users.types";
  
  let initialState = {
    loading: false,
    error: false,
    data: [],
  };
  
  export const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_USERS_LOADING: {
        return {
          ...state,
          loading: true,
        };
      }
      case GET_USERS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
        };
      }
      case GET_USERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          data: payload,
        };
      }
      
      case PATCH_USERS_LOADING: {
        return {
          ...state,
          loading: true,
        };
      }
      case PATCH_USERS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
        };
      }
      case PATCH_USERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false
        };
      }
      default: {
        return state;
      }
    }
  };
  